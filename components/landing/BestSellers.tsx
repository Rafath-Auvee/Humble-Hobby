"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { productsData } from "./sections/ProductData";
import ProductCard from "../shared/cards/ProductCard";




export default function BestSellers() {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  return (
    <section className="py-8 px-4 md:px-10 lg:px-20 mx-auto bg-gray-50">
      <div className="">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold uppercase">Best Sellers</h2>
            <p className="text-sm text-gray-500">
              Only shop this open early at a special discount just for this
              week.
            </p>
          </div>
          <Link
            href="/products/best-sellers"
            className="text-sm flex items-center hover:text-purple-700"
          >
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        {productsData?.length > 0 ? (
          <div className="flex flex-col min-md:grid grid-cols-6 gap-4">
            {productsData.slice(0, 6).map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                setFavorites={setFavorites}
                favorites={favorites}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No best sellers available right now.</p>
        )}
      </div>
    </section>
  );
}
