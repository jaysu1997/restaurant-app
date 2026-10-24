import styled from "styled-components";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import SectionContainer from "../../../components/SectionContainer";
import { LayoutGridCircles } from "lucide-react";
import TableZoneItem from "./TableZoneItem";
import useSubmitSettings from "../../../hooks/data/settings/useSubmitSettings";
import InlineEmptyState from "../../../components/InlineEmptyState";

const TableZoneList = styled.ul`
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
  padding: 0 2.4rem;
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
        headerPlacement="outside"
        title="內用桌號設定"
        description="設定內用分區名稱及各區桌數。"
        onSubmit={handleSubmit(onSubmit)}
        onReset={() => reset()}
        isDirty={isDirty}
        isProcessing={isSubmittingSettings}
        appendButton={{
          label: "新增分區",
          actionFn: () => append({ zoneName: "", tableCount: 1 }),
        }}
      >
        {fields.length === 0 && (
          <InlineEmptyState
            icon={<LayoutGridCircles />}
            title="尚未建立內用分區"
            message="新增分區，設定各區名稱與桌數，方便管理不同用餐區域。"
          />
        )}

        <TableZoneList>
          {fields.map((field, index) => (
            <TableZoneItem
              index={index}
              onRemove={() => remove(index)}
              key={field.id}
            />
          ))}
        </TableZoneList>
      </SectionContainer>
    </FormProvider>
  );
}

export default DineInTableSettings;
