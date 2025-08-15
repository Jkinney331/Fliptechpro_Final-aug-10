'use client';

import { useState, useEffect } from 'react';
import { selectVariant, trackVariantView, AB_TESTS, trackVariantConversion } from '@/lib/ab-testing';

export function useVariant(testId: string) {
  const [variant, setVariant] = useState<string>('control');
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Get or create user ID for consistent variant assignment
    let storedUserId = localStorage.getItem('ab_test_user_id');
    if (!storedUserId) {
      storedUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('ab_test_user_id', storedUserId);
    }
    setUserId(storedUserId);

    // Select variant
    const selectedVariant = selectVariant(testId, storedUserId);
    setVariant(selectedVariant);

    // Track variant view
    trackVariantView(testId, selectedVariant, storedUserId);

    setIsLoading(false);
  }, [testId]);

  const trackConversion = (conversionType?: string) => {
    if (userId) {
      trackVariantConversion(testId, variant, userId, conversionType);
    }
  };

  return {
    variant,
    isLoading,
    userId,
    trackConversion,
    testConfig: AB_TESTS[testId],
  };
}

// Hook for multiple variants (for sections that need multiple tests)
export function useMultipleVariants(testIds: string[]) {
  const [variants, setVariants] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Get or create user ID for consistent variant assignment
    let storedUserId = localStorage.getItem('ab_test_user_id');
    if (!storedUserId) {
      storedUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('ab_test_user_id', storedUserId);
    }
    setUserId(storedUserId);

    // Select variants for all tests
    const selectedVariants: Record<string, string> = {};
    testIds.forEach(testId => {
      const selectedVariant = selectVariant(testId, storedUserId);
      selectedVariants[testId] = selectedVariant;
      
      // Track variant view
      trackVariantView(testId, selectedVariant, storedUserId);
    });

    setVariants(selectedVariants);
    setIsLoading(false);
  }, [testIds]);

  const trackConversion = (testId: string, conversionType?: string) => {
    if (userId && variants[testId]) {
      trackVariantConversion(testId, variants[testId], userId, conversionType);
    }
  };

  return {
    variants,
    isLoading,
    userId,
    trackConversion,
    getVariant: (testId: string) => variants[testId] || 'control',
  };
}

// Hook specifically for tracking conversions across the site
export function useConversionTracking() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('ab_test_user_id');
    setUserId(storedUserId);
  }, []);

  const trackGlobalConversion = (conversionType: string, testId?: string, variantId?: string) => {
    if (userId) {
      if (testId && variantId) {
        trackVariantConversion(testId, variantId, userId, conversionType);
      } else {
        // Track conversion for all active tests
        Object.keys(AB_TESTS).forEach(activeTestId => {
          const userVariant = selectVariant(activeTestId, userId);
          trackVariantConversion(activeTestId, userVariant, userId, conversionType);
        });
      }
    }
  };

  return {
    userId,
    trackGlobalConversion,
  };
}

