"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStore } from "@/store/store";
import { getOneProductsByGET } from "@/actions/order/getOneProduct";
import Loading from "@/components/Shared/Loading/Loading";
import { IFilteringProduct } from "@/types/filteringTypes";
import toast from "react-hot-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ResellProd = ({ id }: { id: string }) => {
  const router = useRouter();
  const addProduct = useStore((state) => state.reselladdProduct);
  const [product, setProduct] = useState<IFilteringProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const {
    reset,
    Rproduct,
    addVariant,
    removeVariant,
    updateVariant,
    variants,
    setMargin,
    checkUniqueVariants,
  } = useStore(
    useShallow((state) => ({
      reset: state.reset,
      Rproduct: state.product,
      addVariant: state.addVariant,
      removeVariant: state.removeVariant,
      updateVariant: state.updateVariant,
      variants: state?.product?.variants,
      setMargin: state.setMargin,
      checkUniqueVariants: state.checkUniqueVariants,
    }))
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getOneProductsByGET(id);
        setProduct(productData);
        addProduct({
          ...productData,
          variants: [
            {
              color: productData.color[0],
              size: productData.sizes[0],
              quantity: 1,
            },
          ],
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id, addProduct]);

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return <div>Error: Product not found</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Product Variants</CardTitle>
          <CardDescription>Manage your product variants here</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Subtotal</TableHead>
                {Rproduct && Rproduct.color && <TableHead>Color</TableHead>}
                {Rproduct && Rproduct.sizes && <TableHead>Size</TableHead>}
                <TableHead>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      addVariant({ color: null, size: null, quantity: 1 })
                    }
                  >
                    Add another variant
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {variants &&
                variants.map((variant, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {product.images && product.images.length > 0 && (
                          <Image
                            src={product.images[0]}
                            alt={product.title}
                            width={50}
                            height={50}
                          />
                        )}
                        <span>{product.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>{Number(product.price).toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <TooltipProvider disableHoverableContent>
                          <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  updateVariant(
                                    index,
                                    "quantity",
                                    variant.quantity - 1
                                  )
                                }
                              >
                                -
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              Decrement Quantity
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <span>{variant.quantity}</span>
                        <TooltipProvider disableHoverableContent>
                          <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  updateVariant(
                                    index,
                                    "quantity",
                                    variant.quantity + 1
                                  )
                                }
                              >
                                +
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              Increment Quantity
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                    <TableCell>
                      {(
                        Number(variant.quantity) * Number(product.price)
                      ).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {product.color && product.color.length > 0 ? (
                        <div className="flex space-x-2">
                          {product.color.map((colorValue, idx) => (
                            <Button
                              key={idx}
                              variant="outline"
                              size="sm"
                              className={`w-6 h-6 p-0 ${
                                variant.color === colorValue
                                  ? "ring-2 ring-offset-2 ring-black"
                                  : ""
                              }`}
                              style={{ backgroundColor: colorValue }}
                              onClick={() =>
                                updateVariant(index, "color", colorValue)
                              }
                            />
                          ))}
                        </div>
                      ) : (
                        <span>No colors available</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {product.sizes && product.sizes.length > 0 ? (
                        <div className="flex space-x-2">
                          {product.sizes.map((size, idx) => (
                            <Button
                              key={idx}
                              variant={
                                variant.size === size ? "default" : "outline"
                              }
                              size="sm"
                              onClick={() => updateVariant(index, "size", size)}
                            >
                              {size}
                            </Button>
                          ))}
                        </div>
                      ) : (
                        <span>No sizes available</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => removeVariant(index)}
                            >
                              X
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            Remove Variant
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Resell the product</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="margin">Margin</Label>
            <Input
              type="number"
              id="margin"
              placeholder="Enter margin"
              min={0}
              onChange={(e) => setMargin(Number(e.target.value))}
            />
          </div>
          <p className="mt-4">Shipping: Free</p>
          <p className="mt-2">
            <span className="text-sm font-medium">Total: </span>
            <span className="text-lg font-bold">
              {Rproduct && Rproduct.total}
            </span>
          </p>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => {
              if (checkUniqueVariants() === false) {
                toast.error("Please select unique variants");
              } else {
                router.push("/reseller/checkout");
              }
            }}
          >
            Checkout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResellProd;
