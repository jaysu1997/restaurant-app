import styled from "styled-components";
import FormInputField from "../../../components/FormInputField";
import { parsePositiveInt, trimString } from "../../../utils/helpers";
import IconButton from "../../../components/button/IconButton";
import { Trash2 } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import { generateTableNumbers } from "../../../context/settings/settingsHelpers";

const SubTitle = styled.h4`
  grid-column: 1 / -1;
  font-size: 1.8rem;
  font-weight: 600;
  color: #292929;
  margin-bottom: 2rem;
`;

const Preview = styled.div`
  grid-column: 1 / -2;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 100%;

  div {
    display: flex;
    align-items: center;
    max-width: 100%;
    min-width: 0;
    padding: 0 0.8rem;
    color: #808080;
    border: 1px solid #e6e6e6;
    background-color: #f2f2f2;
    border-radius: 4px;
    height: 3.8rem;
  }

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

function TableZoneItem({ index, onRemove }) {
  const { control, getValues } = useFormContext();

  const zoneName = useWatch({
    control,
    name: `dineInTableConfig.${index}.zoneName`,
  });

  const tableCount = useWatch({
    control,
    name: `dineInTableConfig.${index}.tableCount`,
  });

  return (
    <li>
      <SubTitle>內用分區 {index + 1}</SubTitle>

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

      <IconButton type="button" onClick={onRemove}>
        <Trash2 />
      </IconButton>

      <Preview>
        <label>桌號預覽</label>
        <div>
          <p>
            {/* 因為空間有限，預覽最多到25桌就好 */}
            {generateTableNumbers(zoneName, Math.min(25, tableCount ?? 0)).join(
              " , ",
            )}
          </p>
        </div>
      </Preview>
    </li>
  );
}

export default TableZoneItem;
