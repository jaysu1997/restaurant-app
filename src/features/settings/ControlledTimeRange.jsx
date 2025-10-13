import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import styled from "styled-components";
import { MdAdd, MdHorizontalRule, MdOutlineDelete } from "react-icons/md";
import { Fragment } from "react";
import ControlledSelect from "../../ui-old/ControlledSelect";
import FormErrorsMessage from "../../ui-old/FormErrorsMessage";
import { checkOverlapConflicts, validateValues } from "./validateOverlap";
import fadeInAnimation from "../../utils/fadeInAnimation";
import { generateTimeOptions } from "../../context/settingsHelpers";
import { endOfDay, startOfDay } from "date-fns";

const StyledTimeRange = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 0.3rem;

  li {
    display: grid;
    grid-template-columns: minmax(7.8rem, 1fr) 1.4rem minmax(7.8rem, 1fr) 2rem;
    grid-template-rows: 3.8rem auto;
    align-items: center;
    column-gap: 0.6rem;
  }
`;

const RemoveButton = styled.button`
  color: #383838;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;

  &:not(:disabled):hover {
    color: #dc2626;
  }
`;

const AppendButton = styled(RemoveButton)`
  &:not(:disabled):hover {
    color: #3b82f6;
  }
`;

// 一天的時段(每5分鐘一個選項)
const times = generateTimeOptions(
  startOfDay(new Date(2025, 0, 1)),
  endOfDay(new Date(2025, 0, 1))
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

function ControlledTimeRange({ control, dayIndex, fieldArrayName }) {
  const {
    getValues,
    formState: { errors },
    setError,
    clearErrors,
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
        <Fragment key={field.id}>
          <li id={`${fieldArrayName}.${dayIndex}.timeSlots.${slotIndex}`}>
            <ControlledSelect
              options={times}
              control={control}
              name={`${fieldArrayName}.${dayIndex}.timeSlots.${slotIndex}.openTime`}
              creatable={false}
              placeholder="開始時間"
              disabled={!isBusinessDay}
              rules={{
                validate: validateFn,
              }}
            />
            <MdHorizontalRule size={14} />
            <ControlledSelect
              options={times}
              control={control}
              name={`${fieldArrayName}.${dayIndex}.timeSlots.${slotIndex}.closeTime`}
              creatable={false}
              placeholder="休息時間"
              disabled={!isBusinessDay}
              rules={{
                validate: validateFn,
              }}
            />

            {slotIndex === 0 && (
              <AppendButton
                type="button"
                onClick={() => {
                  append({ openTime: "", closeTime: "" });
                  // 淡入欄位動畫
                  fadeInAnimation(
                    `${fieldArrayName}.${dayIndex}.timeSlots.${fields.length}`
                  );
                }}
              >
                <MdAdd size={20} />
              </AppendButton>
            )}

            {slotIndex !== 0 && (
              <RemoveButton
                title="清除這個時段的時間"
                type="button"
                disabled={fields.length === 1}
                onClick={() => {
                  remove(slotIndex);

                  // 需要執行validateFn，確保會重新驗證重疊的錯誤是否還存在
                  fields.length > 1 && validateFn();
                }}
              >
                <MdOutlineDelete size={20} />
              </RemoveButton>
            )}
          </li>

          <FormErrorsMessage
            errors={
              errors?.[fieldArrayName]?.[dayIndex]?.timeSlots?.[slotIndex]
                ?.errorFallback
            }
            gridColumn="1 / -1"
          />
        </Fragment>
      ))}
    </StyledTimeRange>
  );
}

export default ControlledTimeRange;
