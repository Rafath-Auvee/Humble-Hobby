"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ProductImagesLinks } from "@/Data/productImages";
import { ChevronRight, Heart, Search, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// Product categories for filter tabs
const categories = [
  "All Products",
  "New Arrivals",
  "Featured",
  "Best Sellers",
  "On Sale"
];

// Product ratings data
const ratings = [4.5, 5, 3.8, 4.2, 4.7, 3.9, 4.8, 5, 4.1, 4.4, 4.9, 3.7];

const ExploreProduct = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [productsToDisplay, setProductsToDisplay] = useState(4);
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        if (width >= 1280) {
          setProductsToDisplay(8);
        } else if (width >= 1024) {
          setProductsToDisplay(8);
        } else if (width >= 768) {
          setProductsToDisplay(6);
        } else {
          setProductsToDisplay(4);
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Generate product data with more details
  useEffect(() => {
    const generated = ProductImagesLinks.slice(0, productsToDisplay).map((image, index) => ({
      id: index,
      name: `Premium Product ${index + 1}`,
      category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
      originalPrice: 200 + (index * 10),
      salePrice: 150 + (index * 10),
      rating: ratings[index % ratings.length],
      reviewCount: Math.floor(Math.random() * 200) + 20,
      isNew: index % 3 === 0,
      image: `/product-Images/${index + 1}.png`,
      alt: image.alt || `Product ${index + 1}`,
    }));

    setProducts(generated);
  }, [productsToDisplay]);

  return (
    <section className="py-16 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-6 w-1 bg-red-500 rounded-full"></div>
            <span className="text-red-500 font-medium uppercase tracking-wider text-sm">
              Our Collection
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                Explore Our Products
              </h2>
              <p className="text-slate-500 max-w-xl">
                Discover our curated collection of premium products designed for style and functionality.
              </p>
            </div>
            <div className="hidden md:flex">
              <Button variant="outline" className="group border-slate-300 hover:border-slate-400">
                Browse Collection
                <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="All Products" className="mb-8" onValueChange={setActiveCategory}>
          <div className="overflow-x-auto pb-2">
            <TabsList className="bg-slate-100/80 p-1">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="px-5 py-2 data-[state=active]:bg-white"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Products Grid */}
          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {products
                  .filter(product => category === "All Products" || product.category === category)
                  .map((product) => (
                    <Card
                      key={product.id}
                      className="rounded-xl overflow-hidden border-none shadow-sm transition-all duration-300 hover:shadow-xl h-full"
                      onMouseEnter={() => setHoveredId(product.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <CardContent className="p-0">
                        {/* Product Image */}
                        <div className="relative">
                          <div className="aspect-square relative bg-slate-50">
                            <Image
                              src={product.image}
                              alt={product.alt}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                              className="object-contain p-4 transition-transform duration-500 hover:scale-105"
                              priority={product.id < 4}
                            />
                          </div>

                          {/* New Badge */}
                          {product.isNew && (
                            <Badge
                              className="absolute top-3 left-3 bg-emerald-500 hover:bg-emerald-600 text-white px-2"
                            >
                              NEW
                            </Badge>
                          )}

                          {/* Quick Actions */}
                          <div
                            className={cn(
                              "absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300",
                              hoveredId === product.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                            )}
                          >
                            <Button size="icon" variant="secondary" className="rounded-full h-8 w-8 shadow-md bg-white/90">
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="secondary" className="rounded-full h-8 w-8 shadow-md bg-white/90">
                              <Search className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-4">
                          <div className="flex items-center gap-1 mb-1.5">
                            <div className="flex text-amber-400">
                              <Star className="h-3.5 w-3.5 fill-current" />
                              <span className="text-xs font-medium text-slate-700 ml-1">
                                {product.rating} <span className="text-slate-400">({product.reviewCount})</span>
                              </span>
                            </div>
                          </div>

                          <h3 className="font-medium text-base mb-1.5 line-clamp-1">
                            {product.name}
                          </h3>

                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-red-500">
                              ${product.salePrice}
                            </span>
                            <span className="text-xs text-slate-400 line-through">
                              ${product.originalPrice}
                            </span>
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter className="p-4 pt-0">
                        <Button
                          className={cn(
                            "w-full transition-all duration-300",
                            hoveredId === product.id
                              ? "bg-red-500 hover:bg-red-600"
                              : "bg-slate-900 hover:bg-slate-800"
                          )}
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* View All Button */}
        <div className="flex justify-center mt-10">
          <Button variant="default" className="px-8 py-6 text-base">
            View All Products <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExploreProduct;