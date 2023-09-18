import React, { useState } from "react";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import PaymentSelect from "../components/PaymentSelect";
import Address from "../components/Address";
import CartSummary from "../components/CartSummary";
function CheckOut() {
  return (
    <section>
      <Navbar />
      <h1 className="checkOutH">Check Out</h1>
      <Checkout >
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
const AddressComp=styled.div`
flex:2;

`

const CartSummaryComp=styled.div`
flex:1;
`



export default CheckOut;
