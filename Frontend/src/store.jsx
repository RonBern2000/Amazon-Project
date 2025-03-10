import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import storeReducer from "./reducers/storeReducer";

const Store = createContext();

// All the global vars:
const initialState = {
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,

    // CartItems, shippingAddress, paymentMethod
    cart: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingAddress: localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {},
        paymentMethod: localStorage.getItem("paymentMethod") ? JSON.parse(localStorage.getItem("paymentMethod")) : "",
    }
}

const StoreProvider = ({children}) => {
    const {state, dispatch} = useReducer(storeReducer, initialState);

    return(
        <>
            <Store.Provider value={{state, dispatch}}>{children}</Store.Provider>
        </>
    )
}

export {StoreProvider, Store};

StoreProvider.propTypes = {
    children: PropTypes.node
}