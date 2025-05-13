// components/banners/Banner.tsx

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge";

interface BannerButton {
    text: string;
    variant: "secondary" | "outline" | "default" | "destructive" | "ghost" | "link";
    url: string;
    external?: boolean;
    icon?: React.ReactNode;
    buttonColor: string;
}

interface BannerProps {
    title: string;
    subtitle: string;
    gradient?: string; // Optional gradient
    backgroundImage?: string; // Optional background image
    icon: React.ReactNode;
    mrp: string;
    price: string;
    titleColor?: string;
    subtitleColor?: string;
    priceColor?: string;
    buttons?: BannerButton[];
    badge?: string;
    backgroundColor?: string;
    accentColor?: string;
}

const Banner: React.FC<BannerProps> = ({
    title,
    subtitle,
    gradient,
    backgroundImage,
    icon,
    mrp,
    price,
    titleColor = "text-white",
    subtitleColor = "text-white",
    priceColor = "text-red-500",
    buttons = [],
    badge,
    backgroundColor,
    accentColor,
}) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    };

    return (
        <section
            className={cn(
                "w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px] px-4 sm:px-8 md:px-12 lg:px-20 py-6 sm:py-8 md:py-10 relative overflow-hidden",
                gradient,
                backgroundColor
            )}
        >
            {/* Background Image (if provided) */}
            {backgroundImage && (
                <Image
                    src={backgroundImage}
                    alt={title}
                    fill
                    quality={90}
                    priority
                    className="object-cover"
                />
            )}

            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

                {/* Pattern */}
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />

                {/* Decorative Shapes */}
                <div className="absolute -top-10 -right-10 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute bottom-1/4 -left-20 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 rounded-full bg-white/5 blur-2xl" />
                <motion.div
                    className="absolute bottom-0 right-0 w-full h-full"
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                >
                    <div className="absolute right-0 bottom-0 w-full md:w-2/3 h-32 bg-gradient-to-t from-black/20 to-transparent blur-lg transform rotate-12" />
                </motion.div>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="container relative z-10 h-full flex flex-col justify-center px-2 sm:px-4 py-4 sm:py-6 md:py-8 lg:py-12"
            >
                {/* Optional Badge */}
                {badge && (
                    <motion.div variants={item} className="mb-2 sm:mb-3 md:mb-4">
                        <Badge className={cn("text-xs font-semibold uppercase tracking-wide px-2 sm:px-3 py-0.5 sm:py-1", accentColor)}>
                            {badge}
                        </Badge>
                    </motion.div>
                )}

                <motion.div
                    variants={item}
                    className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6"
                >
                    {icon}
                </motion.div>

                <motion.h1
                    variants={item}
                    className={cn(
                        "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-2 sm:mb-3 md:mb-4 tracking-tighter leading-tight",
                        "w-full sm:w-4/5 md:w-3/4 lg:w-3/5 xl:w-1/2",
                        titleColor
                    )}
                >
                    {title}
                </motion.h1>

                <motion.p
                    variants={item}
                    className={cn(
                        "text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-5 md:mb-6 leading-normal",
                        "w-full sm:w-4/5 md:w-3/4 lg:w-3/5 xl:w-1/2",
                        subtitleColor
                    )}
                >
                    {subtitle}
                </motion.p>

                {/* Price Card - Uncomment if needed */}
                {/* <motion.div variants={item} className="mb-4 sm:mb-6 md:mb-8">
                    <Card className="inline-flex items-center bg-black/20 backdrop-blur-sm border-0 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl">
                        <span className={cn("line-through opacity-60 mr-2 sm:mr-3 text-base sm:text-lg", priceColor)}>{mrp}</span>
                        <span className={cn("text-xl sm:text-2xl md:text-3xl font-extrabold", priceColor)}>{price}</span>
                        <Badge variant="outline" className="ml-2 sm:ml-3 bg-white/10 border-white/20 text-xs sm:text-sm">
                            Limited Time
                        </Badge>
                    </Card>
                </motion.div> */}

                <motion.div variants={item} className="flex flex-wrap gap-3 sm:gap-4">
                    {buttons.slice(0, 1).map((btn, i) => {
                        const ButtonContent = () => (
                            <Button
                                variant={btn.variant}
                                size="lg"
                                className={cn(
                                    "font-medium text-sm sm:text-base rounded-sm px-4 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-3 md:py-4 lg:py-6",
                                    "hover:scale-105 transition-all duration-300 shadow-lg",
                                    "flex items-center gap-2 justify-start",
                                    "w-auto sm:w-auto md:w-auto lg:w-full",
                                    "text-left",
                                    btn.buttonColor
                                )}
                            >
                                {btn.text}
                                {btn.icon && btn.icon}
                            </Button>
                        );

                        return btn.external ? (
                            <a
                                key={i}
                                href={btn.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block"
                            >
                                <ButtonContent />
                            </a>
                        ) : (
                            <Link key={i} href={btn.url} className="inline-block">
                                <ButtonContent />
                            </Link>
                        )
                    })}
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Banner;