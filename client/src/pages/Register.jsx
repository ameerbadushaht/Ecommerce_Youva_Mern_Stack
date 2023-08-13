// import styled from "styled-components";
// import { mobile } from "../responsive";
// import {Link} from 'react-router-dom'
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const Register = () => {

  //create useState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      // Check if the email is already registered
      const checkEmailResponse = await axios.get(
        `http://localhost:3001/users/check-email/${email}`
      );

      if (checkEmailResponse.data.exists) {
        alert("Email is already registered");
        return;
      }
      await axios.post("http://localhost:3001/users/register", {
        email,
        password,
      });
      alert("Registration Success");
      navigate('/Login');
    } catch (error) {
      console.log("Error registering",error);
      alert("Registration Failure");
    }
  };
  return (

  <Box
  sx={{
      background: 'linear-gradient(to bottom, #F2F2F2, #D9D9D9)', // Grey gradient background
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
  }}
>
  <Container maxWidth="sm">
      <Box
          sx={{
              background: 'white', // White background for the form
              padding: 3,
              borderRadius: 4,
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Box shadow
          }}
      >
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
              Register
          </Typography>
          <form onSubmit={onSubmit}>
              <TextField
                  label="Enter Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  id="email"
              />
              <TextField
                  label="Enter Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  id="password"
              />
              <Button variant="contained" color="primary" type="submit">
                  Register
              </Button>
          </form>
      </Box>
  </Container>
</Box>
  );
};

export default Register;

