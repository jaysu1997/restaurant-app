// 用來新增或更新單筆menu數據的表單

import { useFieldArray, useForm } from "react-hook-form";
import useUpsertMenu from "./useUpsertMenu";
import { useNavigate } from "react-router-dom";
import useGetInventory from "../inventory/useGetInventory";
import LoadingSpinner from "../../ui/LoadingSpinner";
import FieldArray from "./FieldArray";
import { useState } from "react";

import { Form } from "../../ui/FormTable";
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import LoadingDotMini from "../../ui/LoadingDotMini";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import InputField from "../../ui/FormInputField";
import FormTypography from "../../ui/FormTypography";
import ControlledSelect from "../../ui/ControlledSelect";
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
  },
  {
    title: "折扣",
    inputName: "discount",
    inputType: "number",
    validateValue: true,
  },
];

function UpsertMenuForm({ onCloseModal, menu }) {
  const [newItems, setNewItems] = useState(new Set());
  const navigate = useNavigate();

  const { upsert, isUpserting } = useUpsertMenu();
  const { inventoryData, isPending } = useGetInventory();

  const { register, handleSubmit, control, reset, setValue, getValues } =
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
    // 新的食材物件
    const newIngredients = [...newItems].map((item) => ({
      label: item,
      value: item,
    }));

    // 當網路離線時會跳出錯誤訊息，並終止提交表單動作
    if (!navigator.onLine) {
      toast.error("目前網路無法使用，請稍後再試。");
      return;
    }

    // 執行表單數據上傳
    upsert(
      { data, newIngredients },
      {
        onSuccess: (data) => {
          console.log("成功");
          reset();
          onCloseModal?.();
          navigate("/menus");
        },
        onError: (error) => {
          console.log("上傳失敗");
          console.log(error);
        },
      }
    );
  }

  function onError(error) {
    console.log(error);
    console.log("失敗");
    toast.error(
      "餐點數據提交失敗！請確認是否所有必填欄位都已確實填寫，以及選填欄位是否有輸入框是空白的。"
    );
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
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
              autoComplete="off"
              onWheel={
                data.inputType === "number" ? (e) => e.target.blur() : undefined
              }
              placeholder={`請輸入餐點${data.title}`}
              {...register(`${data.inputName}`, {
                required: `${data.title}欄位必須填寫`,
                validate: data.validateValue
                  ? (value) =>
                      Number(value) <= Number(getValues("price")) ||
                      toast.error("折扣不能超過定價")
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

          {fields.map((fields, index) => {
            if (isPending) return <LoadingSpinner key={fields.id} />;

            return (
              <FormRow $formRowStyle="sub" key={fields.id}>
                <FormRow $formRowStyle="subHeader">
                  <FormTypography $titleStyle="subTitle">
                    備料 {index + 1}.
                  </FormTypography>

                  {index !== 0 && (
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
                    name={`ingredients.${index}.name`}
                    control={control}
                    rules={{ required: "此欄位不能空白" }}
                    options={inventoryData}
                    handleCreateNewItems={handleCreateNewItems}
                    creatable={true}
                    disabled={isUpserting}
                  />
                </InputField>

                <InputField
                  legendValue="使用數量"
                  type="number"
                  autoComplete="off"
                  onWheel={(e) => {
                    e.target.blur();
                  }}
                  placeholder="請輸入食材使用數量"
                  {...register(`ingredients.${index}.quantity`, {
                    required: "此欄位不能空白",
                    valueAsNumber: true,
                  })}
                />
              </FormRow>
            );
          })}

          <Button
            $buttonStyle="add"
            type="button"
            onClick={() => append({ name: "", quantity: "" })}
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
      </Form>
    </>
  );
}

export default UpsertMenuForm;
