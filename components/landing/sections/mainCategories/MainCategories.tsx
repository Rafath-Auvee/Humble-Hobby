"use client";

import React from "react";
import Image from "next/image";

const categories = [
    { name: "Fruits & Vegetables", image: "/categories/fruits.png" },
    { name: "Baby & Pregnancy", image: "/categories/baby.png" },
    { name: "Beverages", image: "/categories/beverages.png" },
    { name: "Meats & Seafood", image: "/categories/meats.png" },
    { name: "Biscuits & Snacks", image: "/categories/snacks.png" },
    { name: "Breads & Bakery", image: "/categories/bakery.png" },
    { name: "Breakfast & Dairy", image: "/categories/dairy.png" },
    { name: "Frozen Foods", image: "/categories/frozen.png" },
    { name: "Grocery & Staples", image: "/categories/grocery.png" },
];

const MainCategories = () => {
    return (
        <div className="px-4 md:px-10 lg:px-20 py-4 my-4  bg-white">
            <div className="flex gap-6 overflow-x-auto md:overflow-visible justify-between">
                {categories.map((cat, idx) => (
                    <div
                        key={idx}
                        className="flex flex-col items-center min-w-[90px] md:min-w-[100px]"
                    >
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-100 relative overflow-hidden shadow-sm">
                            <Image
                                src={cat.image}
                                alt={cat.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <p className="text-xs md:text-sm text-center mt-2 font-medium">
                            {cat.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainCategories;
