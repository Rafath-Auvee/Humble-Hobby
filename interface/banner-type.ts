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
  gradient?: string;
  backgroundImage?: string;
  icon?: ReactNode;
  mrp: string;
  price: string;
  titleColor?: string;
  subtitleColor?: string;
  priceColor?: string;
  badge?: string;
  buttons?: BannerButton[];
}
