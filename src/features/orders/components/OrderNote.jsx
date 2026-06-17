import styled from "styled-components";
import ContentContainer from "../../../ui/ContentContainer";
import Note from "../../../components/Note";

const StyledOrderNote = styled(ContentContainer)`
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
    <StyledOrderNote>
      <label>訂單備註</label>
      {!isEdit ? <span>{note || "無"}</span> : <Note />}
    </StyledOrderNote>
  );
}

export default OrderNote;
