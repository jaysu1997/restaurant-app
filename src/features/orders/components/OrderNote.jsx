import styled from "styled-components";
import Note from "../../../components/Note";
import SectionContainer from "../../../components/SectionContainer";

const StyledOrderNote = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  label {
    color: #64748b;
    font-size: 1.3rem;
    font-weight: 500;
  }

  span {
    min-width: 0;
    font-weight: 500;
    overflow-wrap: anywhere;
  }
`;

function OrderNote({ note, isEdit }) {
  return (
    <SectionContainer>
      <StyledOrderNote>
        <label>訂單備註</label>
        {!isEdit ? <span>{note || "無"}</span> : <Note />}
      </StyledOrderNote>
    </SectionContainer>
  );
}

export default OrderNote;
