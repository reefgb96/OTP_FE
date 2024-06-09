// React imports
import {UseQueryOptions, UseQueryResult} from "react-query";
import {ChangeEvent, FormEvent} from "react";

// Custom Imports


export type BasePageProps = {
    title: string,
    subTitle?: string,
    placeholder: string,
    key: string,
    name: string,
    errorMsgColor: string,
    errorMessage: string,
    inputType?: string,
    inputValue: string,
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
    inputValidation (inputValue: string): boolean,
    apiCall (options: Omit<UseQueryOptions<any, unknown, any, string>, "queryKey" | "queryFn">, inputValue?: string):  UseQueryResult<any, unknown>,
    onSubmit (e: FormEvent<HTMLFormElement>): void,
    renderCountdown?: boolean,
};
