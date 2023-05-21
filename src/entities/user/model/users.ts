import {
    createSelector,
    createSlice,
    Dispatch,
    PayloadAction,
} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useIsFetching, useQuery } from "react-query";
import type { AxiosResponse } from "axios";

import { UserDto, randomApi } from "shared/api";
import {User} from "./types";
import {GetUsersPaginatedParams, GetUsersParams} from "../../../shared/api/random-api/users";
import {mapUsers} from "../lib/mapUser";

export const initialState: {
    data: User[];
    pages: number,
} = {
    data: [],
    pages: 1
};

export const userModel = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsersList: (state, { payload }: PayloadAction<User[]>) => {
            state.data = payload;
        },
        loadMoreUsers: (state, { payload }: PayloadAction<User[]>) => {
            state.data = [...state.data, ...payload];
        },
        updateUserRate: (state, { payload }: PayloadAction<{ id: number, modifier: number }>) => {
            const user = state.data.find((el) => el.id === payload.id);
            if (user) {
                user.rating += payload.modifier;
                user.isRated = true;
            }
        },
        unRateUser: (state, { payload }: PayloadAction<{ id: number }>) => {
            const user = state.data.find((el) => el.id === payload.id);
            if (user) {
                user.isRated = false;
            }
        }
    },
});

export const { setUsersList, loadMoreUsers, updateUserRate, unRateUser } = userModel.actions;

// react-query actions (everything that async)

const USERS_LIST_QUERY_KEY = "users";
const MORE_USERS_QUERY_KEY = "more_users";

export const getUsersListAsync =
    (params: GetUsersParams) => (dispatch: Dispatch) =>
        useQuery<AxiosResponse<UserDto[]>>(
            USERS_LIST_QUERY_KEY,
            () => randomApi.users.getUsers(params),
            {
                onSuccess: ({ data }) => {
                    dispatch(userModel.actions.setUsersList(mapUsers(data)));
                },
                refetchOnWindowFocus: false,
            }
        );

export const loadMoreUsersAsync =
    (params: GetUsersPaginatedParams) => (dispatch: Dispatch) =>
        useQuery<AxiosResponse<UserDto[]>>(
            MORE_USERS_QUERY_KEY,
            () => randomApi.users.getUsersPaginated(params),
            {
                onSuccess: ({ data }) => {
                    dispatch(userModel.actions.loadMoreUsers(mapUsers(data)));
                },
                refetchOnWindowFocus: false,
            }
        );

// selectors

export const useUnratedUsers = () =>
    useSelector(
        createSelector(
            (state: RootState) => state.users.data,
            (
                users: RootState["users"]["data"]
            ) =>
                Object.values(users).filter(
                    (user) => !user.isRated
                )
        )
    );


export const useRatedUsers = () =>
    useSelector(
        createSelector(
            (state: RootState) => state.users.data,
            (
                users: RootState["users"]["data"]
            ) =>
                Object.values(users).filter(
                    (user) => !!user.isRated
                )
        )
    );

export const useIsUsersListLoading = (): boolean =>
    useIsFetching([USERS_LIST_QUERY_KEY]) > 0;

export const useIsUserListEmpty = (): boolean =>
    useSelector(
        createSelector(
            (state: RootState) => state.users.data,
            (users) => Object.keys(users).length === 0
        )
    );

export const reducer = userModel.reducer;