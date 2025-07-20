import styled from "styled-components";
import ControlledInput from "../../ui/ControlledInput";
import { GoPlus } from "react-icons/go";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useFieldArray, useForm } from "react-hook-form";
import SettingFormSection from "../../ui/SettingFormSection";
import FormErrorsMessage from "../../ui/FormErrorsMessage";

const Content = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  li {
    display: grid;
    grid-template-columns: 6rem 1fr 6rem 1fr 2rem 2rem;
    grid-auto-rows: auto;
    row-gap: 1rem;
    column-gap: 2rem;
    align-items: center;
  }

  input {
    border: 1px solid #ccc;
    border-radius: 6px;
  }
`;

const Preview = styled.div`
  grid-column: 2 / -3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 0.8rem;
`;

const AppendButton = styled.button`
  justify-self: start;
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

function generatePreview(zone, tableCount) {
  if (!zone) return;
  return Array.from({ length: tableCount }, (_, i) => `${zone}-${i + 1}`).join(
    "、"
  );
}

function DineInTableSettings() {
  const data = [{ zone: "", tableCount: 0 }];

  const {
    control,
    formState: { isDirty, errors },
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues: { dineInTableConfig: data },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "dineInTableConfig",
  });

  function onSubmit(data) {
    console.log("成功", data);
  }

  function onError(error) {
    console.log("失敗", error);
  }

  return (
    <SettingFormSection
      title="內用桌號設定"
      description="設定內用餐桌的區域分類與桌號配置，用於點餐時標記內用桌位。"
      handleSubmit={handleSubmit(onSubmit, onError)}
      handleReset={() => reset({ regularOpenHours: data })}
      isDirty={isDirty}
    >
      <Content>
        {fields.map((field, index) => (
          <li key={field.id}>
            {/* <h4>分區設定{dayIndex + 1}</h4> */}
            <label>分區名稱</label>
            <ControlledInput
              control={control}
              name={`dineInTableConfig.${index}.zone`}
              type="text"
              placeholder="請輸入分區名稱"
              rules={{
                required: "分區名稱不能空白",
              }}
            />

            <label>桌號數量</label>
            <ControlledInput
              control={control}
              name={`dineInTableConfig.${index}.tableCount`}
              type="number"
              placeholder="請輸入分區總桌數"
              rules={{
                required: "分區總桌數不能空白",
              }}
            />
            <button
              type="button"
              onClick={() => {
                fields.length < 2
                  ? setValue("dineInTableConfig", [
                      { zone: "", tableCount: "" },
                    ])
                  : remove(index);
              }}
            >
              <MdOutlineDeleteForever size={20} />
            </button>
            <div />

            <FormErrorsMessage
              fieldName={errors?.dineInTableConfig?.[index]?.zone}
            />

            <FormErrorsMessage
              fieldName={errors?.dineInTableConfig?.[index]?.tableCount}
            />

            <label>分區預覽</label>
            <Preview>
              {generatePreview(
                watch(`dineInTableConfig.${index}.zone`),
                watch(`dineInTableConfig.${index}.tableCount`)
              )}
            </Preview>
          </li>
        ))}

        <AppendButton
          type="button"
          onClick={() => append({ zone: "", tableCount: 1 })}
        >
          新增分區
          <GoPlus size={18} />
        </AppendButton>
      </Content>
    </SettingFormSection>
  );
}

export default DineInTableSettings;
