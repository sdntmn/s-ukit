import React from "react";
import "./Card.css";
export interface Props {
    title?: React.ReactNode;
    isBordered?: boolean;
    className?: string;
    children?: React.ReactNode;
    imgUrl?: string;
    classButton?: string;
    like?: boolean;
    idCard?: string;
}
export declare const Card: React.FC<Props>;
