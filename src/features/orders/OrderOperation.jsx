import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.8rem;
  font-size: 1.6rem;
  font-weight: 600;
  border-radius: 6px;

  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$fontColor};

  &:hover {
    background-color: ${(props) => props.$hoverBgColor};
  }
`;

function OrderOperation({ isEdit }) {
  const navigate = useNavigate();
  const { orderId } = useParams();

  return (
    <Footer>
      <Button
        $bgColor="#059669"
        $fontColor="#fff"
        $hoverBgColor="#047857"
        onClick={() => navigate(`/order-edit/${orderId}`)}
      >
        編輯
      </Button>
      <Button $bgColor="#dc2626" $fontColor="#fff" $hoverBgColor="#b91c1c">
        刪除
      </Button>
      <Button $bgColor="#e7e5e4" $fontColor="#333" $hoverBgColor="#d6d3d1">
        返回列表
      </Button>
    </Footer>
  );
}

export default OrderOperation;
