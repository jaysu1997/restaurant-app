import styled from "styled-components";
import DateRangePicker from "../../../components/DateRangePicker.jsx";
import ControlledSwitch from "../../../components/ControlledSwitch.jsx";
import BusinessHoursTimeSlots from "./BusinessHoursTimeSlots.jsx";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { addYears, endOfYear, isAfter, isToday } from "date-fns";
import useSubmitSettings from "../../../hooks/data/settings/useSubmitSettings.js";
import { getDateRangeOverlapErrors } from "../utils/dateRangeValidation.js";
import { normalizeSpecialOpenHours } from "../utils/timeSlotNormalization.js";
import SectionContainer from "../../../components/SectionContainer.jsx";
import { Trash2, CalendarClock } from "lucide-react";
import FormFieldLayout from "../../../components/FormFieldLayout.jsx";
import IconButton from "../../../components/button/IconButton.jsx";
import InlineEmptyState from "../../../components/InlineEmptyState.jsx";

const BusinessHoursList = styled.ul`
  display: flex;
  flex-direction: column;
  font-size: var(--font-size-sm);
  padding: 0 var(--space-6);
`;

const BusinessHoursItem = styled.li`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 0.8rem;
  row-gap: 1.2rem;
  align-items: start;
  border-bottom: 1px solid #f3f4f6;
  padding: 2.4rem 0;

  @media (max-width: 35em) {
    grid-template-columns: 1fr;
  }
`;

const BusinessDaySettings = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 2rem;
  gap: 0.8rem;
`;

function SpecialOpenHours({ settings }) {
  const { submitSettings, isSubmittingSettings } = useSubmitSettings();

  const { specialOpenHours } = settings;

  const methods = useForm({
    defaultValues: {
      specialOpenHours: specialOpenHours.filter((date) => {
        const start = date.dateRange.to;
        return isToday(start) || isAfter(start, new Date());
      }),
    },
  });

  const {
    handleSubmit,
    reset,
    control,
    clearErrors,
    formState: { isDirty, errors },
  } = methods;

  const {
    fields: dayFields,
    remove,
    append,
  } = useFieldArray({
    control,
    name: "specialOpenHours",
  });

  const days = useWatch({
    control,
    name: "specialOpenHours",
  });

  const overlap = getDateRangeOverlapErrors(days);

  function onSubmit(data) {
    const normalizedData = normalizeSpecialOpenHours(data.specialOpenHours);

    submitSettings(
      { specialOpenHours: normalizedData },
      {
        onSuccess: (newData) =>
          reset({ specialOpenHours: newData.specialOpenHours }),
      },
    );
  }

  return (
    <FormProvider {...methods}>
      <SectionContainer
        headerPlacement="outside"
        title="特殊營業時間"
        description="設定特定日期的營業時間或公休日，並覆蓋每週營業時間。"
        onSubmit={handleSubmit(onSubmit)}
        onReset={() => reset()}
        isDirty={isDirty}
        isProcessing={isSubmittingSettings}
        appendButton={{
          label: "新增日期",
          actionFn: () => {
            append({
              dateRange: "",
              isBusinessDay: true,
              timeSlots: [
                {
                  openTime: { label: "09:00", value: 540 },
                  closeTime: { label: "17:00", value: 1020 },
                },
              ],
            });
          },
        }}
      >
        {dayFields.length === 0 && (
          <InlineEmptyState
            icon={<CalendarClock />}
            title="尚未設定特殊營業時間"
            message="新增特定日期或日期區間，設定營業時段或公休。"
          />
        )}

        <BusinessHoursList>
          {dayFields.map((day, dayIndex) => (
            <BusinessHoursItem key={day.id}>
              <BusinessDaySettings>
                <FormFieldLayout
                  hint="可設定單日或連續日期區間"
                  error={errors?.specialOpenHours?.[dayIndex]?.dateRange}
                >
                  <Controller
                    name={`specialOpenHours.${dayIndex}.dateRange`}
                    control={control}
                    render={({ field }) => (
                      <DateRangePicker
                        defaultMonth={field.value?.from}
                        startMonth={new Date()}
                        endMonth={endOfYear(addYears(new Date(), 5))}
                        selected={field.value}
                        onSelect={(range) => field.onChange(range ? range : "")}
                        onClear={() => field.onChange("")}
                        disabled={{ before: new Date() }}
                        display="popover"
                      />
                    )}
                    rules={{
                      validate: (value) => {
                        if (!value) return "此欄位必須填寫";
                        return overlap[dayIndex] || true;
                      },
                    }}
                  />
                </FormFieldLayout>

                <IconButton onClick={() => remove(dayIndex)}>
                  <Trash2 />
                </IconButton>

                <ControlledSwitch
                  options={{
                    name: `specialOpenHours.${dayIndex}.isBusinessDay`,
                    option1: { label: "公休", value: false },
                    option2: { label: "營業", value: true },
                  }}
                  handleChange={() =>
                    clearErrors(`specialOpenHours.${dayIndex}.timeSlots`)
                  }
                />
              </BusinessDaySettings>

              <BusinessHoursTimeSlots
                control={control}
                dayIndex={dayIndex}
                fieldArrayName="specialOpenHours"
              />
            </BusinessHoursItem>
          ))}
        </BusinessHoursList>
      </SectionContainer>
    </FormProvider>
  );
}

export default SpecialOpenHours;
