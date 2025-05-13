// components/banners/HeroSection.tsx

"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import Banner from "./Banner";
import { BannersData } from "../../BannersData";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react"
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSectionProps {
  autoplayInterval?: number; // Time in milliseconds between slides
  progressBarEnabled?: boolean;
  showNavArrows?: boolean;
}

const HeroSection = ({
  autoplayInterval = 6000,
  progressBarEnabled = true,
  showNavArrows = true,
}: HeroSectionProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Reset progress animation when slide changes
  const [key, setKey] = useState(0);

  const startAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (!isPaused && api) {
        api.scrollNext();
      }
    }, autoplayInterval);
  };

  const handleSelect = useCallback(() => {
    if (api) {
      setCurrent(api.selectedScrollSnap());
      setKey(prev => prev + 1);
    }
  }, [api]);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on("select", handleSelect);

    startAutoplay();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      api.off("select", handleSelect);
    };
  }, [api, autoplayInterval, isPaused, handleSelect]);


  const dotIndicators = useMemo(() => {
    return BannersData.map((_, index) => (
      <button
        key={index}
        aria-label={`Go to slide ${index + 1}`}
        title={`Slide ${index + 1}`}
        onClick={() => {
          api?.scrollTo(index);
          setKey(prev => prev + 1); // reset progress bar animation
        }}
        className={cn(
          "relative h-2 w-2 rounded-full transition-all duration-300",
          current === index
            ? "bg-black scale-110"
            : "bg-gray-300 hover:bg-gray-400"
        )}
      >
        {current === index && (
          <motion.span
            className="absolute inset-0 rounded-full bg-black/20"
            initial={{ scale: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </button>
    ));
  }, [api, current]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div
      className="w-full relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        className="w-full"
      >
        <CarouselContent>
          {BannersData.map((props, index) => (
            <CarouselItem key={index} className="overflow-hidden">
              <AnimatePresence mode="wait">
                {current === index && (
                  <motion.div
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full"
                  >
                    <Banner {...props} />
                  </motion.div>
                )}
              </AnimatePresence>
            </CarouselItem>
          ))}
        </CarouselContent>

        {showNavArrows && (
          <>
            <button
              onClick={() => api?.scrollPrev()}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white z-20 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-white/30"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => api?.scrollNext()}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white z-20 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-white/30"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </Carousel>

      {/* Progress Bar */}
      {progressBarEnabled && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black/10 z-30">
          <motion.div
            key={key} // Reset animation when slide changes
            className="h-full bg-white"
            initial={{ width: "0%" }}
            animate={isPaused ? { width: "progress" } : { width: "100%" }}
            transition={isPaused ? { duration: 0 } : {
              duration: autoplayInterval / 1000,
              ease: "linear",
            }}
          />
        </div>
      )}

      {/* Enhanced Dot Indicators */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-3 px-5 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg z-50">
        {dotIndicators}
      </div>
    </div>
  );
};

export default HeroSection;