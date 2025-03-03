import { createContext, useReducer } from "react";
import propTypes from 'prop-types'
import PropTypes from "prop-types";
import storeReducer from "./reducers/storeReducer.js";

const Store = createContext();

// All the global vars:
const initialState = {
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
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