// 用來新增或更新單筆menu數據的表單
import { useForm, FormProvider } from "react-hook-form";
import { useRef } from "react";
import Modal from "../../ui/Modal";
import { createNewIngredients } from "./createNewIngredients";
import useGetInventory from "../../hooks/data/inventory/useGetInventory";
import useUpsertMenu from "../../hooks/data/menus/useUpsertMenu";
import QueryStatusFallback from "../../ui/QueryStatusFallback";
import ButtonCancel from "../../ui/ButtonCancel";
import ButtonSubmit from "../../ui/ButtonSubmit";
import styled from "styled-components";
import FormSection from "../../components/FormSection";
import IngredientScetion from "./IngredientScetion";
import CustomizeScetion from "./CustomizeScetion";
import { parsePositiveInt, trimString } from "../../utils/helpers";

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 100%;
  width: 56rem;
  gap: 2rem;
  padding: 2rem;

  @media (max-width: 48em) {
    grid-template-columns: 1fr;
    width: 36rem;
  }
`;

const Footer = styled.footer`
  grid-column: 1 / -1;
  display: flex;
  gap: 2.4rem;
`;

function UpsertMenuForm({ onCloseModal, menu }) {
  const {
    data: inventoryData,
    isPending: inventoryIsPending,
    error: inventoryError,
    isError: inventoryIsError,
  } = useGetInventory();

  const { upsert, isUpserting } = useUpsertMenu();
  const newIngredientRef = useRef(new Map());

  const methods = useForm({
    defaultValues: menu || {
      ingredients: [{ ingredient: "", quantity: "" }],
    },
  });

  const {
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = methods;

  // 當 <CreatableSelect /> 建立新選項時
  function handleCreateNewItems(optionValue, fieldName) {
    let uuid = newIngredientRef.current.get(optionValue);

    if (!uuid) {
      uuid = crypto.randomUUID();
      newIngredientRef.current.set(optionValue, uuid);
    }

    setValue(fieldName, {
      label: optionValue,
      value: optionValue,
      uuid,
    });
  }

  function onSubmit(data) {
    // 要新增到庫存數據表單的新食材
    const newIngredients = createNewIngredients(data, newIngredientRef.current);
    // 排序餐點自訂項目(以便點餐時，必填項目的ui在前面)
    const sortedCustomize = [...data.customize].sort((a, b) => {
      if (a.isRequired === b.isRequired) return 0;
      return a.isRequired === "required" ? -1 : 1;
    });

    // 執行表單數據上傳
    upsert(
      { menuData: { ...data, customize: sortedCustomize }, newIngredients },
      { onSuccess: () => onCloseModal?.() },
    );
  }

  function onError(error) {
    console.log(error);
  }

  const fieldsConfig = [
    {
      heading: "名稱",
      name: "name",
      rules: {
        setValueAs: trimString,
      },
    },
    {
      heading: "分類",
      name: "category",
      rules: {
        setValueAs: trimString,
      },
    },
    {
      heading: "定價",
      name: "price",
      rules: {
        setValueAs: (value) =>
          parsePositiveInt(value, { min: 0, fallback: value }),
        validate: (value) => typeof value === "number" || "請輸入 0 以上的整數",
      },
    },
    {
      heading: "折扣",
      name: "discount",
      rules: {
        setValueAs: (value) =>
          parsePositiveInt(value, { min: 0, fallback: value }),
        validate: (value) => {
          if (typeof value !== "number") return "請輸入 0 以上的整數";
          if (Number(value) > Number(getValues("price")))
            return "折扣不能超過定價";

          return true;
        },
      },
    },
  ];

  return (
    <Modal modalHeader="餐點設定表單" maxWidth={56} onCloseModal={onCloseModal}>
      <QueryStatusFallback
        status={{
          isPending: inventoryIsPending,
          isError: inventoryIsError,
        }}
        errorFallback={inventoryError}
      >
        <FormProvider
          {...methods}
          handleCreateNewItems={handleCreateNewItems}
          isDisabled={isUpserting}
        >
          <StyledForm onSubmit={handleSubmit(onSubmit, onError)}>
            {fieldsConfig.map((field) => (
              <FormSection
                key={field.name}
                heading={{ text: field.heading, as: "h3", required: true }}
                fields={[
                  {
                    type: "input",
                    name: field.name,
                    errors: errors?.[field.name],
                    rules: field.rules,
                  },
                ]}
              />
            ))}

            <IngredientScetion inventoryData={inventoryData} />
            <CustomizeScetion inventoryData={inventoryData} />

            <Footer>
              <ButtonSubmit isLoading={isUpserting} disabled={isUpserting} />
              <ButtonCancel disabled={isUpserting} onClick={onCloseModal} />
            </Footer>
          </StyledForm>
        </FormProvider>
      </QueryStatusFallback>
    </Modal>
  );
}

export default UpsertMenuForm;
