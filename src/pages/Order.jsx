import { useParams } from "react-router-dom";

function Order() {
  const params = useParams();
  console.log(params.orderId);
  return <div></div>;
}

export default Order;
