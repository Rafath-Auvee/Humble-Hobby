"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { productsData } from "../ProductData";
import ProductCard from "@/components/shared/cards/ProductCard";
import { Product } from "@/interface/product";

const EditorsPick = () => {

  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  return (
    <section className="w-full bg-gray-50 py-8 px-4 md:px-10 lg:px-20 mx-auto">
      <div className="">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold">Editor&apos;s Pick</h2>
            <p className="text-sm text-gray-500">
              New products with updated stocks
            </p>
          </div>
          <button className="text-sm text-blue-600 flex items-center">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </header>

        {productsData?.length > 0 ? (
          <div className="flex flex-col min-md:grid grid-cols-6 gap-4">
            {productsData.slice(0, 6).map((product: Product, index) => (
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


export default EditorsPick;
