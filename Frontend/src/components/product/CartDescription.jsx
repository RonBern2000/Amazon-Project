import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";


const CartDescription = ({ product, addToCart}) => {
  return (
    <Card>
        <ListGroup>
          <ListGroup.Item>
            <Row>
              <Col>Price</Col>
              <Col>${product.price}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Status</Col>
              <Col>
                {product.countInStock > 0 ? (
                  <Badge bg="success">In Stock</Badge>
                ) : (
                  <Badge bg="danger">Unavailable</Badge>
                )}
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="d-grid">
              {/*TODO: Out of stock button*/}
                <Button onClick={addToCart} variant="warning">Add to Cart</Button>
            </div>
          </ListGroup.Item>
        </ListGroup>
    </Card>
  );
};
export default CartDescription;

CartDescription.propTypes = {
  product: PropTypes.object,
  addToCart: PropTypes.func,
};
