/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { StorageManagerProps } from "@aws-amplify/ui-react-storage";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ArchivesCreateFormInputValues = {
    image?: string;
    archive?: string;
    Field0?: string;
};
export declare type ArchivesCreateFormValidationValues = {
    image?: ValidationFunction<string>;
    archive?: ValidationFunction<string>;
    Field0?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ArchivesCreateFormOverridesProps = {
    ArchivesCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    archive?: PrimitiveOverrideProps<TextFieldProps>;
    Field0?: PrimitiveOverrideProps<StorageManagerProps>;
} & EscapeHatchProps;
export declare type ArchivesCreateFormProps = React.PropsWithChildren<{
    overrides?: ArchivesCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ArchivesCreateFormInputValues) => ArchivesCreateFormInputValues;
    onSuccess?: (fields: ArchivesCreateFormInputValues) => void;
    onError?: (fields: ArchivesCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ArchivesCreateFormInputValues) => ArchivesCreateFormInputValues;
    onValidate?: ArchivesCreateFormValidationValues;
} & React.CSSProperties>;
export default function ArchivesCreateForm(props: ArchivesCreateFormProps): React.ReactElement;
