import {createHashRouter, Link} from "react-router-dom";
import {baseLayout} from "app/layouts/baseLayout";

export const appRouter = createHashRouter([
    {
        element: baseLayout,
        errorElement: <div>error</div>,
        children: [
            {
                path: '/',
                lazy: () => import("pages/users-list"),
            },
            {
                path: "/log",
                lazy: () => import("pages/users-log"),
            },
            {
                path: "*",
                element: <NoMatch/>,
            }
        ]
    }
]);

function NoMatch() {
    return (
        <div>
            <h2>Nothing to see here!</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    );
}

