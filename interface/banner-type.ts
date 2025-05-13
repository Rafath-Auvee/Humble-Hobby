// types/banner.ts
import { ReactNode } from "react";

export type BannerButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

export interface BannerButton {
  text: string;
  url: string;
  variant: BannerButtonVariant;
  buttonColor?: string;
  icon?: ReactNode;
  external?: boolean;
}

export interface BannerProps {
  title: string;
  subtitle: string;
  mrp: string;
  price: string;
  gradient?: string;
  backgroundImage?: string;
  icon?: ReactNode; // ✅ optional
  badge?: string;
  titleColor?: string;
  subtitleColor?: string;
  priceColor?: string;
  buttons?: BannerButton[];
}
