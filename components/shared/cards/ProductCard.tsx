"use client";

import React from "react";
import Image from "next/image";
import { Heart, Info, MoveRight, Tag } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    brand: string;
    price: number;
    productId: string;
    mrp: number;
    images: string[];
    status: string;
    material?: string;
    warrantyPeriod?: string;
    countryOfOrigin?: string;
    variants?: {
      productId: string;
      id: string;
      size: string;
      colors: string[];
      inventory: number;
    }[];
    categories?: string[];
    featuredTags?: { feature: { name: string } }[];
  };
  index: number;
  setFavorites: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  favorites: Record<string, boolean>;
}

const ProductCard = ({ product, index, setFavorites, favorites }: ProductCardProps) => {
  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isLarge = index === 0 || index === 2;
  const isMedium = index === 1 || index === 3 || index === 4 || index === 5;
  const discountPercentage = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const hasDiscount = product.price < product.mrp;
  const isOutOfStock = product.status === "OutOfStock";
  const totalInventory = product.variants?.reduce((sum, variant) => sum + variant.inventory, 0) || 0;
  const lowStock = totalInventory > 0 && totalInventory < 5;

  const colors = product.variants?.flatMap(v => v.colors).filter((c, i, arr) => arr.indexOf(c) === i).slice(0, 3) || [];

  const renderViewButton = () => (
    isOutOfStock ? (
      <Button variant="outline" size="sm" disabled className="opacity-60 cursor-not-allowed">
        Notify Me
      </Button>
    ) : (
      <Button asChild variant="outline" size="sm">
        <Link href={`/shop/${product.productId || product.id}`}>
          <span className="flex items-center gap-1">
            View Details <MoveRight className="w-3 h-3" />
          </span>
        </Link>
      </Button>
    )
  );

  return (
    <Card className={`group relative overflow-hidden transition-all duration-300 hover:shadow-md ${isLarge ? "col-span-1 row-span-2 p-2" : isMedium ? "col-span-2 row-span-1 p-2" : ""}`}>
      {/* Top Left Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
        {hasDiscount && (
          <Badge variant="destructive" className="px-2 py-1 text-xs font-medium">
            {discountPercentage}% OFF
          </Badge>
        )}
        {isOutOfStock && (
          <Badge variant="secondary" className="bg-gray-700 text-white">
            Out of Stock
          </Badge>
        )}
        {lowStock && !isOutOfStock && (
          <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
            Low Stock
          </Badge>
        )}
        {product.featuredTags?.map((tag, i) => (
          <Badge key={i} variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
            {tag.feature.name}
          </Badge>
        ))}
      </div>

      {/* Favorite Icon */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => toggleFavorite(product.id)}
        className="absolute top-2 right-2 z-10 bg-white bg-opacity-70 rounded-full p-1 shadow-sm hover:bg-white"
      >
        <Heart className={`w-5 h-5 ${favorites[product.id] ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
      </Button>

      {/* Main Content */}
      <CardContent className={`p-4 ${isMedium ? "md:flex md:gap-4" : ""}`}>
        {/* Image Section */}
        <div className={`${isMedium ? "md:w-1/3" : "w-full"} relative`}>
          <div className={`flex items-center justify-center ${isLarge ? "h-48" : "h-36"} mb-3 overflow-hidden rounded-md bg-gray-50 relative`}>
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
              <Button variant="secondary" size="sm" className="text-xs">Quick View</Button>
            </div>
          </div>

          {/* Color dots (mobile) */}
          {colors.length > 0 && (
            <div className={`flex gap-1 mb-2 ${isMedium ? "md:hidden" : ""}`}>
              {colors.map((color, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full border border-gray-200`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
              {product.variants && product.variants.flatMap(v => v.colors).length > 3 && (
                <span className="text-xs text-gray-500">+{product.variants.flatMap(v => v.colors).length - 3} more</span>
              )}
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className={`${isMedium ? "md:w-2/3" : "w-full"}`}>
          <div className="text-xs text-gray-500 uppercase font-medium mb-1">{product.brand}</div>
          <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">{product.name}</h3>
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.description}</p>

          {/* Color dots (desktop) */}
          {colors.length > 0 && isMedium && (
            <div className="hidden md:flex gap-1 mb-2">
              {colors.map((color, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full border border-gray-200"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
              {product.variants && product.variants.flatMap(v => v.colors).length > 3 && (
                <span className="text-xs text-gray-500">+{product.variants.flatMap(v => v.colors).length - 3} more</span>
              )}
            </div>
          )}

          {/* Product meta */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 mb-3">
            {product.material && (
              <div className="flex items-center">
                <Tag className="w-3 h-3 mr-1" />
                <span>{product.material}</span>
              </div>
            )}
            {product.warrantyPeriod && (
              <div className="flex items-center">
                <Info className="w-3 h-3 mr-1" />
                <span>{product.warrantyPeriod} Warranty</span>
              </div>
            )}
            {product.countryOfOrigin && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="underline decoration-dotted">{product.countryOfOrigin}</TooltipTrigger>
                  <TooltipContent><p>Country of Origin</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          {/* Price & View button */}
          <div className="flex items-end justify-between mt-auto">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600 font-bold text-base">৳{product.price.toLocaleString()}</span>
                {hasDiscount && (
                  <span className="text-gray-400 line-through text-xs">৳{product.mrp.toLocaleString()}</span>
                )}
              </div>
              {product.variants && product.variants.length > 1 && (
                <span className="text-xs text-gray-500">{product.variants.length} variants available</span>
              )}
              {isLarge && <div className="mt-5 w-full">{renderViewButton()}</div>}
            </div>
            {isMedium && renderViewButton()}
          </div>
        </div>
      </CardContent>

      {/* Footer with categories */}
      {product.categories && product.categories.length > 0 && (
        <CardFooter className="pt-2 pb-3 px-4 bg-gray-50 text-xs text-gray-500 border-t flex gap-2 flex-wrap">
          {product.categories.map((category, i) => (
            <Badge key={i} variant="outline" className="bg-transparent hover:bg-gray-100">{category}</Badge>
          ))}
        </CardFooter>
      )}
    </Card>
  );
};

export default ProductCard;
