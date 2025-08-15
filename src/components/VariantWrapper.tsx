'use client';

import { useVariant } from '@/hooks/useVariant';
import { ReactNode } from 'react';

interface VariantWrapperProps {
  testId: string;
  variants: Record<string, ReactNode>;
  fallback?: ReactNode;
}

export function VariantWrapper({ testId, variants, fallback }: VariantWrapperProps) {
  const { variant, isLoading } = useVariant(testId);

  if (isLoading) {
    return fallback || <div className="h-20 animate-pulse bg-gray-100 dark:bg-gray-800 rounded"></div>;
  }

  return (
    <>
      {variants[variant] || variants.control || fallback}
    </>
  );
}

// Individual section wrappers for easier usage
export function HeroVariantWrapper({ children }: { children: Record<string, ReactNode> }) {
  return <VariantWrapper testId="hero_section" variants={children} />;
}

export function PricingVariantWrapper({ children }: { children: Record<string, ReactNode> }) {
  return <VariantWrapper testId="pricing_section" variants={children} />;
}

export function CTAVariantWrapper({ children }: { children: Record<string, ReactNode> }) {
  return <VariantWrapper testId="cta_section" variants={children} />;
}

export function BentoVariantWrapper({ children }: { children: Record<string, ReactNode> }) {
  return <VariantWrapper testId="bento_section" variants={children} />;
}

export function TestimonialVariantWrapper({ children }: { children: Record<string, ReactNode> }) {
  return <VariantWrapper testId="testimonial_section" variants={children} />;
}

export function FeatureVariantWrapper({ children }: { children: Record<string, ReactNode> }) {
  return <VariantWrapper testId="feature_section" variants={children} />;
}

export function FAQVariantWrapper({ children }: { children: Record<string, ReactNode> }) {
  return <VariantWrapper testId="faq_section" variants={children} />;
}

export function CompanyShowcaseVariantWrapper({ children }: { children: Record<string, ReactNode> }) {
  return <VariantWrapper testId="company_showcase" variants={children} />;
}

export function ContactVariantWrapper({ children }: { children: Record<string, ReactNode> }) {
  return <VariantWrapper testId="contact_section" variants={children} />;
}

