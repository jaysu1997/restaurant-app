import styled from "styled-components";
import ControlledInput from "../../ui/ControlledInput";
import { GoPlus } from "react-icons/go";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useFieldArray, useForm } from "react-hook-form";
import SettingFormSection from "../../ui/SettingFormSection";
import FormErrorsMessage from "../../ui/FormErrorsMessage";
import fadeInAnimation from "../../utils/fadeInAnimation";

const Content = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  li {
    display: grid;
    grid-template-columns: 6rem 1fr 6rem 1fr 2rem 2rem;
    grid-auto-rows: 6rem 3.8rem 2rem 3.8rem;
    row-gap: 0.3rem;
    column-gap: 2rem;
    align-items: center;
  }

  input {
    border: 1px solid #ccc;
    border-radius: 6px;
  }
`;

const SubTitle = styled.h4`
  grid-column: 1 / -1;
  font-size: 1.6rem;
  font-weight: 600;
`;

const EmptyMessage = styled.p`
  color: #b0b0b0;
  font-weight: 500;
`;

const Preview = styled.div`
  grid-column: 1 / 5;
  display: grid;
  grid-template-columns: 6rem 1fr;
  gap: 2rem;
  align-items: center;
  height: 100%;

  div {
    display: flex;
    align-items: center;
    max-width: 61.4rem;
    padding: 0 0.8rem;
    color: #808080;
    border: 1px solid #e6e6e6;
    background-color: #f2f2f2;
    border-radius: 4px;
    height: 100%;
  }

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const AppendButton = styled.button`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #3b82f6;
  font-weight: 500;
  padding: 0.6rem 1.8rem;
  border-radius: 4px;
  background-color: #dbeafe;

  &:hover {
    background-color: #bfdbfe;
  }
`;

function generatePreview(zone, tableCount) {
  if (!tableCount) return;
  return Array.from(
    { length: tableCount },
    (_, i) => `${zone}${zone ? " - " : ""}${i + 1}`
  ).join(" , ");
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
        {fields.length === 0 && (
          <EmptyMessage>目前未提供內用位置(可在下方新增)</EmptyMessage>
        )}

        {fields.map((field, index) => (
          <li key={field.id} id={`dineInTableConfig.${index}`}>
            <SubTitle>內用桌號分區 - {index + 1}</SubTitle>
            <label>分區名稱</label>
            <ControlledInput
              control={control}
              name={`dineInTableConfig.${index}.zone`}
              type="text"
              placeholder="請輸入分區名稱(可留空)"
            />
            <label>桌號數量</label>
            <ControlledInput
              control={control}
              name={`dineInTableConfig.${index}.tableCount`}
              type="number"
              placeholder="請輸入分區總桌數"
              rules={{
                required: "分區總桌數不能空白",
                validate: (value) => {
                  return /^[1-9]\d*$/.test(value) || "請輸入正整數";
                },
              }}
            />
            <button type="button" onClick={() => remove(index)}>
              <MdOutlineDeleteForever size={20} />
            </button>
            <FormErrorsMessage
              fieldName={errors?.dineInTableConfig?.[index]?.zone}
              gridColumn="2"
            />
            <FormErrorsMessage
              fieldName={errors?.dineInTableConfig?.[index]?.tableCount}
              gridColumn="4"
            />
            <Preview>
              <label>分區預覽</label>
              <div>
                <p>
                  {generatePreview(
                    watch(`dineInTableConfig.${index}.zone`),
                    watch(`dineInTableConfig.${index}.tableCount`)
                  )}
                </p>
              </div>
            </Preview>
          </li>
        ))}

        <AppendButton
          type="button"
          onClick={() => {
            append({ zone: "", tableCount: 1 });
            // 淡入欄位動畫
            fadeInAnimation(`dineInTableConfig.${fields.length}`);
          }}
        >
          <GoPlus size={18} strokeWidth={0.6} />
          新增分區
        </AppendButton>
      </Content>
    </SettingFormSection>
  );
}

export default DineInTableSettings;
