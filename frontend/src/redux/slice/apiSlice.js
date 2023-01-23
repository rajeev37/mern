import { configureStore, createSlice } from "@reduxjs/toolkit";

export const apiSlice = createSlice({
    name: "api",
    initialState: { isLoading: false },
    reducers: {
        setLoading(state, action) {
            state.isLoading = action.payload;
        }
    }
})
export const apiActions = apiSlice.actions;
export const loading = (state) => state.api.isLoading;
export default apiSlice.reducer;