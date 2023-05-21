import * as React from 'react';
import {Box, Tab, Tabs, Typography} from "@mui/material";
import {ReactElement, } from "react";

interface UserListTabsProps {
    tabs: Array<String>,
    content: ReactElement[]
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const UserListTabs = ({ tabs, content } : UserListTabsProps) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs onChange={handleChange} aria-label="lab API tabs example" value={value}>
                        {
                            tabs.map((el, idx) => <Tab key={idx} value={idx} label={el} />)
                        }
                    </Tabs>
                </Box>
                { content.map((el, idx) => <TabPanel index={idx} key={idx} value={value}>{el}</TabPanel>)}
            </Box>
        </>
    );
};
export default UserListTabs;