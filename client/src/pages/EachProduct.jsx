import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Container,Link , Grid, Paper, Typography } from "@mui/material";
import { useGetUserID } from "../hooks/useGetUserID";

function EachProduct() {
  const { productId } = useParams();
  const [product, setProducts] = useState([]);
  const navigate = useNavigate()
  const userID = useGetUserID();


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/products/${productId}`
        );
        setProducts(response.data); // Assuming the response contains the product data
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [productId]);


const handle= async(productId)=>{
// 
try{ 
  const response = await axios.post('http://localhost:3001/cart',{
    userID:userID,
    productId,
    if(response){
      navigate(`/Cart/${productId}`)
    }
  });
  console.log(response.data.message);
   
}catch(error){ console.error("Error adding to Cart : ", error);}
}


  return (
    <div className="container">
      <Navbar />
      <Container1>
        <Container
          sx={{
            padding: "20px",
            width: "100vw",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper sx={{boxShadow:6,borderRadius:3, p:2}}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{ width: "100%" }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid xs container direction="column" spacing={2}>
                <Paper sx={{ p: 2, m: 3, boxShadow: 5 }}>
                  <Typography variant="h4" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="h6" className="price">
                    $ {product.price}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Brand: {product.brand}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Stock: {product.stock}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Size: {product.size}
                  </Typography>
                  <Grid>
                    <Grid item direction="column" onClick={()=>handle(productId)} cursor="pointer">
                      <Typography variant="subtitle3" component="div" >
                       <Link sx={{textDecoration:'none', color:"black", cursor:"pointer"}}>ADD TO CART</Link> 
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Container1>
    </div>
  );
}

const Container1 = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  background-color: #f5fbdd;
  justify-content: space-between;
`;

export default EachProduct;
