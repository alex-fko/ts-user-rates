import {
    createAction,
    createSelector,
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";
import { Observable, switchMap, from, concatMap, of, filter, startWith, catchError } from 'rxjs';
import {Epic, ofType, StateObservable} from "redux-observable";
import { useSelector } from "react-redux";

import { randomApi } from "shared/api";
import {User} from "./types";
import {GetUsersPaginatedParams, GetUsersParams} from "../../../shared/api/random-api/users";
import {mapUsers} from "../lib/mapUser";

export const initialState: {
    data: User[];
    pages: number,
    isFetching: boolean
} = {
    data: [],
    pages: 1,
    isFetching: false
};

export const userModel = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsersAreFetching: (state, { payload }: PayloadAction<boolean>) => {
            state.isFetching = payload;
        },
        setUsersList: (state, { payload }: PayloadAction<User[]>) => {
            state.data = payload;
            state.isFetching = false;
        },
        loadMoreUsers: (state, { payload }: PayloadAction<User[]>) => {
            state.data = [...state.data, ...payload];
            state.isFetching = false;
        },
        updateUserRate: (state, { payload }: PayloadAction<{ id: number, modifier: number }>) => {
            const user = state.data.find((el) => el.id === payload.id);
            if (user) {
                user.rating += payload.modifier;
                user.isRated = true;
            }
        },
        resetUserRating: (state, { payload }: PayloadAction<{ id: number }>) => {
            const user = state.data.find((el) => el.id === payload.id);
            if (user) {
                user.rating = 0;
                user.isRated = false;
            }
        }
    },
});

export const getUserEntries = createAction('users:getUserEntries', function prepare(parameters: GetUsersParams) {
    return {
        payload: {
            parameters
        }
    }
})

export const getMoreUsers = createAction('users:getMoreUsers', function prepare(parameters: Omit<GetUsersPaginatedParams, 'page'>) {
    return {
        payload: {
            parameters
        }
    }
})

export const { setUsersList, loadMoreUsers, updateUserRate, resetUserRating, setUsersAreFetching } = userModel.actions;

// epics

const getUsersListAsyncObservable: Epic = (action$: Observable<PayloadAction<GetUsersParams>>, state$: StateObservable<RootState>) => {
    return action$.pipe(
        ofType(getUserEntries.type),
        filter(({ payload: { parameters: { overwrite }} }) => state$.value.users.data.length === 0 || !!overwrite),
        switchMap(({ payload: { parameters: { size, overwrite } } }) => {
            return from(randomApi.users.getUsers({ size, overwrite }))
                .pipe(
                    concatMap(({ data }) => {
                        return of(userModel.actions.setUsersList(mapUsers(data)));
                    }),
                    catchError(error => of({
                        type: 'FETCH_USER_REJECTED',
                        payload: error.xhr.response,
                        error: true
                    })),
                    startWith(userModel.actions.setUsersAreFetching(true))
                )
        })
    );
};

const getMoreUsersObservable: Epic = (action$: Observable<PayloadAction<GetUsersPaginatedParams>>, state$: StateObservable<RootState>) => {
    return action$.pipe(
        ofType(getMoreUsers.type),
        switchMap(({ payload: { parameters: { size } } }) => {
            return from(randomApi.users.getUsersPaginated({ size, page: state$.value.users.pages + 1 }))
                .pipe(
                    concatMap(({ data }) => {
                        return of(userModel.actions.loadMoreUsers(mapUsers(data)));
                    }),
                    catchError(error => of({
                        type: 'FETCH_USER_REJECTED',
                        payload: error.xhr.response,
                        error: true
                    })),
                    startWith(userModel.actions.setUsersAreFetching(true))
                )
        })
    );
};

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

export const useIsUsersListLoading = () : boolean =>
    useSelector(
        createSelector(
            (state: RootState) => state.users.isFetching,
            (
                isFetching: RootState["users"]["isFetching"]
            ) => isFetching
        )
    );

export const useIsUserListEmpty = (): boolean =>
    useSelector(
        createSelector(
            (state: RootState) => state.users.data,
            (users) => Object.keys(users).length === 0
        )
    );

export const reducer = userModel.reducer;
export const epics = [getUsersListAsyncObservable, getMoreUsersObservable];
