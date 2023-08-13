import styled from "styled-components";
import { mobile } from "../responsive";
import {Link} from 'react-router-dom'
import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import MuiAlert from "@mui/material/Alert";
import "../App.css";
import { TextField, Button, Container, Typography, Box } from '@mui/material';

// const Left = styled.div`
//   flex: 1;
//   display: flex;
//   align-items: center;
// `;
// const Right = styled.div`
//   flex: 1;
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
//   ${mobile({ flex: 2, justifyContent: "center" })}
// `;
const Container2 = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.2)
    ),
    url("/images/sign.jpg") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  
  ${mobile({ width: "75%" })}
`;
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 


  const [_, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      // Check if the email is registered
      const checkEmailResponse = await axios.get(
        `http://localhost:3001/users/check-email/${email}`
      );

      if (!checkEmailResponse.data.exists) {
        alert("Email is not registered");
        return;
      }
      const response = await axios.post("http://localhost:3001/users/login", {
        email,
        password,
      });
      const { token } = response.data;
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      if (token) {

        navigate("/");
        <Alert severity="success" color="info">
        successfully logged in
      </Alert>
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
<Container2><Wrapper>
<Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Typography variant="h6" sx={{ marginBottom: 2, color: 'white' }}>
                        HOME
                    </Typography>
                </Link>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        background: 'white',
                        padding: 3,
                        borderRadius: 4,
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        position: 'relative', // Add position relative
                    }}
                >
                    <Typography variant="h4" sx={{ marginBottom: 2 }}>
                        Login
                    </Typography>
                    <form onSubmit={onSubmit}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            type="email"
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            type="password"
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: 2,
                            }}
                        >
                            <Button variant="contained" color="primary" type="submit">
                                Login
                            </Button>
                            <Link to="/Register" style={{ textDecoration: 'none' }}>
                                <Typography variant="body2">Register Here</Typography>
                            </Link>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Container>
        </Wrapper>
        </Container2>
  );
};



export default Login;
