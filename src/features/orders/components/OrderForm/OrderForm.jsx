// 點餐功能表單
import styled from "styled-components";
import useOrderDraft from "../../../../context/orders/useOrderDraft";
import { Fragment, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { prepareOrderItem } from "../../../../utils/orderHelpers";
import showToast from "../../../../utils/showToast";
import Note from "../../../../components/Note";
import CustomizationField from "./CustomizationField";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import Button from "../../../../components/button/Button";
import Price from "../../../../components/Price";
import {
  ModalContainer,
  ModalContent,
  ModalFooter,
} from "../../../../components/modal/Modal";
import Image from "../../../../components/Image";
import ImagePlaceholder from "../../../../components/ImagePlaceholder";

// 這個或許可以設計成通用元件
const Divider = styled.hr`
  border: 0;
  border-top: 1px solid #e5e7eb;
  margin: 0;
`;

const DishHeader = styled.div`
  display: flex;
  gap: 1.6rem;
`;

const ImageWrapper = styled.div`
  flex-shrink: 0;
  width: 8rem;
  height: 8rem;
  border-radius: 12px;
  overflow: hidden;
  background-color: #f3f4f6;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const Category = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.25;
  color: #6b7280;
`;

const DishName = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const DishPrice = styled(Price)`
  font-weight: 700;
  font-size: 2rem;
`;

const NoteGroup = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 0.8rem; */

  gap: 0.4rem;
`;

const NoteLabel = styled.label`
  font-size: 1.8rem;
  font-weight: 700;
  color: #111827;
  width: fit-content;
`;

const NoteHint = styled.span`
  margin-bottom: 0.4rem;
  font-size: 1.3rem;
  color: #6b7280;
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const QuantityButton = styled(Button).attrs({
  $variant: "outline",
})`
  padding: 0;
  border-radius: 10px;
  width: 3.6rem;
  height: 3.6rem;

  &:active {
    transform: scale(0.95);
  }
`;

const QuantityValue = styled.div`
  width: 2.8rem;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 600;
`;

function OrderForm({ orderDish, onClose, isEdit = false }) {
  const { name, image, category, basePrice, discount } = orderDish;
  const imagePath = image
    ? `https://yaoivzqoyuqdmvxnxvwm.supabase.co/storage/v1/object/public/menu/${image}`
    : null;

  const {
    state: { activeCustomizations, inventoryObj },
    dispatch,
  } = useOrderDraft();

  const [servings, setServings] = useState(orderDish.servings || 1);

  // 初始化useReducer的activeCustomization(自訂項目的詳細數據)
  useEffect(() => {
    // 初始化customizations
    const initialCustomizations = isEdit
      ? orderDish.customizations
      : orderDish.customizations.map((cus) => ({
          ...cus,
          selectedOptions: [],
        }));

    dispatch({
      type: "customization/init",
      payload: initialCustomizations,
    });
  }, [dispatch, orderDish.customizations, isEdit]);

  // 必填項目都完成填寫
  const isFormComplete = activeCustomizations.every(
    ({ isRequired, selectedOptions }) =>
      !isRequired || selectedOptions.length > 0,
  );

  const methods = useForm({
    defaultValues: orderDish,
  });

  const { handleSubmit } = methods;

  function onSubmit(data) {
    const result = prepareOrderItem({
      orderDish: data,
      activeCustomizations,
      inventoryObj,
      servings,
      isEdit,
    });

    // 庫存食材不足或不存在
    if (!result.isAvailable) {
      showToast({
        type: "error",
        title: result.error.title,
        content: <p>{result.error.message}</p>,
      });

      return;
    }

    // 新增or編輯餐點
    dispatch({
      type: isEdit ? "items/update" : "items/add",
      payload: {
        ...result.data,
        customizations: activeCustomizations,
        servings,
      },
    });

    onClose();
  }

  return (
    <FormProvider {...methods}>
      <ModalContainer as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <DishHeader>
            <ImageWrapper>
              {imagePath ? (
                <Image
                  src={imagePath}
                  lazy={false}
                  alt={orderDish.name}
                  radius="8px"
                />
              ) : (
                <ImagePlaceholder />
              )}
            </ImageWrapper>

            <Meta>
              <Category>{category}</Category>
              <DishName>{name}</DishName>
              <DishPrice>$ {basePrice - discount}</DishPrice>
            </Meta>
          </DishHeader>

          <Divider />

          {activeCustomizations.map((customization) => (
            <Fragment key={customization.customizationId}>
              <CustomizationField customization={customization} />

              <Divider />
            </Fragment>
          ))}

          <NoteGroup>
            <NoteLabel htmlFor="note">餐點備註</NoteLabel>
            <NoteHint>例如：不要醬料、吐司去邊...</NoteHint>
            <Note maxLength={25} />
          </NoteGroup>
        </ModalContent>

        <ModalFooter>
          <Quantity>
            <QuantityButton
              onClick={() => {
                if (servings === 1) return;
                setServings((prev) => (prev -= 1));
              }}
            >
              <Minus />
            </QuantityButton>
            <QuantityValue>{servings}</QuantityValue>
            <QuantityButton
              onClick={() => {
                setServings((prev) => (prev += 1));
              }}
            >
              <Plus />
            </QuantityButton>
          </Quantity>

          <Button
            type="submit"
            $isFullWidth={true}
            $radius="6px"
            disabled={!isFormComplete}
          >
            <ShoppingBag />
            {isEdit ? "更新購物車" : "加入購物車"}
          </Button>
        </ModalFooter>
      </ModalContainer>
    </FormProvider>
  );
}

export default OrderForm;
