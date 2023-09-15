/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { StorageManager } from "@aws-amplify/ui-react-storage";
import { Field, getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Archives } from "../models";
import { fetchByPath, processFile, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ArchivesCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    image: "",
    archive: "",
    Field0: undefined,
  };
  const [image, setImage] = React.useState(initialValues.image);
  const [archive, setArchive] = React.useState(initialValues.archive);
  const [Field0, setField0] = React.useState(initialValues.Field0);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setImage(initialValues.image);
    setArchive(initialValues.archive);
    setField0(initialValues.Field0);
    setErrors({});
  };
  const validations = {
    image: [],
    archive: [{ type: "Required" }],
    Field0: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          image,
          archive,
          Field0,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          const modelFieldsToSave = {
            image: modelFields.image,
            archive: modelFields.archive,
          };
          await DataStore.save(new Archives(modelFieldsToSave));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ArchivesCreateForm")}
      {...rest}
    >
      <TextField
        label="Image"
        isRequired={false}
        isReadOnly={false}
        value={image}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              image: value,
              archive,
              Field0,
            };
            const result = onChange(modelFields);
            value = result?.image ?? value;
          }
          if (errors.image?.hasError) {
            runValidationTasks("image", value);
          }
          setImage(value);
        }}
        onBlur={() => runValidationTasks("image", image)}
        errorMessage={errors.image?.errorMessage}
        hasError={errors.image?.hasError}
        {...getOverrideProps(overrides, "image")}
      ></TextField>
      <TextField
        label="Archive"
        isRequired={true}
        isReadOnly={false}
        value={archive}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              image,
              archive: value,
              Field0,
            };
            const result = onChange(modelFields);
            value = result?.archive ?? value;
          }
          if (errors.archive?.hasError) {
            runValidationTasks("archive", value);
          }
          setArchive(value);
        }}
        onBlur={() => runValidationTasks("archive", archive)}
        errorMessage={errors.archive?.errorMessage}
        hasError={errors.archive?.hasError}
        {...getOverrideProps(overrides, "archive")}
      ></TextField>
      <Field
        errorMessage={errors.Field0?.errorMessage}
        hasError={errors.Field0?.hasError}
        label={"Label"}
        isRequired={true}
      >
        <StorageManager
          onUploadSuccess={({ key }) => {
            setField0((prev) => {
              let value = key;
              if (onChange) {
                const modelFields = {
                  image,
                  archive,
                  Field0: value,
                };
                const result = onChange(modelFields);
                value = result?.Field0 ?? value;
              }
              return value;
            });
          }}
          onFileRemove={({ key }) => {
            setField0((prev) => {
              let value = initialValues?.Field0;
              if (onChange) {
                const modelFields = {
                  image,
                  archive,
                  Field0: value,
                };
                const result = onChange(modelFields);
                value = result?.Field0 ?? value;
              }
              return value;
            });
          }}
          processFile={processFile}
          accessLevel={"public"}
          acceptedFileTypes={[]}
          isResumable={false}
          showThumbnails={true}
          maxFileCount={1}
          {...getOverrideProps(overrides, "Field0")}
        ></StorageManager>
      </Field>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
