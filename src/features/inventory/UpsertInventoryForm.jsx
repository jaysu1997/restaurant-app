import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import StyledHotToast from "../../ui-old/StyledHotToast";
import Modal from "../../ui-old/Modal";
import useUpsertInventory from "../../hooks/data/inventory/useUpsertInventory";
import ButtonSubmit from "../../ui/ButtonSubmit";
import ButtonCancel from "../../ui/ButtonCancel";
import styled from "styled-components";
import FormSection from "../../components/FormSection";
import { parsePositiveInt } from "../../utils/helpers";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  width: 36rem;
  gap: 2.4rem;
  padding: 2rem;
`;

const Footer = styled.footer`
  display: flex;
  gap: 2.4rem;
`;

function UpsertInventoryForm({ inventory, onCloseModal }) {
  const isEdit = inventory ? true : false;
  const methods = useForm({
    defaultValues: inventory || {},
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const { upsert, isUpserting } = useUpsertInventory();
  const [searchParams, setSearchParams] = useSearchParams();

  function onSubmit(data) {
    console.log(data);
    // 增加value(配合react-select的格式)
    const inventoryData = {
      ...data,
      label: data.label,
      value: data.label,
    };

    upsert(inventoryData, {
      onSuccess: () => {
        StyledHotToast({
          type: "success",
          title: `庫存食材設定${isEdit ? "更新" : "新增"}成功`,
        });

        onCloseModal?.();
        searchParams.delete("quantity");
        searchParams.delete("name");
        setSearchParams(searchParams);
      },
    });
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <Modal modalHeader="食材設定表單" maxWidth={56} onCloseModal={onCloseModal}>
      <StyledForm onSubmit={handleSubmit(onSubmit, onError)}>
        <FormProvider {...methods} isDisabled={isUpserting}>
          <FormSection
            descriptions={
              isEdit
                ? [
                    "食材名稱變更後，所有使用此食材的餐點備料與選項將自動更新為新名稱，無需個別調整餐點設定。",
                  ]
                : null
            }
          >
            <FormSection
              heading={{ text: "食材名稱", required: true }}
              fields={[
                {
                  type: "input",
                  name: "label",
                  errors: errors?.label,
                  rules: {
                    setValueAs: (value) => value.trim(),
                  },
                },
              ]}
            />

            <FormSection
              heading={{ text: "庫存數量", required: true }}
              fields={[
                {
                  type: "input",
                  name: "remainingQuantity",
                  errors: errors?.remainingQuantity,
                  rules: {
                    setValueAs: (value) =>
                      parsePositiveInt(value, { min: 0, fallback: value }),
                    validate: (value) =>
                      typeof value === "number" || "請輸入 0 以上的整數",
                  },
                },
              ]}
            />
          </FormSection>

          <Footer>
            <ButtonSubmit disabled={isUpserting} isLoading={isUpserting} />
            <ButtonCancel disabled={isUpserting} onClick={onCloseModal} />
          </Footer>
        </FormProvider>
      </StyledForm>
    </Modal>
  );
}

export default UpsertInventoryForm;
