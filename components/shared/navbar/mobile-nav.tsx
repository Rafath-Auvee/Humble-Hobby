// app/components/navbar/mobile-nav.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Menu,
    ShoppingBag,
    Layers,
    ChevronRight,
    Home,
    Info,
    HeadsetIcon,
    Globe,
    CreditCard,
} from "lucide-react";


import {
    currencies,
    languages,
    LanguageSwitcher,
} from "./SecondaryNav";

export function MobileNav() {

    const [open, setOpen] = useState(false);

    const [currentLanguage, setCurrentLanguage] = useState(
        languages.length > 0 ? languages[0] : { code: "en", name: "English" }
    );

    const [currentCurrency, setCurrentCurrency] = useState(
        currencies.length > 0 ? currencies[0] : { code: "BDT", name: "Bangladeshi Taka" }
    );

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    aria-label="Menu"
                >
                    <Menu className="h-5 w-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col p-0 z-[1001]">
                <SheetHeader className="px-6 py-4 border-b">
                    <SheetTitle className="flex items-center gap-2">
                        <div className="rounded-lg bg-primary p-1.5 shadow-sm">
                            <Layers className="h-5 w-5 text-primary-foreground" />
                        </div>
                        Chaitro
                    </SheetTitle>
                    <p className="text-xs">
                        We deliver to you every day from 7:00 to 23:00
                    </p>
                </SheetHeader>

                <div className="flex-1 overflow-auto">

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
                    <div className="px-2 py-4">
                        <div className="px-3 mb-2">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Navigation
                            </p>
                        </div>
                        <nav className="space-y-1">
                            <NavItem href="/" icon={<Home />} onClick={() => setOpen(false)}>
                                Home
                            </NavItem>
                            <NavItem
                                href="/shop"
                                icon={<ShoppingBag />}
                                onClick={() => setOpen(false)}
                            >
                                Shop
                            </NavItem>
                            <NavItem
                                href="/about"
                                icon={<Info />}
                                onClick={() => setOpen(false)}
                            >
                                About Us
                            </NavItem>
                            <NavItem
                                href="/contact"
                                icon={<HeadsetIcon />}
                                onClick={() => setOpen(false)}
                            >
                                Contact Us
                            </NavItem>
                        </nav>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

function NavItem({
    href,
    icon,
    children,
    onClick,
}: {
    href: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    onClick?: () => void;
}) {
    return (
        <Link
            href={href}
            className="flex items-center justify-between rounded-md py-2 px-3 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            onClick={onClick}
        >
            <div className="flex items-center">
                <span className="mr-2 text-muted-foreground">{icon}</span>
                <span>{children}</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </Link>
    );
}