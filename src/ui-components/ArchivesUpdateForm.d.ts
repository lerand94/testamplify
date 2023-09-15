/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Archives } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ArchivesUpdateFormInputValues = {
    image?: string;
    archive?: string;
};
export declare type ArchivesUpdateFormValidationValues = {
    image?: ValidationFunction<string>;
    archive?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ArchivesUpdateFormOverridesProps = {
    ArchivesUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    archive?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ArchivesUpdateFormProps = React.PropsWithChildren<{
    overrides?: ArchivesUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    archives?: Archives;
    onSubmit?: (fields: ArchivesUpdateFormInputValues) => ArchivesUpdateFormInputValues;
    onSuccess?: (fields: ArchivesUpdateFormInputValues) => void;
    onError?: (fields: ArchivesUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ArchivesUpdateFormInputValues) => ArchivesUpdateFormInputValues;
    onValidate?: ArchivesUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ArchivesUpdateForm(props: ArchivesUpdateFormProps): React.ReactElement;
