import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useGetUserID } from "../hooks/useGetUserID";

import { mobile } from "../responsive";

function CartSummary() {
  const userID = useGetUserID();
  const [cart,setCart] = useState({ cartItems: [] });
  const shippingCost = 50.90

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/cart/show/${userID}`
        ); // Replace with your endpoint
        setCart(response.data.cart);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCartProducts();
  }, []);
  const calculateTotal = () => {
    let total = 0;
    cart.cartItems.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total;
  };

  const calculateShippingDiscount = () => {
    // Check if the total amount is greater than 5000
    if (calculateTotal() > 5000) {
      // If it is, subtract the shipping cost
      return shippingCost;
    } else {
      // Otherwise, no discount
      return 0;
    }
  };

  const payNow=()=>{
    //To be Added
  }
  return (
    <Container>
      <Wrapper>
        <Bottom>
         
        <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>₹ {calculateTotal()} </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>₹ 50.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>₹-{calculateShippingDiscount()}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>₹{calculateTotal() + shippingCost - calculateShippingDiscount()}</SummaryItemPrice>
            </SummaryItem>
            <Button onClick={()=>{payNow()}}>PAY NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

export default CartSummary;
