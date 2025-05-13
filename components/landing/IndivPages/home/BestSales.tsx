"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image"; // Using Next.js Image for better optimization
import { ProductImagesLinks } from "@/Data/productImages";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const BestSales = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [api, setApi] = useState();
  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setSlidesToShow(1);
      else if (width < 1024) setSlidesToShow(2);
      else if (width < 1280) setSlidesToShow(3);
      else setSlidesToShow(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="py-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-6 w-1.5 bg-red-500 rounded-full"></div>
          <span className="text-red-500 font-medium uppercase tracking-wider text-sm">Featured Products</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 md:mb-0">Best Selling Products</h2>
          <Button variant="ghost" className="self-start md:self-auto group">
            View All
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Button>
        </div>
        <Separator className="mt-6 mb-8" />
      </div>

      {/* Product Carousel */}
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4">
          {ProductImagesLinks.map((product, index) => (
            <CarouselItem
              key={index}
              className={cn(
                "pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              )}
            >
              <Card
                className="overflow-hidden border-none shadow-md transition-all duration-300 hover:shadow-xl h-full"
                onMouseEnter={() => setHoveredId(index)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    {/* Product Image with Next.js Image for optimization */}
                    <div className="aspect-square relative overflow-hidden bg-gray-50">
                      <Image
                        src={`/product-Images/${index + 1}.png`}
                        alt={product.alt || "Product image"}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-contain transition-transform duration-500 hover:scale-105"
                        priority={index < 2} // Prioritize loading first 2 images
                      />
                    </div>

                    {/* Discount Badge */}
                    <Badge
                      className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 text-white px-2 py-1"
                    >
                      25% OFF
                    </Badge>

                    {/* Quick Action Buttons - Only visible on hover */}
                    <div
                      className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${hoveredId === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                        }`}
                    >
                      <Button size="icon" variant="secondary" className="rounded-full h-9 w-9 shadow-md">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="secondary" className="rounded-full h-9 w-9 shadow-md">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-5">
                    <div className="mb-1 text-sm text-gray-500">Category</div>
                    <h3 className="font-medium text-lg mb-2 line-clamp-1">
                      Premium Product Name
                    </h3>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xl font-bold text-red-500">
                        $150
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        $200
                      </span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-5 pt-0">
                  <Button
                    className={`w-full transition-all duration-300 ${hoveredId === index
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-slate-900 hover:bg-slate-800'
                      }`}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-5 h-10 w-10 rounded-full border-none bg-white/80 shadow-md backdrop-blur-sm hover:bg-white" />
        <CarouselNext className="right-5 h-10 w-10 rounded-full border-none bg-white/80 shadow-md backdrop-blur-sm hover:bg-white" />
      </Carousel>
    </section>
  );
};

export default BestSales;