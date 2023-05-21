import React from 'react';
import { appRouter } from "./appRouter";
import { withProviders } from 'app/providers'

import './index.scss';
import {RouterProvider} from "react-router-dom";
import {CssBaseline} from "@mui/material";

const App = () => (
    <div className="App">
        <CssBaseline />
        <RouterProvider router={appRouter} fallbackElement={<p>Loading...</p>} />
    </div>
);

export default withProviders(App);
