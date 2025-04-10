import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import Product from './Product';

const Products = ({products}) => {
  return (
    <>
      <Row>
        {products.map(product => (
            <Col key={product.token} sm={6} md={4} lg={3} className='mb-3'>
                <Product product={product}/>
            </Col>
        ))}
      </Row>
    </>
  )
}

export default Products

Products.propTypes = {
    products: PropTypes.array
}
