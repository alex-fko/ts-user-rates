import * as React from 'react';
import {CircularProgress, List} from "@mui/material";
import {User} from "../../entities/user/model/types";
import {UserRow} from "../../entities/user";

interface UsersListProps {
    rows: User[],
    isFetching: boolean,
    after?: React.FC<{ user: User}> | null
}

const UsersList = ({ rows, after: After, isFetching } : UsersListProps) => {

    if (isFetching) {
        return <CircularProgress color={'primary'}></CircularProgress>;
    }

    const entries = rows.map((user) => {
        return <UserRow key={user.id} user={user} after={After} />
    })
    return <List>
        { entries.length ? entries : 'No User record available' }
    </List>
};
export default UsersList;