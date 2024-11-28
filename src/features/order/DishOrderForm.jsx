// 點餐功能
import { MacScrollbar } from "mac-scrollbar";
import { useForm } from "react-hook-form";
import { TiShoppingCart } from "react-icons/ti";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { push } from "./orderSlice";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.6rem;
  max-height: 75dvh;
  max-width: 28rem;
  width: 100dvw;
`;

const Container = styled.div`
  max-height: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  gap: 2rem;
`;

const Header = styled.h3`
  font-weight: 700;
  font-size: 2rem;
  color: #262626;
`;

const Price = styled.span`
  color: #dc2626;
`;

const OptionsArea = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  gap: 1.2rem;
  padding: 0.6rem 1.2rem;

  border: 2px solid black;
  border-radius: 5px;
  background-color: ${(props) => props.$bgColor};

  & > div {
    display: flex;
    justify-content: space-between;
  }

  & > div > span {
    display: flex;
    background-color: #ef4444;
    border-radius: 15px;
    padding: 0.4rem 0.8rem;
    font-size: 1.2rem;
    align-items: center;
    text-align: center;
    color: #f9fafb;
  }
`;

const Label = styled.label`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  padding: 0.6rem;
  border-radius: 5px;
  justify-content: space-between;
  transition: all 0.3s;

  &:hover {
    background-color: ${(props) => props.$bgColor};
  }

  & div {
    display: flex;
    gap: 1.2rem;
    justify-content: space-between;
    align-items: center;
  }

  & input[type="radio"] {
    height: 2rem;
    width: 2rem;
    vertical-align: center;
  }

  & input[type="checkbox"] {
    height: 2rem;
    width: 2rem;
    vertical-align: center;
  }

  & span {
    font-size: 1.4rem;
    line-height: 2rem;
    padding-bottom: 0.25rem;
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & button {
    height: 3.2rem;
    padding: 0.6rem 2.4rem;
    border: none;
    border-radius: 5px;
    background-color: #292524;
    color: #fafaf9;
    font-size: 1.4rem;
    font-weight: 600;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  & button:hover {
    background-color: #3f3f46;
  }

  & button svg {
    width: 2rem;
    height: 2rem;
  }

  & button:disabled {
    background-color: #a8a29e;
  }

  & select {
    height: 3.2rem;
    border: 1px solid black;
  }
`;

function DishOrderForm({ dishData }) {
  // 當前餐點數據
  const { id, name, price, discount, options } = dishData;

  const { handleSubmit, register, formState, getFieldState } = useForm({
    defaultValues: { id, name, price: price - discount },
  });

  const dispatch = useDispatch();

  function onSubmit(data) {
    console.log(data);
    dispatch(push(data));
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <Header>{name}</Header>
      <Price>$ {price - discount}</Price>
      <MacScrollbar>
        <Container>
          {/* 調整選擇 */}
          {options.length !== 0 && (
            <OptionsArea $bgColor="#e0f2fe">
              <div>
                <h4>調整選擇</h4>
              </div>
              {options.map((o) => (
                <Label key={o.label1} $bgColor="#bfdbfe">
                  <div>
                    <input
                      type="checkbox"
                      value={[o.label1, o.label2]}
                      {...register("options")}
                    />
                    <span>{o.label1}</span>
                  </div>
                  <span>{o.label2 === "0" ? "免費" : `+ $${o.label2}`}</span>
                </Label>
              ))}
            </OptionsArea>
          )}
        </Container>
      </MacScrollbar>

      <Footer>
        <select {...register("count")}>
          {Array.from({ length: 50 }, (_, i) => i + 1).map((i) => (
            <option value={i} key={i}>
              {i}
            </option>
          ))}
        </select>

        <button>
          <TiShoppingCart />
          加入購物清單
        </button>
      </Footer>
    </Form>
  );
}

export default DishOrderForm;
