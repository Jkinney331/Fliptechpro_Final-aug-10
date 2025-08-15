# A/B Testing System Documentation

## 🎯 Overview

This comprehensive A/B testing system allows you to test different variants of your website sections to optimize conversion rates. The system is built with Next.js and integrates seamlessly with Google Analytics for tracking.

## 📁 File Structure

```
src/
├── lib/
│   ├── ab-testing.ts          # Core A/B testing logic
│   └── variants.ts            # Variant configurations
├── hooks/
│   └── useVariant.ts          # React hooks for A/B testing
├── components/
│   ├── VariantWrapper.tsx     # Wrapper components for variants
│   ├── ABTestDashboard.tsx    # Admin dashboard for testing
│   ├── AnalyticsSetup.tsx     # Analytics configuration
│   └── variants/              # Variant components
│       ├── hero/
│       ├── pricing/
│       ├── cta/
│       └── ...
```

## 🚀 Getting Started

### 1. Understanding Tests

The system currently includes tests for:
- **Hero Section**: 4 variants (control + A, B, C)
- **Pricing Section**: 2 variants (control + A)
- **CTA Section**: 2 variants (control + A)

### 2. How Variant Assignment Works

1. **Consistent Assignment**: Users get the same variant across sessions using localStorage
2. **Traffic Allocation**: Each variant has a weight percentage for traffic distribution
3. **Hash-Based Selection**: Uses deterministic hashing for consistent assignment

### 3. Viewing the A/B Test Dashboard

In development mode, click the "A/B Admin" button in the bottom-right corner to:
- See your current variants
- Force specific variants for testing
- Reset your user ID to see different variants

## 📊 Analytics Integration

### Google Analytics Events

The system tracks these events automatically:
- `ab_test_view`: When a variant is shown to a user
- `ab_test_conversion`: When a user performs a conversion action
- `cta_click`: When a call-to-action is clicked
- `form_submit`: When a form is submitted
- `pricing_interaction`: When pricing elements are interacted with

### Custom Dimensions

Configure these custom dimensions in Google Analytics:
1. **A/B Test ID** - The test identifier
2. **A/B Variant ID** - The specific variant shown
3. **A/B User ID** - Consistent user identifier

## 🛠 Configuration

### Adding New Tests

1. **Define the test in `ab-testing.ts`**:

```typescript
my_new_test: {
  id: 'my_new_test',
  name: 'My New Test',
  description: 'Testing different approaches',
  startDate: new Date('2024-01-01'),
  isActive: true,
  variants: [
    {
      id: 'control',
      name: 'Control (Original)',
      weight: 50,
      description: 'Original design',
      isActive: true,
    },
    {
      id: 'variant_a',
      name: 'Variant A',
      weight: 50,
      description: 'New design',
      isActive: true,
    },
  ],
}
```

2. **Add variant configuration in `variants.ts`**:

```typescript
export const myNewVariants = {
  control: {
    title: "Original Title",
    // ... other properties
  },
  variant_a: {
    title: "New Title",
    // ... other properties
  },
};
```

3. **Create variant components**:

```typescript
// components/variants/my-section/MyVariantA.tsx
import { myNewVariants } from '@/lib/variants';

export default function MyVariantA() {
  const config = myNewVariants.variant_a;
  // ... component implementation
}
```

4. **Add wrapper component**:

```typescript
// In VariantWrapper.tsx
export function MyNewVariantWrapper({ children }: { children: Record<string, ReactNode> }) {
  return <VariantWrapper testId="my_new_test" variants={children} />;
}
```

5. **Use in main page**:

```tsx
<MyNewVariantWrapper>
  {{
    control: <OriginalComponent />,
    variant_a: <MyVariantA />
  }}
</MyNewVariantWrapper>
```

### Adjusting Traffic Allocation

Modify the `weight` property in the test configuration:

```typescript
variants: [
  { id: 'control', weight: 25 },    // 25% traffic
  { id: 'variant_a', weight: 75 },  // 75% traffic
]
```

