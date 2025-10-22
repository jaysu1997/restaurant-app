import styled from "styled-components";
import { useForm } from "react-hook-form";
import useUpsertSettings from "../../hooks/data/settings/useUpsertSettings";
import StyledHotToast from "../../ui-old/StyledHotToast";
import SectionContainer from "../../ui/SectionContainer";
import FormInput from "../../ui/FormInput";
import { LuStore } from "react-icons/lu";

const Content = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  li {
    display: grid;
    grid-template-rows: auto auto;
    row-gap: 0.4rem;
    align-items: center;
  }
`;

function StoreInfo({ data = {} }) {
  const { mutate, isPending } = useUpsertSettings();

  const {
    formState: { isDirty, errors },
    handleSubmit,
    reset,
    register,
  } = useForm({
    defaultValues: { storeInfo: data },
  });

  function onSubmit(data) {
    console.log("成功", data);

    mutate(data, {
      onSuccess: (newData) => reset({ storeInfo: newData.storeInfo }),
    });
  }

  function onError(error) {
    console.log("失敗", error);
    StyledHotToast({ type: "error", title: "設定更新失敗" });
  }

  return (
    <SectionContainer
      title="店鋪資訊設定"
      icon={<LuStore />}
      caption="設定店鋪的基本資訊，包含店鋪地址、聯絡方式、統一編號。"
      form={{
        formId: "storeInfo",
        handleReset: () => reset({ storeInfo: data }),
        isDirty,
        isUpdating: isPending,
      }}
    >
      <form id="storeInfo" onSubmit={handleSubmit(onSubmit, onError)}>
        <Content>
          <li>
            <FormInput
              label="連絡電話"
              id="phone"
              type="tel"
              placeholder="請輸入連絡電話"
              {...register("storeInfo.phone", {
                required: "連絡電話不能空白",
                validate: (value) => {
                  const trimmed = value.trim();

                  const isMobile = /^09\d{8}$/.test(trimmed);
                  const isLandline = /^0[2-8]\d{7,8}$/.test(trimmed);

                  if (!isMobile && !isLandline) {
                    return "請輸入正確的市話或手機號碼(純數字)";
                  }

                  return true;
                },
              })}
              errors={errors?.storeInfo?.phone}
            />
          </li>

          <li>
            <FormInput
              label="店鋪地址"
              id="address"
              type="text"
              placeholder="請輸入店鋪地址"
              {...register("storeInfo.address", {
                required: "店鋪地址不能空白",
              })}
              errors={errors?.storeInfo?.address}
            />
          </li>

          <li>
            <FormInput
              label="統一編號"
              id="taxId"
              type="number"
              placeholder="請輸入統一編號"
              {...register("storeInfo.taxId", {
                required: "統一編號不能空白",
                validate: (value) => {
                  return /^\d{8}$/.test(value) || "統一編號格式錯誤";
                },
              })}
              errors={errors?.storeInfo?.taxId}
            />
          </li>
        </Content>
      </form>
    </SectionContainer>
  );
}

export default StoreInfo;
