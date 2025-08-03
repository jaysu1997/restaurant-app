import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import styled from "styled-components";
import {
  MdAdd,
  MdHorizontalRule,
  MdOutlineDelete,
  MdOutlineDeleteForever,
} from "react-icons/md";
import { Fragment } from "react";
import ControlledSelect from "../../ui/ControlledSelect";
import FormErrorsMessage from "../../ui/FormErrorsMessage";
import { checkOverlapConflicts, validateValues } from "./validateOverlap";
import fadeInAnimation from "../../utils/fadeInAnimation";
import {
  generateTimeOptions,
  parseTimeToDate,
} from "../../context/settingsHelpers";

const StyledTimeRange = styled.div`
  grid-column: 1;
  display: grid;
  grid-template-columns: minmax(7.8rem, 1fr) 1.4rem minmax(7.8rem, 1fr);
  align-items: center;
  justify-content: end;
  column-gap: 0.6rem;
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
  grid-row: 1;
  grid-column: 2;

  &:not(:disabled):hover {
    color: #3b82f6;
  }
`;

// 一天的時段(每5分鐘一個選項)
const times = generateTimeOptions("00:00", "23:59");

function validateTimeSlotField({
  fieldArrayName,
  isOpen,
  dayIndex,
  setError,
  clearErrors,
  getValues,
}) {
  if (!isOpen) return;

  const path = `${fieldArrayName}.${dayIndex}.timeSlots`;
  const slots = getValues(path);

  const normalizeData = slots.map((slot) => {
    const { openTime, closeTime } = slot;

    return {
      start: openTime?.value ? parseTimeToDate(openTime?.value) : undefined,
      end: closeTime?.value ? parseTimeToDate(closeTime?.value) : undefined,
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

function ControlledTimeRange({
  control,
  dayIndex,
  fieldArrayName,
  removeEntireFields = () => {},
}) {
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
  const isOpen = useWatch({
    control,
    name: `${fieldArrayName}.${dayIndex}.isOpen`,
  });

  const isRegular = fieldArrayName === "regularOpenHours";
  const isSpecial = fieldArrayName === "specialOpenHours";

  // 驗證函式
  const validateFn = () =>
    validateTimeSlotField({
      fieldArrayName,
      isOpen,
      dayIndex,
      setError,
      clearErrors,
      getValues,
    });

  return (
    <>
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

      {fields.map((field, slotIndex) => (
        <Fragment key={field.id}>
          <StyledTimeRange
            id={`${fieldArrayName}.${dayIndex}.timeSlots.${slotIndex}`}
          >
            <ControlledSelect
              options={times}
              control={control}
              name={`${fieldArrayName}.${dayIndex}.timeSlots.${slotIndex}.openTime`}
              creatable={false}
              placeholder="開始時間"
              disabled={!isOpen}
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
              disabled={!isOpen}
              rules={{
                validate: validateFn,
              }}
            />
          </StyledTimeRange>
          <RemoveButton
            title="清除這個時段的時間"
            type="button"
            disabled={isRegular && fields.length === 1}
            onClick={() => {
              isSpecial && fields.length === 1
                ? removeEntireFields(dayIndex)
                : remove(slotIndex);

              // 需要執行validateFn，確保會重新驗證重疊的錯誤是否還存在
              validateFn();
            }}
          >
            {isSpecial && fields.length === 1 ? (
              <MdOutlineDeleteForever size={20} />
            ) : (
              <MdOutlineDelete size={20} />
            )}
          </RemoveButton>

          <FormErrorsMessage
            fieldName={
              errors?.[fieldArrayName]?.[dayIndex]?.timeSlots?.[slotIndex]
                ?.errorFallback
            }
            gridColumn="1 / -1"
          />
        </Fragment>
      ))}
    </>
  );
}

export default ControlledTimeRange;
