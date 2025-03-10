import axios from 'axios';
import toast from 'react-toastify'
import { ADD_TO_CART } from './actions';

export const addToCartHandler = async(product, cartItems, dispatch)=>{
    const existingItem = cartItems.find((x) => x._id === product._id);
    const quantity = existingItem ? existingItem.quantity + 1 : 1;

    try {
        const {data} = await axios.get(`/api/v1/products/${product._id}`);

        if(data.coutInStock < quantity){
            toast.error("Sorry, Product is out of stock");
            return;
        }

        dispatch({
            type: ADD_TO_CART,
            payload: {...product, quantity}, // adding quantity to the product entity frontend wise
        });
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
}

export const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;