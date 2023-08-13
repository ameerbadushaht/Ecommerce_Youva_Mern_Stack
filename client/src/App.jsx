
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

const App = () => {
  return(
  <Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/plist" element={<ProductList />} />
      <Route path="/sellerproduct" element={<SellerProduct />} />
      <Route path="/settings" element={<Settings/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/seller" element={<Seller/>}/>
      <Route path="/sellerProfile" element={<Seller/>}/>

    </Routes>
  </Router>
  )
};

export default App;