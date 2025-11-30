import styled from "styled-components";
import { useForm } from "react-hook-form";
import useUpdateUserProfile from "../../hooks/data/auth/useUpdateUserProfile";
import StyledHotToast from "../../ui-old/StyledHotToast";
import SectionContainer from "../../ui/SectionContainer";
import FormInput from "../../ui/FormInput";
import { UserRoundPen } from "lucide-react";
import FormFieldLayout from "../../ui/FormFieldLayout";

// 以下這些ui或許都能夠做成重複使用的版本
const Form = styled.form`
  display: grid;
  grid-template-rows: auto auto;
  column-gap: 1rem;
  row-gap: 0.4rem;
  font-size: 1.4rem;
`;

function UserProfileSetting({ userData }) {
  const { mutate, isPending } = useUpdateUserProfile();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      user_name: userData?.user_metadata?.user_name,
      personal_phone: userData?.user_metadata?.personal_phone,
    },
  });

  function onSubmit(data) {
    mutate(data, {
      onSuccess: (newData) =>
        reset({
          user_name: newData.user.user_metadata.user_name,
          personal_phone: newData.user.user_metadata.personal_phone,
        }),
    });
  }

  function onError(error) {
    console.log(error);
    StyledHotToast({ type: "error", title: "個人資料更新失敗" });
  }

  return (
    <SectionContainer
      title="個人資料"
      icon={<UserRoundPen size={20} />}
      form={{
        formId: "userProfile",
        handleReset: () => reset(),
        isDirty: isDirty,
        isUpdating: isPending,
      }}
    >
      <Form onSubmit={handleSubmit(onSubmit, onError)} id="userProfile">
        <FormFieldLayout
          id="userName"
          label="用戶名稱"
          errors={errors?.user_name}
        >
          <FormInput
            id="userName"
            disabled={isPending}
            {...register("user_name", {
              required: "用戶名稱不可空白",
              maxLength: {
                value: 20,
                message: "名稱長度必須在20個字元以內",
              },
              setValueAs: (value) => value.trim(),
            })}
          />
        </FormFieldLayout>

        <FormFieldLayout
          id="userPhone"
          label="連絡電話"
          errors={errors?.personal_phone}
        >
          <FormInput
            id="userPhone"
            disabled={isPending}
            {...register("personal_phone", {
              required: "連絡電話不能空白",
              validate: (value) => {
                // 電話號碼的驗證或許可以設計成helpers
                const trimmed = value.trim();

                const isMobile = /^09\d{8}$/.test(trimmed);
                const isLandline = /^0[2-8]\d{7,8}$/.test(trimmed);

                if (!isMobile && !isLandline) {
                  return "請輸入正確的市話或手機號碼(純數字)";
                }

                return true;
              },
            })}
          />
        </FormFieldLayout>
      </Form>
    </SectionContainer>
  );
}

export default UserProfileSetting;
