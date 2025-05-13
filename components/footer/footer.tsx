"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Twitter, Phone, Mail, ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function ModernFooter() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle newsletter subscription
        console.log("Subscribing email:", email);
        setSubscribed(true);
        // Reset form after showing success message
        setTimeout(() => {
            setEmail("");
            setSubscribed(false);
        }, 3000);
    };

    const footerColumns = [
        {
            title: "Make Money with Us",
            links: [
                { label: "Sell on Origin", href: "#" },
                { label: "Sell Your Services", href: "#" },
                { label: "Sell on Origin Business", href: "#" },
                { label: "Sell Your Apps", href: "#" },
                { label: "Become an Affiliate", href: "#" },
                { label: "Advertise Your Products", href: "#" },
                { label: "Self-Publish with Us", href: "#" },
                { label: "Become an Origin Vendor", href: "#" }
            ]
        },
        {
            title: "Let Us Help You",
            links: [
                { label: "Accessibility Statement", href: "#" },
                { label: "Your Orders", href: "#" },
                { label: "Returns & Refunds", href: "#" },
                { label: "Shipping Policies", href: "#" },
                { label: "Delivery Information", href: "#" },
                { label: "Privacy Policy", href: "#" },
                { label: "Terms and Conditions", href: "#" },
                { label: "Cookie Preferences", href: "#" },
                { label: "Help Center", href: "#" }
            ]
        },
        {
            title: "Get to Know Us",
            links: [
                { label: "Careers at Origin", href: "#" },
                { label: "About Origin", href: "#" },
                { label: "Investor Relations", href: "#" },
                { label: "Origin Devices", href: "#" },
                { label: "Origin Science", href: "#" },
                { label: "Origin Business", href: "#" },
                { label: "Customer Reviews", href: "#" },
                { label: "Social Responsibility", href: "#" },
                { label: "Store Locations", href: "#" }
            ]
        }
    ];

    // const paymentMethods = ["visa", "mastercard", "amex", "paypal", "applepay", "googlepay"];
    const paymentMethods = ["BKash", "nagad", "cash on delivery"];

    return (
        <footer className="w-full bg-gradient-to-b from-slate-50 to-slate-100 pt-12 pb-6">
            <div className="px-4 md:px-10 lg:px-20 mx-auto">
                {/* Newsletter Section */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-100 to-indigo-50 p-6 md:p-8 mb-12 shadow-sm border border-purple-100">
                    <div className="absolute top-0 right-0 -mt-4 -mr-12 w-32 h-32 bg-purple-200 rounded-full opacity-50"></div>
                    <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-24 h-24 bg-indigo-200 rounded-full opacity-40"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-purple-800">
                                Join our newsletter for £10 off
                            </h3>
                            <p className="text-sm text-indigo-700 mb-4 max-w-md">
                                Get exclusive deals, early access to new products, and a special 5% discount on your first order when you subscribe.
                            </p>
                        </div>

                        <div className="flex flex-col justify-center">
                            {!subscribed ? (
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex flex-col sm:flex-row w-full max-w-md gap-3"
                                >
                                    <Input
                                        type="email"
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex-1 border-purple-200 focus:border-purple-400 bg-white/90"
                                        required
                                    />
                                    <Button
                                        type="submit"
                                        className="bg-purple-600 hover:bg-purple-700 text-white transition-all sm:w-auto w-full"
                                    >
                                        SUBSCRIBE
                                    </Button>
                                </form>
                            ) : (
                                <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-700 animate-pulse">
                                    Thanks for subscribing! Check your email for your £10 discount code.
                                </div>
                            )}
                            <p className="text-xs text-indigo-600/70 mt-3">
                                By subscribing you agree to our Terms & Conditions and Privacy Policy
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
                    <div className="lg:col-span-2">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center group">
                                <div className="relative w-32 h-24 transition-transform duration-300 group-hover:scale-110">
                                    <Image
                                        src="/Chaitro Logo.png"
                                        alt="Company Logo"
                                        fill
                                        priority
                                        className="object-contain"
                                    />
                                </div>
                            </Link>
                            {/* <h3 className="text-lg font-semibold">{COMPANY_NAME}</h3> */}
                        </div>

                        <p className="text-sm text-muted-foreground mb-6 max-w-md">
                            We&apos;re dedicated to providing the best shopping experience with quality products and exceptional customer service.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center group">
                                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors">
                                    <Phone size={16} className="text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Customer Service</p>
                                    <p className="font-semibold">0800 400-353</p>
                                </div>
                            </div>

                            <div className="flex items-center group">
                                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors">
                                    <Mail size={16} className="text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Have a question?</p>
                                    <p className="font-semibold">info@example.com</p>
                                </div>
                            </div>

                            <p className="text-xs text-muted-foreground mt-4">
                                Available from 9AM - 6PM (GMT), Monday to Friday except bank/public holidays.
                            </p>
                        </div>

                        {/* Social Media Links */}
                        <div className="mt-8">
                            <p className="text-sm font-medium mb-3">Follow us:</p>
                            <div className="flex space-x-4">
                                <TooltipProvider>
                                    {[
                                        { icon: <Facebook size={18} />, label: "Facebook" },
                                        { icon: <Twitter size={18} />, label: "Twitter" },
                                        { icon: <Instagram size={18} />, label: "Instagram" },
                                        { icon: <Linkedin size={18} />, label: "LinkedIn" }
                                    ].map((social, index) => (
                                        <Tooltip key={index}>
                                            <TooltipTrigger asChild>
                                                <Link
                                                    href="#"
                                                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-purple-100 flex items-center justify-center text-slate-600 hover:text-purple-600 transition-colors"
                                                >
                                                    {social.icon}
                                                </Link>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{social.label}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    ))}
                                </TooltipProvider>
                            </div>
                        </div>
                    </div>

                    {/* Footer Links - Desktop */}
                    <div className="lg:col-span-3 hidden md:grid grid-cols-3 gap-8">
                        {footerColumns.map((column, index) => (
                            <div key={index}>
                                <h4 className="font-semibold mb-4 text-slate-800">{column.title}</h4>
                                <ul className="space-y-2">
                                    {column.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <Link
                                                href={link.href}
                                                className="text-sm text-slate-500 hover:text-purple-600 transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Footer Links - Mobile Collapsible */}
                    <div className="md:hidden lg:col-span-3 space-y-4">
                        {footerColumns.map((column, index) => {

                            return (
                                <Collapsible key={index} open={open} onOpenChange={setOpen}>
                                    <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left border-b border-slate-200">
                                        <h4 className="font-semibold text-slate-800">{column.title}</h4>
                                        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <ul className="space-y-2 py-3 pl-2">
                                            {column.links.map((link, linkIndex) => (
                                                <li key={linkIndex}>
                                                    <Link
                                                        href={link.href}
                                                        className="text-sm text-slate-500 hover:text-purple-600 transition-colors"
                                                    >
                                                        {link.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </CollapsibleContent>
                                </Collapsible>
                            );
                        })}
                    </div>

                </div>

                {/* App Download */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-100 mb-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-slate-800">Download our app</h4>
                            <p className="text-sm text-slate-500 mb-4">Shop on the go with our mobile app and get exclusive app-only offers</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link href="#" className="block transition-transform hover:scale-105">
                                <Image
                                    src="/icons/googlePlay.png"
                                    alt="Download on Google Play"
                                    width={135}
                                    height={40}
                                    className="rounded"
                                />
                            </Link>
                            <Link href="#" className="block transition-transform hover:scale-105">
                                <Image
                                    src="/icons/appleStore.png"
                                    alt="Download on App Store"
                                    width={135}
                                    height={40}
                                    className="rounded"
                                />
                            </Link>
                        </div>
                    </div>
                </div>

                <Separator className="mb-6" />

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="mb-4 md:mb-0 text-center md:text-left">
                        <p className="text-xs text-slate-500">
                            Copyright © {new Date().getFullYear()} All Rights Reserved. Powered by{" "}
                            <Link href="#" className="text-purple-600 hover:underline">
                                Chaitro
                            </Link>
                        </p>
                    </div>

                    {/* Payment Methods */}
                    <div className="flex flex-wrap justify-center gap-2 mb-4 md:mb-0">
                        {paymentMethods.map((method, index) => (
                            <div
                                key={index}
                                className="relative w-20 h-12 overflow-hidden"
                            >
                                <Image
                                    src={`/payment-gateway-icons/${method}.png`}
                                    alt={method}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}

                    </div>

                    <div className="flex space-x-4 text-xs">
                        <Link
                            href="#"
                            className="text-slate-500 hover:text-purple-600 transition-colors"
                        >
                            Terms
                        </Link>
                        <Link
                            href="#"
                            className="text-slate-500 hover:text-purple-600 transition-colors"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="#"
                            className="text-slate-500 hover:text-purple-600 transition-colors"
                        >
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}