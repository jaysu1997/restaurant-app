import styled from "styled-components";
import UpdateUserAvatar from "./UpdateUserAvatar";
import FormErrorsMessage from "../../ui/FormErrorsMessage";
import { useForm } from "react-hook-form";
import useUpdateUserProfile from "../../hooks/data/auth/useUpdateUserProfile";
import useUser from "../../hooks/data/auth/useUser";
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

  div {
    position: relative;
  }
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

// 需要加入等待?
function UpdatePassword() {
  const { isPending } = useUpdateUserProfile();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  function onError(error) {
    console.log(error);
    StyledHotToast({ type: "error", title: "密碼更新失敗" });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <label>現有密碼</label>
      {/* 之後可以製作一個密碼input，可重複使用的 */}
      <Input {...register("currentPassword")} />
      <FormErrorsMessage errors={errors?.user_role} gridColumn={2} />
      <label>新的密碼</label>
      <Input {...register("newPassword")} />
      <FormErrorsMessage errors={errors?.user_name} gridColumn={2} />
      <label>確認新密碼</label>
      <Input {...register("confirmPassword")} />
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

export default UpdatePassword;
