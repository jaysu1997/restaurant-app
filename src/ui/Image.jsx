import styled from "styled-components";

const StyledImage = styled.img`
  width: 36rem;
  max-width: 80%;
  height: auto;
  object-fit: contain;
  user-select: none;
  pointer-events: none;
`;

function Image({ src, alt }) {
  return <StyledImage src={src} alt={alt} />;
}

export default Image;
