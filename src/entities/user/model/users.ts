import {
    createAction,
    createSelector,
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";
import { Observable, switchMap, from, concatMap, of, filter, startWith, catchError } from 'rxjs';
import {Epic, ofType, StateObservable} from "redux-observable";
import { useSelector } from "react-redux";

import {randomApi, UserDto} from "shared/api";
import {User} from "./types";
import {GetUsersPaginatedParams, GetUsersParams} from "../../../shared/api/random-api/users";
import {mapUsers} from "../lib";
import {AxiosPromise} from "axios";

export const initialState: {
    data: User[];
    pages: number,
    isFetching: boolean,
    lastRatingUpdate: number
} = {
    data: [],
    pages: 1,
    isFetching: false,
    lastRatingUpdate: 0
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsersAreFetching: (state, { payload }: PayloadAction<boolean>) => {
            state.isFetching = payload;
        },
        setUsersList: (state, { payload }: PayloadAction<User[]>) => {
            state.data = payload;
            state.pages = 1;
            state.isFetching = false;
        },
        loadMoreUsers: (state, { payload }: PayloadAction<User[]>) => {
            state.data = [...state.data, ...payload];
            state.pages += 1;
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
        },
        setLastRatingChange: (state, { payload } : PayloadAction<number>) => {
            state.lastRatingUpdate = payload;
        }
    },
});

export const getUserEntries = createAction('users/getUserEntries', function prepare(parameters: GetUsersParams) {
    return {
        payload: {
            parameters
        }
    }
})

export const getMoreUsers = createAction('users/getMoreUsers', function prepare(parameters: Omit<GetUsersPaginatedParams, 'page'>) {
    return {
        payload: {
            parameters
        }
    }
})

export const actions = userSlice.actions;

// epics

export const getUsersListAsyncObservable: Epic = (action$: Observable<PayloadAction<GetUsersParams>>, state$: StateObservable<RootState>, callback: (parameters: GetUsersParams) => AxiosPromise<UserDto[]> ) => {
    return action$.pipe(
        ofType(getUserEntries.type),
        filter(({ payload: { parameters: { overwrite }} }) => state$.value.users.data.length === 0 || !!overwrite),
        switchMap(({ payload: { parameters: { size, overwrite } } }) => {
            return from((callback ?? randomApi.users.getUsers)({ size, overwrite }))
                .pipe(
                    concatMap(({ data }) => {
                        return of(userSlice.actions.setUsersList(mapUsers(data)));
                    }),
                    catchError(error => of({
                        type: 'FETCH_USER_REJECTED',
                        payload: error.xhr.response,
                        error: true
                    })),
                    startWith(userSlice.actions.setUsersAreFetching(true))
                )
        })
    );
};

export const getMoreUsersObservable: Epic = (action$: Observable<PayloadAction<GetUsersPaginatedParams>>, state$: StateObservable<RootState>) => {
    return action$.pipe(
        ofType(getMoreUsers.type),
        switchMap(({ payload: { parameters: { size } } }) => {
            return from(randomApi.users.getUsersPaginated({ size, page: state$.value.users.pages + 1 }))
                .pipe(
                    concatMap(({ data }) => {
                        return of(userSlice.actions.loadMoreUsers(mapUsers(data)));
                    }),
                    catchError(error => of({
                        type: 'FETCH_USER_REJECTED',
                        payload: error.xhr.response,
                        error: true
                    })),
                    startWith(userSlice.actions.setUsersAreFetching(true))
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

export const useUpVotedUsers = () =>
    useSelector(
        createSelector(
            (state: RootState) => state.users.data,
            (
                users: RootState["users"]["data"]
            ) =>
                Object.values(users).filter(
                    (user) => user.rating >= 0 && user.isRated
                )
        )
    );


export const useDownVotedUsers = () =>
    useSelector(
        createSelector(
            (state: RootState) => state.users.data,
            (
                users: RootState["users"]["data"]
            ) =>
                Object.values(users).filter(
                    (user) => user.rating < 0
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

export const useLastRatingChange = (): number =>
    useSelector(
        createSelector(
            (state: RootState) => state.users.lastRatingUpdate,
            (lastRatingUpdate) => lastRatingUpdate
        )
    );



export const reducer = userSlice.reducer;
export const epics = [getUsersListAsyncObservable, getMoreUsersObservable];
