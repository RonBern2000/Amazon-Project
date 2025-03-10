import React from 'react';
import { Link } from 'react-router-dom';
import Messagebox from '../shared/Messagebox';
import PropTypes from 'prop-types';
import { Button, ListGroup } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ItemsInCart = ({cartItems, updateCartHandler, removeItemHandler}) => {
  return (
    <div>
        {cartItems.length === 0 ? (
            <Messagebox>
                Your cart is empty {' '}
                <Link to={'/'}>Go back to Shopping</Link>
            </Messagebox>
        ) : (
            <ListGroup>
                {cartItems.map((item)=>  (
                    <ListGroup.Item key={item._id}>
                        <Row className='align-items-center'>
                            <Col md={4}>
                                <image src={item.image} alt={item.title} className='img-fluid rounded img-thumbnail'/>
                                {" "}
                                <Link to={`/product/${item.token}`}>{item.title}</Link >
                            </Col>
                            <Col md={3}>
                                <Button variant='light' onClick={() => updateCartHandler(item, item.quantity - 1)} disabled={item.quantity === 1}>
                                    <i className='fas fa-minus-circle'></i>
                                </Button>
                                {" "}
                                <span>{item.quantity}</span>
                                {" "}
                                <Button variant='light' onClick={() => updateCartHandler(item, item.quantity + 1)} disabled={item.quantity === item.countInStock}>
                                    <i className='fas fa-plus-circle'></i>
                                </Button>
                            </Col>
                            <Col md={1}>
                                ${item.price}
                            </Col>
                            <Col md={1}>
                                <Button variant='light' onClick={() => removeItemHandler(item)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        )}
    </div>
  )
}

export default ItemsInCart;

ItemsInCart.propTypes = {
    cartItems: PropTypes.array,
    updateCartHandler: PropTypes.func,
    removeItemHandler: PropTypes.func,
}