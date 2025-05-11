import { ButtonHTMLAttributes } from "react";
import { Base } from "../../types/base.types";
import { LoadingBehavior } from "../../types/loading-behavior.type";

export type State = "default" | "hover" | "loading" | "disabled";
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & Base & LoadingBehavior;
