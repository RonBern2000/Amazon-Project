import React, { useContext } from 'react';
import Title from '../components/shared/Title';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ItemsInCart from '../components/cart/ItemsInCart';
import { Store } from '../store';
import Checkout from '../components/cart/Checkout';
import axios from 'axios';
import { toast } from 'react-toastify';
import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {

    const {state : {cart: {cartItems}} , dispatch} = useContext(Store);

    const navigate = useNavigate();

    const updateCartHandler = async(item, quantity) => {
        try {
            const {data: product} = await axios.get(`/api/v1/products/${item._id}`);

            if(product.coutInStock < quantity){
                toast.error("Sorry, Product is out of stock");
                return;
            }

            dispatch({
                type: ADD_TO_CART,
                payload: {...product, quantity},
            });
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }

    
    const removeCartHandler = (item) => {
        dispatch({type: REMOVE_FROM_CART, payload: item});
    }
    
    const checkoutHandler = () => {
        navigate("/signin?redirect=/shipping")
    }
  return (
    <div>
        <Title title={'Shopping Cart'}/>
        <Row>
            <Col md={8}>
                <ItemsInCart cartItems={cartItems} updateCartHandler={updateCartHandler} removeItemHandler={removeCartHandler}/>
            </Col>
            <Col md={4}>
                <Checkout cartItems={cartItems} checkoutHandler={checkoutHandler}/>
            </Col>
        </Row>
    </div>
  )
}

export default CartPage;