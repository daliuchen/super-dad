import {configureStore} from "@reduxjs/toolkit";
import currentUserSlice from "@/redux/slices/currentUserSlice";
import recordsSlice from "@/redux/slices/recordsSlice";

export const store = configureStore({
    reducer: {
        currentUser: currentUserSlice,
        records: recordsSlice
    }
})
