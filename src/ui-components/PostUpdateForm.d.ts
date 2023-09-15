/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Post } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PostUpdateFormInputValues = {
    title?: string;
    body?: string;
    images?: string[];
    date?: string;
    link?: string;
    linkFan?: string;
    country?: string;
    archive?: string;
};
export declare type PostUpdateFormValidationValues = {
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
export declare type PostUpdateFormOverridesProps = {
    PostUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    body?: PrimitiveOverrideProps<TextFieldProps>;
    images?: PrimitiveOverrideProps<TextFieldProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    link?: PrimitiveOverrideProps<TextFieldProps>;
    linkFan?: PrimitiveOverrideProps<TextFieldProps>;
    country?: PrimitiveOverrideProps<TextFieldProps>;
    archive?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PostUpdateFormProps = React.PropsWithChildren<{
    overrides?: PostUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    post?: Post;
    onSubmit?: (fields: PostUpdateFormInputValues) => PostUpdateFormInputValues;
    onSuccess?: (fields: PostUpdateFormInputValues) => void;
    onError?: (fields: PostUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PostUpdateFormInputValues) => PostUpdateFormInputValues;
    onValidate?: PostUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PostUpdateForm(props: PostUpdateFormProps): React.ReactElement;
