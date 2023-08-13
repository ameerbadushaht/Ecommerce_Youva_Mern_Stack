import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";
import { Grid, Paper, Typography } from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";
// import {useCookies} from "react-cookie"
import axios from "axios";
import { useEffect, useState } from "react";

import { useGetUserID } from "../hooks/useGetUserID";

function SellerProduct() {

  const userID=useGetUserID();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [userID]);


  const fetchProducts = async () => {
    try {
        const response = await axios.get(`http://localhost:3001/products/list/${userID}`);
        setProducts(response.data);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

  return (
    <div className="sellerplist">
      <div className="nav">
        <Left>
          <div className="logo">
            <Link to="/" style={{ textDecoration: "none" }}>
              <Logo>YouvA</Logo>
            </Link>{" "}
          </div>
        </Left>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <Link to="/seller" style={{ textDecoration: "none" }}>
          SELL MORE
        </Link>
        </Typography>
        
      </div>

      <div
        className="productBody"
        style={{ width: "100vw", height: "100vh", backgroundColor: "#c9fa9b" }}
      >
        <h2>Product List</h2>
        {products.map((product) => (
          <ButtonBase sx={{ ml: 8 , mt:5}}>
            <Paper
              key={product._id}
              sx={{
                p: 2,
                margin: "auto",
                maxWidth: 500,
                flexGrow: 1,
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#1A2027" : "#fff",
              }}
            >
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase sx={{ width: 128, height: 128 }}>
                    <img
                      src={product.imageUrl}
                      style={{ width: "100%" }}
                      alt={product.name}
                    />
                  </ButtonBase>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md
                  container
                  sx={{ textAlign: "left" }}
                  grid-xs-auto
                >
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                      >
                        {product.name}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Brand: {product.brand}
                      </Typography>
                      {/* <Typography variant="body2" color="text.secondary">
                    Stock: {product.stock}
                  </Typography> */}
                      <Typography variant="body2" component="div">
                        Price: {product.price}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item></Grid>
                </Grid>
              </Grid>
            </Paper>
          </ButtonBase>
        ))}
      </div>
    </div>
  );
}

const Left = styled.div`
  flex: 1;
  display: flex;

  align-items: center;
  margin-left: 50px;
`;
const Logo = styled.h1`
  font-weight: bold;
  margin-bottom: 20px;
  ${mobile({ fontSize: "24px" })}
`;
export default SellerProduct;
