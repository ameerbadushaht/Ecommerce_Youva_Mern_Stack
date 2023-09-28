import React, { useState } from "react";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import CreditCardIcon from "@mui/icons-material/CreditCard";

function PaymentSelect() {
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [isCreditCardValid, setIsCreditCardValid] = useState(true);
  const [isUpiIDValid, setIsUpiIDValid] = useState(true);
  const [upiID, setUpiID] = useState("");
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const validateCreditCardNumber = (cardNumber) => {
    // Remove non-digit characters
    const cleanedCardNumber = cardNumber.replace(/\D/g, "");

    let sum = 0;
    let isDouble = false;

    // Iterate through the card number digits from right to left
    for (let i = cleanedCardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanedCardNumber.charAt(i), 10);

      if (isDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isDouble = !isDouble;
    }

    // The card number is valid if the sum is divisible by 10
    return sum % 10 === 0;
  };

  const validateUpiID = (upi) => {
    // Define a regular expression pattern for a basic UPI ID
    const upiPattern = /^[a-zA-Z0-9.-]{2, 256}@[a-zA-Z][a-zA-Z]{2, 64}$/;
    return upiPattern.test(upi);
  };
  // Handle credit card number input change
  const handleCreditCardNumberChange = (e) => {
    const value = e.target.value;
    setCreditCardNumber(value);

    // Check if the input matches a valid credit card number pattern
    const isValidCreditCard = validateCreditCardNumber(value);
    setIsCreditCardValid(isValidCreditCard);
  };

  const handleUpiIDChange = (e) => {
    const value = e.target.value;
    setUpiID(value);

    // Check if the input matches a valid UPI ID pattern
    const isValidUpiID = validateUpiID(value);
    setIsUpiIDValid(isValidUpiID);
  };

  const handleCardSubmit = (e) => {
    const card = e.target.value;
    console.log(card);
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          width: "800px",
          marginLeft: "100px",
          marginTop: "30px",
          overflow: "auto",
          resize: "horizontal",
        }}
      >
        <FormControl component="fieldset" sx={{ marginBottom: "20px" }}>
          <FormLabel component="legend">Payment Method</FormLabel>
          <div>
            <label>
              <input
                type="radio"
                value="creditCard"
                checked={paymentMethod === "creditCard"}
                onChange={handlePaymentMethodChange}
              />
              Credit Card
            </label>
            <label>
              <input
                type="radio"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={handlePaymentMethodChange}
              />
              UPI
            </label>
            <label>
              <input
                type="radio"
                value="razorpay"
                checked={paymentMethod === "razorpay"}
                onChange={handlePaymentMethodChange}
              />
              Razorpay
            </label>
          </div>
        </FormControl>

        {paymentMethod === "creditCard" ? (
          <form onSubmit={handleCardSubmit}>
            <CardContent
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)", // Two equal-width columns
                gap: 1.5,
              }}
            >
              <FormControl>
                {/* <FormLabel>Card number</FormLabel> */}
                <TextField
                  required
                  sx={{ gridColumn: "1" }}
                  label="Card Number"
                  type="number"
                  endDecorator={<CreditCardIcon />}
                  value={creditCardNumber}
                  onChange={handleCreditCardNumberChange}
                />
                {!isCreditCardValid && (
                  <p
                    style={{
                      color: "red",
                      marginLeft: "10px",
                      marginTop: "5px",
                    }}
                  >
                    Invalid credit card number.
                  </p>
                )}
              </FormControl>

              <FormControl sx={{ marginTop: "-8px" }}>
               
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      sx={{
                        maxWidth: "250px",
                      }}
                      label="Expiry date"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </FormControl>

              <FormControl>
               
                <TextField
                  id="outlined-basic"
                  label="CVV"
                  variant="outlined"
                 

                  inputProps={{ maxLength: 3 }}
                />
              </FormControl>

              <FormControl sx={{ gridColumn: "1/-1" }}>
               
                <TextField label="Enter cardholder's full name" />
              </FormControl>

              <CardActions sx={{ gridColumn: "1/-1" }}>
                <Button variant="solid" color="primary">
                  Add card
                </Button>
              </CardActions>
            </CardContent>
          </form>
        ) : (
          <form
          
          >
            <CardContent
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 1.5,
              }}
            >
              
              <FormControl>
                <FormLabel>Enter UPI ID</FormLabel>
                <Input
                  type="text"
                  sx={{ gridColumn: "1/-1" }}
                  endDecorator={<CreditCardIcon />}
                  value={upiID}
                  onChange={handleUpiIDChange}
                />
                {!isUpiIDValid && (
                  <p
                    style={{
                      color: "red",
                      marginLeft: "10px",
                      marginTop: "5px",
                    }}
                  >
                    Invalid UPI ID.
                  </p>
                )}
              </FormControl>
              <CardActions sx={{ gridColumn: "1/-1" }}>
                <Button variant="solid" color="primary">
                  Add UPI ID
                </Button>
              </CardActions>
            </CardContent>
          </form>
        )}
      </Card>
    </>
  );
}

export default PaymentSelect;
