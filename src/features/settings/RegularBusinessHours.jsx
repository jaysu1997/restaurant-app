import styled from "styled-components";
import ControlledTimeSelect from "../../ui/ControlledTimeSelect";
import ControlledSwitch from "../../ui/ControlledSwitch";
import { GoTrash } from "react-icons/go";

const SettingSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  font-size: 1.4rem;
  background-color: #fff;
  max-width: 100%;
  width: 100%;
`;

const Row = styled.article`
  display: grid;
  grid-template-columns: 11rem 8.2rem 1fr 2rem 6rem;
  align-items: center;
  gap: 1rem;

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;

const TimeRangePicker = styled.div`
  display: grid;
  grid-template-columns: 12rem auto 12rem;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;

function RegularBusinessHours({ control }) {
  return (
    <SettingSection>
      <h3>一般營業時間</h3>
      <Row>
        <label>星期一</label>
        <ControlledSwitch
          control={control}
          items={[{ name: "date-1", label1: "公休", label2: "營業" }]}
        />
        <TimeRangePicker>
          <ControlledTimeSelect control={control} name={"monstart"} />
          <span>至</span>
          <ControlledTimeSelect control={control} name={"monend"} />
        </TimeRangePicker>
        <button>
          <GoTrash size={16} />
        </button>
        <button style={{ fontSize: "1.4rem" }}>增加時段</button>
      </Row>
    </SettingSection>
  );
}

export default RegularBusinessHours;
