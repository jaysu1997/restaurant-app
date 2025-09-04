import styled from "styled-components";
import UpdateUserAvatar from "./UpdateUserAvatar";
import FormErrorsMessage from "../../ui/FormErrorsMessage";
import { useForm } from "react-hook-form";
import useUpdateUserProfile from "../../hooks/data/auth/useUpdateUserProfile";
import ButtonSpinner from "../../ui/ButtonSpinner";
import StyledHotToast from "../../ui/StyledHotToast";

// 以下這些ui或許都能夠做成重複使用的版本
const Form = styled.form`
  display: grid;
  grid-template-columns: 8rem 1fr;
  column-gap: 1rem;
  grid-template-rows: repeat(3, 3.8rem 2.8rem);
  font-size: 1.4rem;
  font-weight: 500;
  align-items: center;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  font-size: 1.4rem;
  font-weight: 400;
  padding: 0 0.8rem;
  height: 3.8rem;
  border-radius: 6px;
`;

const Footer = styled.footer`
  padding-top: 2.4rem;
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
`;

const SubmitButton = styled.button`
  background-color: #2563eb;
  color: #fff;
  padding: 0.6rem 1.8rem;
  border-radius: 4px;
  font-weight: 500;
  width: 6.4rem;
`;

const CancelButton = styled(SubmitButton)`
  color: #333;
  background-color: #eee;
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
    mutate(
      { ...data, user_role: "店員" },
      {
        onSuccess: (newData) =>
          reset({
            user_name: newData.user.user_metadata.user_name,
            personal_phone: newData.user.user_metadata.personal_phone,
          }),
      }
    );
  }

  function onError(error) {
    console.log(error);
    StyledHotToast({ type: "error", title: "個人資料更新失敗" });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <label>用戶頭像</label>
      <UpdateUserAvatar userData={userData} />
      <FormErrorsMessage errors={errors?.user_role} gridColumn={2} />
      <label>名稱</label>
      <Input
        {...register("user_name", {
          required: "用戶名稱不可空白",
          maxLength: {
            value: 20,
            message: "名稱長度必須在20個字元以內",
          },
          setValueAs: (value) => value.trim(),
        })}
        disabled={isPending}
      />
      <FormErrorsMessage errors={errors?.user_name} gridColumn={2} />
      <label>連絡電話</label>
      <Input
        {...register("personal_phone", {
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
        disabled={isPending}
      />
      <FormErrorsMessage errors={errors?.personal_phone} gridColumn={2} />

      <Footer>
        <SubmitButton disabled={!isDirty || isPending}>
          {isPending ? <ButtonSpinner /> : "儲存"}
        </SubmitButton>
        <CancelButton onClick={() => reset()} disabled={!isDirty || isPending}>
          取消
        </CancelButton>
      </Footer>
    </Form>
  );
}

export default UserProfileSetting;
