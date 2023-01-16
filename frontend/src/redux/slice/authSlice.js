import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { token: null },
    reducers: {
        setCredentials(state, action) {
            const { accessToken }  = action.payload;
            console.log("******setCredentials**********", accessToken);
            state.token = accessToken;
        },
        logout(state) {
            state.token = null;
        }
    }
});

export const authActions = authSlice.actions;
export const selectCurrentToken = (state) => state.auth.token;

export default authSlice.reducer