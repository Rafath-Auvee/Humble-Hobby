"use client";

import Link from "next/link";
import { categories } from "@/utils/categories";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const BrowseCategory = () => {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Determine number of slides to show based on screen width
  const [slidesToShow, setSlidesToShow] = useState(5);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    // Handle responsive slides count
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 320) setSlidesToShow(2);
      else if (width <= 480) setSlidesToShow(2);
      else if (width <= 768) setSlidesToShow(3);
      else if (width <= 1024) setSlidesToShow(4);
      else setSlidesToShow(5);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [api]);

  return (
    <div className="max-w-7xl mx-auto py-6">
      <div className="flex items-center space-x-4">
        <div className="h-8 w-4 bg-red-600"></div>
        <p className="text-red-600 font-semibold text-base leading-5">
          Categories
        </p>
      </div>
      <div className="flex flex-col items-start md:justify-between md:items-center space-y-6 md:flex-row md:space-y-0 md:space-x-20 md:py-3 mb-6">
        <p className="text-3xl md:text-4xl font-bold leading-10 pt-2">Browse By Category</p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {current} / {count}
          </span>
        </div>
      </div>

      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <CarouselItem
                key={category.slug}
                className={cn(
                  "pl-4",
                  `basis-1/${slidesToShow}`
                )}
              >
                <Button
                  variant="outline"
                  className="w-full h-auto flex flex-col py-6 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  <Icon className="h-8 w-8 mb-2" />
                  <span className="text-xs md:text-sm text-center line-clamp-2">
                    {category.name}
                  </span>
                </Button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-0 shadow-md" />
        <CarouselNext className="right-0 shadow-md" />
      </Carousel>
    </div>
  );
};

export default BrowseCategory;