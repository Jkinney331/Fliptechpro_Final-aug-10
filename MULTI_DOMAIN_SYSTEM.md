# 🌐 Multi-Domain System Documentation

## 🎯 Overview

Your FlipTech Pro site now supports multiple domains with different content, targeting different audiences, all from a single codebase and Netlify deployment.

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                Single Netlify Project                   │
│                                                         │
│  ┌─────────────────┐    ┌─────────────────┐            │
│  │ fliptechpro.com │    │ fliptech-ai.com │            │
│  │ (SMB Audience)  │    │ (Pro Audience)  │            │
│  └─────────────────┘    └─────────────────┘            │
│           │                       │                    │
│           └───────────────────────┼────────────────────┘
│                                   │
│  ┌─────────────────────────────────┴─────────────────┐  │
│  │              Next.js Application                  │  │
│  │  • Domain detection & routing                     │  │
│  │  • Dynamic content loading                        │  │
│  │  • Shared components & styling                    │  │
│  │  • Multi-domain A/B testing                       │  │
│  │  • Separate analytics tracking                    │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## 🎯 Domain Strategy

### **fliptechpro.com** (SMB Focus)
- **Target Audience**: Small and medium businesses
- **Messaging**: Affordable, quick ROI, growth-focused
- **Pricing**: $9,500 (vs $25,000 savings message)
- **CTA Style**: "Start Your AI Journey", "Book Demo"
- **Analytics**: `G-9FP4KSXP0J`

### **fliptech-ai.com** (Professional Focus)  
- **Target Audience**: Enterprise and professional companies
- **Messaging**: Enterprise-grade, scalable, premium
- **Pricing**: $19,500 (vs $50,000 savings message)
- **CTA Style**: "Schedule Consultation", "Enterprise Demo"
- **Analytics**: `G-PROFESSIONAL` (needs setup)

## 📁 File Structure

```
src/
├── lib/
│   ├── domain-config.ts       # Domain configurations
│   ├── domain-content.ts      # Content for each domain
│   └── ab-testing.ts          # Multi-domain A/B testing
├── hooks/
│   └── useDomainContent.ts    # Domain-aware React hooks
├── components/
│   ├── MultiDomainDashboard.tsx  # Admin dashboard
│   ├── AnalyticsSetup.tsx     # Domain-specific analytics
│   └── sections/              # Updated sections
└── netlify.toml               # Multi-domain deployment config
```

## 🚀 How It Works

### **1. Domain Detection**
```typescript
// Automatically detects current domain
const domain = getCurrentDomain(); // 'fliptechpro.com' or 'fliptech-ai.com'
const config = getDomainConfig(domain);
```

### **2. Dynamic Content Loading**
```typescript
// Content changes based on domain
const heroContent = useHeroContent(); // Different per domain
const pricingContent = usePricingContent(); // Different pricing
```

### **3. Audience-Specific Styling**
```typescript
// Different styling based on audience
const { isSmb, isProfessional } = useDomainContent();
// Shows different badges, colors, messaging
```

## 🧪 A/B Testing Integration

### **Domain-Specific Tests**
- `fliptechpro.com_hero_section` - SMB hero variants
- `fliptechpro.com_pricing_section` - SMB pricing variants  
- `fliptech-ai.com_hero_section` - Enterprise hero variants
- `fliptech-ai.com_pricing_section` - Enterprise pricing variants

### **Usage**
```typescript
// Automatically uses domain-specific tests
const { variant } = useVariant('hero_section'); // Gets domain test
```

## 📊 Analytics Setup

### **Separate Tracking**
- **fliptechpro.com**: Uses existing GA `G-9FP4KSXP0J`
- **fliptech-ai.com**: Needs new GA property `G-PROFESSIONAL`

### **Events Tracked**
- `domain_assignment` - When user hits a domain
- `domain_ab_test_view` - A/B test views per domain
- `domain_ab_test_conversion` - Conversions per domain

## 🛠 Content Management

### **Current Content Structure**
```typescript
DOMAIN_CONTENT = {
  'fliptechpro.com': {
    hero: { title: "Where Vision Meets Velocity", ... },
    pricing: { price: "9,500", savings: "Save $15,500", ... },
    cta: { title: "Automate. Simplify. Thrive", ... }
  },
  'fliptech-ai.com': {
    hero: { title: "Enterprise AI Excellence", ... },
    pricing: { price: "19,500", savings: "Save $30,500", ... },
    cta: { title: "Scale Your Operations with AI", ... }
  }
}
```

