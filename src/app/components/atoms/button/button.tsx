import classNames from "classnames";
import { ButtonProps, Size, State, Variant } from "./button.types";
import { Spin } from "antd";

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
    disabled: "bg-teal-50 text-white cursor-not-allowed opacity-50", // Added opacity
  },
  danger: {
    default: "bg-red-100 text-white",
    hover: "bg-red-200 text-white",
    loading: "bg-red-100 text-white opacity-75",
    disabled: "bg-red-50 text-white cursor-not-allowed opacity-50", // Added opacity
  },
  outline: {
    default: "bg-white text-black border border-neutral-100",
    hover: "text-black border border-neutral-100",
    loading: "bg-white text-neutral-100 border border-neutral-100",
    disabled:
      "bg-white text-neutral-100 border border-neutral-100 cursor-not-allowed opacity-50", // Added opacity
  },
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  isDisabled = false,
  isLoading = false,
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
  if (isDisabled || isLoading) {
    state = isLoading ? "loading" : "disabled";
  }
  const classes = classNames(
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none",
    variantClasses[variant][state],
    sizeClasses[size],
    className
  );

  return (
    <button
      type={type}
      disabled={isDisabled || isLoading}
      className={classes}
      {...rest}
    >
      {isLoading ? (
        <Spin
          size="small"
          className="!text-white [&_.ant-spin-dot]:!text-black"
        />
      ) : (
        children
      )}
    </button>
  );
};
