import styled from "styled-components";
import { useState } from "react";
import ImagePlaceholder from "./ImagePlaceholder";

const Container = styled.div`
  position: relative;
  height: 100%;
  aspect-ratio: 1 / 1;
  flex-shrink: 0;
  border-radius: ${({ $radius = "50%" }) => $radius};
  overflow: hidden;
  background-color: ${({ $loading }) => ($loading ? "#f9fafb" : "transparent")};
  transition: background-color 0.18s ease;
`;

const StyledImage = styled.img`
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity 0.18s ease-in-out;
`;

const BrokenImagePlaceholder = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
`;

function Image({ src, lazy = false, alt, radius }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorSrc, setErrorSrc] = useState(null);

  const hasError = errorSrc === src;

  return (
    <Container $radius={radius} $loading={!isLoaded && !hasError}>
      {!hasError ? (
        <StyledImage
          src={src}
          loading={lazy ? "lazy" : "eager"}
          alt={alt}
          onLoad={() => {
            setIsLoaded(true);
            setErrorSrc(null);
          }}
          onError={() => {
            setIsLoaded(true);
            setErrorSrc(src);
          }}
          $loaded={isLoaded}
        />
      ) : (
        <BrokenImagePlaceholder>
          <ImagePlaceholder />
        </BrokenImagePlaceholder>
      )}
    </Container>
  );
}

export default Image;
