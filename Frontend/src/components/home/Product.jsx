import React, { useContext } from 'react'
import  Card from 'react-bootstrap/Card'
import {Link} from "react-router-dom"
import PropTypes from 'prop-types'
import Rating from '../shared/Rating'
import Button from 'react-bootstrap/Button'
import {Store} from '../../store';
import { addToCartHandler } from '../../utils'

const Product = ({product}) => {

    const {state : {cart: {cartItems}}, dispatch} = useContext(Store);

  return (
    <Card className='product-card'>
        <Link to={`/product/${product.token}`}>
            <Card.Img style={{padding: "20%"}} variant="top" src={product.image} alt={product.token}/>
        </Link>
        <Card.Body className='card-body'>
            <Card.Title>
                <Link to={`/product/${product.token}`}>{product.title}</Link>
            </Card.Title>
            <Rating rating={product.rating.rate} numReviews={product.rating.count}/>
            <Card.Text>
                <strong>${product.price}</strong>
            </Card.Text>

            {product.countInStock === 0 ? (
                <Button variant='light' disabled className='mb-2 mt-auto'>Out of Stock</Button>
            ) : (
                <Button variant='warning' className='mb-2 mt-auto' onClick={() => addToCartHandler(product, cartItems, dispatch)}>
                    Add to Cart
                </Button>
            )}
        </Card.Body>
    </Card>
  )
}

export default Product

Product.propTypes = {
    product: PropTypes.object
}