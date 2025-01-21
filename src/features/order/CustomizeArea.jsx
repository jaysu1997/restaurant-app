import styled from "styled-components";
import { ImRadioChecked, ImRadioUnchecked } from "react-icons/im";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { useOrder } from "../../context/OrderContext";
import { useState } from "react";

const colorStyle = {
  background: {
    optional: "#fafaf9",
    required: "#fff1f2",
    isAnswered: "#f0f9ff",
  },
  label: {
    optional: { background: "#e7e5e4", font: "#000" },
    required: { background: "#f43f5e", font: "#fff" },
    isAnswered: { background: "#3b82f6", font: "#fff" },
  },
  optionHover: {
    optional: "#e7e5e4",
    required: "#fecdd3",
    isAnswered: "#bae6fd",
  },
};

const Customize = styled.section`
  display: flex;
  flex-direction: column;
  border: 1px solid #cacaca;
  /* outline: 1px solid #f87171; */
  padding: 1.2rem;
  border-radius: 10px;
  background-color: ${(props) => props.$colorStyle};
  transition: all 0.2s;
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.8rem;
`;

const Title = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
`;

// 顏色需要調整
const RequiredLabel = styled.span`
  text-align: center;
  font-size: 1.2rem;
  line-height: 1.5;
  background-color: ${(props) => props.$colorStyle.background};
  color: ${(props) => props.$colorStyle.font};
  border-radius: 50px;
  padding: 0.2rem 0.8rem;
  font-weight: 400;
  /* transition: all 0.2s; */
`;

const ChoiceLabel = styled.span`
  font-weight: 500;
  margin-bottom: 1.6rem;
  color: rgba(0, 0, 0, 0.6);
`;

const OptionsArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const StyledOption = styled.label`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  height: 4rem;
  line-height: 1.4;
  position: relative;

  padding: 0.6rem;
  border-radius: 5px;

  &:hover {
    background-color: ${(props) => props.$colorStyle};
  }

  input {
    display: none;
  }

  svg[role="unchecked"] {
    width: 1.8rem;
    height: 1.8rem;
    transition: opacity 0.2s;
    color: rgba(0, 0, 0, 0.6);
  }

  svg[role="checked"] {
    width: 1.8rem;
    height: 1.8rem;
    color: #007bff;
    position: absolute;
    opacity: 0;

    transform: scale(0.5);
    transition: opacity 0.2s, transform 0.5s;
  }

  input:checked ~ svg[role="checked"] {
    opacity: 1;
    transform: scale(1);
  }

  input:checked ~ svg[role="unchecked"] {
    opacity: 0;
  }

  span[role="price"] {
    margin-left: auto;
    letter-spacing: 0.15rem;
  }
`;

function CustomizeArea({ type, customizeData, customizeIndex, register }) {
  const [isAnswered, setIsAnswered] = useState(type);

  return (
    <Customize
      type={type}
      $colorStyle={colorStyle.background[isAnswered]}
      key={customizeData.id}
    >
      <Heading>
        <Title>{customizeData.title}</Title>
        <RequiredLabel type={type} $colorStyle={colorStyle.label[isAnswered]}>
          {type === "required"
            ? isAnswered === "isAnswered"
              ? "完成"
              : "必填"
            : "選填"}
        </RequiredLabel>
      </Heading>
      <ChoiceLabel>{type === "optional" ? "多選" : "單選"}</ChoiceLabel>
      <OptionsArea>
        {customizeData.options.map((optionData, optionIndex) => (
          <Option
            isAnswered={isAnswered}
            setIsAnswered={setIsAnswered}
            type={type}
            optionData={optionData}
            customizeData={customizeData}
            customizeIndex={customizeIndex}
            register={register}
            key={optionIndex}
          />
        ))}
      </OptionsArea>
    </Customize>
  );
}

export default CustomizeArea;

function Option({
  type,
  optionData,
  customizeData,
  customizeIndex,
  register,
  isAnswered,
  setIsAnswered,
}) {
  const { dispatch } = useOrder();

  const inputType =
    customizeData.choice === "單選" && customizeData.required === "必填"
      ? "radio"
      : "checkbox";

  const payload = {
    customizeId: `${type}${customizeIndex + 1}`,
    customizeTitle: customizeData.title,
    optionLabel: optionData.optionLabel,
    extraPrice: optionData.extraPrice,
    ingredientName: optionData.ingredientName.value,
    quantity: optionData.quantity,
  };

  function handleClick(e) {
    if (inputType === "radio") {
      dispatch({
        type: "single/choice/insert",
        payload,
      });

      setIsAnswered("isAnswered");
    }

    if (inputType === "checkbox") {
      if (e.target.checked) {
        dispatch({
          type: "multiple/choice/insert",
          payload,
        });
      } else {
        dispatch({
          type: "multiple/choice/delete",
          payload,
        });
      }
    }
  }

  return (
    <StyledOption
      type={type}
      $colorStyle={colorStyle.optionHover[isAnswered]}
      htmlFor={optionData.optionLabel}
    >
      <input
        type={inputType}
        id={optionData.optionLabel}
        value={optionData.optionLabel}
        onClick={handleClick}
        {...register(`customizeField.${type}.${customizeIndex}`, {
          required: type === "optional" ? false : true,
        })}
      />

      {inputType === "checkbox" ? (
        <ImCheckboxUnchecked role="unchecked" />
      ) : (
        <ImRadioUnchecked role="unchecked" />
      )}

      {inputType === "checkbox" ? (
        <ImCheckboxChecked role="checked" />
      ) : (
        <ImRadioChecked role="checked" />
      )}

      <span role="optionName">{optionData.optionLabel}</span>
      <span role="price">
        {optionData.extraPrice === 0 ? "免費" : `+$ ${optionData.extraPrice}`}
      </span>
    </StyledOption>
  );
}
