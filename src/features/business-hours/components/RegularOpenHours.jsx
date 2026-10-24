import styled from "styled-components";
import ControlledSwitch from "../../../components/ControlledSwitch.jsx";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import BusinessHoursTimeSlots from "./BusinessHoursTimeSlots.jsx";
import useSubmitSettings from "../../../hooks/data/settings/useSubmitSettings.js";
import { normalizeRegularOpenHours } from "../utils/timeSlotNormalization.js";
import SectionContainer from "../../../components/SectionContainer.jsx";

const BusinessHoursList = styled.ul`
  display: flex;
  flex-direction: column;
  font-size: var(--font-size-sm);
  padding: 0 2.4rem;
`;

const BusinessHoursItem = styled.li`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr minmax(27.2rem, 1fr);
  column-gap: 3.6rem;
  row-gap: 0.8rem;
  padding: 1.6rem 0;

  & + & {
    border-top: 1px solid #f3f4f6;
  }

  @media (max-width: 35em) {
    grid-template-columns: 1fr;
    padding: 1.6rem 0 2.4rem;
  }
`;

const BusinessDayRow = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 4.2rem;
  gap: 0.8rem;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 35em) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`;

const WeekdayLabel = styled.span`
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
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
        headerPlacement="outside"
        title="每週營業時間"
        description="設定每週各日的固定營業時段。"
        onSubmit={handleSubmit(onSubmit)}
        onReset={() => reset()}
        isDirty={isDirty}
        isProcessing={isSubmittingSettings}
      >
        <BusinessHoursList>
          {dayFields.map((day, dayIndex) => (
            <BusinessHoursItem key={day.id}>
              <BusinessDayRow>
                <WeekdayLabel>{day.label}</WeekdayLabel>

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
              </BusinessDayRow>

              <BusinessHoursTimeSlots
                control={control}
                dayIndex={dayIndex}
                fieldArrayName="regularOpenHours"
              />
            </BusinessHoursItem>
          ))}
        </BusinessHoursList>
      </SectionContainer>
    </FormProvider>
  );
}

export default RegularOpenHours;
