"use client";
import React, { useEffect, useState, useRef } from "react";
import { useDebounce } from "use-debounce";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { colorBackgroundMap, colorsColumn1 } from "./ColorPallete";
import { categories } from "@/utils/categories/categories";
import { Sizes } from "@/utils/sizes/sizes";
import Link from "next/link";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, useSearchParams } from "next/navigation";
import { getProductsByPOST } from "@/actions/order/getFilteringProduct";
import { useStore } from "@/store/store";
import { useSession } from "@/providers/SessionProvider";
import { setCookie } from "cookies-next";
import { IFilteringProduct } from "@/types/filteringTypes";
import { userLoginUrl } from "@/lib/redirectingRoutes";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";

interface FilterAccordionProps {
  sort: string;
  setSort: (value: string) => void;
  minValue: number;
  maxValue: number;
  handleSliderChange: (values: [number, number]) => void;
  Sizes: Record<string, string>;
  selectedSizes: string[];
  handleSizesSelect: (size: string) => void;
  colorsColumn1: string[];
  showMoreColors: boolean;
  setShowMoreColors: (value: boolean) => void;
  colorBackgroundMap: Record<string, string>;
  selectedColors: string[];
  handleColorSelect: (color: string) => void;
  categories: { slug: string; name: string }[];
  showMoreCategories: boolean;
  setShowMoreCategories: (value: boolean) => void;
  selectedCategories: string[];
  handleCategorySelect: (category: string) => void;
}

