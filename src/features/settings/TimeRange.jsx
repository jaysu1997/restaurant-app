import { useFieldArray, useWatch } from "react-hook-form";
import styled from "styled-components";
import ControlledTimeSelect from "../../ui/ControlledTimeSelect";
import { GoTrash, GoPlus } from "react-icons/go";
import { AiOutlineMinus } from "react-icons/ai";

const StyledTimeRange = styled.div`
  grid-column: 3 / 4;
  display: grid;
  grid-template-columns: minmax(12rem, 1fr) 2rem minmax(12rem, 1fr) 2rem;
  align-items: center;
  gap: 2rem;
`;

function TimeRange({ control, dayIndex, setValue, variant }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `regularOpenHours.${dayIndex}.timeSlots`,
  });

  const isOpen = useWatch({
    control,
    name: `regularOpenHours.${dayIndex}.isOpen`,
  });

  // 是否需要具備禁用按鈕以及保留一個欄位(一般營業時間需要)
  const restricted = variant === "regular" && !isOpen;

  return (
    <>
      {fields.map((field, index) => (
        <StyledTimeRange key={field.id}>
          <ControlledTimeSelect
            control={control}
            name={`regularOpenHours.${dayIndex}.timeSlots.${index}.openTime`}
            placeholder="開始時間"
            disabled={restricted}
          />
          <AiOutlineMinus size={18} />
          <ControlledTimeSelect
            control={control}
            name={`regularOpenHours.${dayIndex}.timeSlots.${index}.closeTime`}
            placeholder="休息時間"
            disabled={restricted}
          />

          <button
            type="button"
            disabled={restricted}
            onClick={() =>
              fields.length > 1
                ? remove(index)
                : setValue(`regularOpenHours.${dayIndex}`, {
                    isOpen: false,
                    dayOfWeek: "Mon",
                    label: "星期一",
                    timeSlots: [
                      {
                        openTime: "",
                        closeTime: "",
                      },
                    ],
                  })
            }
          >
            <GoTrash size={18} />
          </button>
        </StyledTimeRange>
      ))}

      <button type="button" onClick={() => append({})} disabled={restricted}>
        <GoPlus size={22} />
      </button>
    </>
  );
}

export default TimeRange;
