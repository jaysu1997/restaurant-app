// 用來新增或更新單筆menu數據的表單
import { useFieldArray, useForm, FormProvider } from "react-hook-form";
import FieldArray from "./FieldArray";
import ControlledSelect from "../../ui-old/ControlledSelect";
import StyledHotToast from "../../ui-old/StyledHotToast";
import { useRef } from "react";
import Modal from "../../ui-old/Modal";
import { createNewIngredients } from "./createNewIngredients";
import useGetInventory from "../../hooks/data/inventory/useGetInventory";
import useUpsertMenu from "../../hooks/data/menus/useUpsertMenu";
import QueryStatusFallback from "../../ui-old/QueryStatusFallback";
import { fadeInAnimation } from "../../utils/dom";
import {
  FormDescription,
  FormHeading,
  FormLayout,
  FormList,
  FormSection,
  FromListItem,
  FormRow,
} from "../../ui/FormLayout";
import FormInput from "../../ui/FormInput";
import ButtonCancel from "../../ui/ButtonCancel";
import ButtonSubmit from "../../ui/ButtonSubmit";
import { Plus, Trash2 } from "lucide-react";
import Button from "../../ui/Button";
import FormFieldLayout from "../../ui/FormFieldLayout";

function UpsertMenuForm({ onCloseModal, menu }) {
  const {
    inventoryData,
    inventoryIsPending,
    inventoryError,
    inventoryIsError,
  } = useGetInventory();

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
    disabled: isUpserting,
    defaultValues: menu || {
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
          <FormLayout onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow>
              <FormHeading>
                名稱<span className="emphasize">*</span>
              </FormHeading>
              <FormFieldLayout errors={errors?.name}>
                <FormInput
                  placeholder="請輸入餐點名稱"
                  {...register("name", {
                    required: "此欄位必須填寫",
                  })}
                />
              </FormFieldLayout>

              <FormHeading>
                分類<span className="emphasize">*</span>
              </FormHeading>
              <FormFieldLayout errors={errors?.category}>
                <FormInput
                  placeholder="請輸入餐點分類"
                  {...register("category", {
                    required: "此欄位必須填寫",
                  })}
                />
              </FormFieldLayout>

              <FormHeading>
                定價<span className="emphasize">*</span>
              </FormHeading>
              <FormFieldLayout errors={errors?.price}>
                <FormInput
                  placeholder="請輸入餐點定價"
                  {...register("price", {
                    required: "此欄位必須填寫",
                    validate: (value) =>
                      /^[0-9]+$/.test(value) || "請輸入 0 以上的整數",
                  })}
                />
              </FormFieldLayout>

              <FormHeading>
                折扣<span className="emphasize">*</span>
              </FormHeading>
              <FormFieldLayout errors={errors?.discount}>
                <FormInput
                  placeholder="請輸入餐點折扣"
                  {...register("discount", {
                    required: "此欄位必須填寫",
                    validate: (value) => {
                      if (!/^[0-9]+$/.test(value)) return "請輸入 0 以上的整數";
                      if (Number(value) > Number(getValues("price")))
                        return "折扣不能超過定價";

                      return true;
                    },
                  })}
                />
              </FormFieldLayout>
            </FormRow>

            <FormRow>
              <FormHeading>
                備料
                <span className="emphasize">*</span>
              </FormHeading>
            </FormRow>

            <FormRow>
              <FormDescription>
                &#8251;
                此欄位用來輸入本餐點需要使用到的食材以及對應數量，以便管理庫存。
              </FormDescription>
            </FormRow>

            {fields.map((field, index) => (
              <FormRow key={field.id} id={`ingredients.${index}`}>
                <FormHeading as="h4">
                  備料 {index + 1}
                  {fields.length - 1 !== 0 && (
                    <Button $variant="ghost" onClick={() => remove(index)}>
                      <Trash2 size={16} />
                    </Button>
                  )}
                </FormHeading>

                <FormFieldLayout
                  label="食材名稱"
                  errors={errors?.ingredients?.[index]?.ingredientName}
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
                </FormFieldLayout>

                <FormFieldLayout
                  id={`ingredients.${index}.quantity`}
                  label="使用數量"
                  errors={errors?.ingredients?.[index]?.quantity}
                >
                  <FormInput
                    id={`ingredients.${index}.quantity`}
                    placeholder="請輸入食材使用數量"
                    {...register(`ingredients.${index}.quantity`, {
                      required: "使用數量不能空白",
                      min: {
                        value: 1,
                        message: `使用數量不能少於1`,
                      },
                    })}
                  />
                </FormFieldLayout>
              </FormRow>
            ))}

            <Button
              $variant="text"
              onClick={() => {
                append({
                  ingredientName: "",
                  quantity: "",
                });
                // 淡入欄位動畫
                fadeInAnimation(`ingredients.${fields.length}`);
              }}
            >
              <Plus size={18} />
              新增備料
            </Button>

            <FieldArray
              inventoryData={inventoryData}
              handleCreateNewItems={handleCreateNewItems}
              disabled={isUpserting}
            />

            <FormRow>
              <ButtonSubmit isLoading={isUpserting} disabled={isUpserting} />
              <ButtonCancel disabled={isUpserting} onClick={onCloseModal} />
            </FormRow>
          </FormLayout>
        </FormProvider>
      </QueryStatusFallback>
    </Modal>
  );
}

export default UpsertMenuForm;
