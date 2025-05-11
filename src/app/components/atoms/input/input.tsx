import React from "react";
import classNames from "classnames";
import { InputProps } from "./input.types";

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className,
  containerClassName,
  ...rest
}) => {
  return (
    <div className={`flex flex-col gap-1 w-full ${containerClassName}`}>
      {label && (
        <label className="text-sm font-medium text-neutral-200 mb-1">
          {label}
        </label>
      )}
      <input
        {...rest}
        className={classNames(
          "px-4 py-2 border rounded-md text-sm outline-none transition-all duration-200",
          {
            "border-red-100 focus:border-red-500 ":
              error,
            "border-neutral-100": !error,
          },
          className
        )}
      />
      {error && <span className="text-xs text-red-100">{error}</span>}
    </div>
  );
};
