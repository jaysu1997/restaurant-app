// 用來新增或更新單筆menu數據的表單
import { useFieldArray, useForm, FormProvider } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import FieldArray from "./FieldArray";
import FormTable from "../../ui-old/FormTable";
import { IoCloseSharp } from "react-icons/io5";
import ButtonSpinner from "../../ui/ButtonSpinner";
import Button from "../../ui-old/Button";
import FormRow from "../../ui-old/FormRow";
import FormTypography from "../../ui-old/FormTypography";
import ControlledSelect from "../../ui-old/ControlledSelect";
import StyledHotToast from "../../ui-old/StyledHotToast";
import { useRef } from "react";
import FormFieldset from "../../ui-old/FormFieldset";
import ControlledInput from "../../ui-old/ControlledInput";
import Modal from "../../ui-old/Modal";
import { createNewIngredients } from "./createNewIngredients";
import useGetInventory from "../../hooks/data/inventory/useGetInventory";
import useUpsertMenu from "../../hooks/data/menus/useUpsertMenu";
import QueryStatusFallback from "../../ui-old/QueryStatusFallback";
import { fadeInAnimation } from "../../utils/dom";

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
  const {
    inventoryData,
    inventoryIsPending,
    inventoryError,
    inventoryIsError,
  } = useGetInventory();

  const [searchParams, setSearchParams] = useSearchParams();
  const { upsert, isUpserting } = useUpsertMenu();
  const newIngredientRef = useRef(new Map());

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    criteriaMode: "all",
    disabled: isUpserting,
    defaultValues: menu || {
      name: "",
      category: "",
      price: "",
      discount: "",
      ingredients: [{ ingredientName: "", quantity: "" }],
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
    newIngredientRef.current.set(fieldName, data);
  }

  function onSubmit(data) {
    const newIngredients = createNewIngredients({
      getValues,
      newIngredientsMap: newIngredientRef.current,
    });

    const upsertData = {
      menuData: {
        ...data,
        name: data.name.trim(),
        category: data.category.trim(),
      },
      newIngredients,
    };

    // 執行表單數據上傳
    upsert(upsertData, {
      onSuccess: () => {
        StyledHotToast({
          type: "success",
          title: `餐點設定${menu ? "更新" : "新增"}成功`,
        });
        onCloseModal?.();
        searchParams.delete("category");
        searchParams.delete("name");
        setSearchParams(searchParams);
      },
    });
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <Modal modalHeader="餐點設定表單" maxWidth={56} onCloseModal={onCloseModal}>
      <QueryStatusFallback
        isPending={inventoryIsPending}
        isError={inventoryIsError}
        error={inventoryError}
      >
        <FormProvider
          register={register}
          control={control}
          getValues={getValues}
          errors={errors}
        >
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

                <FormFieldset
                  legendValue=""
                  fieldName={errors?.[data.inputName]}
                >
                  <ControlledInput
                    type={data.inputType}
                    placeholder={`請輸入餐點${data.title}`}
                    control={control}
                    name={data.inputName}
                    rules={{
                      required: `${data.title}欄位必須填寫`,
                      min: data.min
                        ? {
                            value: 0,
                            message: `折扣和定價不能為負數`,
                          }
                        : undefined,
                      validate: data.validateValue
                        ? (value) =>
                            Number(value) <= Number(getValues("price")) ||
                            "折扣不能超過定價"
                        : undefined,
                    }}
                  />
                </FormFieldset>
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

              {fields.map((field, index) => (
                <FormRow
                  $formRowStyle="sub"
                  key={field.id}
                  id={`ingredients.${index}`}
                >
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

                  <FormFieldset
                    legendValue="食材名稱"
                    fieldName={errors?.ingredients?.[index]?.ingredientName}
                  >
                    <ControlledSelect
                      name={`ingredients.${index}.ingredientName`}
                      control={control}
                      rules={{ required: "食材名稱不能空白" }}
                      options={inventoryData}
                      handleCreateNewItems={handleCreateNewItems}
                      creatable={true}
                      placeholder="選擇現有食材或輸入新食材"
                      disabled={isUpserting}
                    />
                  </FormFieldset>

                  <FormFieldset
                    legendValue="使用數量"
                    fieldName={errors?.ingredients?.[index]?.quantity}
                  >
                    <ControlledInput
                      type="number"
                      placeholder="請輸入食材使用數量"
                      control={control}
                      name={`ingredients.${index}.quantity`}
                      rules={{
                        required: "使用數量不能空白",
                        min: {
                          value: 1,
                          message: `使用數量不能少於1`,
                        },
                      }}
                    />
                  </FormFieldset>
                </FormRow>
              ))}

              <Button
                $buttonStyle="add"
                type="button"
                onClick={() => {
                  append({
                    ingredientName: "",
                    quantity: "",
                  });
                  // 淡入欄位動畫
                  fadeInAnimation(`ingredients.${fields.length}`);
                }}
              >
                新增備料
              </Button>
            </FormRow>

            <FormRow $formRowStyle="twoColumn">
              <FieldArray
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
              <Button
                $buttonStyle="submit"
                type="submit"
                disabled={isUpserting}
              >
                {isUpserting ? <ButtonSpinner /> : "儲存"}
              </Button>
            </FormRow>
          </FormTable>
        </FormProvider>
      </QueryStatusFallback>
    </Modal>
  );
}

export default UpsertMenuForm;
