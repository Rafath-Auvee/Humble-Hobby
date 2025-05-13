"use client";
import { mergeProductsWithQty } from "@/actions/order/getProdsAry";
import { prodAryReformatter } from "@/lib/clientFuncs";
import { useSession } from "@/providers/SessionProvider";
import { useStore } from "@/store/store";
import { deleteCookie, getCookie } from "cookies-next";
import React, { useEffect } from "react";

const SocialCartHandler = () => {
  const isSocial = getCookie("social");
  const { user } = useSession();
  const replaceCart = useStore((state) => state.replaceCart);
  const generateCartData = async () => {
    const res = await mergeProductsWithQty();
    return res;
  };
  useEffect(() => {
    if (isSocial && user && user.products && user.products.length > 0) {
      // generateCartData(user.products);
      generateCartData().then((cartData) => {
        replaceCart(JSON.parse(cartData.data));
      });
    } else if (isSocial) {
      replaceCart({ total: 0, products: [] });
    }
    deleteCookie("social");
  }, []);
  return <></>;
};

export default SocialCartHandler;
