'use client'

import React from "react";
import { LiquidButton } from "../../ui/Liquid-button";
import Hyperspeed from "../../ui/hyperspeed-component";
import { hyperspeedPresets } from "@/components/ui/hyperspeed";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useTheme } from "next-themes";
import { heroVariants } from "@/lib/variants";
import { useConversionTracking } from "@/hooks/useVariant";
import { Brain, Zap, Shield, Headphones } from "lucide-react";

const HeroVariantC = () => {
  const config = heroVariants.variant_c;
  const prefersReducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);
  const { trackGlobalConversion } = useConversionTracking();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCTAClick = () => {
    trackGlobalConversion('hero_cta_click', 'hero_section', 'variant_c');
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
        <div className="relative z-10 pt-32 max-w-4xl mx-auto h-full w-full flex flex-col gap-10 items-center justify-center">
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
          
          {/* Feature Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-3xl">
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white/10 dark:bg-gray-900/50 backdrop-blur-md border border-white/20">
              <Brain className="w-8 h-8 text-blue-500 mb-2" />
              <span className="text-sm font-medium">Custom AI Models</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white/10 dark:bg-gray-900/50 backdrop-blur-md border border-white/20">
              <Zap className="w-8 h-8 text-yellow-500 mb-2" />
              <span className="text-sm font-medium">Seamless Integration</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white/10 dark:bg-gray-900/50 backdrop-blur-md border border-white/20">
              <Shield className="w-8 h-8 text-green-500 mb-2" />
              <span className="text-sm font-medium">Enterprise Security</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white/10 dark:bg-gray-900/50 backdrop-blur-md border border-white/20">
              <Headphones className="w-8 h-8 text-purple-500 mb-2" />
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 flex-wrap justify-center mb-2">
            <LiquidButton 
              className="cursor-pointer min-h-[44px] min-w-[220px] text-base px-8 py-3" 
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
          
          {/* All-in-One Package */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-4 border border-blue-500/30">
            <p className="text-center text-sm font-medium">
              ✅ AI Models + Integration + Training + Support - All Included
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroVariantC;

