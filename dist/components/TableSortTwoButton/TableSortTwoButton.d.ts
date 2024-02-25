import React, { HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes } from "react";
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
    iconUp?: React.ReactNode;
    iconDown?: React.ReactNode | string;
    isIconClickable?: boolean;
    titleColumns?: {
        key: string;
        dataIndex: string;
        title: string;
    }[];
    setKeySort?: (key: string, type: string) => void;
}
export declare const TableHeader: React.FC<IHeaderTableProps>;
export interface ITableCaption extends TableHTMLAttributes<HTMLTableCaptionElement> {
    captionTable?: string;
}
export declare const TableCaption: React.FC<ITableCaption>;
export interface ITableSortProps extends TableHTMLAttributes<HTMLTableElement> {
    id?: string;
    captionTable?: string;
    className?: string;
    titleColumns?: {
        key: string;
        dataIndex: string;
        title: string;
    }[];
    sourceData?: {
        key: string;
        [key: string]: string;
    }[];
    sortedTable?: (typeSort: string, nameColumn: string) => void;
    colorSortColumn?: boolean;
    arrKeySortAsNumber?: string[];
}
export declare const TableSortTwoButton: React.FC<ITableSortProps>;
export {};
