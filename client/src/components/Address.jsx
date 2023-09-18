import React, { useState } from "react";
import { useEffect } from "react";
// import Divider from "@mui/joy/Divider";
// import Typography from "@mui/joy/Typography";
import { useGetUserID } from "../hooks/useGetUserID";
import { Box, Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
function Address() {
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isValid, setIsValid] = useState(true);
  // const [isSubmitted, setSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const userID = useGetUserID();
  const [address, setAddress] = useState({});

  const postalCodePattern = /^[1-9][0-9]{5}$/;

  //fetch Address information
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/order/${userID}`
        );
        if (response.data.userAddress) {
          setAddress(response.data.userAddress[0]);
          // console.log(response.data.userAddress[0]);
        } else {
          console.error("User address not found.");
        }
      } catch (error) {
        console.error("Error fetching user address:", error);
      }
    };

    fetchAddress();
  }, [userID]);

  useEffect(() => {
    // Set initial address values when the address is fetched
    setAddressLine1(address.addressLine1);
    setAddressLine2(address.addressLine2);
    setState(address.state);
    setCity(address.city);
    setPostalCode(address.postalCode);
  }, [address]);

  const handlePostalCodeChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setPostalCode(value);

    const isValidPostalCode = postalCodePattern.test(value);
    setIsValid(isValidPostalCode);
  };

  const handleSubmit = async (e) => {
    
    try {
      const response = await axios.post(
        "http://localhost:3001/order/setAddress",
        {
          userID,
          userAddress: {
            addressLine1,
            addressLine2,
            state,
            city,
            postalCode,
          },
        }
      );
      alert("Address updated successfully");
    } catch (err) {
      console.error("Error adding to favorites:", err);
    }

   
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100ch" },
            marginLeft: "100px",
            marginTop: "50px",
          }}
          noValidate
          autoComplete="off"
        >
          <h2>Delivery Address</h2>
          {!isEditing && (
            
              <Box sx={{display:'flex',gap:20}}>
                <div>
              <Typography>Address Line 1: <span style={{"font-size":"20px", "margin-left":"15px"}}>{address.addressLine1}</span> </Typography>
              <Typography>Address Line 2: <span style={{"font-size":"20px", "margin-left":"15px"}}>{address.addressLine2}</span></Typography>
              <Typography>State: <span style={{"font-size":"20px", "margin-left":"85px"}}>{address.state}</span></Typography>
              <Typography>City: <span style={{"font-size":"20px", "margin-left":"95px"}}>{address.city}</span></Typography>
              <Typography>Postal Code: <span style={{"font-size":"20px", "margin-left":"35px"}}>{address.postalCode}</span></Typography>
              </div>
              <Button
                onClick={handleEditClick}
                variant="outlined"
                sx={{  maxHeight:'25px',marginRight: '50px',maxWidth:'500px' }}
              >
                Change Address
              </Button>
              </Box>
            
          )}

          { isEditing && (
            <div className="paymentAddress">
              <TextField
                required
                id="outlined-required"
                label="Address Line 1"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
              />
              <TextField
                id="outlined-required"
                label="Address Line 2"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
              />
              <br />
              <TextField
                required
                id="outlined-required"
                label="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                autocomplete="section-blue shipping address-level2"
                sx={{
                  maxWidth: "250px",
                }}
              />

              <TextField
                required
                id="outlined-required"
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                sx={{
                  maxWidth: "250px",
                }}
              />

              <TextField
                required
                type="text"
                label="Postal Code"
                value={postalCode}
                onChange={handlePostalCodeChange}
                placeholder="123456"
                sx={{
                  maxWidth: "270px",
                }}
              />
              {!isValid && (
                <p
                  style={{
                    color: "red",
                    marginLeft: "550px",
                    marginTop: "-5px",
                  }}
                >
                  Invalid postal code format.
                </p>
              )}
              <br />
              <Button
                onClick={handleEditClick}
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#C70039", marginLeft: "10px" }}
              >
                Add Address
              </Button>
            </div>
          )} 
        </Box>
      </form>
    </div>
  );
}

export default Address;
