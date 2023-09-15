/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PostCreateFormInputValues = {
    title?: string;
    body?: string;
    images?: string[];
    date?: string;
    link?: string;
    linkFan?: string;
    country?: string;
    archive?: string;
};
export declare type PostCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    body?: ValidationFunction<string>;
    images?: ValidationFunction<string>;
    date?: ValidationFunction<string>;
    link?: ValidationFunction<string>;
    linkFan?: ValidationFunction<string>;
    country?: ValidationFunction<string>;
    archive?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PostCreateFormOverridesProps = {
    PostCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    body?: PrimitiveOverrideProps<TextFieldProps>;
    images?: PrimitiveOverrideProps<TextFieldProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    link?: PrimitiveOverrideProps<TextFieldProps>;
    linkFan?: PrimitiveOverrideProps<TextFieldProps>;
    country?: PrimitiveOverrideProps<TextFieldProps>;
    archive?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PostCreateFormProps = React.PropsWithChildren<{
    overrides?: PostCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PostCreateFormInputValues) => PostCreateFormInputValues;
    onSuccess?: (fields: PostCreateFormInputValues) => void;
    onError?: (fields: PostCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PostCreateFormInputValues) => PostCreateFormInputValues;
    onValidate?: PostCreateFormValidationValues;
} & React.CSSProperties>;
export default function PostCreateForm(props: PostCreateFormProps): React.ReactElement;
