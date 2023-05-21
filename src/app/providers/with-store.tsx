import { Provider } from "react-redux";

import { PersistGate } from 'redux-persist/integration/react'

import {persistor, store} from "../store";

export const withStore = (component: () => React.ReactNode) => () =>
    <Provider store={store}>
        <PersistGate persistor={persistor} loading={null} >
            {component()}
        </PersistGate>
    </Provider>;