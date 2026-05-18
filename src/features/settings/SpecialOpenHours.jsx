import styled from "styled-components";
import DateRangePicker from "../../ui/DateRangePicker";
import ControlledSwitch from "../../ui/ControlledSwitch";
import ControlledTimeRange from "./ControlledTimeRange";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { addYears, endOfYear, isAfter, isToday } from "date-fns";
import useSubmitSettings from "../../hooks/data/settings/useSubmitSettings";
import { validateDateRangeField } from "./validateOverlap";
import { normalizeSpecialOpenHours } from "./sortTimeSlots";
import StyledHotToast from "../../ui/StyledHotToast";
import SectionContainer from "../../ui/SectionContainer";
import Button from "../../ui/Button";
import { Trash2, CalendarClock } from "lucide-react";
import FormFieldLayout from "../../ui/FormFieldLayout";

const BusinessPeriodList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const BusinessPeriodItem = styled.li`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
  align-items: start;
  border-bottom: 1px solid #e5e7eb;
  padding: 2.4rem 0;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyMessage = styled.p`
  color: #b0b0b0;
  font-weight: 500;
`;

const DateField = styled.div`
  display: grid;
  grid-template-columns: minmax(20rem, 1fr) 2rem;
  column-gap: 0.6rem;
  row-gap: 0.3rem;
`;

// 所有按鈕、select都要加上disabled樣式設計
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

  const overlap = validateDateRangeField(days);

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

  function onError(error) {
    console.log("失敗", error);
    StyledHotToast({ type: "error", title: "設定更新失敗" });
  }

  return (
    <FormProvider {...methods}>
      <SectionContainer
        title="特殊營業時間"
        icon={<CalendarClock size={20} />}
        description="需要臨時調整特定日期的營業時段，可在此處添加設定，設定值會覆蓋一般營業時間。"
        form={{
          formId: "specialOpenHours",
          handleReset: () => reset(),
          isDirty,
          isProcessing: isSubmittingSettings,
        }}
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
        <form id="specialOpenHours" onSubmit={handleSubmit(onSubmit, onError)}>
          <BusinessPeriodList>
            {dayFields.length === 0 && (
              <EmptyMessage>目前沒有設定任何特殊營業時間</EmptyMessage>
            )}

            {dayFields.map((day, dayIndex) => (
              <BusinessPeriodItem key={day.id}>
                <DateField>
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
                          onSelect={(range) =>
                            field.onChange(range ? range : "")
                          }
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

                  <Button $variant="plain" onClick={() => remove(dayIndex)}>
                    <Trash2 />
                  </Button>

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
                </DateField>

                <ControlledTimeRange
                  control={control}
                  dayIndex={dayIndex}
                  fieldArrayName="specialOpenHours"
                />
              </BusinessPeriodItem>
            ))}
          </BusinessPeriodList>
        </form>
      </SectionContainer>
    </FormProvider>
  );
}

export default SpecialOpenHours;
