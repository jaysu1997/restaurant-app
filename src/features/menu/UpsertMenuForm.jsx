// 用來新增或更新單筆menu數據的表單

import { useFieldArray, useForm } from "react-hook-form";
import useUpsertMenu from "./useUpsertMenu";
import { useLocation, useSearchParams } from "react-router-dom";
import useGetInventory from "../inventory/useGetInventory";
import LoadingSpinner from "../../ui/LoadingSpinner";
import FieldArray from "./FieldArray";
import { useState } from "react";

import FormTable from "../../ui/FormTable";
import { IoCloseSharp } from "react-icons/io5";
import LoadingDotMini from "../../ui/LoadingDotMini";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import InputField from "../../ui/FormInputField";
import FormTypography from "../../ui/FormTypography";
import ControlledSelect from "../../ui/ControlledSelect";
import StyledHotToast from "../../ui/StyledHotToast";

const formFieldData = [
  {
    title: "名稱",
    inputName: "name",
    inputType: "text",
  },
  {
    title: "分類",
    inputName: "category",
    inputType: "text",
  },
  {
    title: "定價",
    inputName: "price",
    inputType: "number",
    min: true,
  },
  {
    title: "折扣",
    inputName: "discount",
    inputType: "number",
    min: true,
    validateValue: true,
  },
];

function UpsertMenuForm({ onCloseModal, menu }) {
  const [newItems, setNewItems] = useState(new Set());
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  const { upsert, isUpserting } = useUpsertMenu();
  const { inventoryData, isPending } = useGetInventory();

  const { register, handleSubmit, control, setValue, getValues, reset } =
    useForm({
      mode: "onSubmit",
      reValidateMode: "onSubmit",
      disabled: isUpserting,
      defaultValues: menu || {
        ingredients: [{ quantity: "" }],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  // 當<CreatableSelect />建立新選項時執行
  function handleCreateNewItems(data, fieldName) {
    // 把新的選項值設置到react hook form的指定欄位中
    setValue(fieldName, { label: data, value: data });
    // 將新選項值投入到Set中(用來避免重複新增新的選項值)
    setNewItems((newItems) => newItems.add(data));
  }

  function onSubmit(data) {
    console.log(data);
    // 新的食材物件
    const newIngredients = {
      ingredientData: [...newItems].map((item) => ({
        label: item,
        value: item,
      })),
    };

    const menuData = { data, newIngredients };

    // 當網路離線時會跳出錯誤訊息，並終止提交表單動作
    if (!navigator.onLine) {
      StyledHotToast({
        type: "error",
        title: "餐點設定失敗",
        content: "目前網路無法使用，請稍後再試。",
      });

      return;
    }

    // 執行表單數據上傳
    upsert(menuData, {
      onSuccess: (data) => {
        menu
          ? StyledHotToast({
              type: "success",
              title: "餐點設定更新成功",
            })
          : StyledHotToast({
              type: "success",
              title: "餐點設定新增成功",
            });
        onCloseModal?.();
        pathname === "/menus" && setSearchParams({});
      },
      onError: (error) => {
        console.log("上傳失敗", error);
        // 確保在上傳supabase失敗後，各個欄位的值不會被清空
        reset(getValues());
      },
    });
  }

  function onError(error) {
    // 透過遍歷取得所有錯誤訊息
    const getAllMessages = (errors) => {
      return Object.keys(errors).flatMap((key) => {
        const error = errors[key];
        if (error.message) {
          return [error.message];
        }
        if (typeof error === "object") {
          return getAllMessages(error);
        }
        return [];
      });
    };

    StyledHotToast({
      type: "error",
      title: "餐點設定失敗",
      content: `${getAllMessages(error).join("， ")}。`,
    });
  }

  return (
    <FormTable onSubmit={handleSubmit(onSubmit, onError)}>
      <FormTypography $titleStyle="description">
        表單說明：
        <FormTypography $titleStyle="highlight">*</FormTypography>
        標記的是必填欄位，必須完成填寫。
      </FormTypography>

      {formFieldData.map((data) => (
        <FormRow $formRowStyle="oneColumn" key={data.inputName}>
          <FormTypography $titleStyle="title">
            {data.title}
            <FormTypography $titleStyle="highlight">*</FormTypography>
          </FormTypography>

          <InputField
            legendValue=""
            type={data.inputType}
            id={data.inputName}
            placeholder={`請輸入餐點${data.title}`}
            {...register(`${data.inputName}`, {
              required: `${data.title}欄位必須填寫`,
              min: data.min
                ? {
                    value: 0,
                    message: `折扣不能為負數`,
                  }
                : undefined,
              validate: data.validateValue
                ? (value) =>
                    Number(value) <= Number(getValues("price")) ||
                    "折扣不能超過定價"
                : undefined,
            })}
          />
        </FormRow>
      ))}

      <FormRow $formRowStyle="twoColumn">
        <FormTypography $titleStyle="title">
          備料
          <FormTypography $titleStyle="highlight">*</FormTypography>
        </FormTypography>
        <FormTypography $titleStyle="description">
          &#8251;
          此欄位用來輸入本餐點需要使用到的食材以及對應數量，以便管理庫存。
        </FormTypography>

        {fields.map((field, index) => {
          if (isPending) return <LoadingSpinner key={field.id} />;

          return (
            <FormRow $formRowStyle="sub" key={field.id}>
              <FormRow $formRowStyle="subHeader">
                <FormTypography $titleStyle="subTitle">
                  備料 {index + 1}.
                </FormTypography>

                {fields.length - 1 !== 0 && (
                  <Button
                    $buttonStyle="remove"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    <IoCloseSharp />
                  </Button>
                )}
              </FormRow>

              <InputField legendValue="食材名稱">
                <ControlledSelect
                  name={`ingredients.${index}.ingredientName`}
                  control={control}
                  rules={{ required: "食材名稱不能空白" }}
                  options={inventoryData}
                  handleCreateNewItems={handleCreateNewItems}
                  creatable={true}
                  disabled={isUpserting}
                />
              </InputField>

              <InputField
                legendValue="使用數量"
                type="number"
                placeholder="請輸入食材使用數量"
                {...register(`ingredients.${index}.quantity`, {
                  required: "使用數量不能空白",
                  min: {
                    value: 1,
                    message: `使用數量不能少於1`,
                  },
                  valueAsNumber: true,
                })}
              />
            </FormRow>
          );
        })}

        <Button
          $buttonStyle="add"
          type="button"
          onClick={() => append({ ingredientName: "", quantity: "" })}
        >
          新增備料
        </Button>
      </FormRow>

      <FormRow $formRowStyle="twoColumn">
        <FieldArray
          control={control}
          register={register}
          inventoryData={inventoryData}
          handleCreateNewItems={handleCreateNewItems}
          disabled={isUpserting}
          getValues={getValues}
        />
      </FormRow>

      <FormRow $formRowStyle="footer">
        <Button
          $buttonStyle="cancel"
          type="button"
          disabled={isUpserting}
          onClick={onCloseModal}
        >
          取消
        </Button>
        <Button $buttonStyle="submit" type="submit" disabled={isUpserting}>
          {isUpserting ? <LoadingDotMini /> : "儲存"}
        </Button>
      </FormRow>
    </FormTable>
  );
}

export default UpsertMenuForm;
