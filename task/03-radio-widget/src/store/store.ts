import { configureStore } from "@reduxjs/toolkit";
import widgetReducer from "./widgetSlice";

export const store = configureStore({
    reducer: {
        widgets: widgetReducer,
    },
});
