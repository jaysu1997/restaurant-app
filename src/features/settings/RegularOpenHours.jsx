import styled from "styled-components";
import ControlledSwitch from "../../ui/ControlledSwitch";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import ControlledTimeRange from "./ControlledTimeRange";
import useSubmitSettings from "../../hooks/data/settings/useSubmitSettings";
import { normalizeRegularOpenHours } from "./sortTimeSlots";
import StyledHotToast from "../../ui/StyledHotToast";
import SectionContainer from "../../ui/SectionContainer";
import { Clock } from "lucide-react";

const BusinessPeriodList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const BusinessPeriodItem = styled.li`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr minmax(27.2rem, 1fr);
  column-gap: 3.2rem;
  row-gap: 0.6rem;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const DateField = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 3.8rem;
  row-gap: 0.6rem;
  align-items: center;
  justify-content: space-between;

  label {
    color: #525252;
    font-weight: 500;
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`;

function RegularOpenHours({ settings }) {
  const { submitSettings, isSubmittingSettings } = useSubmitSettings();

  const { regularOpenHours } = settings;

  const methods = useForm({
    defaultValues: { regularOpenHours },
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isDirty },
    clearErrors,
  } = methods;

  const { fields: dayFields } = useFieldArray({
    control,
    name: "regularOpenHours",
  });

  function onSubmit(data) {
    const normalizedData = normalizeRegularOpenHours(data.regularOpenHours);

    submitSettings(
      { regularOpenHours: normalizedData },
      {
        onSuccess: (newData) =>
          reset({ regularOpenHours: newData.regularOpenHours }),
      },
    );
  }

  function onError(error) {
    console.log("失敗", error);
    StyledHotToast({ type: "error", title: "設定更新失敗" });
  }

  return (
    <FormProvider {...methods}>
      <SectionContainer
        title="一般營業時間"
        icon={<Clock />}
        description="設定店鋪的一般營業時間，系統將會根據此設定來顯示當前是否正在營業。"
        form={{
          formId: "regularOpenHours",
          handleReset: () => reset(),
          isDirty,
          isProcessing: isSubmittingSettings,
        }}
      >
        <form id="regularOpenHours" onSubmit={handleSubmit(onSubmit, onError)}>
          <BusinessPeriodList>
            {dayFields.map((day, dayIndex) => (
              <BusinessPeriodItem key={day.id}>
                <DateField>
                  <label htmlFor={day.dayOfWeek}>{day.label}</label>
                  <input
                    id={day.dayOfWeek}
                    type="text"
                    hidden
                    {...register(`regularOpenHours.${dayIndex}.dayOfWeek`)}
                    value={day.dayOfWeek}
                  />

                  <ControlledSwitch
                    options={{
                      name: `regularOpenHours.${dayIndex}.isBusinessDay`,
                      option1: { label: "公休", value: false },
                      option2: { label: "營業", value: true },
                    }}
                    handleChange={() =>
                      clearErrors(`regularOpenHours.${dayIndex}.timeSlots`)
                    }
                  />
                </DateField>

                <ControlledTimeRange
                  control={control}
                  dayIndex={dayIndex}
                  fieldArrayName="regularOpenHours"
                />
              </BusinessPeriodItem>
            ))}
          </BusinessPeriodList>
        </form>
      </SectionContainer>
    </FormProvider>
  );
}

// const List = styled.ul`
//   display: flex;
//   flex-direction: column;
//   gap: 1.6rem;
// `;

// const Card = styled.li`
//   border: 1px solid #e5e5e5;
//   border-radius: 16px;
//   padding: 1.2rem;
//   background: #fff;
//   display: grid;
//   grid-template-columns: 220px 1fr;
//   gap: 1rem;
//   @media (max-width: 640px) {
//     display: flex;
//     flex-direction: column;
//     gap: 0.8rem;
//   }
// `;

// const Meta = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.75rem;
// `;
// const Header = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   gap: 0.75rem;
// `;
// const Title = styled.h4`
//   margin: 0;
//   font-size: 1rem;
//   font-weight: 700;
// `;
// const Sub = styled.div`
//   font-size: 0.9rem;
//   color: #666;
// `;
// const Row = styled.div`
//   display: flex;
//   gap: 0.5rem;
//   align-items: center;
// `;

// function RegularOpenHours({ settings, onSubmitSave }) {
//   const methods = useForm({
//     defaultValues: { regularOpenHours: settings.regularOpenHours },
//   });
//   const {
//     control,
//     register,
//     handleSubmit,
//     reset,
//     formState: { isDirty },
//     clearErrors,
//   } = methods;
//   const { fields } = useFieldArray({ control, name: "regularOpenHours" });
//   const onSubmit = (data) => onSubmitSave(data, () => reset(data));
//   return (
//     <FormProvider {...methods}>
//       <SectionContainer
//         title="一般營業時間"
//         icon={<Clock />}
//         description="設定每週固定營業時間"
//         form={{ formId: "regularHours", handleReset: () => reset(), isDirty }}
//       >
//         <form id="regularHours" onSubmit={handleSubmit(onSubmit)}>
//           <List>
//             {fields.map((day, i) => (
//               <Card key={day.id}>
//                 <Meta>
//                   <Header>
//                     <Title>{day.label}</Title>
//                   </Header>
//                   <Row>
//                     <input
//                       hidden
//                       {...register(`regularOpenHours.${i}.dayOfWeek`)}
//                       value={day.dayOfWeek}
//                     />
//                     <ControlledSwitch
//                       options={{
//                         name: `regularOpenHours.${i}.isBusinessDay`,
//                         option1: { label: "公休", value: false },
//                         option2: { label: "營業", value: true },
//                       }}
//                       handleChange={() =>
//                         clearErrors(`regularOpenHours.${i}.timeSlots`)
//                       }
//                     />
//                   </Row>
//                 </Meta>
//                 <ControlledTimeRange
//                   control={control}
//                   dayIndex={i}
//                   fieldArrayName="regularOpenHours"
//                 />
//               </Card>
//             ))}
//           </List>
//         </form>
//       </SectionContainer>
//     </FormProvider>
//   );
// }

export default RegularOpenHours;
