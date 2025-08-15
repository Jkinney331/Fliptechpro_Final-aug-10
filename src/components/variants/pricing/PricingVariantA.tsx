"use client";

import { SectionHeader } from "@/components/section-header";
import { siteConfig } from "@/lib/config";
import { motion } from "motion/react";
import { LiquidButton } from "../../ui/Liquid-button";
import { Shield, Star, TrendingUp } from "lucide-react";
import { SavingsCalculator } from "../../ui/SavingCalculator";
import { pricingVariants } from "@/lib/variants";
import { useConversionTracking } from "@/hooks/useVariant";

const PricingVariantA = () => {
  const config = pricingVariants.variant_a;
  const tier = siteConfig.pricing.pricingItems[0];
  const { trackGlobalConversion } = useConversionTracking();

  const PriceDisplay = ({ price }: { price: string | number }) => (
    <motion.span
      key={price}
      className="text-5xl font-bold text-center"
      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      ${price}
    </motion.span>
  );

  const handleCTAClick = () => {
    trackGlobalConversion('pricing_cta_click', 'pricing_section', 'variant_a');
  };

  return (
    <section
      id="pricing"
      className="flex flex-col items-center justify-center gap-10 py-20 px-6 sm:px-4 md:px-8 w-full relative"
    >
      <SectionHeader>
        <h2 className="text-xl md:text-4xl font-semibold tracking-tight text-center">
          One Investment, Infinite Returns
        </h2>
        <p className="text-muted-foreground text-center font-medium max-w-2xl mx-auto">
          Simple, transparent pricing. No hidden fees, no surprises.
        </p>
      </SectionHeader>

      {/* Row 1 - Enhanced Price card + Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full max-w-7xl px-4 sm:px-6">
        {/* Enhanced Pricing Card */}
        <div className="w-full rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-zinc-900/50 backdrop-blur-md p-6 sm:p-8 shadow-2xl relative">
          {/* Best Value Badge */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">
              {config.badge}
            </div>
          </div>

          <div className="mb-6 flex flex-col items-center pt-4">
            <div className="flex items-baseline gap-2">
              <PriceDisplay price={tier.price} />
              <span className="text-lg text-muted-foreground">/Month</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2 text-center">Your complete AI solution in 30 days</p>
          </div>

          {/* Enhanced Features List */}
          <ul className="space-y-3 text-sm sm:text-base mb-8">
            {config.features.map((feature, index) => (
              <li key={feature} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <svg
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 5L4.5 7.5L10 2"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="font-medium">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Enhanced CTA Button */}
          <div className="flex flex-col gap-3 justify-center items-center">
            <LiquidButton 
              className="cursor-pointer w-full text-lg py-4"
              onClick={handleCTAClick}
            >
              Book Your Demo Today
            </LiquidButton>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-medium">Only 3 spots left this month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Calculator - Smaller card */}
        <div className="mx-auto w-full max-w-md rounded-xl border border-border dark:border-white/10 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-md p-6 shadow-lg">
          <SavingsCalculator />
        </div>
      </div>

      {/* Trust Badges - Only 3 with green styling */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-xl px-4 sm:px-0">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
          <Shield className="w-6 h-6 mx-auto text-green-600 dark:text-green-400 mb-2" />
          <p className="text-sm font-semibold text-gray-900 dark:text-white">30-Day</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Guarantee</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
          <Star className="w-6 h-6 mx-auto text-yellow-600 dark:text-yellow-400 mb-2" />
          <p className="text-sm font-semibold text-gray-900 dark:text-white">4.9/5</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Rating</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
          <TrendingUp className="w-6 h-6 mx-auto text-purple-600 dark:text-purple-400 mb-2" />
          <p className="text-sm font-semibold text-gray-900 dark:text-white">72%</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">ROI</p>
        </div>
      </div>
    </section>
  );
};

export default PricingVariantA;

