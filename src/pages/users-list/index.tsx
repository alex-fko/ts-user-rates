import styles from './styles.module.scss';
import {isRouteErrorResponse, useRouteError } from "react-router-dom";
import { CircularProgress, Grid} from "@mui/material";
import {useDispatch} from "react-redux";
import {userModel, UserRow} from "entities/user";
import {ReactNode, useEffect} from "react";
import {getUserEntries} from "../../entities/user/model";

export function Component() {
    const dispatch = useDispatch();
    const isFetching = userModel.useIsUsersListLoading();
    // const isEmpty = userModel.useIsUserListEmpty();
    const unratedUsers = userModel.useUnratedUsers();
    // const ratedUsers = userModel.useRatedUsers();

    useEffect(() => {
      dispatch(getUserEntries({ size: 3 }));
    }, [dispatch])

    let unrated: null | ReactNode;
    if (!isFetching) {
        unrated = unratedUsers.map((user) => {
            return <UserRow key={user.id} user={user} after={null} />
        })
    } else {
        unrated = <CircularProgress color={'primary'} size="large"></CircularProgress>;
    }

    return (
        <main className={styles.main}>
            <Grid container spacing={2} className={styles.container}>
                <Grid className={styles.card} sm={12} md={6}>
                    { unrated }
                </Grid>
                <Grid className={styles.card} sm={12} md={6}>
                    xs=12
                </Grid>

            </Grid>
        </main>
    )
}

// If you want to customize the component display name in React dev tools:
Component.displayName = "LazyUsersList";

export function ErrorBoundary() {
    let error = useRouteError();
    let errorMessage: string;
    if (isRouteErrorResponse(error)) {
        // error is type `ErrorResponse`
        errorMessage = error.error?.message || error.statusText;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    } else {
        console.error(error);
        errorMessage = 'Unknown error';
    }

    return (
        <div id='error-page' className='flex flex-col gap-8 justify-center items-center h-screen'>
            <h1 className='text-4xl font-bold'>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p className='text-slate-400'>
                <i>{errorMessage}</i>
            </p>
        </div>
    );
}

// If you want to customize the component display name in React dev tools:
ErrorBoundary.displayName = "UsersListErrorBoundary";