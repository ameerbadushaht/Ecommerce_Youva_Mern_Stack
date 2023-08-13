import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { mobile } from "../responsive";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { TextField, Button, Container, Grid } from "@mui/material";

const ProductForm = () => {
  const userID = useGetUserID();

  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  //check logged or not

  useEffect(() => {
    // Redirect to login page if not logged in or no access token
    if (!cookies.access_token) {
      navigate("/Login"); // Change '/Login' to your login page route
    }
  }, [cookies.access_token, navigate]);

  const [items, setItems] = useState({
    brand: "",
    name: "",
    stock: "",
    size: "",
    imageUrl: "",
    price: "",
    sellerID: userID,
  });

  //input
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItems({
      ...items,
      [name]: value,
    });
  };

  //submit

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/products/create", items);
      alert("Item Added");
      navigate("/sellerproduct");
    } catch (error) {
      console.error(error);
    }
  };

  //Size 

  const [selectedSize, setSelectedSize] = useState(""); // State for selected size

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
    handleInputChange(event); // Call the existing handleInputChange function
  };


//Dress Types

const [selectedDressType , setSelectedDressType]=useState("")

 const handleDressTypeChange=(event)=>{
  setSelectedDressType(event.target.value);
  handleInputChange(event); // Call the existing
 }
  //logout

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/Login");
  };

  // State for managing the dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);

  // Open the dropdown menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the dropdown menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="seller">
      <Container1 >
        <Wrapper1>
          <Left>
            <div className="logo">
              <Link to="/" style={{ textDecoration: "none" }}>
                <Logo>YouvA</Logo>
              </Link>{" "}
            </div>
          </Left>
          <Right>
            {!cookies.access_token ? (
              <></>
            ) : (
              <>
                <Account onClick={handleClick}>
                  ACCOUNT <KeyboardArrowDownOutlinedIcon />{" "}
                </Account>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem>
                    <Link to="/sellerProfile" style={{ textDecoration: "none" }}>
                      Profile
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/sellerproduct" style={{ textDecoration: "none" }}>
                      Added Items
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <div onClick={logout} style={{ cursor: "pointer" }}>
                      Signout
                    </div>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Right>
        </Wrapper1>
      </Container1>
      <div
        className="body"
        style={{
          background: "linear-gradient(to bottom, #E5E5E5, #B7B7B7)",
          height: "100vh",
          paddingBottom: "2rem",
        }}
      >
        <Title>ADD PRODUCT</Title>

        <Container
          maxWidth="sm"
          sx={{
            mt: 8,
            borderRadius: 3,
            bgcolor: "white",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            px: 20,
            py: 5,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <TextField
                    select
                    sx={{display: "flex",flex:1}}
                    label="Select Brand Name"
                    variant="outlined"
                    name="brand"
                    value={items.brand}
                    onChange={handleInputChange}
                    r
                  >
                    <MenuItem value="Adidas">Adidas</MenuItem>
                    <MenuItem value="Nike">Nike</MenuItem>
                    <MenuItem value="Puma">Puma</MenuItem>
                    <MenuItem value="Allen Solly">Allen Solly</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                  {/* Only display the "Brand Name" field when "Other" is selected */}
                  {items.brand === "Other" && (
                    <TextField
                      label="Brand Name"
                      variant="outlined"
                      name="brand"
                      value={items.brand}
                      onChange={handleInputChange}
                      
                      sx={{ width: 300 }}
                    />
                  )}
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Name"
                  variant="outlined"
                  name="name"
                  fullWidth
                  value={items.name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  label="Type"
                  variant="outlined"
                  fullWidth
                  name="dressType"
                  value={selectedDressType}
                  onChange={handleDressTypeChange}
                >
                  <MenuItem value="Shirt">Shirt</MenuItem>
                  <MenuItem value="Jeans">Jeans</MenuItem>
                  <MenuItem value="Churidhar">Churidhar</MenuItem>
                  <MenuItem value="TShirt">TShirt</MenuItem>
                  <MenuItem value="Coat ">Coat</MenuItem>
                  <MenuItem value="Skirt">Skirt</MenuItem>
                  <MenuItem value="Jersey">Jersey</MenuItem>
                  <MenuItem value="Shoes">Shoes</MenuItem>
                  {/* <MenuItem value="Shoes"></MenuItem> */}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Stock"
                  variant="outlined"
                  fullWidth
                  name="stock"
                  value={items.stock}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  label="Size"
                  variant="outlined"
                  fullWidth
                  name="size"
                  value={selectedSize}
                  onChange={handleSizeChange}
                >
                  <MenuItem value="S">S</MenuItem>
                  <MenuItem value="M">M</MenuItem>
                  <MenuItem value="L">L</MenuItem>
                  <MenuItem value="XL">XL</MenuItem>
                  <MenuItem value="XXL">XXL</MenuItem>
                  <MenuItem value="XXXL">XXXL</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Image URL"
                  variant="outlined"
                  fullWidth
                  name="imageUrl"
                  value={items.imageUrl}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              {/* different price options */}

              {/* <Grid item xs={12}>
                        <TextField
                            select
                            label="Price"
                            variant="outlined"
                            
                            name="price"
                            value={selectedCurrency}
                            onChange={handleCurrencyChange}
                        >
                            <MenuItem value="$">$</MenuItem>
                            <MenuItem value="₹">₹</MenuItem>
                        </TextField>
                    
                        <TextField
                            label="Price"
                            variant="outlined"
                            
                            name="price"
                            value={items.price}
                            onChange={handleInputChange}
                            required
                        />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  label="Price"
                  variant="outlined"
                  fullWidth
                  name="price"
                  value={items.price}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  ADD
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </div>
    </div>
  );
};

//Styled Components

const Title = styled.div`
  margin: auto;
  width: 50%;
  font-size: 2rem;
  padding-top: 50px;
  text-align: center;
`;

const Container1 = styled.div`
  height: 100px;
  ${mobile({ height: "50px" })}
`;

const Wrapper1 = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

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
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;
const Account = styled.div`
  cursor: pointer;
  margin-left: 25px;
  padding: 8px;
  text-align: center;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

export default ProductForm;
