import { Button } from "../../atoms/button/button";
import { PaginationButtonProps } from "./pagination.types";

export const PaginationButton = ({
  isActive,
  onClick,
  disabled,
  children,
}: PaginationButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={`min-w-[40px] h-10 ${
        isActive
          ? "!bg-teal-100 !text-white border-none"
          : "!bg-white !text-gray-600"
      }`}
    >
      {children}
    </Button>
  );
};
