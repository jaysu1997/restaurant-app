import { Controller, useFieldArray } from "react-hook-form";
import NestedFieldArray from "./NestedFieldArray";
import Select from "react-select";
import {
  Title,
  SubRow,
  NestedInput,
  Legend,
  Fieldset,
  SubTitle,
  SubHeader,
  Label,
  RemoveButton,
  Span,
  AddButton,
} from "../../ui/FormTable";

import { IoCloseSharp } from "react-icons/io5";

function FieldArray({
  register,
  control,
  errors,
  isUpserting,
  inventoryData,
  handleCreateNewItems,
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "customize",
  });

  return (
    <>
      <Title>自訂附加細項</Title>
      <Span>
        &#8251;
        此欄位用來自訂本餐點可供客人調整的各種細項。(例如：餐點份量、附餐選擇、餐點加料等等)。
      </Span>
      <Span>
        &#8251;
        此欄位的細目和選項可根據需求進行新增/刪除，但不能留下空白輸入框。
      </Span>

      {fields.map((fields, index) => (
        <SubRow key={fields.id}>
          <SubHeader>
            <SubTitle>自訂細項 {index + 1}.</SubTitle>

            <RemoveButton type="button" onClick={() => remove(index)}>
              <IoCloseSharp />
            </RemoveButton>
          </SubHeader>

          <Fieldset>
            <Legend>細項標題</Legend>
            <NestedInput
              type="text"
              placeholder="請輸入細項標題(例如:冰/熱)"
              autoComplete="off"
              {...register(`customize.${index}.title`, {
                required: "此欄位不能空白",
              })}
            />
          </Fieldset>

          <Fieldset>
            <Legend>此細項是否必填</Legend>
            <Controller
              name={`customize.${index}.required`}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      border: "none",
                      backgroundColor: "inherit",
                      boxShadow: "none",
                      fontSize: "1.4rem",
                      minHeight: "2rem",
                    }),
                  }}
                  options={[
                    {
                      label: `是(此細項為"必填")`,
                      value: true,
                    },
                    {
                      label: `否(此細項為"選填")`,
                      value: false,
                    },
                  ]}
                  isSearchable={false}
                />
              )}
            />
          </Fieldset>

          <Fieldset>
            <Legend>此細項填寫規則</Legend>
            <Controller
              name={`customize.${index}.choice`}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      border: "none",
                      backgroundColor: "inherit",
                      boxShadow: "none",
                      fontSize: "1.4rem",
                      minHeight: "2rem",
                    }),
                  }}
                  options={[
                    {
                      label: `此細項只能"單選"`,
                      value: "radio",
                    },
                    {
                      label: `此細項可以"多選"`,
                      value: "checkbox",
                    },
                  ]}
                  isSearchable={false}
                />
              )}
            />
          </Fieldset>

          <NestedFieldArray
            control={control}
            register={register}
            nestedIndex={index}
            inventoryData={inventoryData}
            handleCreateNewItems={handleCreateNewItems}
          />
        </SubRow>
      ))}

      <AddButton
        type="button"
        onClick={() =>
          append({
            required: {
              label: `是(此細項為"必填")`,
              value: true,
            },
            choice: {
              label: `此細項只能"單選"`,
              value: "radio",
            },
          })
        }
      >
        新增自訂細項
      </AddButton>
    </>
  );
}

export default FieldArray;
