import { USER_SIGNIN, USER_SIGNOUT, ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_ADDRESS, SAVE_PAYMENT_METHOD, CLEAR_CART } from "../actions";
//action => {type: USER_SIGNIN, payload: user}
const storeReducer = (state, {type, payload}) => { 
    switch(type){
        case USER_SIGNIN:
            return {...state, userInfo: payload}
        case USER_SIGNOUT:
            return {...state, userInfo : null, cart: {cartItems : [], shippingAddress: {}, paymentMethod: ''}}
        case ADD_TO_CART:{
            const newItem = payload;
            const exisitingItems = state.cart.cartItems.find(item => item._id === newItem._id);

            const cartItems = exisitingItems ? state.cart.cartItems.map(item => item._id === exisitingItems._id ? newItem : item) : 
            [...state.cart.cartItems, newItem];

            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            return {...state, cart: {...state.cart, cartItems}}; // Immer can be used
        }
        case REMOVE_FROM_CART:{
            const cartItems = state.cart.cartItems.filter((item) => item._id !== payload.payload._id);
            localStorage.setItem("cartItems", JSON.stringify(cartItems));

            return {...state, cart: {...state.cart, cartItems}};
        }
        case SAVE_SHIPPING_ADDRESS:{
            localStorage.setItem("shippingAddress", JSON.stringify(payload));

            return {...state, cart: {...state.cart, shippingAddress: payload}}
        }
        case SAVE_PAYMENT_METHOD:{
            localStorage.setItem("paymentMethod", JSON.stringify(payload));
            return {...state, cart: {...state.cart, paymentMethod: payload}}
        }
        case CLEAR_CART:{
            return {...state, cart: {...state.cart, cartItems: []}}
        }
        default:
            return state;
    }
}
export default storeReducer;