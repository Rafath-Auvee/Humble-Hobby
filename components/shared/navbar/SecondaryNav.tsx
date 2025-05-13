"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Check,
  ChevronDown,
  Globe,
  Clock,
  User,
  ShoppingBag,
  TruckIcon,
  CreditCard
} from "lucide-react";
import { useState } from "react";

// Currently only using English and BDT as requested
export const languages = [
  { code: "en", name: "English" },
  // Other languages commented out as requested
  /*
  { code: "fr", name: "Français" },
  { code: "es", name: "Español" },
  { code: "de", name: "Deutsch" },
  { code: "it", name: "Italiano" },
  */
];

export const currencies = [
  { code: "BDT", name: "Bangladeshi Taka" },
  // Other currencies commented out as requested
  /*
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "AUD", name: "Australian Dollar" },
  */
];

export default function SecondaryNav() {
  const [currentLanguage, setCurrentLanguage] = useState(
    languages.length > 0 ? languages[0] : { code: "en", name: "English" }
  );

  const [currentCurrency, setCurrentCurrency] = useState(
    currencies.length > 0 ? currencies[0] : { code: "BDT", name: "Bangladeshi Taka" }
  );

  return (
    <div className="border-b bg-gray-50 py-2 text-sm transition-all">
      <div className="px-4 md:px-10 lg:px-20 mx-auto flex justify-between items-center ">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <div  className="flex items-center hover:text-primary transition-colors">
            About Us
          </div>
          <div  className="flex items-center hover:text-primary transition-colors">
            <User className="mr-1 h-3 w-3" />
            <span>My Account</span>
          </div>
          <div  className="flex items-center hover:text-primary transition-colors">
            <ShoppingBag className="mr-1 h-3 w-3" />
            <span>Shop</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="mr-1 h-3 w-3" />
            <span className="text-xs">Delivery: 7:00 - 23:00 daily</span>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-4">
          <div aria-label="My Account">
            <User className="h-4 w-4" />
          </div>
          <div  aria-label="Shop">
            <ShoppingBag className="h-4 w-4" />
          </div>
        </div>

        {/* Language and Currency Switchers */}
        <div className="flex items-center space-x-4">
          {currentLanguage && (
            <LanguageSwitcher
              items={languages}
              currentItem={currentLanguage}
              setCurrentItem={setCurrentLanguage}
              icon={<Globe className="h-3 w-3" />}
            />
          )}

          {currentCurrency && (
            <LanguageSwitcher
              items={currencies}
              currentItem={currentCurrency}
              setCurrentItem={setCurrentCurrency}
              icon={<CreditCard className="h-3 w-3" />}
            />
          )}
          <div
            
            className="hidden md:flex items-center hover:text-primary transition-colors"
          >
            <TruckIcon className="mr-1 h-3 w-3" />
            <span>Track Order</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LanguageSwitcher({
  items,
  currentItem,
  setCurrentItem,
  icon,
}: {
  items: { code: string; name: string }[];
  currentItem: { code: string; name: string };
  setCurrentItem: (item: { code: string; name: string }) => void;
  icon: React.ReactNode;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 flex items-center gap-1 px-2 text-xs hover:bg-gray-100"
        >
          {icon}
          <span className="hidden md:inline">{currentItem.name}</span>
          <span className="md:hidden">{currentItem.code}</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-50 w-40">
        {items.map((item) => (
          <DropdownMenuItem
            key={item.code}
            onClick={() => setCurrentItem(item)}
            className="flex items-center justify-between text-sm"
          >
            {item.name}
            {currentItem.code === item.code && (
              <Check className="h-3 w-3 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}