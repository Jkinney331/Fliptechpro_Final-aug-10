"use client";

import Image from "next/image";
import { siteConfig } from "@/lib/config";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { LiquidButton } from "../../ui/Liquid-button";
import { ctaVariants } from "@/lib/variants";
import { useConversionTracking } from "@/hooks/useVariant";
import { Clock, AlertCircle } from "lucide-react";

const CTAVariantA = () => {
  const { ctaSection } = siteConfig;
  const config = ctaVariants.variant_a;
  const { trackGlobalConversion } = useConversionTracking();

  const handleCTAClick = () => {
    trackGlobalConversion('cta_click', 'cta_section', 'variant_a');
    window.location.href = config.button.href;
  };

  return (
    <section
      id="cta"
      className="flex flex-col items-center justify-center w-full"
    >
      <div className="w-full">
        <div className="h-[450px] md:h-[500px] overflow-hidden shadow-xl w-full border border-border rounded-xl bg-secondary relative z-20">
          <Image
            src={ctaSection.backgroundImage}
            alt="FlipTech Pro call-to-action background featuring AI technology and automation themes"
            className="absolute inset-0 w-full h-full object-cover object-right md:object-center"
            fill
            loading="lazy"
          />
          
          {/* Urgency Banner */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
            <div className="bg-red-600 text-white px-6 py-2 rounded-full flex items-center gap-2 animate-pulse">
              <AlertCircle className="w-4 h-4" />
              <span className="font-bold text-sm">{config.urgencyBadge}</span>
            </div>
          </div>

          {/* Main CTA Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-start pt-16 sm:pt-20 md:pt-24">
            <h1 className="text-white text-2xl sm:text-3xl md:text-5xl font-medium tracking-tighter max-w-xs sm:max-w-sm md:max-w-2xl text-center px-4">
              {config.title}
            </h1>
            
            <p className="text-white/90 text-sm sm:text-base md:text-lg mt-4 text-center max-w-lg px-4">
              {config.subtitle}
            </p>
            
            <div className="mt-6 flex flex-col items-center justify-center gap-3">
              <LiquidButton 
                onClick={handleCTAClick}
                className="text-blue-600 font-semibold text-lg h-14 w-fit px-10 py-4 bg-white/95 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200 flex items-center justify-center"
              >
                {config.button.text}
              </LiquidButton>
              
              {/* Urgency Elements */}
              <div className="flex items-center gap-4 text-white text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-red-400" />
                  <span className="font-medium">{config.subtext}</span>
                </div>
              </div>
              
              {/* Countdown Timer Placeholder */}
              <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
                <div className="flex items-center gap-2 text-sm">
                  <span>Spots filling fast:</span>
                  <div className="flex gap-1">
                    <div className="bg-red-600 px-2 py-1 rounded text-xs font-bold">2</div>
                    <div className="bg-red-600 px-2 py-1 rounded text-xs font-bold">3</div>
                    <div className="bg-red-600 px-2 py-1 rounded text-xs font-bold">:</div>
                    <div className="bg-red-600 px-2 py-1 rounded text-xs font-bold">4</div>
                    <div className="bg-red-600 px-2 py-1 rounded text-xs font-bold">5</div>
                  </div>
                  <span>hours left</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Content */}
          <div className="w-full absolute bottom-0 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 text-center bg-gradient-to-t from-black/80 via-black/50 to-transparent">
            <Link href="/" className="flex items-center gap-2 justify-center">
              <p className="text-lg sm:text-xl font-semibold text-white">{ctaSection.companyName}</p>
            </Link>

            <p className="tracking-tight text-white font-medium mt-2 sm:mt-4 max-w-sm sm:max-w-md md:max-w-xl text-sm sm:text-base px-2">
              Deploy specialized AI teams across marketing, operations, product, research, and support.
              Each team works seamlessly together, handling complex tasks so your human teams can focus on strategic initiatives.
            </p>

            <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6 dark:hidden">
              <Icons.soc2 className="size-8 sm:size-10 md:size-12" />
              <Icons.hipaa className="size-8 sm:size-10 md:size-12" />
              <Icons.gdpr className="size-8 sm:size-10 md:size-12" />
            </div>

            <div className="dark:flex items-center justify-center gap-2 hidden mt-4 sm:mt-6">
              <Icons.soc2Dark className="size-8 sm:size-10 md:size-12" />
              <Icons.hipaaDark className="size-8 sm:size-10 md:size-12" />
              <Icons.gdprDark className="size-8 sm:size-10 md:size-12" />
            </div>
            
            <p className="text-xs sm:text-sm font-medium text-white mt-2">© 2025 FlipTech Pro. All rights reserved.</p>
            <Link
              href="/privacy"
              className="text-xs sm:text-sm font-medium text-white mt-2 sm:mt-4 md:mt-6 hover:underline"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTAVariantA;

