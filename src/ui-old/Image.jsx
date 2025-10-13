import styled from "styled-components";

const StyledImage = styled.img`
  width: 36rem;
  max-width: 80%;
  height: auto;
  object-fit: contain;
  user-select: none;
  pointer-events: none;
`;

// 這個元件後續或許會改成error fallback專用，或是直接刪除，因為avatar已經不使用這個元件了
function Image({ src, alt }) {
  return <StyledImage src={src} alt={alt} />;
}

export default Image;
