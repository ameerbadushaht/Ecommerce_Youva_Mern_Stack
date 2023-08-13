import { Badge } from '@mui/material';
import { Link,useNavigate  } from "react-router-dom";
import { useCookies } from "react-cookie";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import {React,useState }from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';


import "../App.css"

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/Login");
  };
  

    // ...
  
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

    <Container >
      <Wrapper>
        <Left>
          {/* <Language>EN</Language> */}
          <SearchContainer>
            <Input placeholder="Search" />
            <SearchIcon style={{ color: "gray", fontSize: 20 }} />
          </SearchContainer>
        </Left>
        <Center>
          <div className="logo"><Link to="/" style={{ textDecoration: 'none' }}><Logo>YouvA</Logo></Link> </div>
         
        </Center>
        <Right>
          {!cookies.access_token? (<>
            <NavbarItem> <Link to="/seller" style={{ textDecoration: 'none' }}>SELL ITEMS</Link></NavbarItem>
          <NavbarItem> <Link to="/register" style={{ textDecoration: 'none' }}>REGISTER</Link></NavbarItem>
          <NavbarItem><Link to="/login" style={{ textDecoration: 'none' }}>SIGN IN</Link></NavbarItem>
          
          </>):( <>
            <NavbarItem> <Link to="/seller" style={{ textDecoration: 'none' }}>SELL ITEMS</Link></NavbarItem>

            <Account onClick={handleClick}>ACCOUNT <KeyboardArrowDownOutlinedIcon/> </Account>
            <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem ><Link to="/profile" style={{ textDecoration: 'none' }}>Profile</Link></MenuItem>
            <MenuItem ><Link to="/settings" style={{ textDecoration: 'none' }}>Settings</Link></MenuItem>
            <MenuItem ><div onClick={logout} style={{ cursor: "pointer" }}>Signout</div></MenuItem>
          </Menu>
          
          <Cart>
            <Badge 
            // badgeContent={""} 
            color="primary">
             <Link to="/Cart"><ShoppingCartIcon /></Link> 
            </Badge>
            </Cart>
          </>
          )}     
        </Right>
      </Wrapper>
    </Container>
  
  );
};




//Styled Components
const Container = styled.div`
  height: 100px;
  
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`

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
`;

// const Language = styled.span`
//   font-size: 14px;
//   cursor: pointer;
//   ${mobile({ display: "none" })}
// `;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  margin-bottom: 15px;
  border-radius:15px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  width:400px;
  
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  margin-bottom:20px;
`;

const Logo = styled.h1`
  font-weight: bold;
  margin-bottom:20px;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const NavbarItem = styled.div`

  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  background-color:#d7d8d9;
  padding:8px;
  text-align: center;
  border-radius:5px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Cart=styled.div`
cursor: pointer;
margin-left: 25px;
padding:8px;
text-align: center;
${mobile({ fontSize: "12px", marginLeft: "10px" })}
`

const Account = styled.div`
cursor: pointer;
margin-left: 25px;
padding:8px;
text-align: center;
${mobile({ fontSize: "12px", marginLeft: "10px" })}
`

export default Navbar;
