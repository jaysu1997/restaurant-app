import { useFieldArray, useForm } from "react-hook-form";
import useSignUp from "../hooks/data/auth/useSignUp.js";
import useSignIn from "../hooks/data/auth/useSignin.js";
import PageHeader from "../ui/PageHeader.jsx";
import styled from "styled-components";
import ControlledSwitch from "../ui/ControlledSwitch.jsx";
import DateRangePicker from "../ui/DateRangePicker.jsx";
import { useRef, useState } from "react";
import { format } from "date-fns";
import { PiCalendar } from "react-icons/pi";
import useClickOutside from "../hooks/ui/useClickOutside.js";
import { GoTrash } from "react-icons/go";
import RegularBusinessHours from "../features/settings/RegularBusinessHours.jsx";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 100%;
  gap: 2.8rem;
  padding-bottom: 3.6rem;
  overflow: hidden;
`;

const SettingsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  header {
    display: flex;
    justify-content: space-between;
  }

  article {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  input {
    border: 1px solid #000;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 1rem;
`;

const Time = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DateField = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  padding: 0.6rem;
  gap: 0.6rem;
  border: 1px solid #000;
  cursor: pointer;
  background-color: #fff;

  input {
    font-size: 1.4rem;
    width: 7rem;
    border: none;
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  position: absolute;
  top: 4rem;
  background-color: #fff;
  z-index: 1;
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 1.3rem;
`;

function Settings() {
  const [selectedDate, setSelectedDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef(null);

  useClickOutside(datePickerRef, isOpen, setIsOpen, true);
  const { mutate } = useSignUp();
  const { logIn } = useSignIn();
  const { register, handleSubmit, reset, control } = useForm();
  const { fields, remove, prepend } = useFieldArray({
    control,
    name: "customize",
  });

  function onSubmit(data) {
    const { email, password } = data;

    logIn({ email, password }, { onSettled: () => reset() });
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <>
      <PageHeader title="店鋪設定" />

      <Container>
        <RegularBusinessHours control={control} />

        <SettingsSection>
          <h3>特殊營業時間</h3>
          <p>
            如果想要設定特定日期的營業時間，或是臨時安插公休，可以在此處設定指定日期的營業狀態和營業時段。
          </p>

          <article>
            <div style={{ position: "relative" }}>
              <DateField onClick={() => setIsOpen((isOpen) => !isOpen)}>
                <input
                  value={selectedDate ? format(selectedDate, "yyyy/MM/dd") : ""}
                  placeholder="選擇日期"
                  readOnly
                />
                <PiCalendar size={20} />
              </DateField>
              {isOpen && (
                <Wrapper ref={datePickerRef}>
                  <DateRangePicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    startMonth={new Date()}
                    disabled={{ before: new Date() }}
                  />
                </Wrapper>
              )}
            </div>
            <ControlledSwitch
              control={control}
              items={[{ name: "date-1", label1: "公休", label2: "營業" }]}
            />
            <Time>
              <Row>
                <input type="time" />
                <span>至</span>
                <input type="time" />
                <button>
                  <GoTrash size={18} />
                </button>
              </Row>
            </Time>
            <button>新增時段</button>
          </article>

          <button>新增日期</button>
          <footer>
            <button>儲存</button>
            <button>取消</button>
          </footer>
        </SettingsSection>

        <SettingsSection>
          <h3>內用桌號設定</h3>

          <article>
            <label>分區命名</label>
            <input
              type="text"
              placeholder="請輸入分區編號"
              style={{ width: "10rem" }}
            />
            <label>總桌數</label>
            <input
              type="number"
              placeholder="請輸入此分區的總桌數"
              style={{ width: "10rem" }}
            />
            <label>預覽</label>
            <span>A-1 ~ A10</span>
            <button>
              <GoTrash size={18} />
            </button>
          </article>

          <button>新增分區</button>
          <footer>
            <button>儲存</button>
            <button>取消</button>
          </footer>
        </SettingsSection>

        <SettingsSection
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            alignContent: "start",
          }}
        >
          <h3>店鋪基本資訊</h3>
          <p></p>
          <article>
            <label>店鋪地址</label>
            <input
              type="text"
              placeholder="請輸入店鋪地址"
              style={{ width: "90%" }}
            />
          </article>
          <article>
            <label>聯絡電話</label>
            <input
              type="tel"
              placeholder="請輸入店鋪地址"
              style={{ width: "90%" }}
            />
          </article>
          <article>
            <label>店鋪官網</label>
            <input
              type="text"
              placeholder="請輸入店鋪地址"
              style={{ width: "90%" }}
            />
          </article>
          <article>
            <label>分店名稱</label>
            <input
              type="text"
              placeholder="請輸入店鋪地址"
              style={{ width: "90%" }}
            />
          </article>

          <footer>
            <button>儲存</button>
            <button>取消</button>
          </footer>
        </SettingsSection>
      </Container>
    </>
  );
}

export default Settings;
