import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import { supabase } from '@/lib/supabase';
import fs from 'fs/promises';
import path from 'path';

// Validation schema for report download requests
const ReportDownloadSchema = z.object({
  email: z.string().email('Invalid email format').max(200, 'Email is too long'),
});

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 3; // 3 downloads per 15 minutes
const DATA_DIR = path.join(process.cwd(), 'data');
const RATE_LIMIT_FILE = path.join(DATA_DIR, 'report-download-limits.json');

// Ensure data directory exists
async function ensureDataDir(): Promise<void> {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// Rate limiting functions
async function checkRateLimit(ip: string): Promise<boolean> {
  await ensureDataDir();
  
  try {
    const data = await fs.readFile(RATE_LIMIT_FILE, 'utf-8');
    const limits = JSON.parse(data);
    
    const now = Date.now();
    const userLimits = limits[ip] || { count: 0, resetTime: now + RATE_LIMIT_WINDOW };
    
    // Reset if window has passed
    if (now > userLimits.resetTime) {
      userLimits.count = 0;
      userLimits.resetTime = now + RATE_LIMIT_WINDOW;
    }
    
    return userLimits.count < RATE_LIMIT_MAX_REQUESTS;
  } catch {
    // File doesn't exist or is invalid, allow the request
    return true;
  }
}

async function updateRateLimit(ip: string): Promise<void> {
  await ensureDataDir();
  
  try {
    const data = await fs.readFile(RATE_LIMIT_FILE, 'utf-8');
    const limits = JSON.parse(data);
    
    const now = Date.now();
    const userLimits = limits[ip] || { count: 0, resetTime: now + RATE_LIMIT_WINDOW };
    
    // Reset if window has passed
    if (now > userLimits.resetTime) {
      userLimits.count = 0;
      userLimits.resetTime = now + RATE_LIMIT_WINDOW;
    }
    
    userLimits.count++;
    limits[ip] = userLimits;
    
    await fs.writeFile(RATE_LIMIT_FILE, JSON.stringify(limits, null, 2));
  } catch {
    // Create new file if it doesn't exist
    const limits = {
      [ip]: { count: 1, resetTime: Date.now() + RATE_LIMIT_WINDOW }
    };
    await fs.writeFile(RATE_LIMIT_FILE, JSON.stringify(limits, null, 2));
  }
}

// Save download record
async function saveDownloadRecord(email: string, ip: string, userAgent?: string): Promise<void> {
  try {
    // Try to save to Supabase if configured
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { error } = await supabase
        .from('report_downloads')
        .insert({
          email,
          ip,
          user_agent: userAgent,
          downloaded_at: new Date().toISOString()
        });
      
      if (error) {
        console.error('Failed to save to Supabase:', error);
      }
    }
  } catch (error) {
    console.error('Error saving download record:', error);
  }
}

// Email functions
async function createEmailTransporter() {
  const emailConfig = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  };

  if (!emailConfig.auth.user || !emailConfig.auth.pass) {
    throw new Error('Email configuration is missing');
  }

  return nodemailer.createTransporter(emailConfig);
}

async function sendDownloadConfirmationEmail(email: string): Promise<void> {
  try {
    const transporter = await createEmailTransporter();
    
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'Your AI Implementation Report is Ready! 🚀',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Thank you for downloading our AI Report!</h2>
          <p>Hi there,</p>
          <p>Your AI Implementation Report has been successfully downloaded. This comprehensive guide includes:</p>
          <ul>
            <li>AI Implementation Roadmap</li>
            <li>ROI Calculation Framework</li>
            <li>25+ Real Case Studies</li>
            <li>Risk Mitigation Strategies</li>
            <li>Technology Stack Guide</li>
          </ul>
          <p>If you have any questions about implementing AI in your business, our team is here to help!</p>
          <p>Best regards,<br>The FlipTech Pro Team</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
  }
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const real = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (real) {
    return real.trim();
  }
  
  return 'unknown';
}

// Main POST handler
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Get client IP for rate limiting
    const clientIp = getClientIp(request);
    
    // Check rate limit
    const isAllowed = await checkRateLimit(clientIp);
    if (!isAllowed) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many download attempts. Please try again later.',
        },
        { status: 429 }
      );
    }
    
    // Parse and validate request body
    const body = await request.json();
    const validatedData = ReportDownloadSchema.parse(body);
    
    // Save download record
    await saveDownloadRecord(
      validatedData.email, 
      clientIp, 
      request.headers.get('user-agent')
    );
    
    // Update rate limit
    await updateRateLimit(clientIp);
    
    // Send confirmation email (don't fail the request if email fails)
    try {
      await sendDownloadConfirmationEmail(validatedData.email);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }
    
    // Return success with download URL
    return NextResponse.json({
      success: true,
      message: 'Report download initiated successfully!',
      downloadUrl: '/reports/fliptech-ai-implementation-report.html',
    });
    
  } catch (error) {
    console.error('Report download error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email format. Please provide a valid email address.',
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing your request. Please try again.',
      },
      { status: 500 }
    );
  }
}
