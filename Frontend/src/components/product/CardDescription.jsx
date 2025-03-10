import React from 'react'
import PropTypes from 'prop-types'
import { Badge, Button, Card, ListGroup } from 'react-bootstrap';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const CardDescription = ({product, addToCart}) => {
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
                    <Col>{product.countInStock !== 0 ? (
                        <Badge bg='success'>In Stock</Badge>
                    ): (
                        <Badge bg='danger'>Unavailable</Badge>
                    )}
                    </Col>
                </Row>
            </ListGroup.Item>
            <ListGroup.Item>
                <div className='d-grid'>
                    <Button onClick={addToCart} disabled={product.counInStock < 1} variant='warning'>Add to Cart</Button>
                </div>
            </ListGroup.Item>
        </ListGroup>
    </Card>
  )
}

export default CardDescription;

CardDescription.propTypes = {
    product: PropTypes.object,
    addToCart: PropTypes.func
}