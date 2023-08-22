import React from "react";
// import { useEffect, useState } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useGetUserID } from "../hooks/useGetUserID";
import Navbar from "../components/Navbar"
import { Grid, Paper, Typography } from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";
import { useNavigate } from "react-router-dom";

function Fav() {
  const [products, setProducts] = useState([]);
  const userID = useGetUserID();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/fav/saved/${userID}`
        );
        setProducts(response.data.favorite);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [userID]);



// const handleButton = async(productID) => {
//   await axios.post("http://localhost:3001/products", {
//     productID
//   })
// }

const handleButton = (productId) => {
  navigate(`/eachproduct/${productId}`);
};


  return (
    <div className="container">
      <Navbar />
      <div className="header" style={{marginLeft:50 } }>
          <h2>Your Saved Products</h2>
        </div>
      <Container1>
       

        {products.map((product) => (
          <ButtonBase sx={{ ml: 8, mt: 5 }} onClick={()=>handleButton(product._id)}>
            <Paper
              key={product._id}
              sx={{
                p: 2,
                margin: "auto",
                maxWidth: 500,
                flexGrow: 1,
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#1A2027" : "#ffff",
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
                      {/* <Typography variant="body2" gutterBottom>
                        Brand: {product.brand}
                      </Typography> */}
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
      </Container1>
    </div>
  );
}

const Container1 = styled.div`
  padding: 20px;
  // display: flex;
  height: 100vh;
  flex-wrap: wrap;
  background-color:#80c2ac
  // justify-content: space-between;
`;

export default Fav;
