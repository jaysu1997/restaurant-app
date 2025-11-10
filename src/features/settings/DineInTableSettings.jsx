import styled from "styled-components";
import { GoPlus } from "react-icons/go";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useFieldArray, useForm } from "react-hook-form";
import { fadeInAnimation } from "../../utils/dom";
import useUpsertSettings from "../../hooks/data/settings/useUpsertSettings";
import StyledHotToast from "../../ui-old/StyledHotToast";
import { generateTableNumbers } from "../../context/settingsHelpers";
import { isValidPositiveInteger } from "../../utils/orderHelpers";
import SectionContainer from "../../ui/SectionContainer";
import { LuUtensils } from "react-icons/lu";
import FormInput from "../../ui/FormInput";
import ButtonAdd from "../../ui/ButtonAdd";

const Content = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  li {
    display: grid;
    grid-template-columns: 1fr 1fr 2rem;
    grid-template-rows: auto auto auto auto;
    column-gap: 0.6rem;
    row-gap: 0.4rem;
    align-items: center;
  }
`;

const SubTitle = styled.h4`
  grid-column: 1 / -1;
  font-size: 1.6rem;
  font-weight: 600;
  color: #3b82f6;
  padding-bottom: 1.2rem;
`;

const EmptyMessage = styled.p`
  color: #b0b0b0;
  font-weight: 500;
`;

const Preview = styled.div`
  grid-column: 1 / -2;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 100%;

  div {
    display: flex;
    align-items: center;
    max-width: 100%;
    min-width: 0;
    padding: 0 0.8rem;
    color: #808080;
    border: 1px solid #e6e6e6;
    background-color: #f2f2f2;
    border-radius: 4px;
    height: 3.8rem;
  }

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const RemoveButton = styled.button`
  color: #383838;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.8rem;

  &:not(:disabled):hover {
    color: #dc2626;
  }
`;

function DineInTableSettings({ data = {} }) {
  const { mutate, isPending } = useUpsertSettings();

  const {
    register,
    control,
    formState: { isDirty, errors },
    handleSubmit,
    reset,
    watch,
    getValues,
  } = useForm({
    defaultValues: { dineInTableConfig: data },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "dineInTableConfig",
  });

  const zoneCount = watch("dineInTableConfig");

  function onSubmit(data) {
    console.log("成功", data);

    mutate(data, {
      onSuccess: (newData) =>
        reset({ dineInTableConfig: newData.dineInTableConfig }),
    });
  }

  function onError(error) {
    console.log("失敗", error);
    StyledHotToast({ type: "error", title: "設定更新失敗" });
  }

  return (
    <SectionContainer
      title="內用桌號設定"
      icon={<LuUtensils />}
      caption="設定內用餐桌的區域分類與桌號配置，用於點餐時標記內用桌位。"
      form={{
        formId: "dineInTableConfig",
        handleReset: () => reset({ dineInTableConfig: data }),
        isDirty,
        isUpdating: isPending,
      }}
      additionalAction={
        <ButtonAdd
          onClick={() => {
            append({ zoneName: "", tableCount: 1 });
            // 淡入欄位動畫
            fadeInAnimation(`dineInTableConfig.${fields.length}`);
          }}
        >
          <GoPlus size={18} strokeWidth={0.6} />
          新增分區
        </ButtonAdd>
      }
    >
      <form id="dineInTableConfig" onSubmit={handleSubmit(onSubmit, onError)}>
        <Content>
          {fields.length === 0 && (
            <EmptyMessage>目前未提供內用位置(可在下方新增)</EmptyMessage>
          )}

          {fields.map((field, index) => (
            <li key={field.id} id={`dineInTableConfig.${index}`}>
              <SubTitle>
                內用桌號分區{zoneCount.length === 1 ? "" : ` - ${index + 1}`}
              </SubTitle>

              <FormInput
                label="分區名稱"
                id={`${index}.zoneName`}
                type="text"
                placeholder="分區名稱"
                {...register(`dineInTableConfig.${index}.zoneName`, {
                  validate: (value) => {
                    const trimmedValue = value.trim();
                    const zones = getValues("dineInTableConfig");

                    const duplicate = zones.some((zone, zoneIndex) => {
                      if (zoneIndex === index) return false; // ← 重點：略過自己
                      return zone.zoneName.trim() === trimmedValue;
                    });

                    return !duplicate || "此名稱已被使用";
                  },
                })}
                errors={errors?.dineInTableConfig?.[index]?.zoneName}
              />

              <FormInput
                label="分區桌數"
                id={`${index}.tableCount`}
                type="number"
                placeholder="分區總桌數"
                {...register(`dineInTableConfig.${index}.tableCount`, {
                  required: "總桌數不能空白",
                  validate: (value) => {
                    return isValidPositiveInteger(value, "請輸入正整數");
                  },
                })}
                errors={errors?.dineInTableConfig?.[index]?.tableCount}
              />

              <RemoveButton type="button" onClick={() => remove(index)}>
                <MdOutlineDeleteForever size={20} />
              </RemoveButton>

              <Preview>
                <label>桌號預覽</label>
                <div>
                  <p>
                    {generateTableNumbers(
                      watch(`dineInTableConfig.${index}.zoneName`),
                      watch(`dineInTableConfig.${index}.tableCount`)
                    ).join(" , ")}
                  </p>
                </div>
              </Preview>
            </li>
          ))}
        </Content>
      </form>
    </SectionContainer>
  );
}

export default DineInTableSettings;
