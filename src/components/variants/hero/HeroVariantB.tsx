'use client'

import React from "react";
import { LiquidButton } from "../../ui/Liquid-button";
import Hyperspeed from "../../ui/hyperspeed-component";
import { hyperspeedPresets } from "@/components/ui/hyperspeed";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useTheme } from "next-themes";
import { heroVariants } from "@/lib/variants";
import { useConversionTracking } from "@/hooks/useVariant";
import { Star } from "lucide-react";

const HeroVariantB = () => {
  const config = heroVariants.variant_b;
  const prefersReducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);
  const { trackGlobalConversion } = useConversionTracking();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCTAClick = () => {
    trackGlobalConversion('hero_cta_click', 'hero_section', 'variant_b');
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
          {/* Testimonial Quote */}
          <div className="bg-white/10 dark:bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-white/20 max-w-2xl">
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-white dark:text-gray-200 font-medium italic text-center">
              "We achieved 300% ROI in just 90 days. FlipTech Pro's AI solution transformed our entire operation."
            </p>
            <div className="mt-4 text-center">
              <p className="text-white dark:text-gray-300 font-semibold">Sarah Johnson</p>
              <p className="text-gray-300 dark:text-gray-400 text-sm">CEO, TechCorp</p>
            </div>
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
              className="cursor-pointer min-h-[44px] min-w-[180px] text-base px-6 py-3" 
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
          
          {/* Results Grid */}
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">300%</div>
              <div className="text-sm text-muted-foreground">Average ROI</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">14</div>
              <div className="text-sm text-muted-foreground">Days to Deploy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Companies</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroVariantB;

