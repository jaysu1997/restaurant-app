import styled from "styled-components";

const ReloadButton = styled.button`
  background-color: #2563eb;
  color: #fff;
  border-radius: 999px;
  padding: 1rem 2rem;
  font-size: 1.4rem;

  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1e40af;
  }
`;

export default ReloadButton;
