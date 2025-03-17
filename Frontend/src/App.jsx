import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import HomePage from "./pages/HomePage";
import Footer from "./components/shared/Footer";
import Header from "./components/shared/Header";
import SignupPage from "./pages/SignupPage";
import { ToastContainer } from "react-toastify";
import SigninPage from "./pages/SigninPage";
import ProductPage from "./pages/ProductPage"
import CartPage from "./pages/CartPage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import SubmitOrderPage from "./pages/SubmitOrderPage";
import OrderPage from "./pages/OrderPage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column side-allPage">
        <ToastContainer position="bottom-center" limit={1}/>
        <Header/>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignupPage/>}/>
              <Route path="/signin" element={<SigninPage/>}/>
              <Route path="/product/:token" element={<ProductPage/>}/>
              <Route path="/cart" element={<CartPage/>}/>
              <Route path="/shipping" element={<ShippingPage/>}/>
              <Route path="/payment" element={<PaymentPage/>}/>
              <Route path="/order/:id" element={<OrderPage/>}/>
              <Route path="/placeorder" element={<SubmitOrderPage/>}/>
              <Route path="/search" element={<SearchPage/>}/>
            </Routes>
          </Container>
        </main>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
