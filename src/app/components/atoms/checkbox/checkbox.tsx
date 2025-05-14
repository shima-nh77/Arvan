import { TickIcon } from "../../icons/icons";
import { CheckboxProps } from "./checkbox.types";

export const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="absolute w-4 h-4 opacity-0 cursor-pointer"
        />
        <div
          className={`w-4 h-4 border-2 rounded-md flex items-center justify-center mr-2
          ${
            checked
              ? "bg-teal-100 border-teal-100"
              : "border-neutral-400 bg-white"
          }`}
        >
          {checked && <TickIcon width={8} height={8} fill="white" />}
        </div>
      </div>
      <span className="text-sm text-neutral-200">{label}</span>
    </label>
  );
};
