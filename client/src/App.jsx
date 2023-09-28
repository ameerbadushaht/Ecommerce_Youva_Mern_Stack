
import Home from "./pages/Home";
import {BrowserRouter as Router , Route, Routes} from 'react-router-dom'
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Seller from "./pages/Seller";
import SellerProduct from "./pages/SellerProduct";
import Fav from "./pages/Fav";
import EachProduct from "./pages/EachProduct";
import CheckOut from "./pages/CheckOut";
import Payment from "./pages/Payment";

const App = () => {
  return(
  <Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart/:userID" element={<Cart />} />
      <Route path="/plist" element={<ProductList />} />
      <Route path="/sellerproduct" element={<SellerProduct />} />
      <Route path="/settings" element={<Settings/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/seller" element={<Seller/>}/>
      <Route path="/sellerProfile" element={<Seller/>}/>
      <Route path="/fav" element={<Fav/>}/>
      <Route path="/CheckOut" element={<CheckOut/>}/>
      <Route path="/eachproduct/:productId" element={<EachProduct/>} />
      <Route path="/payment/:total" element={<Payment/>} />
      <Route path="/payment" element={<Payment/>} />

    </Routes>
  </Router>
  )
};

export default App;
