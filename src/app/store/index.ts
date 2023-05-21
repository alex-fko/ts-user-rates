import { configureStore } from "@reduxjs/toolkit";

import { userModel } from "entities/user";

export const store = configureStore({
    reducer: {
        users: userModel.reducer,
    },
});