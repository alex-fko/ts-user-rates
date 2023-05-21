import {useCallback} from "react";
import {Button, ButtonGroup} from "@mui/material";
import { useDispatch } from "react-redux";
import { userModel } from "entities/user";

import AutoRenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export const UserListActions = () => {
    const dispatch = useDispatch();

    const isFetching = userModel.useIsUsersListLoading();

    const onReloadUsers = useCallback(() => {
        dispatch(userModel.getUserEntries({ size: 3, overwrite: true }))
    }, [dispatch]);

    const onLoadMoreUsers = useCallback(() => {
        dispatch(userModel.getMoreUsers({ size: 6 }))
    }, [dispatch]);

    return (
        <ButtonGroup>
            <Button disabled={isFetching} variant="contained" startIcon={<AutoRenewRoundedIcon />} onClick={onReloadUsers}>
                Reload Users
            </Button>
            <Button disabled={isFetching} variant="contained" startIcon={<AddCircleOutlineOutlinedIcon />} onClick={onLoadMoreUsers}>
                Add More Users
            </Button>
        </ButtonGroup>
    );
};