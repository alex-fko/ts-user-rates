import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import dark from "app/theme/dark";


export const withTheme = (component: () => React.ReactNode) => {
    return () => {
        return <ThemeProvider theme={dark}>
            <CssBaseline/>
            {component()}
        </ThemeProvider>
    };
};