### Enabling/Disabling Tests

Set `isActive: false` to disable a test:

```typescript
my_test: {
  // ...
  isActive: false, // This will show control to everyone
}
```

## 🔍 Monitoring and Analysis

### Using the Dashboard

1. **Development Mode**: Dashboard shows automatically
2. **Production**: Add `?ab_admin=true` to URL or use localStorage:
   ```javascript
   localStorage.setItem('ab_test_admin_mode', 'true');
   ```

### Google Analytics Reports

Create custom reports using these dimensions:
- Event Category: "A/B Testing"
- Event Action: "ab_test_view", "ab_test_conversion"
- Custom Dimension 1: Test ID
- Custom Dimension 2: Variant ID

### Key Metrics to Track

1. **Conversion Rate**: Conversions / Views per variant
2. **Statistical Significance**: Use tools like Google Optimize or Optimizely calculators
3. **Sample Size**: Ensure adequate traffic for reliable results

## 🎛 Conversion Tracking

### Automatic Tracking

Conversions are tracked automatically for:
- CTA button clicks
- Form submissions
- Pricing interactions

### Manual Tracking

Add custom conversion tracking:

```typescript
import { useConversionTracking } from '@/hooks/useVariant';

function MyComponent() {
  const { trackGlobalConversion } = useConversionTracking();
  
  const handleCustomAction = () => {
    trackGlobalConversion('custom_action');
    // ... your action logic
  };
}
```

### Specific Test Tracking

Track conversions for specific tests:

```typescript
import { useVariant } from '@/hooks/useVariant';

function MyComponent() {
  const { trackConversion } = useVariant('my_test_id');
  
  const handleAction = () => {
    trackConversion('specific_action');
    // ... your action logic
  };
}
```

## 📈 Best Practices

### 1. Test Planning
- **Hypothesis**: Always have a clear hypothesis for each test
- **Duration**: Run tests for at least 1-2 weeks for statistical significance
- **Sample Size**: Ensure adequate traffic (minimum 100 conversions per variant)

### 2. Test Implementation
- **Single Variable**: Test one element at a time for clear results
- **Control Group**: Always maintain a control group
- **Consistent Experience**: Ensure users see the same variant across sessions

### 3. Analysis
- **Statistical Significance**: Achieve 95% confidence before declaring winners
- **Practical Significance**: Consider the business impact of improvements
- **Segment Analysis**: Look at results across different user segments

### 4. Variant Design
- **Meaningful Changes**: Make substantial differences between variants
- **User Experience**: Ensure all variants provide good user experience
- **Performance**: Maintain site performance across all variants

## 🚨 Troubleshooting

### Common Issues

1. **Variants Not Showing**
   - Check if test is active in `ab-testing.ts`
   - Verify variant weights add up correctly
   - Clear localStorage and refresh

2. **Analytics Not Tracking**
   - Verify Google Analytics is loaded
   - Check browser console for errors
   - Ensure `gtag` is available globally

3. **Inconsistent Variants**
   - Clear `ab_test_user_id` from localStorage
   - Check hash function implementation
   - Verify no caching issues

### Debug Mode

Enable debug logging:

```javascript
// In browser console
localStorage.setItem('ab_test_debug', 'true');
```

This will log all A/B test assignments and tracking events.

## 🔄 Migration and Updates

### Updating Existing Tests

1. **Gradual Rollout**: Increase variant traffic gradually
2. **Backup**: Always maintain the control variant
3. **Documentation**: Update this documentation with changes

### Retiring Tests

1. **Winner Implementation**: Implement the winning variant as the new control
2. **Cleanup**: Remove old variant components and configurations
3. **Analytics**: Archive analytics data before removing test tracking

## 📞 Support

For questions or issues with the A/B testing system:
1. Check this documentation
2. Review the code comments in core files
3. Use the debug dashboard for real-time testing
4. Monitor Google Analytics for tracking verification

---

**Last Updated**: January 2025
**Version**: 1.0.0

