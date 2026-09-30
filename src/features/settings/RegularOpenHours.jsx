import styled from "styled-components";
import ControlledSwitch from "../../components/ControlledSwitch";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import ControlledTimeRange from "./ControlledTimeRange";
import useSubmitSettings from "../../hooks/data/settings/useSubmitSettings";
import { normalizeRegularOpenHours } from "./sortTimeSlots";
import SectionContainer from "../../components/SectionContainer";
import { Clock } from "lucide-react";
import SectionForm from "../../components/SectionForm";

const BusinessPeriodList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  font-size: 1.4rem;
`;

const BusinessPeriodItem = styled.li`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr minmax(27.2rem, 1fr);
  column-gap: 3.2rem;
  row-gap: 0.6rem;

  @media (max-width: 35em) {
    grid-template-columns: 1fr;
  }
`;

const DateField = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 3.8rem;
  row-gap: 0.6rem;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 35em) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`;

const DateOfWeek = styled.span`
  color: #374151;
  font-weight: 500;
`;

function RegularOpenHours({ settings }) {
  const { submitSettings, isSubmittingSettings } = useSubmitSettings();

  const { regularOpenHours } = settings;

  const methods = useForm({
    defaultValues: { regularOpenHours },
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isDirty },
    clearErrors,
  } = methods;

  const { fields: dayFields } = useFieldArray({
    control,
    name: "regularOpenHours",
  });

  function onSubmit(data) {
    const normalizedData = normalizeRegularOpenHours(data.regularOpenHours);

    submitSettings(
      { regularOpenHours: normalizedData },
      {
        onSuccess: (newData) =>
          reset({ regularOpenHours: newData.regularOpenHours }),
      },
    );
  }

  return (
    <FormProvider {...methods}>
      <SectionContainer
        header="一般營業時間"
        icon={<Clock />}
        description="設定店鋪的一般營業時間，系統將會根據此設定來顯示當前是否正在營業。"
      >
        <SectionForm
          onSubmit={handleSubmit(onSubmit)}
          onReset={() => reset()}
          isDirty={isDirty}
          isProcessing={isSubmittingSettings}
        >
          <BusinessPeriodList>
            {dayFields.map((day, dayIndex) => (
              <BusinessPeriodItem key={day.id}>
                <DateField>
                  <DateOfWeek>{day.label}</DateOfWeek>

                  <ControlledSwitch
                    options={{
                      name: `regularOpenHours.${dayIndex}.isBusinessDay`,
                      option1: { label: "公休", value: false },
                      option2: { label: "營業", value: true },
                    }}
                    handleChange={() =>
                      clearErrors(`regularOpenHours.${dayIndex}.timeSlots`)
                    }
                  />
                </DateField>

                <ControlledTimeRange
                  control={control}
                  dayIndex={dayIndex}
                  fieldArrayName="regularOpenHours"
                />
              </BusinessPeriodItem>
            ))}
          </BusinessPeriodList>
        </SectionForm>
      </SectionContainer>
    </FormProvider>
  );
}

export default RegularOpenHours;
