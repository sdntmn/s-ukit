import { FC } from "react";
import { ButtonType } from "../types";
import "./ButtonIcon.css";
export interface ButtonIconProps {
    isActive?: boolean;
    className?: string;
    type: ButtonType;
    children?: React.ReactNode;
    colorIcon?: string;
    heightIcon?: string;
}
export declare const ButtonIcon: FC<ButtonIconProps>;
