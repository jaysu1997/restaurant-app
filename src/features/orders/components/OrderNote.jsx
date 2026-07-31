import styled from "styled-components";
import Note from "../../../components/Note";
import SectionContainer from "../../../components/SectionContainer";

const NoteGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  span {
    min-width: 0;
    font-weight: 500;
    overflow-wrap: anywhere;
  }
`;

const NoteLabel = styled.label`
  color: #64748b;
  font-size: 1.3rem;
  font-weight: 500;
  width: fit-content;
`;

function OrderNote({ note, isEdit }) {
  return (
    <SectionContainer>
      <NoteGroup>
        <NoteLabel htmlFor="note">訂單備註</NoteLabel>
        {!isEdit ? <span>{note || "無"}</span> : <Note />}
      </NoteGroup>
    </SectionContainer>
  );
}

export default OrderNote;
