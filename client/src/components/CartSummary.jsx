import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useGetUserID } from "../hooks/useGetUserID";

import { mobile } from "../responsive";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function CS() {
  const userID = useGetUserID();
  
  const [cart, setCart] = useState({ cartItems: [] });
  
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);

  const shippingCost = 50;


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
    
    if (calculateTotal() > 50) {
      
      return shippingCost;
    } else {
    
      return 0;
    }
  };
  const calculateTotalWithDiscount = () => {
    return `${calculateTotal() + shippingCost - calculateShippingDiscount()}`;
  };

  
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: calculateTotalWithDiscount(), // Pass the calculated total here
          },
        },
      ],
    }).then((orderID) => {
      setOrderID(orderID);
      
      return orderID;

    });
  };
  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      // console.log(payer);
      setSuccess(true);
    });
  };

  //capture likely error
  const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment ");
  };

  useEffect(() => {
    if (success) {
      try {
        
      alert("Payment successful!!");
      console.log("Order successful . Your order id is--", orderID);
      } catch (error) {
        console.log("Error: ", error);
      }
      
    }
  }, [success]);

  return (
    <>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AerCK_1vG7Mwtnr6dQ8QS97b-IBO14gntin1nwoCzDTHFMbQrUklr9pa0E4BEfQu1ni_6fYuobJCHMxG",
        }}
      >
        <Container>
          <Wrapper>
            <Bottom>
              <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>Subtotal</SummaryItemText>
                  <SummaryItemPrice>$ {calculateTotal()} </SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Estimated Shipping</SummaryItemText>
                  <SummaryItemPrice>$ 50</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Shipping Discount</SummaryItemText>
                  <SummaryItemPrice>
                    $ -{calculateShippingDiscount()}
                  </SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice>
                    ${calculateTotalWithDiscount()}
                  </SummaryItemPrice>
                </SummaryItem>
                <Button onClick={() => setShow(true)}>PAY NOW</Button>
              </Summary>
            </Bottom>
          </Wrapper>
        </Container>
        {show ? (
  <PayPalButtons
    style={{ layout: "vertical" }}
    createOrder={(data, actions) => createOrder(data, actions)} // Pass a function here
    onApprove={onApprove}
    onError={onError} // Don't forget to include onError
  />
) : null}
      </PayPalScriptProvider>
    </>
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

export default CS;
