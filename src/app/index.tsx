import React from 'react';
import { appRouter } from "./appRouter";
import { withProviders } from 'app/providers'

import './index.scss';
import {RouterProvider} from "react-router-dom";

const App = () => (
    <div className="App">
        <RouterProvider router={appRouter} fallbackElement={<p>Loading...</p>} />
    </div>
);

export default withProviders(App);
