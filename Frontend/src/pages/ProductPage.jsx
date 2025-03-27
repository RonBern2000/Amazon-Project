import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../store";
import { useRequest } from "../hooks/useRequest";
import { addToCartHandler } from "../utils";
import Loading from "../components/shared/Loading";
import Messagebox from "../components/shared/Messagebox";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductDescription from '../components/product/ProductDescription';
import CartDescription from "../components/product/CartDescription";

const ProductPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Store);

  const {
    isLoading,
    error,
    data: product,
  } = useRequest(`/api/v1/products/token/${token}`);

  const addToCart = async () => {
    await addToCartHandler(product, cartItems, dispatch);
    navigate("/cart");
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Messagebox variant={"danger"}>{error}</Messagebox>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <img src={product.image} alt={product.name} width={400} />
            </Col>
            <Col md={3}>
              <ProductDescription {...product}/>
            </Col>
            <Col md={3}>
              <CartDescription product={product} addToCart={addToCart}/>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};
export default ProductPage;