### **Easy Content Updates**
1. Edit `src/lib/domain-content.ts`
2. Deploy once to Netlify
3. Both domains update automatically

## 🎛 Admin Dashboard

### **Multi-Domain Dashboard**
- Click "Multi-Domain" button (bottom-right)
- Switch between domains
- Preview content for each domain
- Quick content editing access

### **Features**
- **Domain Switching**: Navigate between domains
- **Content Preview**: See current content for each domain
- **Analytics Info**: View GA tracking IDs
- **Audience Info**: SMB vs Professional indicators

## 🚀 Deployment

### **Netlify Configuration**
```toml
# Both domains point to same site
[[redirects]]
  from = "https://fliptechpro.com/*"
  to = "/index.html"
  status = 200

[[redirects]]
  from = "https://fliptech-ai.com/*"
  to = "/index.html"
  status = 200
```

### **Single Deployment Process**
1. **Commit changes** to Git
2. **Netlify builds once** 
3. **Both domains update** automatically
4. **Content varies** based on domain detection

## 📈 Benefits Achieved

### **✅ Single Codebase**
- One repository to maintain
- Shared components and styling
- Single deployment process
- Consistent functionality

### **✅ Audience Targeting**
- SMB-focused messaging on fliptechpro.com
- Enterprise messaging on fliptech-ai.com
- Different pricing strategies
- Audience-appropriate CTAs

### **✅ Separate Analytics**
- Independent conversion tracking
- Audience-specific insights
- Campaign attribution per domain
- A/B testing per audience

### **✅ Cost Effective**
- One Netlify plan
- One development team
- Shared hosting costs
- Single maintenance burden

## 🎯 Usage Guide

### **For Development**
1. **Local testing**: Defaults to SMB content
2. **Multi-domain dashboard**: Test domain switching
3. **Content editing**: Update `domain-content.ts`
4. **A/B testing**: Use domain-specific tests

### **For Content Team**
1. **Access dashboard**: Click "Multi-Domain" button
2. **Preview content**: See what each domain shows
3. **Edit content**: Modify content files
4. **Deploy changes**: Single deployment updates both

### **For Analytics**
1. **Set up GA**: Create separate property for fliptech-ai.com
2. **Update config**: Add new GA ID to domain-config.ts
3. **Monitor separately**: Track each audience independently
4. **A/B testing**: Review domain-specific test results

## 🔧 Customization

### **Adding New Domains**
1. **Add to DOMAIN_CONFIG**: Configure new domain
2. **Add to DOMAIN_CONTENT**: Create content for domain
3. **Update Netlify**: Add domain redirects
4. **DNS setup**: Point domain to Netlify

### **Modifying Content**
1. **Edit domain-content.ts**: Update messaging
2. **Test locally**: Verify changes work
3. **Deploy**: Single deployment updates all domains

### **Adding A/B Tests**
```typescript
// Add domain-specific test
'newdomain.com_new_section': {
  id: 'newdomain.com_new_section',
  name: 'New Section Test',
  variants: [...]
}
```

## 🚨 Important Notes

### **DNS Setup Required**
- Point `fliptechpro.com` to Netlify
- Point `fliptech-ai.com` to Netlify  
- Set up in Netlify domains panel

### **Analytics Setup**
- Create new GA property for fliptech-ai.com
- Update `G-PROFESSIONAL` in domain-config.ts
- Configure custom dimensions for each property

### **Content Consistency**
- Maintain 90% design consistency
- Vary messaging and pricing appropriately
- Keep core functionality identical

## 🎉 You're All Set!

Your multi-domain system is now ready to:

1. **Serve different audiences** with tailored messaging
2. **Track performance separately** for each domain
3. **Run A/B tests** specific to each audience
4. **Manage content easily** from single dashboard
5. **Deploy once** and update both domains

The system will automatically detect which domain users are visiting and show the appropriate content, pricing, and messaging for that audience!

---

**Next Steps:**
1. Set up DNS for both domains
2. Create new Google Analytics property for fliptech-ai.com  
3. Test both domains thoroughly
4. Start your campaigns with audience-specific messaging!

