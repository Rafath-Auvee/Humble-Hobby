"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Eye, Clock, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const products = [
  {
    id: 1,
    name: "Canon EOS R6",
    category: "Photography",
    originalPrice: 999,
    salePrice: 799,
    stock: 23,
    totalStock: 50,
    discount: 20,
  },
  {
    id: 2,
    name: 'Gaming Monitor 27"',
    category: "Electronics",
    originalPrice: 599,
    salePrice: 399,
    stock: 15,
    totalStock: 30,
    discount: 33,
  },
  {
    id: 3,
    name: "Wireless Controller",
    category: "Gaming",
    originalPrice: 299,
    salePrice: 199,
    stock: 8,
    totalStock: 25,
    discount: 33,
  },
  {
    id: 4,
    name: "RGB Gaming Headset",
    category: "Audio",
    originalPrice: 199,
    salePrice: 149,
    stock: 19,
    totalStock: 40,
    discount: 25,
  },
];

export function FlashSales() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59);
      const diff = endOfDay.getTime() - now.getTime();

      setTimeLeft({
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate timer segments for glass effect timer
  const timeSegments = [
    { label: "Hours", value: String(timeLeft.hours).padStart(2, "0") },
    { label: "Minutes", value: String(timeLeft.minutes).padStart(2, "0") },
    { label: "Seconds", value: String(timeLeft.seconds).padStart(2, "0") }
  ];

  return (
    <section className="pt-6 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header with timer */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-red-500" />
                <span className="text-red-500 font-medium uppercase tracking-wider text-sm">Limited Time Offer</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Flash Sales</h2>
            <p className="text-slate-500 max-w-xl">
              Get amazing deals before they're gone! Our flash sales feature the season's best products at unbeatable prices.
            </p>
          </div>

          {/* Glass effect countdown timer */}
          <div className="flex items-center gap-1 p-2 rounded-xl bg-white/30 backdrop-blur-sm border shadow-sm">
            <Clock className="h-5 w-5 mr-2 text-slate-500" />
            {timeSegments.map((segment, index) => (
              <div key={segment.label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="bg-white shadow-sm rounded-lg px-4 py-2 font-mono font-bold text-2xl text-slate-800">
                    {segment.value}
                  </div>
                  <span className="text-xs text-slate-500 mt-1">{segment.label}</span>
                </div>
                {index < timeSegments.length - 1 && (
                  <span className="mx-1 text-xl font-semibold text-slate-400">:</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {products.map((product, index) => (
            <Card
              key={product.id}
              className="rounded-xl overflow-hidden border-none shadow-md transition-all duration-300 hover:shadow-xl"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <CardContent className="p-0">
                {/* Product image */}
                <div className="relative">
                  <div className="aspect-square relative bg-slate-50">
                    <Image
                      src={`/product-Images/${index + 1}.png`}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-contain p-4 transition-transform duration-500 hover:scale-105"
                      priority={index < 2}
                    />
                  </div>

                  {/* Discount badge */}
                  <Badge
                    className="absolute top-3 left-3 bg-red-500/90 backdrop-blur-sm font-medium px-2.5 py-1"
                  >
                    -{product.discount}%
                  </Badge>

                  {/* Quick action buttons */}
                  <div
                    className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${hoveredId === product.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                      }`}
                  >
                    <Button size="icon" variant="secondary" className="rounded-full h-8 w-8 shadow-md bg-white/80 backdrop-blur-sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="secondary" className="rounded-full h-8 w-8 shadow-md bg-white/80 backdrop-blur-sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Product info */}
                <div className="p-5">
                  <div className="text-xs text-slate-500 mb-1">{product.category}</div>
                  <h3 className="font-medium text-lg mb-2 line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-lg font-bold text-red-500">
                      ${product.salePrice}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      ${product.originalPrice}
                    </span>
                  </div>

                  {/* Stock indicator */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Available: {product.stock}</span>
                      <span>Sold: {product.totalStock - product.stock}</span>
                    </div>
                    <Progress
                      value={(product.stock / product.totalStock) * 100}
                      className="h-1.5 bg-slate-100"
                      indicatorclassname={cn(
                        "bg-gradient-to-r",
                        product.stock < 10 ? "from-red-500 to-red-400" : "from-emerald-500 to-emerald-400"
                      )}
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-5 pt-0">
                <Button
                  className={`w-full transition-all duration-300 ${hoveredId === product.id
                      ? 'bg-red-500 hover:bg-red-600 border-red-500'
                      : 'bg-slate-900 hover:bg-slate-800 border-slate-900'
                    }`}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* View all button */}
        <div className="flex justify-center mt-10">
          <Button variant="outline" className="group border-slate-300 hover:border-slate-400">
            View All Deals
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
}