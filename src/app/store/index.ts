import {configureStore, AnyAction, combineReducers} from "@reduxjs/toolkit";
import {combineEpics, createEpicMiddleware } from "redux-observable";
import logger from 'redux-logger'

import { userModel } from "entities/user";



const reducer = combineReducers({
    users: userModel.reducer,
});

const combinedEpic = combineEpics(
    ...userModel.epics
)

export type MyState = ReturnType<typeof reducer>;

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, MyState>();


export const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({thunk: false}).concat(epicMiddleware, logger)
});

epicMiddleware.run(combinedEpic)