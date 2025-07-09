import styled from "styled-components";
import { GoPlus, GoTrash } from "react-icons/go";
import DateRangePicker from "../../ui/DateRangePicker";
import { useState } from "react";
import ControlledSwitch from "../../ui/ControlledSwitch";
import ControlledTimeSelect from "../../ui/ControlledTimeSelect";
import { AiOutlineMinus } from "react-icons/ai";

const Content = styled.section`
  display: grid;
  grid-template-columns: 32rem 1fr;
  padding: 3.2rem;
  column-gap: 4rem;
  row-gap: 2rem;
  font-size: 1.4rem;

  header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  h3 {
    font-size: 2rem;
  }

  p {
    color: #797f87;
  }

  article {
    grid-column: 2;
    display: grid;
    grid-template-columns: 25rem 8.2rem 1fr auto;
    gap: 2rem;
    align-items: center;
    font-size: 1.4rem;
  }

  button {
    font-size: 1.4rem;
  }
`;

const Time = styled.div`
  grid-column: 3 / 4;
  display: grid;
  grid-template-columns: minmax(12rem, 1fr) 2rem minmax(12rem, 1fr) 2rem;
  grid-auto-rows: 3.8rem;
  align-items: center;
  gap: 2rem;
`;

const Footer = styled.footer`
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
  border-top: 1px solid #dfdfdf;
  padding: 1.6rem 3.2rem;

  button {
    font-size: 1.4rem;
  }
`;

function SpecialBusinessHours({ control }) {
  const [selected, setSelected] = useState();

  return (
    <>
      <Content>
        <header>
          <h2>特殊營業時間</h2>
          <p>
            當遇到活動、特殊節日而需要修改店鋪的營業狀態時，可以在此處指定日期並調整營業時間，以覆蓋一般營業時間設定。
          </p>
        </header>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <article>
            <DateRangePicker
              placeholder="請選擇日期"
              startMonth={new Date()}
              endMonth={new Date()}
              selected={selected}
              onSelect={setSelected}
              handleValueReset={() => setSelected("")}
            />

            <ControlledSwitch
              control={control}
              items={[{ name: "open", label1: "公休", label2: "營業" }]}
            />
            <Time>
              <ControlledTimeSelect control={control} name="startTime" />
              <AiOutlineMinus size={18} />
              <ControlledTimeSelect control={control} name="endTime" />
              <button>
                <GoTrash size={18} />
              </button>
            </Time>
            <button>
              <GoPlus size={22} />
            </button>

            <Time>
              <ControlledTimeSelect control={control} name="startTime" />
              <AiOutlineMinus size={18} />
              <ControlledTimeSelect control={control} name="endTime" />
              <button>
                <GoTrash size={18} />
              </button>
            </Time>
          </article>

          <article>
            <DateRangePicker
              placeholder="請選擇日期"
              startMonth={new Date()}
              endMonth={new Date()}
              selected={selected}
              onSelect={setSelected}
              handleValueReset={() => setSelected("")}
            />

            <ControlledSwitch
              control={control}
              items={[{ name: "open", label1: "公休", label2: "營業" }]}
            />
            <Time>
              <ControlledTimeSelect control={control} name="startTime" />
              <AiOutlineMinus size={18} />
              <ControlledTimeSelect control={control} name="endTime" />
              <button>
                <GoTrash size={18} />
              </button>
            </Time>
            <button>
              <GoPlus size={22} />
            </button>

            <Time>
              <ControlledTimeSelect control={control} name="startTime" />
              <AiOutlineMinus size={18} />
              <ControlledTimeSelect control={control} name="endTime" />
              <button>
                <GoTrash size={18} />
              </button>
            </Time>
          </article>

          <button
            style={{
              justifySelf: "start",
              width: "fit-content",
              display: "flex",
              alignItems: "center",
              gap: "0.2rem",
            }}
          >
            新增日期
            <GoPlus size={18} />
          </button>
        </div>
      </Content>
      <Footer>
        <button>儲存</button>
        <button>取消</button>
      </Footer>
    </>
  );
}

export default SpecialBusinessHours;
