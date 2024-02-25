import { FC } from "react";
import { ButtonType } from "../types";
import "./Button.css";
export interface ButtonProps {
    disabled?: boolean;
    className?: string;
    type: ButtonType;
    children?: React.ReactNode;
    onPress?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}
export declare const Button: FC<ButtonProps>;
