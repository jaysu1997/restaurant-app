import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import styled from "styled-components";
import ControlledSelect from "../../ui/ControlledSelect";
import { checkOverlapConflicts, validateValues } from "./validateOverlap";
import { generateTimeOptions } from "../../context/settings/settingsHelpers";
import { endOfDay, startOfDay } from "date-fns";
import { Trash2, Plus, Minus } from "lucide-react";
import FormFieldLayout from "../../ui/FormFieldLayout";
import Button from "../../ui/Button";

const StyledTimeRange = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 0.3rem;

  li {
    display: grid;
    grid-template-columns: minmax(7.8rem, 1fr) 1.4rem minmax(7.8rem, 1fr) 2rem;
    /* grid-template-rows: 3.8rem auto; */
    align-items: center;
    column-gap: 0.6rem;
  }
`;

// 一天的時段(每5分鐘一個選項)
const times = generateTimeOptions(
  startOfDay(new Date(2025, 0, 1)),
  endOfDay(new Date(2025, 0, 1)),
);

function validateTimeSlotField({
  fieldArrayName,
  isBusinessDay,
  dayIndex,
  setError,
  clearErrors,
  getValues,
}) {
  if (!isBusinessDay) return;

  const path = `${fieldArrayName}.${dayIndex}.timeSlots`;
  const slots = getValues(path);

  const normalizeData = slots.map((slot) => {
    const { openTime, closeTime } = slot;

    return {
      start: openTime?.value,
      end: closeTime?.value,
    };
  });

  // 進行欄位檢查(不能空值或是休息時間比開始時間早)，並回傳通過檢查的時段
  const validSlots = validateValues({
    normalizeData,
    path,
    setError,
    clearErrors,
    dataType: "time",
  });

  // 驗證時段之間是否有重疊
  checkOverlapConflicts({ validSlots, path, setError });
}

function ControlledTimeRange({ dayIndex, fieldArrayName }) {
  const {
    getValues,
    formState: { errors },
    setError,
    clearErrors,
    control,
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `${fieldArrayName}.${dayIndex}.timeSlots`,
  });

  // 當天有營業
  const isBusinessDay = useWatch({
    control,
    name: `${fieldArrayName}.${dayIndex}.isBusinessDay`,
  });

  // 驗證函式
  const validateFn = () =>
    validateTimeSlotField({
      fieldArrayName,
      isBusinessDay,
      dayIndex,
      setError,
      clearErrors,
      getValues,
    });

  return (
    <StyledTimeRange>
      {fields.map((field, slotIndex) => (
        <FormFieldLayout
          key={field.id}
          error={
            errors?.[fieldArrayName]?.[dayIndex]?.timeSlots?.[slotIndex]
              ?.errorFallback
          }
        >
          <li id={`${fieldArrayName}.${dayIndex}.timeSlots.${slotIndex}`}>
            <ControlledSelect
              options={times}
              name={`${fieldArrayName}.${dayIndex}.timeSlots.${slotIndex}.openTime`}
              creatable={false}
              placeholder="開始時間"
              disabled={!isBusinessDay}
              rules={{
                validate: validateFn,
              }}
            />

            <Minus className="icon-sm" />

            <ControlledSelect
              options={times}
              name={`${fieldArrayName}.${dayIndex}.timeSlots.${slotIndex}.closeTime`}
              creatable={false}
              placeholder="休息時間"
              disabled={!isBusinessDay}
              rules={{
                validate: validateFn,
              }}
            />

            {slotIndex === 0 && (
              <Button
                $variant="plain"
                $hoverColor="#2563eb"
                onClick={() => append({ openTime: "", closeTime: "" })}
              >
                <Plus strokeWidth={2.4} />
              </Button>
            )}

            {slotIndex !== 0 && (
              <Button
                $variant="plain"
                title="清除這個時段的時間"
                disabled={fields.length === 1}
                onClick={() => {
                  remove(slotIndex);

                  // 需要執行validateFn，確保會重新驗證重疊的錯誤是否還存在(但是這樣好像也會變成提早驗證其他欄位，所以或許需要再考慮看看?)，或許應該刪除
                  fields.length > 1 && validateFn();
                }}
              >
                <Trash2 />
              </Button>
            )}
          </li>
        </FormFieldLayout>
      ))}
    </StyledTimeRange>
  );
}

export default ControlledTimeRange;
