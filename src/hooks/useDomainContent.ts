'use client';

import { useState, useEffect } from 'react';
import { getCurrentDomain, getDomainConfig, DomainConfig } from '@/lib/domain-config';
import { getDomainContent, DOMAIN_CONTENT } from '@/lib/domain-content';

export function useDomainContent() {
  const [domain, setDomain] = useState<string>('fliptechpro.com');
  const [config, setConfig] = useState<DomainConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentDomain = getCurrentDomain();
    const domainConfig = getDomainConfig(currentDomain);
    
    setDomain(currentDomain);
    setConfig(domainConfig);
    setIsLoading(false);
  }, []);

  return {
    domain,
    config,
    isLoading,
    isSmb: config?.audience === 'smb',
    isProfessional: config?.audience === 'professional',
    getContent: <T extends keyof typeof DOMAIN_CONTENT['fliptechpro.com']>(section: T) => 
      getDomainContent(section, domain),
    getBranding: () => config?.branding,
    getAnalytics: () => config?.analytics,
  };
}

// Hook for specific content sections
export function useHeroContent() {
  const { getContent } = useDomainContent();
  return getContent('hero');
}

export function usePricingContent() {
  const { getContent } = useDomainContent();
  return getContent('pricing');
}

export function useCTAContent() {
  const { getContent } = useDomainContent();
  return getContent('cta');
}

export function useTestimonialsContent() {
  const { getContent } = useDomainContent();
  return getContent('testimonials');
}

