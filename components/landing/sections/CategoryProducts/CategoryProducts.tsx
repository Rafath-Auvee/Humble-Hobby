"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
    Heart,
    ArrowRight,
    Info,
    Tag,
    Package,
    Eye
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { inter } from "@/lib/font";
import Link from "next/link";
import { productsData } from "../ProductData";
import { Product } from "@/interface/product";

const CategoryProducts = () => {
    const ProductList = [
        {
            id: 1,
            badge: "Only This Week",
            title: "Make your grocery shopping easy with us",
            subTitle: "Feed your family the best",
            buttonText: "Shop Now",
            url: "/summer-sale",
            buttonColor: "bg-[#634C9F]",

            backgroundImage: "/pictures/3. Grocery.png",
        },
        {
            id: 2,
            badge: "Only This Week",
            title: "Get your everyday needs here with us",
            subTitle: "A different kind of grocery store",
            buttonText: "Shop Now",
            url: "/summer-sale",
            buttonColor: "bg-[#634C9F]",
            backgroundImage: "/pictures/2 HappyWay.png",
        },
    ];


    const [favorites, setFavorites] = useState<Record<string, boolean>>({});
    const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

    const toggleFavorite = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Live":
                return (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        In Stock
                    </Badge>
                );
            case "OutOfStock":
                return (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        Out of Stock
                    </Badge>
                );
            case "Disabled":
                return (
                    <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
                        Unavailable
                    </Badge>
                );
            default:
                return null;
        }
    };

    return (
        <div className={`w-full py-8 px-4 md:px-10 lg:px-20 mx-auto  bg-gray-50 ${inter?.variable}`}>
            <div className="">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <h2 className="text-2xl font-bold mb-2 md:mb-0">Category Products</h2>
                    <div className="flex flex-col md:flex-row items-start md:items-center">
                        <p className="text-gray-500 mb-2 md:mb-0 md:mr-4">
                            Do not miss the current offers until the end of March.
                        </p>
                        <a href="#" className="flex items-center font-medium">
                            View All <ArrowRight className="ml-1 h-4 w-4" />
                        </a>
                    </div>
                </div>

                {/* Product Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {ProductList.map((product) => (
                        <div key={product.id} className="relative w-full h-80 md:h-64 bg-white overflow-hidden ">
                            {/* Background Image */}
                            <Image
                                src={product.backgroundImage}
                                alt={product.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />

                            {/* Overlay - Uncomment if needed */}
                            {/* <div className="absolute inset-0 bg-black/20" /> */}

                            {/* Text Content */}
                            <div className="relative z-10 p-4 md:p-6 h-full flex flex-col justify-center">
                                <div>
                                    <Badge
                                        className="text-orange-900 bg-orange-200 rounded-sm font-medium mb-2">
                                        {product.badge}
                                    </Badge>
                                </div>
                                <div className="w-2/5">
                                    <h3 className="text-xl md:text-2xl font-bold mb-2 text-slate-900">{product.title}</h3>
                                    <p className="text-sm md:text-base text-slate-900 mb-4">{product.subTitle}</p>
                                </div>
                                <div>
                                    <Button className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-100 transition-colors">
                                        {/* <a href={product.url} className="flex flex-row justify-center items-center"> */}
                                        {product.buttonText}
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                        {/* </a> */}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 ">

                    {productsData.slice(0, 6).map((product: Product) => (
                        <Card
                            key={product.id}
                            className="group relative overflow-hidden rounded-none border-none transition-all duration-30 bg-white"
                            onMouseEnter={() => setHoveredProduct(product.id)}
                            onMouseLeave={() => setHoveredProduct(null)}
                        >
                            {/* Discount Badge */}
                            {product.price < product.mrp && (
                                <Badge className="absolute top-3 left-3 z-10 bg-red-500 hover:bg-red-600 text-white">
                                    {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                                </Badge>
                            )}

                            {/* Featured Tags */}
                            {product.featuredTags && product.featuredTags.length > 0 && (
                                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                                    {product.price < product.mrp && (
                                        <Badge className="bg-red-500 hover:bg-red-600 text-white">
                                            {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                                        </Badge>
                                    )}

                                    {product.featuredTags.map((tag, i) => (
                                        <Badge
                                            key={i}
                                            variant="outline"
                                            className="bg-blue-50 text-blue-700 border-blue-200"
                                        >
                                            {tag.feature.name}
                                        </Badge>
                                    ))}
                                </div>
                            )}

                            {/* Favorite Button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm  p-1 hover:bg-white h-8 w-8"
                                onClick={(e) => toggleFavorite(product.id, e)}
                            >
                                <Heart
                                    className={`w-4 h-4 ${favorites[product.id] ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                                />
                            </Button>

                            {/* Product Image */}
                            <div className="relative aspect-square bg-slate-50 p-4 overflow-hidden">
                                {product.images.length > 0 ? (
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        fill
                                        className="object-contain p-10 transition-transform duration-300 group-hover:scale-105"
                                        sizes="(max-width: 768px) 50vw, 33vw"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full bg-slate-100">
                                        <Package className="w-12 h-12 text-slate-300" />
                                    </div>
                                )}

                                {/* Quick view overlay */}
                                {hoveredProduct === product.id && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-all duration-200">
                                        <Button variant="secondary" size="sm" className="gap-1.5 rounded-full text-xs">
                                            <Eye className="w-3.5 h-3.5" /> Quick view
                                        </Button>
                                    </div>
                                )}
                            </div>

                            <CardContent className="p-4">
                                {/* Brand */}
                                <p className="text-sm text-gray-500 mb-1">{product.brand}</p>

                                {/* Product Name */}
                                <h3 className="font-medium text-sm mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                    {product.name}
                                </h3>

                                {/* Product Description */}
                                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                                    {product.description}
                                </p>

                                {/* Product Details */}
                                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 mb-3">
                                    {product.material && (
                                        <div className="flex items-center">
                                            <Tag className="w-3 h-3 mr-1" />
                                            <span>{product.material}</span>
                                        </div>
                                    )}

                                    {product.warrantyPeriod && (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger className="flex items-center">
                                                    <Info className="w-3 h-3 mr-1" />
                                                    <span className="underline decoration-dotted">{product.warrantyPeriod}</span>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{product.warrantyType || 'Warranty'}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    )}

                                    {product.countryOfOrigin && (
                                        <span className="text-xs text-gray-500">Made in {product.countryOfOrigin}</span>
                                    )}
                                </div>

                                {/* Price */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-blue-600 font-semibold">
                                                {product.price.toFixed(2)} BDT
                                            </span>
                                            {product.price < product.mrp && (
                                                <span className="text-gray-400 line-through text-xs">
                                                    {product.mrp.toFixed(2)} BDT
                                                </span>
                                            )}
                                        </div>

                                        {/* Variants info */}

                                    </div>
                                    {product.variants && product.variants.length > 1 && (
                                        <span className="text-xs text-gray-500 mt-1 block">
                                            {product.variants.length} variants available
                                        </span>
                                    )}
                                    {/* Status Badge */}
                                </div>
                                {getStatusBadge(product.status)}
                            </CardContent>

                            <Separator />
                            <Link href={`/shop/${product.productId || product.id}`} >
                                <CardFooter className="px-4 py-3 flex justify-between">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-xs gap-1 flex-1"
                                    >
                                        <span className="flex flex-row items-center">

                                            <Eye className="h-3.5 w-3.5" /> View Product
                                        </span>
                                    </Button>
                                    {/* <Button
                                    size="sm"
                                    className="text-xs gap-1 flex-1 ml-2"
                                    disabled={product.status === "OutOfStock"}
                                >
                                    <ShoppingCart className="h-3.5 w-3.5" /> Add to Cart
                                </Button> */}
                                </CardFooter>
                            </Link>
                            {/* Categories Footer - if product has categories */}
                            {product.categories && product.categories.length > 0 && (
                                <div className="px-4 py-2 bg-slate-50 text-xs text-gray-500 flex gap-1.5 flex-wrap">
                                    {product.categories.slice(0, 3).map((category, i) => (
                                        <Badge
                                            key={i}
                                            variant="outline"
                                            className="bg-slate-50 hover:bg-slate-100"
                                        >
                                            {category}
                                        </Badge>
                                    ))}
                                    {product.categories.length > 3 && (
                                        <span className="text-xs text-gray-400">+{product.categories.length - 3} more</span>
                                    )}
                                </div>
                            )}
                        </Card>
                    ))}

                </div>

            </div>
        </div>
    );
};

export default CategoryProducts;