"use client";
import React from "react";
import { LoadingProps } from "./loading.types";
import classNames from "classnames";
import { Size } from "../../types/size.type";

const sizeClasses: Record<Size, string> = {
  small: "loading-sm",
  medium: "loading-md",
  large: "loading-lg",
};

export const Loading: React.FC<LoadingProps> = ({
  type = "spinner",
  variant,
  size = "medium",
  className,
}) => {
  const classes = classNames(
    "loading",
    className,
    { [`loading-${variant}`]: variant },
    { [`loading-${type}`]: type }
  );
  return <span className={classes}></span>;
};
