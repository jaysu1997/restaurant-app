import styled from "styled-components";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import useSubmitSettings from "../../hooks/data/settings/useSubmitSettings";
import SectionContainer from "../../components/SectionContainer";
import { Utensils } from "lucide-react";
import TableZoneItem from "./components/TableZoneItem";

const Fields = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  font-size: 1.4rem;

  li {
    display: grid;
    grid-template-columns: 1fr 1fr 2rem;
    grid-template-rows: auto auto auto auto;
    column-gap: 0.6rem;
    row-gap: 0.4rem;
    align-items: center;
  }

  label {
    color: #525252;
    font-weight: 500;
  }
`;

const EmptyMessage = styled.p`
  color: #b0b0b0;
  font-weight: 500;
`;

function DineInTableSettings({ settings }) {
  const { submitSettings, isSubmittingSettings } = useSubmitSettings();

  const { dineInTableConfig } = settings;

  const methods = useForm({
    defaultValues: { dineInTableConfig },
  });

  const {
    control,
    formState: { isDirty },
    handleSubmit,
    reset,
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "dineInTableConfig",
  });

  function onSubmit(data) {
    submitSettings(data, {
      onSuccess: (newData) =>
        reset({ dineInTableConfig: newData.dineInTableConfig }),
    });
  }

  return (
    <FormProvider {...methods}>
      <SectionContainer
        header={{
          title: "內用桌號設定",
          icon: <Utensils />,
          description:
            "設定內用餐桌的區域分類與桌號配置，用於點餐時標記內用桌位。",
        }}
        onSubmit={handleSubmit(onSubmit)}
        onReset={() => reset()}
        isDirty={isDirty}
        isProcessing={isSubmittingSettings}
        appendButton={{
          label: "新增分區",
          actionFn: () => append({ zoneName: "", tableCount: 1 }),
        }}
      >
        <Fields>
          {fields.length === 0 && (
            <EmptyMessage>目前未提供內用位置(可在下方新增)</EmptyMessage>
          )}

          {fields.map((field, index) => (
            <TableZoneItem
              index={index}
              onRemove={() => remove(index)}
              key={field.id}
            />
          ))}
        </Fields>
      </SectionContainer>
    </FormProvider>
  );
}

export default DineInTableSettings;
