import { useForm } from "react-hook-form";
import FormRow from "../../ui-old/FormRow";
import { useSearchParams } from "react-router-dom";
import StyledHotToast from "../../ui-old/StyledHotToast";
import Modal from "../../ui-old/Modal";
import useUpsertInventory from "../../hooks/data/inventory/useUpsertInventory";
import { FormDescription, FormLayout, FormSection } from "../../ui/FormLayout";
import FormInput from "../../ui/FormInput";
import ButtonSubmit from "../../ui/ButtonSubmit";
import ButtonCancel from "../../ui/ButtonCancel";
import FormFieldLayout from "../../ui/FormFieldLayout";

function UpsertInventoryForm({ inventory, onCloseModal }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: inventory || {},
  });
  const { upsert, isUpserting } = useUpsertInventory();
  const [searchParams, setSearchParams] = useSearchParams();

  function onSubmit(data) {
    console.log(data);
    // 增加value(配合react-select的格式)
    const inventoryData = {
      ...data,
      label: data.label.trim(),
      value: data.label.trim(),
    };

    upsert(inventoryData, {
      onSuccess: () => {
        StyledHotToast({
          type: "success",
          title: `庫存食材設定${inventory ? "更新" : "新增"}成功`,
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
      <FormLayout onSubmit={handleSubmit(onSubmit, onError)}>
        {inventory && (
          <FormDescription>
            表單說明：食材名稱更改後，所有使用此食材的餐點備料和選項也會同步更新名稱。
          </FormDescription>
        )}

        <FormSection>
          <h3>
            食材名稱
            <span className="emphasize">*</span>
          </h3>

          <FormFieldLayout errors={errors?.label}>
            <FormInput
              errors={errors?.label}
              placeholder="請輸入食材名稱"
              {...register("label", {
                required: "食材名稱必須填寫",
              })}
            />
          </FormFieldLayout>
        </FormSection>

        <FormSection>
          <h3>
            庫存數量
            <span className="emphasize">*</span>
          </h3>

          <FormFieldLayout errors={errors?.remainingQuantity}>
            <FormInput
              errors={errors?.remainingQuantity}
              placeholder="請輸入庫存數量"
              {...register("remainingQuantity", {
                required: "庫存數量必須填寫",
                min: {
                  value: 0,
                  message: "庫存數量數量不得為負數",
                },
              })}
            />
          </FormFieldLayout>
        </FormSection>

        <FormRow $formRowStyle="footer">
          <ButtonSubmit disabled={isUpserting} isLoading={isUpserting} />
          <ButtonCancel disabled={isUpserting} onClick={onCloseModal} />
        </FormRow>
      </FormLayout>
    </Modal>
  );
}

export default UpsertInventoryForm;
