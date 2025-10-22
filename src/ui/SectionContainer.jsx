import styled from "styled-components";
import ContentContainer from "./ContentContainer";
import Caption from "./Caption";
import ButtonSubmit from "./ButtonSubmit";
import ButtonCancel from "./ButtonCancel";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  font-size: 1.4rem;

  label {
    color: #525252;
    font-weight: 500;
  }
`;

const SectionHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  svg {
    color: #6b7280;
    font-size: 2rem;
  }
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: 600;
`;

const ButtonGroup = styled.footer`
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
`;

const AdditionalAction = styled.div`
  margin-right: auto;
`;

// 設定section ui
function SectionContainer({
  title,
  icon,
  caption,
  form = {},
  additionalAction,
  children,
}) {
  const { formId, handleReset, isDirty, isUpdating } = form;

  return (
    <ContentContainer>
      <Section>
        {title && (
          <SectionHeader>
            <Header>
              <Title>{title}</Title>
              {icon}
            </Header>
            {caption && <Caption>{caption}</Caption>}
          </SectionHeader>
        )}

        {children}

        {formId && (
          <ButtonGroup>
            {additionalAction && (
              <AdditionalAction>{additionalAction}</AdditionalAction>
            )}

            <ButtonSubmit
              form={formId}
              isLoading={isUpdating}
              disabled={!isDirty || isUpdating}
            />

            <ButtonCancel
              type="button"
              onClick={handleReset}
              disabled={!isDirty || isUpdating}
            />
          </ButtonGroup>
        )}
      </Section>
    </ContentContainer>
  );
}

export default SectionContainer;
