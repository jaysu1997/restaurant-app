import styled from "styled-components";
import defaultAvatar from "../assets/man.png";

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.6rem 1.2rem;
  border-radius: 5px;
  background-color: #4338ca;

  font-size: 2rem;
  font-weight: 600;
  color: #eef2ff;

  img {
    display: block;
    width: 3.6rem;
    height: 3.6rem;
    border-radius: 50%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    object-position: center;
    outline: 2px solid #eef2ff;
    background-color: #eef2ff;
  }

  &:hover {
    background-color: #4f46e5;
  }
`;

function User() {
  return (
    <Button>
      <img src={defaultAvatar} alt="user avatar" />
      <span>Jay</span>
    </Button>
  );
}

export default User;
