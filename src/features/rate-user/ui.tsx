import {useCallback} from "react";
import {Button, ButtonGroup } from "@mui/material";
import { useDispatch } from "react-redux";
import { userTypes, userModel } from "entities/user";

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

import styles from './styles.module.scss'

interface RateUserProps {
    user: userTypes.User
}

export const RateUserControls = ({ user }: RateUserProps) => {
    const dispatch = useDispatch();
    const onRateUp = useCallback(() => {
        dispatch(userModel.actions.updateUserRate({ id: user.id, modifier: +1 }))
        dispatch(userModel.actions.setLastRatingChange(user.rating + 1))
    }, [dispatch, user.id, user.rating]);

    const onRateDown = useCallback(() => {
        dispatch(userModel.actions.updateUserRate({ id: user.id, modifier: -1 }))
        dispatch(userModel.actions.setLastRatingChange(user.rating - 1))
    }, [dispatch, user.id, user.rating]);

    const onRateReset = useCallback(() => {
        dispatch(userModel.actions.resetUserRating({ id: user.id }))
    }, [dispatch, user.id]);

    return (
        <ButtonGroup color='info' size='small' className={styles.ButtonBlock}>
            <Button variant="contained" onClick={onRateDown} title="Decrease rating">
                <RemoveCircleOutlineOutlinedIcon/>
            </Button>
            <Button variant="contained" onClick={onRateUp} title="Increase rating">
                <AddCircleOutlineOutlinedIcon/>
            </Button>
            {
                user.isRated && user.rating === 0
                    ? (<Button variant="contained" onClick={onRateReset} title="Reset rating">
                        <ArrowCircleLeftOutlinedIcon/>
                    </Button>)
                    : null
            }

        </ButtonGroup>
    );
};