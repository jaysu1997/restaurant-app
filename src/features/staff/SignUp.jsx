import { FormProvider, useForm } from "react-hook-form";
import FormFieldLayout from "../../ui/FormFieldLayout";
import FormInput from "../../ui/FormInput";
import useCreateStaff from "../../hooks/data/staff/useCreateStaff";
import PasswordInput from "../../components/PasswordInput";
import Button from "../../ui/Button";
import ButtonSpinner from "../../ui/ButtonSpinner";
import styled from "styled-components";
import { trimString, validatePhoneNumber } from "../../utils/helpers";
import ControlledSelect from "../../ui/ControlledSelect";
import { isValidEmail } from "../../utils/validation";

const Form = styled.form`
  max-width: 100%;
  width: 36rem;
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
  padding: 2rem;
  gap: 0.4rem;

  label {
    color: #525252;
    font-weight: 500;
  }
`;

const Footer = styled.footer`
  margin-top: 4rem;
`;

function Signup({ setIsOpenModal }) {
  const { createStaff, isCreatingStaff } = useCreateStaff();

  const methods = useForm({
    defaultValues: {
      role: null,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  function onSubmit(data) {
    createStaff(
      { ...data, role: data.role.value },
      {
        onSuccess: () => {
          reset();
          setIsOpenModal(false);
        },
      },
    );
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormFieldLayout id="name" label="用戶名稱" error={errors?.name}>
          <FormInput
            id="name"
            {...register("name", {
              required: "此欄位必須填寫",
              maxLength: {
                value: 20,
                message: "用戶名稱長度必須在20個字元以內",
              },
              setValueAs: trimString,
            })}
          />
        </FormFieldLayout>

        <FormFieldLayout id="role" label="職位" error={errors?.role}>
          <ControlledSelect
            name="role"
            options={[
              { label: "店長", value: "店長" },
              { label: "員工", value: "員工" },
            ]}
            rules={{
              required: "此欄位必須填寫",
            }}
          />
        </FormFieldLayout>

        <FormFieldLayout label="電子信箱" id="email" error={errors?.email}>
          <FormInput
            id="email"
            {...register("email", {
              setValueAs: trimString,
              required: "此欄位必須填寫",
              validate: isValidEmail,
            })}
          />
        </FormFieldLayout>

        <FormFieldLayout
          id="personalPhone"
          label="連絡電話"
          error={errors?.personalPhone}
        >
          <FormInput
            id="personalPhone"
            {...register("personalPhone", {
              setValueAs: trimString,
              required: "此欄位必須填寫",
              validate: (value) => validatePhoneNumber(value),
            })}
          />
        </FormFieldLayout>

        <FormFieldLayout label="密碼" id="password" error={errors?.password}>
          <PasswordInput
            id="password"
            autoComplete="current-password"
            {...register("password", {
              required: "此欄位必須填寫",
              minLength: { value: 8, message: "密碼至少要有8碼" },
            })}
          />
        </FormFieldLayout>

        <Footer>
          <Button
            type="submit"
            $isFullWidth={true}
            $isProcessing={isCreatingStaff}
            disabled={isCreatingStaff}
          >
            <span>註冊</span>
            {isCreatingStaff && <ButtonSpinner />}
          </Button>
        </Footer>
      </Form>
    </FormProvider>
  );
}

export default Signup;

// import { FormProvider, useForm } from "react-hook-form";
// import styled from "styled-components";

// import FormFieldLayout from "../../ui/FormFieldLayout";
// import FormInput from "../../ui/FormInput";
// import ControlledSelect from "../../ui/ControlledSelect";
// import PasswordInput from "../../components/PasswordInput";
// import Button from "../../ui/Button";
// import ButtonSpinner from "../../ui/ButtonSpinner";

// import useCreateStaff from "../../hooks/data/staff/useCreateStaff";
// import { trimString, validatePhoneNumber } from "../../utils/helpers";
// import { isValidEmail } from "../../utils/validation";

// /* ---------- styled ---------- */

// const Wrapper = styled.div`
//   width: 52rem;
//   max-width: 92vw;
// `;

// const Header = styled.header`
//   padding: 2.6rem 2.8rem 1.6rem;
//   border-bottom: 1px solid #f3f4f6;
// `;

// const Title = styled.h2`
//   font-size: 2.2rem;
//   font-weight: 700;
//   color: #111827;
//   margin: 0;
// `;

// const Subtitle = styled.p`
//   font-size: 1.3rem;
//   color: #6b7280;
//   margin: 0.6rem 0 0;
// `;

// const Form = styled.form`
//   padding: 2.4rem 2.8rem 2.8rem;

//   display: flex;
//   flex-direction: column;
//   gap: 1.6rem;

//   label {
//     display: inline-block;
//     margin-bottom: 0.6rem;
//     font-size: 1.3rem;
//     font-weight: 600;
//     color: #374151;
//   }
// `;

// const Grid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 1.6rem;

//   @media (max-width: 640px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const Helper = styled.span`
//   display: block;
//   margin-top: 0.6rem;
//   font-size: 1.2rem;
//   color: #9ca3af;
// `;

// const Footer = styled.footer`
//   display: flex;
//   justify-content: flex-end;
//   gap: 1rem;

//   margin-top: 1rem;
//   padding-top: 2rem;
//   border-top: 1px solid #f3f4f6;

//   @media (max-width: 640px) {
//     flex-direction: column-reverse;

//     button {
//       width: 100%;
//     }
//   }
// `;

// /* ---------- component ---------- */

// function Signup({ onClose }) {
//   const { createStaff, isCreatingStaff } = useCreateStaff();

//   const methods = useForm({
//     defaultValues: {
//       role: null,
//       name: "",
//       email: "",
//       personalPhone: "",
//       password: "",
//     },
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = methods;

//   function onSubmit(data) {
//     createStaff(
//       {
//         ...data,
//         role: data.role.value,
//       },
//       {
//         onSuccess: () => {
//           reset();
//           onClose();
//         },
//       },
//     );
//   }

//   function onError(err) {
//     console.log(err);
//   }

//   return (
//     <FormProvider {...methods}>
//       <Wrapper>
//         <Header>
//           <Title>建立員工帳號</Title>
//           <Subtitle>新增員工登入權限與基本資料</Subtitle>
//         </Header>

//         <Form onSubmit={handleSubmit(onSubmit, onError)}>
//           {/* row 1 */}
//           <Grid>
//             <FormFieldLayout id="name" label="用戶名稱" error={errors?.name}>
//               <FormInput
//                 id="name"
//                 placeholder="請輸入名稱"
//                 {...register("name", {
//                   required: "此欄位必須填寫",
//                   maxLength: {
//                     value: 20,
//                     message: "用戶名稱需在 20 字內",
//                   },
//                   setValueAs: trimString,
//                 })}
//               />
//             </FormFieldLayout>

//             <FormFieldLayout id="role" label="職位" error={errors?.role}>
//               <ControlledSelect
//                 name="role"
//                 placeholder="請選擇職位"
//                 options={[
//                   { label: "店長", value: "店長" },
//                   { label: "員工", value: "員工" },
//                 ]}
//                 rules={{
//                   required: "此欄位必須填寫",
//                 }}
//               />
//             </FormFieldLayout>
//           </Grid>

//           {/* row 2 */}
//           <Grid>
//             <FormFieldLayout id="email" label="電子信箱" error={errors?.email}>
//               <FormInput
//                 id="email"
//                 placeholder="example@mail.com"
//                 {...register("email", {
//                   required: "此欄位必須填寫",
//                   setValueAs: trimString,
//                   validate: isValidEmail,
//                 })}
//               />
//             </FormFieldLayout>

//             <FormFieldLayout
//               id="personalPhone"
//               label="聯絡電話"
//               error={errors?.personalPhone}
//             >
//               <FormInput
//                 id="personalPhone"
//                 placeholder="0912345678"
//                 {...register("personalPhone", {
//                   required: "此欄位必須填寫",
//                   setValueAs: trimString,
//                   validate: validatePhoneNumber,
//                 })}
//               />
//             </FormFieldLayout>
//           </Grid>

//           {/* row 3 */}
//           <FormFieldLayout
//             id="password"
//             label="登入密碼"
//             error={errors?.password}
//           >
//             <PasswordInput
//               id="password"
//               autoComplete="new-password"
//               placeholder="請輸入密碼"
//               {...register("password", {
//                 required: "此欄位必須填寫",
//                 minLength: {
//                   value: 8,
//                   message: "密碼至少需 8 碼",
//                 },
//               })}
//             />
//             <Helper>至少 8 碼，建議包含英文與數字</Helper>
//           </FormFieldLayout>

//           {/* footer */}
//           <Footer>
//             <Button
//               type="button"
//               variation="secondary"
//               onClick={onClose}
//               disabled={isCreatingStaff}
//             >
//               取消
//             </Button>

//             <Button
//               type="submit"
//               disabled={isCreatingStaff}
//               $isProcessing={isCreatingStaff}
//               style={{ minWidth: "14rem" }}
//             >
//               <span>{isCreatingStaff ? "建立中..." : "建立帳號"}</span>

//               {isCreatingStaff && <ButtonSpinner />}
//             </Button>
//           </Footer>
//         </Form>
//       </Wrapper>
//     </FormProvider>
//   );
// }

// export default Signup;