const FilterAccordion: React.FC<FilterAccordionProps> = ({
  sort,
  setSort,
  minValue,
  maxValue,
  handleSliderChange,
  Sizes,
  selectedSizes,
  handleSizesSelect,
  colorsColumn1,
  showMoreColors,
  setShowMoreColors,
  colorBackgroundMap,
  selectedColors,
  handleColorSelect,
  categories,
  showMoreCategories,
  setShowMoreCategories,
  selectedCategories,
  handleCategorySelect,
}) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {/* Sort By Section */}
      <AccordionItem value="item-5">
        <AccordionTrigger>Sort By</AccordionTrigger>
        <AccordionContent>
          <RadioGroup value={sort} onValueChange={setSort}>
            {[
              { value: "relevance", label: "Relevance" },
              { value: "priceHighToLow", label: "Price (High to Low)" },
              { value: "priceLowToHigh", label: "Price (Low to High)" },
            ].map((option) => (
              <Label key={option.value} className="flex items-center gap-2">
                <RadioGroupItem value={option.value} />
                {option.label}
              </Label>
            ))}
          </RadioGroup>
        </AccordionContent>
      </AccordionItem>

      {/* Price Section */}
      <AccordionItem value="item-1">
        <AccordionTrigger>Price</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col w-full gap-4">
            <DualRangeSlider
              label={(value) => `৳${value}`}
              value={[minValue, maxValue]}
              onValueChange={handleSliderChange}
              min={0}
              max={10000}
              step={1}
              className="w-full"
            />
            <input
              type="text"
              className="input input-bordered input-md disabled:text-black cursor-none disabled:bg-white"
              disabled
              value={`৳${minValue} - ৳${maxValue}`}
            />
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Sizes Section */}
      <AccordionItem value="item-2">
        <AccordionTrigger>Sizes</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            {Object.keys(Sizes).map((size) => (
              <Label key={size} className="flex items-center gap-2">
                <Checkbox
                  checked={selectedSizes.includes(Sizes[size])}
                  onCheckedChange={() => handleSizesSelect(Sizes[size])}
                />
                {Sizes[size]}
              </Label>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Colors Section */}
      <AccordionItem value="item-3">
        <AccordionTrigger>Colors</AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-2">
            {colorsColumn1
              .slice(0, showMoreColors ? colorsColumn1.length : 5)
              .map((color) => (
                <Label
                  key={color}
                  className={`cursor-pointer flex justify-center items-center rounded-md border-2 py-2 text-sm ${selectedColors.includes(color)
                      ? "bg-black text-white"
                      : "bg-white text-black"
                    }`}
                  style={{
                    borderColor: "#000000",
                    backgroundColor: selectedColors.includes(color)
                      ? colorBackgroundMap[color]
                      : "#FFFFFF",
                  }}
                >
                  <Checkbox
                    checked={selectedColors.includes(color)}
                    onCheckedChange={() => handleColorSelect(color)}
                    className="sr-only"
                  />
                  {color}
                </Label>
              ))}
            {colorsColumn1.length > 5 && (
              <Button
                variant="ghost"
                className="mt-2 text-blue-500 underline"
                onClick={() => setShowMoreColors(!showMoreColors)}
              >
                {showMoreColors ? "See Less" : "See More"}
              </Button>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Categories Section */}
      <AccordionItem value="item-4">
        <AccordionTrigger>Categories</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            {categories
              .slice(0, showMoreCategories ? categories.length : 5)
              .map((category) => (
                <Label key={category.slug} className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedCategories.includes(category.name)}
                    onCheckedChange={() => handleCategorySelect(category.name)}
                  />
                  {category.name}
                </Label>
              ))}
            {categories.length > 5 && (
              <Button
                variant="ghost"
                className="mt-2 text-blue-500 underline"
                onClick={() => setShowMoreCategories(!showMoreCategories)}
              >
                {showMoreCategories ? "See Less" : "See More"}
              </Button>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

//
// MAIN COMPONENT
//
const Products_Page = () => {
  const [products, setProducts] = useState<IFilteringProduct[]>([]);
  const [totalPages, setTotalPages] = useState(10); // Simulate total pages

  // Pagination
  const [page, setPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(9);

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<IQuickViewProduct | null>(null);

  // Filters
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [minValue, setMinValue] = useState(20);
  const [maxValue, setMaxValue] = useState(5000);
  const [sort, setSort] = useState("relevance");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  // Show more states
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [showMoreColors, setShowMoreColors] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const initialLoadComplete = useRef(false);
  const isFirstFetch = useRef(true);

  const [debouncedSelectedColors] = useDebounce(selectedColors, 900);
  const [debouncedMinValue] = useDebounce(minValue, 900);
  const [debouncedMaxValue] = useDebounce(maxValue, 900);
  const [debouncedSort] = useDebounce(sort, 900);
  const [debouncedSelectedCategories] = useDebounce(selectedCategories, 900);
  const [debouncedSelectedSizes] = useDebounce(selectedSizes, 900);
  const [debouncedPage] = useDebounce(page, 900);

  const addProduct = useStore((state) => state.addProduct);
  const cartProducts = useStore((state) => state.products);

  const { user } = useSession();
  const routeTo = useRouter();

  const addProductClick = (product: IFilteringProduct, quantity: number) => {
    const firstColor = product.color?.[0] || "Default Color";
    const firstSize = product.sizes?.[0] || "Default Size";
    addProduct(product, quantity, firstColor, firstSize);
  };

  //
  // HANDLE FILTER CHANGES
  //
  interface SliderValues {
    0: number;
    1: number;
  }

  const handleSliderChange = (values: SliderValues) => {
    setMinValue(values[0]);
    setMaxValue(values[1]);
  };

  const handleSizesSelect = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  interface HandleColorSelect {
    (color: string): void;
  }

  const handleColorSelect: HandleColorSelect = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  interface HandleCategorySelect {
    (category: string): void;
  }

  const handleCategorySelect: HandleCategorySelect = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  //
  // HANDLE QUICK VIEW
  //
  interface IProduct {
    _id: string;
    title: string;
    price: number;
    images?: string[];
    color?: string[];
    sizes?: string[];
  }

  interface IQuickViewProduct {
    image: string;
    name: string;
    price: number;
  }

  const handleQuickView = (product: IProduct) => {
    const quickViewProduct: IQuickViewProduct = {
      image: product.images?.[0] || "",
      name: product.title,
      price: product.price,
    };
    setSelectedProduct(quickViewProduct);
    setIsModalOpen(true);
  };

  //
  // HANDLE PAGE CHANGES
  //

  interface HandlePageChange {
    (newPage: number): void;
  }

  const handlePageChange: HandlePageChange = (newPage) => {
    setIsLoading(true);
    setPage(newPage);
    setIsLoading(false);
  };
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await getProductsByPOST({
        page: debouncedPage,
        limit: productsPerPage,
        colors: debouncedSelectedColors,
        minPrice: debouncedMinValue,
        maxPrice: debouncedMaxValue,
        sort: debouncedSort,
        sizes: debouncedSelectedSizes,
        categories: debouncedSelectedCategories.map((category) =>
          encodeURIComponent(category)
        ),
      });
      console.log(response.products);

      setProducts(response.products);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    if (initialLoadComplete.current) return;

    const urlSort = searchParams.get("sort");
    if (urlSort) setSort(urlSort);

    const urlMin = searchParams.get("minPrice");
    if (urlMin && !isNaN(Number(urlMin))) setMinValue(Number(urlMin));

    const urlMax = searchParams.get("maxPrice");
    if (urlMax && !isNaN(Number(urlMax))) setMaxValue(Number(urlMax));

    const urlColors = searchParams.get("colors");
    if (urlColors) setSelectedColors(urlColors.split(","));

    const urlCategories = searchParams.get("categories");
    if (urlCategories) setSelectedCategories(urlCategories.split(","));

    const urlSizes = searchParams.get("sizes");
    if (urlSizes) setSelectedSizes(urlSizes.split(","));

    const urlPage = searchParams.get("page");
    if (urlPage && !isNaN(Number(urlPage))) {
      setPage(Number(urlPage));
    }

    initialLoadComplete.current = true;
  }, [searchParams]);

  //
  // Update URL When Filters or Page Change
  //
  useEffect(() => {
    if (!initialLoadComplete.current) return;

    const params = new URLSearchParams();

    if (sort !== "relevance") params.set("sort", sort);
    if (selectedColors.length) params.set("colors", selectedColors.join(","));
    if (selectedCategories.length)
      params.set("categories", selectedCategories.join(","));
    if (selectedSizes.length) params.set("sizes", selectedSizes.join(","));
    if (minValue !== 20) params.set("minPrice", String(minValue));
    if (maxValue !== 5000) params.set("maxPrice", String(maxValue));
    if (page !== 1) params.set("page", String(page));

    const newUrl = "/products?" + params.toString();
    router.replace(newUrl);

    // Ensure this doesn't trigger an API fetch
  }, [
    sort,
    selectedColors,
    selectedCategories,
    selectedSizes,
    minValue,
    maxValue,
    page,
  ]);

  //
  // Fetch Products on Debounced Changes
  //
  useEffect(() => {
    if (isFirstFetch.current) {
      // Explicitly fetch products on the first load
      fetchProducts();
      // Prevent API from running multiple times on initial load
      isFirstFetch.current = false;
      return;
    }

    fetchProducts();
  }, [
    debouncedPage,
    debouncedSelectedColors,
    debouncedMinValue,
    debouncedMaxValue,
    debouncedSort,
    debouncedSelectedCategories,
    debouncedSelectedSizes,
  ]);

  //
  // Adjust Products Per Page Based on Screen Size
  //
  useEffect(() => {
    const updateProductsPerPage = () => {
      const width = window.innerWidth;
      setProductsPerPage(width >= 1024 ? 9 : 10);
    };

    updateProductsPerPage();
    window.addEventListener("resize", updateProductsPerPage);
    return () => window.removeEventListener("resize", updateProductsPerPage);
  }, []);

  return (
    <>
      {/* Mobile Top Filters */}
      <div className="flex md:hidden flex-row justify-center items-center border-t border-b border-gray-300 px-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <span className="text-lg font-bold uppercase">Recommended</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <RadioGroup value={sort} onValueChange={setSort}>
                  <div className="flex flex-col gap-2">
                    <Label className="flex items-center gap-2 text-lg">
                      <RadioGroupItem value="relevance" />
                      Relevance
                    </Label>
                    <Label className="flex items-center gap-2 text-lg">
                      <RadioGroupItem value="priceHighToLow" />
                      Price (High to Low)
                    </Label>
                    <Label className="flex items-center gap-2 text-lg">
                      <RadioGroupItem value="priceLowToHigh" />
                      Price (Low to High)
                    </Label>
                  </div>
                </RadioGroup>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Middle Divider */}
        <div className="h-14 border-l mx-10 border-gray-400"></div>

        <Sheet>
          <SheetTrigger asChild>
            <Button className="text-lg font-bold" variant="ghost">
              <span>Filter By</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <FilterAccordion
              sort={sort}
              setSort={setSort}
              minValue={minValue}
              maxValue={maxValue}
              handleSliderChange={handleSliderChange}
              Sizes={Sizes}
              selectedSizes={selectedSizes}
              handleSizesSelect={handleSizesSelect}
              colorsColumn1={colorsColumn1}
              showMoreColors={showMoreColors}
              setShowMoreColors={setShowMoreColors}
              colorBackgroundMap={colorBackgroundMap}
              selectedColors={selectedColors}
              handleColorSelect={handleColorSelect}
              categories={categories}
              showMoreCategories={showMoreCategories}
              setShowMoreCategories={setShowMoreCategories}
              selectedCategories={selectedCategories}
              handleCategorySelect={handleCategorySelect}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sort & Toggler */}
      <div className="hidden md:grid grid-cols-2 grid-rows-1 gap-4 justify-between items-center md:mr-6 md:px-24 lg:px-48 pt-6">
        <div>
          We have found {isInitialLoading ? 0 : products.length} products
        </div>
        <div className="text-right flex flex-row justify-end">
          <ToggleGroup type="single">
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              Best Sellers
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              New Arrival
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
              Popularity
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-0 md:grid-cols-4 grid-rows-1 gap-0 md:gap-8 px-0 md:px-24 lg:px-48 py-6">
        {/* Sidebar Filters */}
        <div className="hidden md:block">
          <FilterAccordion
            sort={sort}
            setSort={setSort}
            minValue={minValue}
            maxValue={maxValue}
            handleSliderChange={handleSliderChange}
            Sizes={Sizes}
            selectedSizes={selectedSizes}
            handleSizesSelect={handleSizesSelect}
            colorsColumn1={colorsColumn1}
            showMoreColors={showMoreColors}
            setShowMoreColors={setShowMoreColors}
            colorBackgroundMap={colorBackgroundMap}
            selectedColors={selectedColors}
            handleColorSelect={handleColorSelect}
            categories={categories}
            showMoreCategories={showMoreCategories}
            setShowMoreCategories={setShowMoreCategories}
            selectedCategories={selectedCategories}
            handleCategorySelect={handleCategorySelect}
          />
          <div className="mt-4">
            <p className="font-semibold">Current Selections:</p>
            <p>
              <span className="font-bold text-blue-800 underline">
                Sort By:
              </span>{" "}
              {sort}
            </p>
            <p>
              <span className="font-bold text-blue-800 underline">
                Price Range:
              </span>{" "}
              ৳{minValue} - ৳{maxValue}
            </p>
            <p>
              <span className="font-bold text-blue-800 underline">Sizes:</span>{" "}
              {selectedSizes.join(", ")}
            </p>
            <p>
              <span className="font-bold text-blue-800 underline">Colors:</span>{" "}
              {selectedColors.join(", ")}
            </p>
            <p>
              <span className="font-bold text-blue-800 underline">
                Categories:
              </span>{" "}
              {selectedCategories.join(", ")}
            </p>
            <p>
              <span className="font-bold text-blue-800 underline">Page:</span>{" "}
              {page}
            </p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="col-span-0 md:col-span-3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4">
          {isInitialLoading || isLoading
            ? Array.from({ length: productsPerPage }).map((_, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-md p-4 flex flex-col justify-center"
              >
                <Skeleton className="w-full h-32 sm:h-40 md:h-44 rounded-md" />
                <Skeleton className="mt-4 h-5 sm:h-6 w-3/4 mx-auto" />
                <Skeleton className="mt-2 h-5 sm:h-6 w-1/2 mx-auto" />
                <Skeleton className="mt-4 h-8 sm:h-10 w-1/3 mx-auto" />
              </div>
            ))
            : products.map((product, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-md p-4 flex flex-col justify-center"
              >
                <Link key={product._id} href={`/products/${product._id}`}>
                  <div className="flex flex-col justify-center">
                    {product.images?.[0] && (
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        width={250}
                        height={150}
                        className="rounded-md "
                      />
                    )}
                    <Label className="mt-2 text-sm sm:text-base md:text-sm text-black text-center">
                      {product.title}
                    </Label>
                    <Label className="mt-2 text-sm sm:text-base md:text-sm text-gray-600 text-center">
                      {product.price} BDT
                    </Label>
                    {/* <Button
                  variant="ghost"
                  className="mt-2 text-sm sm:text-base md:text-sm"
                  onClick={() => handleQuickView(product)}
                >
                  Quick View
                </Button> */}
                  </div>
                </Link>

                <Link href={`/products/${product._id}`} className="w-full">
                  <Button className="mt-2 text-sm sm:text-base md:text-sm w-full">
                    Add to Cart
                  </Button>
                </Link>
              </div>
            ))}

          {/* Pagination */}
          <div className="col-span-full mt-6 flex justify-center">
            <Pagination>
              <PaginationContent className="flex flex-wrap justify-center gap-2">
                {/* Previous Button */}
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => page > 1 && handlePageChange(page - 1)}
                    style={{
                      pointerEvents: page === 1 ? "none" : "auto",
                      opacity: page === 1 ? 0.5 : 1,
                    }}
                  />
                </PaginationItem>

                {/* First Page */}
                {page > 2 && (
                  <PaginationItem>
                    <PaginationLink onClick={() => handlePageChange(1)}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                )}

                {/* Ellipsis Before Current Page */}
                {page > 3 && (
                  <PaginationItem>
                    <PaginationEllipsis>...</PaginationEllipsis>
                  </PaginationItem>
                )}

                {/* Previous Page */}
                {page > 1 && (
                  <PaginationItem>
                    <PaginationLink onClick={() => handlePageChange(page - 1)}>
                      {page - 1}
                    </PaginationLink>
                  </PaginationItem>
                )}

                {/* Current Page */}
                <PaginationItem>
                  <PaginationLink isActive>{page}</PaginationLink>
                </PaginationItem>

                {/* Next Page */}
                {page < totalPages && (
                  <PaginationItem>
                    <PaginationLink onClick={() => handlePageChange(page + 1)}>
                      {page + 1}
                    </PaginationLink>
                  </PaginationItem>
                )}

                {/* Ellipsis After Current Page */}
                {page < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis>...</PaginationEllipsis>
                  </PaginationItem>
                )}

                {/* Last Page */}
                {page < totalPages - 1 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => handlePageChange(totalPages)}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                )}

                {/* Next Button */}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      page < totalPages && handlePageChange(page + 1)
                    }
                    style={{
                      pointerEvents: page === totalPages ? "none" : "auto",
                      opacity: page === totalPages ? 0.5 : 1,
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <DialogTitle>Quick View</DialogTitle>
            </AlertDialogHeader>

            <div className="flex flex-row gap-4">
              {/* Product Image */}
              <div className="w-1/2">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-auto rounded-md"
                />
              </div>

              {/* Product Details */}
              <div className="w-1/2">
                <Label className="text-xl font-semibold">
                  {selectedProduct.name}
                </Label>
                <Label className="text-lg text-gray-600">
                  {selectedProduct.price} BDT
                </Label>
                {/* Additional details can go here */}
              </div>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default Products_Page;
