// 用來新增或更新單筆menu數據的表單
import { useForm, FormProvider } from "react-hook-form";
import Modal from "../../ui/Modal";
import { toMenuPayload, toMenuForm } from "./utils/menuTransform";
import useSubmitMenuForm from "../../hooks/data/menus/useSubmitMenuForm";
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
  gap: 2.4rem;
  padding: 2rem;
  height: calc(90dvh - 5.6rem);
  overflow-y: auto;
  scrollbar-gutter: stable;

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

function MenuForm({ onCloseModal, menu, inventoryObj }) {
  const { submitMenuForm, isSubmittingMenuForm } = useSubmitMenuForm();

  const formatMenu = toMenuForm(menu, inventoryObj);
  const ingredientOptions = Object.entries(inventoryObj).map(
    ([uuid, value]) => ({
      label: value.name,
      value: uuid,
    }),
  );

  const methods = useForm({ defaultValues: formatMenu });

  const {
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  function onSubmit(data) {
    // 整理好要上傳的數據格式
    const { menuData, newIngredients } = toMenuPayload(data);
    console.log(menuData, newIngredients);

    // 執行表單數據上傳
    submitMenuForm(
      { menuData, newIngredients },
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
      name: "basePrice",
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
          if (Number(value) > Number(getValues("basePrice")))
            return "折扣不能超過定價";

          return true;
        },
      },
    },
  ];

  return (
    <Modal
      modalHeader="餐點設定表單"
      maxWidth={56}
      onClose={onCloseModal}
      scrollBar={false}
    >
      <FormProvider {...methods}>
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

          <IngredientScetion ingredientOptions={ingredientOptions} />
          <CustomizeScetion
            ingredientOptions={[
              { label: "無", value: "", uuid: null },
              ...ingredientOptions,
            ]}
          />

          <Footer>
            <ButtonSubmit
              isProcessing={isSubmittingMenuForm || isSubmitting}
              disabled={isSubmittingMenuForm || isSubmitting}
            />
            <ButtonCancel
              onClick={onCloseModal}
              disabled={isSubmittingMenuForm || isSubmitting}
            />
          </Footer>
        </StyledForm>
      </FormProvider>
    </Modal>
  );
}

export default MenuForm;
