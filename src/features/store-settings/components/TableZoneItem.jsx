import styled from "styled-components";
import FormInputField from "../../../components/FormInputField";
import { parsePositiveInt } from "../../../utils/numbers.js";
import { trimString } from "../../../utils/text.js";
import IconButton from "../../../components/button/IconButton";
import { Trash2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

const StyledTableZoneItem = styled.li`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 0.8rem;
  align-items: center;
  padding: 2.4rem 0 0.8rem;
  border-bottom: 1px solid #f3f4f6;

  @media (max-width: 35em) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const SubHeader = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  padding-bottom: 1.6rem;
`;

const SubTitle = styled.h4`
  font-size: 1.6rem;
  font-weight: var(--font-weight-semibold);
  color: #374151;
`;

const DeleteButton = styled(IconButton)`
  justify-self: end;
`;

function TableZoneItem({ index, onRemove }) {
  const { getValues } = useFormContext();

  return (
    <StyledTableZoneItem>
      <SubHeader>
        <SubTitle>分區 {index + 1}</SubTitle>

        <DeleteButton $size="sm" onClick={onRemove}>
          <Trash2 />
        </DeleteButton>
      </SubHeader>

      <FormInputField
        label="分區名稱"
        name={`dineInTableConfig.${index}.zoneName`}
        placeholder="分區名稱"
        rules={{
          setValueAs: trimString,
          validate: (value) => {
            const zones = getValues("dineInTableConfig");
            // 檢查是否存在重複的分區命名
            const duplicate = zones.some((zone, zoneIndex) => {
              // 略過自己
              if (zoneIndex === index) return false;
              return zone.zoneName.trim() === value;
            });

            return !duplicate || "此名稱已被使用";
          },
        }}
      />

      <FormInputField
        label="分區桌數"
        name={`dineInTableConfig.${index}.tableCount`}
        placeholder="分區總桌數"
        rules={{
          required: "總桌數不能空白",
          setValueAs: (value) =>
            parsePositiveInt(value, {
              min: 1,
              fallback: value,
            }),
          validate: (value) =>
            typeof value === "number" || "請輸入 1 以上的整數",
        }}
      />
    </StyledTableZoneItem>
  );
}

export default TableZoneItem;
