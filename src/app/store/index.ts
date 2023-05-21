import {configureStore, AnyAction, combineReducers} from "@reduxjs/toolkit";
import {combineEpics, createEpicMiddleware } from "redux-observable";
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';

import logger from 'redux-logger'

import { userModel } from "entities/user";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const reducer = combineReducers({
    users: userModel.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);


const combinedEpic = combineEpics(
    ...userModel.epics
)

export type MyState = ReturnType<typeof reducer>;

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, MyState>();


export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({thunk: false}).concat(epicMiddleware, logger)
});

export const persistor = persistStore(store)


epicMiddleware.run(combinedEpic)