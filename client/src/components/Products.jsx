import styled from "styled-components";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


//All product shows here

const Container1 = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;



const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/products/list/");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

 
  const navigate = useNavigate();
  
const handleButton = (productId) => {
  navigate(`/eachproduct/${productId}`);
};

  return (
    <Container1 >
      {products.map((product) => (
        <Container id={product._id} key={product._id} onClick={()=>handleButton(product._id)}> 
          <Circle />
          <Image src={product.imageUrl} />
          <Info>
            <Icon>
              <ShoppingCartIcon />
            </Icon>
            {/* <Icon onClick={() => favoriteProduct(product._id)}>
              {clickedProducts[product._id] ? (
                <FavoriteIcon />
              ) : (
                <FavoriteBorderIcon />
              )}
            </Icon> */}
          </Info>
        </Container>
      ))}
    </Container1>
  );
};



const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

export default Products;
