'use client';

import { useState, useEffect } from 'react';
import { AB_TESTS, getActiveTests, getUserVariants, TestConfig } from '@/lib/ab-testing';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function ABTestDashboard() {
  const [userId, setUserId] = useState<string | null>(null);
  const [userVariants, setUserVariants] = useState<Record<string, string>>({});
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('ab_test_user_id');
    setUserId(storedUserId);
    
    if (storedUserId) {
      setUserVariants(getUserVariants(storedUserId));
    }

    // Check if admin mode is enabled (you can add your own logic here)
    const adminMode = localStorage.getItem('ab_test_admin_mode') === 'true';
    setIsAdmin(adminMode);
  }, []);

  const toggleAdminMode = () => {
    const newAdminMode = !isAdmin;
    setIsAdmin(newAdminMode);
    localStorage.setItem('ab_test_admin_mode', newAdminMode.toString());
  };

  const resetUserId = () => {
    localStorage.removeItem('ab_test_user_id');
    window.location.reload();
  };

  const forceVariant = (testId: string, variantId: string) => {
    // Store forced variant in localStorage for testing
    localStorage.setItem(`ab_test_force_${testId}`, variantId);
    window.location.reload();
  };

  if (!isAdmin) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={toggleAdminMode}
          variant="outline"
          size="sm"
          className="bg-gray-900 text-white border-gray-700"
        >
          A/B Admin
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-h-96 overflow-y-auto">
      <Card className="bg-gray-900 text-white border-gray-700">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">A/B Test Dashboard</CardTitle>
            <Button
              onClick={toggleAdminMode}
              variant="ghost"
              size="sm"
              className="text-gray-400"
            >
              ×
            </Button>
          </div>
          <CardDescription className="text-gray-400">
            User ID: {userId ? userId.slice(-8) : 'None'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Button
              onClick={resetUserId}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              Reset User
            </Button>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-300">Active Tests</h4>
            {getActiveTests().map((test) => (
              <div key={test.id} className="border border-gray-700 rounded p-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{test.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {userVariants[test.id] || 'control'}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1">
                  {test.variants.map((variant) => (
                    <Button
                      key={variant.id}
                      onClick={() => forceVariant(test.id, variant.id)}
                      variant={userVariants[test.id] === variant.id ? "default" : "ghost"}
                      size="sm"
                      className="text-xs h-6 px-2"
                    >
                      {variant.id} ({variant.weight}%)
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Hook to show the dashboard only in development or when admin mode is enabled
export function useABTestDashboard() {
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development';
    const adminMode = localStorage.getItem('ab_test_admin_mode') === 'true';
    setShowDashboard(isDev || adminMode);
  }, []);

  return showDashboard;
}

