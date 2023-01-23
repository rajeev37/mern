import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import apiReducers from './slice/apiSlice';


export const store = configureStore({
    reducer: {
        api: apiReducers,
        auth: authReducer
    },
    devTools: true
})