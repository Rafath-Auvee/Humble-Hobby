// components/banners/BannersData.ts

import {
  Flower2,
  Gift,
  Laptop,
  Sparkles,
  Sun,
  GiftIcon,
  ShoppingBag,
  Trophy,
  Zap,
  ArrowRight,
} from "lucide-react";

export const BannersData = [
  {
    title: "Shopping with us for better quality and the best price",
    subtitle: "We have prepared special discounts for you on grocery products. Don't miss these opportunities...",
    gradient: "bg-gradient-to-r from-orange-600 via-red-500 to-amber-500",
    backgroundImage: "/HeroSections/1.chai.png", // Optional: Use background image if available
    icon: (
      <>
        <Sun className="h-10 w-10 text-white animate-pulse" />
        <Sparkles className="h-8 w-8 text-yellow-300 animate-pulse" />
        <Zap className="ml-4 h-10 w-10 text-yellow-200" />
      </>
    ),
    mrp: "$99",
    price: "$39",
    titleColor: "text-[#39245F]",
    subtitleColor: "text-black",
    priceColor: "text-white",
    badge: "Hot Deal",
    buttons: [
      {
        text: "Shop Now",
        // variant: "secondary",
        url: "/summer-sale",
        buttonColor: "bg-[#634C9F]",
        icon: <ArrowRight className="w-5 h-5 ml-2" />,
      },
      {
        text: "Learn More",
        variant: "outline",
        url: "/summer-info",
      },
    ],
  },
  {
    title: "Pure Sound, Zero Noise",
    subtitle: "Experience immersive audio with premium noise cancellation technology.",
    backgroundImage: "/HeroSections/2.headphones.png",
    gradient: "bg-gradient-to-r from-black via-gray-900 to-gray-800",
    mrp: "$199",
    price: "$129",
    titleColor: "text-white",
    subtitleColor: "text-gray-300",
    priceColor: "text-yellow-300",
    badge: "New Arrival",
    icon: <Zap className="h-8 w-8 text-yellow-300" />,
    buttons: [
      {
        text: "Shop Now",
        url: "/audio-deals",
        buttonColor: "bg-yellow-400 text-black",
        icon: <ArrowRight className="w-5 h-5 ml-2" />,
      },
    ],
  },
  {
    title: "Zest Up Your Day!",
    subtitle: "Fresh lemon flavor in every sip. Pure, Natural & Refreshing.",
    backgroundImage: "/HeroSections/3.drinks.png",
    gradient: "bg-gradient-to-r from-yellow-300 to-green-400",
    mrp: "$2.99",
    price: "$1.50",
    titleColor: "text-green-800",
    subtitleColor: "text-white",
    priceColor: "text-yellow-600",
    badge: "Summer Pick",
    icon: <Sun className="h-8 w-8 text-yellow-400" />,
    buttons: [
      {
        text: "Grab One",
        url: "/lemon-drink",
        buttonColor: "bg-green-500 text-white",
        icon: <ArrowRight className="w-5 h-5 ml-2" />,
      },
    ],
  },
  {
    title: "Unleash the Style Icon in You",
    subtitle: "Elevate your wardrobe with our statement menswear collection.",
    backgroundImage: "/HeroSections/4.menfashion.png",
    gradient: "bg-gradient-to-r from-black via-neutral-900 to-gray-800",
    mrp: "$89",
    price: "$49",
    titleColor: "text-white",
    subtitleColor: "text-gray-400",
    priceColor: "text-pink-400",
    badge: "Trending Now",
    icon: <Trophy className="h-8 w-8 text-pink-400" />,
    buttons: [
      {
        text: "Explore Looks",
        url: "/mens-fashion",
        buttonColor: "bg-white text-black",
        icon: <ArrowRight className="w-5 h-5 ml-2" />,
      },
    ],
  },
  {
    title: "Get the best quality products at the lowest prices",
    subtitle: "We have prepared special discounts for you on organic breakfast products.",
    backgroundImage: "/HeroSections/6.OmegaSquares.png",
    gradient: "bg-gradient-to-r from-[#7B3F00] to-[#A0522D]",
    mrp: "$499",
    price: "$349",
    titleColor: "text-[#634C9F]",
    subtitleColor: "text-black",
    priceColor: "text-orange-300",
    badge: "Editor’s Pick",
    icon: <ShoppingBag className="h-8 w-8 text-orange-300" />,
    buttons: [
      {
        text: "Shop Now",
        url: "/furniture-deals",
        buttonColor: "bg-[#634C9F]",
        icon: <ArrowRight className="w-5 h-5 ml-2" />,
      },
    ],
  }

];
