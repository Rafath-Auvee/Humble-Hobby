"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { useSession } from "@/providers/SessionProvider";
import { useStore } from "@/store/store";
import { getOneProductsByGET } from "@/actions/order/getOneProduct";
import { userLoginUrl } from "@/lib/redirectingRoutes";
import { IFilteringProduct } from "@/types/filteringTypes";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { dummySellerData } from "@/app/dashboard/(seller)/(profile)/company-profile/page";
import ImageModal from "./prod-image-modal/image-modal";

const ProductDetailPage = ({ id }: { id: string }) => {
  const routeTo = useRouter();
  const currentPath = usePathname();
  const { user } = useSession();
  const addProduct = useStore((state) => state.addProduct);
  const cartProducts = useStore((state) => state.products);
  const [product, setProduct] = useState<IFilteringProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [primaryIndex, setPrimaryIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageModal, setImageModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getOneProductsByGET(id);
        setProduct(productData);
        if (productData.color && productData.color.length > 0) {
          setSelectedColor(productData.color[0]);
        }
        if (productData.sizes && productData.sizes.length > 0) {
          setSelectedSize(productData.sizes[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const addProductClick = (product: IFilteringProduct, quantity: number) => {
    addProduct(product, quantity, selectedColor, selectedSize);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return <div>Error: Product not found</div>;
  }

  const handleThumbnailClick = (index: number) => {
    setSelectedImage(index);
  };

  const openImageModal = () => {
    setImageModal(true);
  };

  const closeImageModal = () => {
    setImageModal(false);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <section className="flex flex-col gap-y-4 md:w-[400px] md:h-[400px] max-w-screen-lg mx-auto">
          <div className="relative flex items-center justify-center">
            <div className="h-[375px] w-[325px] sm:h-[400px] sm:w-[400px] object-cover">
              <Image
                src={product.images[selectedImage]}
                fill
                className="rounded-lg cursor-pointer"
                alt="Sneaker Image"
                onClick={openImageModal}
              />
            </div>
            <ImageModal
              isOpen={imageModal}
              imageSource={product.images[selectedImage]}
              thumbnails={product.images}
              thumbnailToggle={handleThumbnailClick}
              closeImageModal={closeImageModal}
            />
          </div>
          <div className="flex justify-between items-center">
            {product.images.map((thumbnail, index) => (
              <div
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className="cursor-pointer rounded-lg relative group "
              >
                <Image
                  alt="Thumbnail"
                  src={thumbnail}
                  width={65}
                  height={60}
                  className="rounded-lg group-hover:opacity-65 transition-opacity hidden md:block"
                />
                <Image
                  alt="Thumbnail"
                  src={thumbnail}
                  width={40}
                  height={37}
                  className="rounded-lg group-hover:opacity-65 transition-opacity md:hidden"
                />
                <div className="absolute inset-0 border-2 border-transparent rounded-lg transition-all duration-300 group-hover:border-realorange"></div>
              </div>
            ))}
          </div>
        </section>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(4)
                      ? "fill-primary"
                      : "fill-muted stroke-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <Badge>3</Badge>
          </div>
          <p className="text-2xl font-semibold mb-4">${product.price}</p>
          <p className="mb-4">{product.description}</p>
          <Separator className="my-4" />
          <div className="mb-4">
            <Label htmlFor="colors" className="text-lg font-semibold mb-2">
              Colors:
            </Label>
            <RadioGroup
              defaultValue={selectedColor ?? undefined}
              onValueChange={setSelectedColor}
              className="flex items-center gap-2"
            >
              {product.color && product.color.length > 0 ? (
                product.color.map((colorValue, index) => (
                  <Label
                    key={index}
                    htmlFor={`color-${colorValue}`}
                    className={`border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-black dark:[&:has(:checked)]:bg-gray-800 `}
                  >
                    <RadioGroupItem
                      id={`color-${colorValue}`}
                      value={colorValue}
                    />
                    {colorValue}
                  </Label>
                ))
              ) : (
                <p>No colors available</p>
              )}
            </RadioGroup>
          </div>
          <div className="mb-4">
            <Label htmlFor="sizes" className="text-lg font-semibold mb-2">
              Sizes:
            </Label>
            <RadioGroup
              defaultValue={selectedSize ?? undefined}
              onValueChange={setSelectedSize}
              className="flex flex-wrap gap-2"
            >
              {product.sizes && product.sizes.length > 0 ? (
                product.sizes.map((size, index) => (
                  <Label
                    key={index}
                    htmlFor={`size-${size}`}
                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                  >
                    <RadioGroupItem id={`size-${size}`} value={size} />
                    {size}
                  </Label>
                ))
              ) : (
                <p>No sizes available</p>
              )}
            </RadioGroup>
          </div>
          <div className="mb-4">
            <Label htmlFor="quantity" className="text-lg font-semibold mb-2">
              Quantity
            </Label>
            <div>
              {/* {cartProducts.find(
                (item) =>
                  item.id === `${product.id}-${selectedColor}-${selectedSize}`
              ) ? (
                <ChangeQtyButtons
                  productId={`${product.id}-${selectedColor}-${selectedSize}`}
                  selectedColor={selectedColor}
                  selectedSize={selectedSize}
                />
              ) : ( */}
              <div className="space-y-4">
                <Select
                  defaultValue={quantity.toString()}
                  onValueChange={(value) => setQuantity(parseInt(value))}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  className="w-full"
                  onClick={() => {
                    if (!user) {
                      setCookie("redirecturl", currentPath);
                      routeTo.push(userLoginUrl);
                    }
                    addProductClick(product, quantity);
                  }}
                >
                  Add to Cart
                </Button>
              </div>
              {/* )} */}
            </div>
          </div>
          {user && user.role === "reseller" && (
            <Button
              className="w-full mt-4"
              variant="secondary"
              onClick={() => routeTo.push(`/reseller/resell/${product._id}`)}
            >
              Resell this product
            </Button>
          )}
          <Card className="mt-6">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4 mb-4">
                <Image
                  width={40}
                  height={40}
                  src="/icons/icon-delivery.png"
                  alt="Free Delivery"
                />
                <div>
                  <p className="font-semibold">Free Delivery</p>
                  <p className="text-sm text-muted-foreground">
                    Enter your postal code for Delivery Availability
                  </p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center space-x-4">
                <Image
                  width={40}
                  height={40}
                  src="/icons/icon-return.png"
                  alt="Return Delivery"
                />
                <div>
                  <p className="font-semibold">Return Delivery</p>
                  <p className="text-sm text-muted-foreground">
                    Free 30 Days Delivery Returns. Details
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <h2 className="text-2xl font-bold mt-8 mb-4">Related Products</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {dummySellerData.recentProducts.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-4">
              <div className="aspect-square relative mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-muted-foreground">
                ${product.price.toFixed(2)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailPage;
interface StarIconProps extends React.SVGProps<SVGSVGElement> {}

function StarIcon(props: StarIconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
