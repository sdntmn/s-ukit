import React, { HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes } from "react";
import { AriaSort } from "../types";
import "./styles.css";
interface ICellProps extends TdHTMLAttributes<HTMLTableCellElement> {
    id?: string;
    value?: string;
    onPressCell?: (event?: React.MouseEvent<HTMLTableCellElement>) => void;
}
export declare const Cell: React.FC<ICellProps>;
export interface IRowProps extends HTMLAttributes<HTMLTableRowElement> {
    id?: string;
    rowData?: {
        key: string;
        [key: string]: string;
    };
    onPressRow?: (event?: React.MouseEvent<HTMLTableRowElement>) => void;
}
export declare const Row: React.FC<IRowProps>;
export interface ITableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
    id?: string;
    sourceData?: {
        key: string;
        [key: string]: string;
    }[];
}
export declare const TableBody: React.FC<ITableBodyProps>;
export interface IHeaderTableProps extends HTMLAttributes<HTMLTableCellElement> {
    iconSortUp?: React.ReactNode;
    iconSortDown?: React.ReactNode;
    isIconClickable?: boolean;
    isHeaderCellClickable?: boolean;
    isCellHover?: boolean;
    titleColumns?: {
        key: string;
        dataIndex: string;
        title: string;
    }[];
    orderSortColumn?: AriaSort;
    currentColumnSort?: string;
    setKeySort?: (key: string) => void;
}
export declare const TableHeader: React.FC<IHeaderTableProps>;
export interface ITableCaption extends TableHTMLAttributes<HTMLTableCaptionElement> {
    captionTable?: string;
}
export declare const TableCaption: React.FC<ITableCaption>;
export interface ITableSortProps extends TableHTMLAttributes<HTMLTableElement> {
    id?: string;
    className?: string;
    captionTable?: string;
    titleColumns?: {
        key: string;
        dataIndex: string;
        title: string;
    }[];
    sourceData?: {
        key: string;
        [key: string]: string;
    }[];
    colorSortableColumn?: boolean;
    arrKeySortAsNumber?: string[];
    isHeaderCellClickable?: boolean;
    isIconClickable?: boolean;
    iconSortUp?: React.ReactNode;
    iconSortDown?: React.ReactNode;
    sortedTable?: (typeSort: string, nameColumn: string) => void;
}
export declare const TableSort: React.FC<ITableSortProps>;
export {};
