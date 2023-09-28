import Navbar from "../components/Navbar";
import styled from "styled-components";

import Address from "../components/Address";
import { useNavigate } from "react-router-dom";
import CartSummary from "../components/CartSummary";

function CheckOut() {
  const navigate = useNavigate();
  const handle = () => {
    navigate("/payment");
    console.log("Check");
  };
  return (
    <section>
      <Navbar />
      <h1 className="checkOutH">Check Out</h1>
      <Checkout>
        <AddressComp>
          <Address />
        </AddressComp>

        {/* <Typography
          level="title-lg"
          startDecorator={<InfoOutlined />}
          sx={{
           
            width: "800px",
            marginLeft: "100px",
            marginTop: "50px",
            
          }}
        >
          Select Payment Method
        </Typography>
        <Divider
          inset="none"
          sx={{
            
            width: "800px",
            marginLeft: "100px",
          }}
        /> */}

        {/* <PaymentSelect /> */}
        <CartSummaryComp>
          <CartSummary/>
        </CartSummaryComp>

        
      </Checkout>
    </section>
  );
}

const Checkout = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f4eeee;
  display: flex;

  justify-content: space-between;
`;
const AddressComp = styled.div`
  flex: 2;
`;

const CartSummaryComp = styled.div`
  flex: 1;
`;

export default CheckOut;
