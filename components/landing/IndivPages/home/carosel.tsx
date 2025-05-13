"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Flower2,
  Gift,
  GiftIcon,
  Laptop,
  Sparkles,
  Sun,
  SunIcon,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel"

const CaroselImages = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    // Set up autoplay
    const autoplayInterval = setInterval(() => {
      api.scrollNext();
    }, 5000); // Change slide every 5 seconds

    return () => {
      clearInterval(autoplayInterval);
    };
  }, [api]);

  const banners = [
    { component: <BlackFridayBanner /> },
    { component: <SummerSaleBanner /> },
    { component: <SpringClearanceBanner /> },
    { component: <HolidaySpecialBanner /> },
    { component: <CyberMondayBanner /> },
  ];

  return (
    <div className="w-full">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={index}>
              {banner.component}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 shadow-md" />
        <CarouselNext className="right-4 shadow-md" />
      </Carousel>
      
      {/* Optional: Add dots indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === current - 1 ? "bg-black" : "bg-gray-300"
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CaroselImages;

function SummerSaleBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-red-600 via-red-500 to-yellow-600">
      <div className="absolute inset-0 mix-blend-overlay opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/30 to-transparent" />
      </div>
      <div className="absolute top-0 right-0 w-full h-full">
        <div className="relative w-full h-full">
          <div className="absolute right-0 top-0 transform -rotate-45 bg-white/10 w-96 h-96" />
          <div className="absolute right-32 top-0 transform -rotate-45 bg-white/10 w-96 h-96" />
        </div>
      </div>
      <div className="container relative z-10 px-4 py-16 sm:py-24 lg:py-32">
        <div className="flex items-center gap-4 mb-6">
          <Sun className="h-12 w-12 text-white animate-bounce" />
          <Sparkles className="h-8 w-8 text-yellow-300 animate-pulse" />
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter flex items-center">
          SUMMER SPLASH <SunIcon className="ml-4 h-12 w-12 md:h-16 md:w-16" />
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-xl">
          Dive into savings! Up to 60% off on summer essentials
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="bg-white text-blue-500 hover:bg-white/90"
        >
          Shop Now
        </Button>
      </div>
    </section>
  );
}

function SpringClearanceBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <div className="absolute inset-0 mix-blend-overlay opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/30 to-transparent" />
      </div>
      <div className="absolute top-0 right-0 w-full h-full">
        <div className="relative w-full h-full">
          <div className="absolute transform rotate-45 bg-pink-300/20 w-full h-full" />
          <div className="absolute transform -rotate-45 bg-pink-300/20 w-full h-full translate-y-8" />
        </div>
      </div>
      <div className="container relative z-10 px-4 py-16 sm:py-24 lg:py-32">
        <div className="flex items-center gap-4 mb-6">
          <Gift className="h-12 w-12 text-white animate-bounce" />
          <Sparkles className="h-8 w-8 text-yellow-300 animate-pulse" />
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter flex items-center">
          SPRING BLOOM <Flower2 className="ml-4 h-12 w-12 md:h-16 md:w-16" />
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-xl">
          Refresh your style! Up to 40% off on new season arrivals
        </p>

        <div className="flex flex-wrap gap-4">
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-red-600 hover:bg-white/90 transform transition-transform hover:scale-105"
          >
            Shop Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white bg-white/10 transform transition-transform hover:scale-105"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}

function HolidaySpecialBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-green-400 to-lime-300 text-white">
      <div className="absolute inset-0 mix-blend-overlay opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/30 to-transparent" />
      </div>
      <div className="absolute top-0 right-0 w-full h-full">
        <div className="relative w-full h-full">
          <div className="absolute right-0 top-0 transform -rotate-45 bg-white/10 w-96 h-96" />
          <div className="absolute right-32 top-0 transform -rotate-45 bg-white/10 w-96 h-96" />
        </div>
      </div>
      <div className="container relative z-10 px-4 py-16 sm:py-24 lg:py-32">
        <div className="flex items-center gap-4 mb-6">
          <Gift className="h-12 w-12 text-white animate-bounce" />
          <Sparkles className="h-8 w-8 text-yellow-300 animate-pulse" />
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter flex items-center">
          HOLIDAY CHEER <GiftIcon className="ml-4 h-12 w-12 md:h-16 md:w-16" />
        </h1>
        <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-xl font-medium">
          Unwrap joy with our festive deals! Up to 50% off on holiday favorites
        </p>
        <div className="flex flex-wrap gap-4">
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-red-600 hover:bg-white/90 transform transition-transform hover:scale-105"
          >
            Shop Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white bg-white/10 transform transition-transform hover:scale-105"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}

function CyberMondayBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-400 to-cyan-300 text-white">
      <div className="absolute inset-0 mix-blend-overlay opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/30 to-transparent" />
      </div>
      <div className="absolute top-0 right-0 w-full h-full">
        <div className="relative w-full h-full">
          <div className="absolute transform rotate-45 bg-white/10 w-full h-full" />
          <div className="absolute transform rotate-90 bg-white/10 w-full h-full translate-x-8" />
        </div>
      </div>
      <div className="container relative z-10 px-4 py-16 sm:py-24 lg:py-32">
        <div className="flex items-center gap-4 mb-6">
          <Gift className="h-12 w-12 text-white animate-bounce" />
          <Sparkles className="h-8 w-8 text-yellow-300 animate-pulse" />
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter flex items-center">
          CYBER MONDAY <Laptop className="ml-4 h-12 w-12 md:h-16 md:w-16" />
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-xl">
          24-hour tech bonanza! Save up to 70% on electronics
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="bg-white text-purple-600 hover:bg-white/90"
        >
          Shop Deals
        </Button>
      </div>
    </section>
  );
}

function BlackFridayBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-black via-slate-500 to-slate-500 text-white">
      <div className="absolute inset-0 mix-blend-overlay opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/30 to-transparent" />
      </div>
      <div className="absolute top-0 right-0 w-full h-full">
        <div className="relative w-full h-full">
          <div className="absolute transform rotate-45 bg-white/10 w-full h-full" />
          <div className="absolute transform -rotate-45 bg-white/10 w-full h-full translate-y-8" />
        </div>
      </div>
      <div className="container relative z-10 px-4 py-16 sm:py-24 lg:py-32">
        <div className="flex items-center gap-4 mb-6">
          <Gift className="h-12 w-12 text-white animate-bounce" />
          <Sparkles className="h-8 w-8 text-yellow-300 animate-pulse" />
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter">
          BLACK FRIDAY
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-xl">
          Super sale limited offer - Get up to 50% off on selected items
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="bg-white text-[#FF4500] hover:bg-white/90"
        >
          Shop Now
        </Button>
      </div>
    </section>
  );
}