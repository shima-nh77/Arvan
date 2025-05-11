import classNames from "classnames";
import { ButtonProps, State } from "./button.types";
import { Size } from "../../types/size.type";
import { Loading } from "../loading/loading";
import { Variant } from "../../types/variant.type";

const sizeClasses: Record<Size, string> = {
  small: "px-3 py-1 text-sm",
  medium: "h-10 px-4 text-sm font-semibold",
  large: "px-5 py-3 text-base",
};

const variantClasses: Record<Variant, Record<State, string>> = {
  primary: {
    default: "bg-teal-100 text-white",
    hover: "bg-teal-200 text-white",
    loading: "bg-teal-100 text-white opacity-75",
    disabled: "bg-teal-50 text-white cursor-not-allowed",
  },
  danger: {
    default: "bg-red-100 text-white",
    hover: "bg-red-200 text-white",
    loading: "bg-red-100 text-white opacity-75",
    disabled: "bg-red-50 text-white cursor-not-allowed",
  },
  outline: {
    default: "bg-white text-black border border-neutral-100",
    hover: "text-black border border-neutral-100",
    loading: "bg-white text-neutral-100 border border-neutral-100",
    disabled:
      "bg-white text-neutral-100 border border-neutral-100 cursor-not-allowed",
  },
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  isDisabled = false,
  isLoading = false,
  loadingType = "spinner",
  type = "button",
  children,
  className,
  ...rest
}: ButtonProps) => {
  let state: State = "default";
  if (isDisabled) {
    state = "disabled";
  } else if (isLoading) {
    state = "loading";
  } else {
    state = "default";
  }
  const classes = classNames(
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none",
    variantClasses[variant][state],
    sizeClasses[size],
    className
  );
  return (
    <button type={type} disabled={isDisabled} className={classes} {...rest}>
      {isLoading ? <Loading type={loadingType} /> : children}
    </button>
  );
};
