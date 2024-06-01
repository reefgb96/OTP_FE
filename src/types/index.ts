// React imports
import React from "react";
import {AxiosRequestConfig} from "axios";

// Custom Imports


export type RouteType = {
    path: string,
    element: React.ReactNode
}

export type GenericTextInputProps = {
    value: string;
    onChange: (e: any) => void;
    placeholder?: string;
    type?: string;
    name?: string;
    id?: string;
    className?: string;
    disabled?: boolean;
    error?: boolean;
}

export type ButtonProps = {
    children?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type: string;
}

export type AxiosRequestType = {[index: string]:unknown |AxiosRequestConfig}

export type CountdownProps = {
    minutes: number;
    seconds: number;
    color: string;
}
