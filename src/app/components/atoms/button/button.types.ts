import { ButtonHTMLAttributes } from "react";

export type Variant = "primary" | "danger" | "outline";
export type Size = "small" | "medium" | "large";
export type Base = {
  variant?: Variant;
  size?: Size;
  isDisabled?: boolean;
  className?: string;
  isLoading?: boolean;
};

export type State = "default" | "hover" | "loading" | "disabled";
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & Base;
