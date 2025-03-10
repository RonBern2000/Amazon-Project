import React from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Checkout = ({cartItems, checkoutHandler}) => {
  return (
    <Card>
        <Card.Body>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h3>
                        Subtotal: ({cartItems.reduce((a,c) => a + c.quantity, 0)} Items)
                        : $
                        {cartItems.reduce((a, c) => a + c.price * c.quantity, 0).toFixed(2)}
                    </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div className='d-grid'>
                        <Button type='button' variant='warning' onClick={checkoutHandler} disabled={cartItems.length === 0}>Checkout</Button>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </Card.Body>
    </Card>
  )
}

export default Checkout;

Checkout.propTypes = {
    cartItems: PropTypes.array,
    checkoutHandler: PropTypes.func,
}