import styles from './styles.module.scss'


import {isRouteErrorResponse, useRouteError} from "react-router-dom";

export function Component() {
    return (
        <main className={styles.main}>
            <div className={styles.description}>
                TBD. This page will contain list of actions applied to users. Just like it's logged now into
                console log, but slightly filtered to enlist only relevant actions in readable format.
            </div>
        </main>
    )
}

// If you want to customize the component display name in React dev tools:
Component.displayName = "LazyUsersLog";

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
ErrorBoundary.displayName = "UsersLogErrorBoundary";