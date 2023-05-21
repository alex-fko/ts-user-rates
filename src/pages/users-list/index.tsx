import { useEffect } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { userModel } from "entities/user";
import { UserListActions} from "features/users-list-actions";
import { RateUserControls } from "features/rate-user/ui";
import { ResetUserDialog } from "features/reset-user-dialog";
import UsersList from "widgets/users-list";

import styles from './styles.module.scss';

export function Component() {
    const dispatch = useDispatch();
    const isFetching = userModel.useIsUsersListLoading();
    const unratedUsers = userModel.useUnratedUsers();
    const ratedUsers = userModel.useRatedUsers();

    useEffect(() => {
      dispatch(userModel.getUserEntries({ size: 3, overwrite: false }));
    }, [dispatch])

    return (
        <main className={styles.main}>
            <UserListActions />
            <Grid container spacing={2} className={styles.container}>
                <Grid className={styles.UserListColumn} item={true} sm={12} md={6} padding={5}>
                    <h3> Unrated Users </h3>
                    <UsersList rows={unratedUsers} isFetching={isFetching} after={[RateUserControls]} />
                </Grid>
                <Grid className={styles.UserListColumn} item={true} sm={12} md={6} padding={5}>
                    <h3> Rated Users </h3>
                    <UsersList rows={ratedUsers} isFetching={isFetching} after={[RateUserControls, ResetUserDialog]} />
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