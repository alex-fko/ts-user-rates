import styles from './styles.module.scss';
import {isRouteErrorResponse, useRouteError } from "react-router-dom";
import {Grid} from "@mui/material";

export function Component() {
    return (
        <main className={styles.main}>
            <Grid container spacing={2}>
                <Grid className={styles.card} sm={12} md={6}>
                    xs=12
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