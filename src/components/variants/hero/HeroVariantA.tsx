'use client'

import React from "react";
import { LiquidButton } from "../../ui/Liquid-button";
import Hyperspeed from "../../ui/hyperspeed-component";
import { hyperspeedPresets } from "@/components/ui/hyperspeed";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useTheme } from "next-themes";
import { heroVariants } from "@/lib/variants";
import { useConversionTracking } from "@/hooks/useVariant";

const HeroVariantA = () => {
  const config = heroVariants.variant_a;
  const prefersReducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);
  const { trackGlobalConversion } = useConversionTracking();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCTAClick = () => {
    trackGlobalConversion('hero_cta_click', 'hero_section', 'variant_a');
    window.location.href = config.cta.primary.href;
  };

  return (
    <section id="hero" className="w-full relative mt-4">
      {isMounted && (
        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] absolute top-0 left-0 overflow-hidden">
          <Hyperspeed 
            theme={theme as "light" | "dark"}
            effectOptions={hyperspeedPresets(theme as "light" | "dark").one}
          />   
        </div>
      )}
      {prefersReducedMotion && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
        />
      )}
      <div className="relative flex flex-col items-center w-full px-6">
        <div className="relative z-10 pt-32 max-w-3xl mx-auto h-full w-full flex flex-col gap-10 items-center justify-center">
          {/* Success Badge */}
          <div className="border border-green-500/20 bg-green-500/10 rounded-full text-sm h-8 px-4 flex items-center gap-2 text-green-700 dark:text-green-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            500+ Companies Transformed
          </div>
          
          <div className="flex flex-col items-center justify-center gap-5">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-medium tracking-tighter text-balance text-center text-primary">
              {config.title}
            </h1>
            <p className="text-base md:text-lg xl:text-2xl text-center text-muted-foreground font-medium text-balance leading-relaxed tracking-tight">
              {config.subtitle}
            </p>
            <p className="text-base md:text-lg xl:text-xl text-center text-muted-foreground font-medium text-balance leading-relaxed tracking-tight">
              {config.description}
            </p>
          </div>
          
          <div className="flex items-center gap-4 flex-wrap justify-center mb-2">
            <LiquidButton 
              className="cursor-pointer min-h-[44px] min-w-[200px] text-base px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white" 
              onClick={handleCTAClick}
            >
              {config.cta.primary.text}
            </LiquidButton>
            <button
              onClick={() => window.location.href = config.cta.secondary.href}
              className="h-[44px] flex items-center justify-center px-6 text-sm font-normal tracking-wide text-primary rounded-full transition-all ease-out active:scale-95 bg-white dark:bg-background border border-[#E5E7EB] dark:border-[#27272A] hover:bg-white/80 dark:hover:bg-background/80"
            >
              {config.cta.secondary.text}
            </button>
          </div>
          
          {/* Social Proof */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-white dark:border-gray-900"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 border-2 border-white dark:border-gray-900"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-white dark:border-gray-900"></div>
              </div>
              <span>300% avg ROI</span>
            </div>
            <div className="h-4 w-px bg-border"></div>
            <span>14 days to deploy</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroVariantA;

