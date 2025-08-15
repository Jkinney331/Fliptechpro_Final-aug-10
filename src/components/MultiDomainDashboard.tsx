'use client';

import { useState, useEffect } from 'react';
import { getDomainConfig, DOMAIN_CONFIG, getCurrentDomain } from '@/lib/domain-config';
import { DOMAIN_CONTENT } from '@/lib/domain-content';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useDomainContent } from '@/hooks/useDomainContent';

export function MultiDomainDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<string>('fliptechpro.com');
  const { domain: currentDomain, config } = useDomainContent();

  useEffect(() => {
    const adminMode = localStorage.getItem('multi_domain_admin_mode') === 'true';
    setIsAdmin(adminMode);
    setSelectedDomain(currentDomain);
  }, [currentDomain]);

  const toggleAdminMode = () => {
    const newAdminMode = !isAdmin;
    setIsAdmin(newAdminMode);
    localStorage.setItem('multi_domain_admin_mode', newAdminMode.toString());
  };

  const switchDomain = (domain: string) => {
    // For demo purposes, just navigate to the domain
    if (domain === 'localhost') {
      window.location.href = 'http://localhost:3000';
    } else {
      window.location.href = `https://${domain}`;
    }
  };

  if (!isAdmin) {
    return (
      <div className="fixed bottom-20 right-4 z-50">
        <Button
          onClick={toggleAdminMode}
          variant="outline"
          size="sm"
          className="bg-purple-900 text-white border-purple-700 hover:bg-purple-800"
        >
          Multi-Domain
        </Button>
      </div>
    );
  }

  const domainConfig = getDomainConfig(selectedDomain);
  const domainContent = DOMAIN_CONTENT[selectedDomain as keyof typeof DOMAIN_CONTENT];

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-h-96 overflow-y-auto">
      <Card className="bg-purple-900 text-white border-purple-700">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Multi-Domain Dashboard</CardTitle>
            <Button
              onClick={toggleAdminMode}
              variant="ghost"
              size="sm"
              className="text-gray-400"
            >
              ×
            </Button>
          </div>
          <CardDescription className="text-purple-200">
            Current: {currentDomain}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          
          {/* Domain Selector */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-purple-200">Switch Domain</h4>
            <div className="flex flex-wrap gap-2">
              {Object.keys(DOMAIN_CONFIG).map((domain) => (
                <Button
                  key={domain}
                  onClick={() => switchDomain(domain)}
                  variant={domain === currentDomain ? "default" : "ghost"}
                  size="sm"
                  className="text-xs h-8 px-3"
                >
                  {domain === 'localhost' ? 'Dev' : domain.replace('.com', '')}
                </Button>
              ))}
            </div>
          </div>

          {/* Domain Info */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-purple-200">Domain Details</h4>
            <div className="bg-purple-800/50 rounded p-3 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-purple-300">Audience:</span>
                <Badge variant="secondary" className="text-xs">
                  {domainConfig?.audience.toUpperCase()}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-purple-300">Brand:</span>
                <span className="text-xs">{domainConfig?.branding.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-purple-300">Analytics:</span>
                <span className="text-xs">{domainConfig?.analytics.gaId}</span>
              </div>
            </div>
          </div>

          {/* Content Preview */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-purple-200">Content Preview</h4>
            <div className="bg-purple-800/50 rounded p-3 space-y-2">
              <div>
                <span className="text-xs text-purple-300">Hero Title:</span>
                <p className="text-xs mt-1 truncate">{domainContent?.hero.title}</p>
              </div>
              <div>
                <span className="text-xs text-purple-300">Pricing:</span>
                <p className="text-xs mt-1">${domainContent?.pricing.price}</p>
              </div>
              <div>
                <span className="text-xs text-purple-300">CTA Text:</span>
                <p className="text-xs mt-1 truncate">{domainContent?.cta.button.text}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-purple-200">Quick Actions</h4>
            <div className="flex gap-2">
              <Button
                onClick={() => window.open(`https://${selectedDomain}`, '_blank')}
                variant="outline"
                size="sm"
                className="text-xs"
                disabled={selectedDomain === currentDomain}
              >
                Visit Site
              </Button>
              <Button
                onClick={() => console.log('CMS editing would open here')}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                Edit Content
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Hook to show the dashboard only in development or when admin mode is enabled
export function useMultiDomainDashboard() {
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development';
    const adminMode = localStorage.getItem('multi_domain_admin_mode') === 'true';
    setShowDashboard(isDev || adminMode);
  }, []);

  return showDashboard;
}

