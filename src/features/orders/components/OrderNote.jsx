import styled from "styled-components";
import ContentContainer from "../../../ui/ContentContainer";
import Note from "../../../components/Note";

const NoteLayout = styled.div`
  display: grid;
  grid-template-columns: 8rem 1fr;
  column-gap: 1.6rem;
  row-gap: 0.6rem;
`;

function OrderNote({ note, isEdit }) {
  return (
    <ContentContainer>
      <NoteLayout>
        <label>訂單備註：</label>
        {!isEdit ? <span>{note || "無"}</span> : <Note />}
      </NoteLayout>
    </ContentContainer>
  );
}

export default OrderNote;
