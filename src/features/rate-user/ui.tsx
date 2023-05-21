import {useCallback} from "react";
import {Button, ButtonGroup } from "@mui/material";
import { useDispatch } from "react-redux";
import {resetUserRating, updateUserRate} from "entities/user/model";
import {User} from "entities/user/model/types";

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import styles from './styles.module.scss'

interface RateUserProps {
    user: User
}

export const RateUserControls = ({ user }: RateUserProps) => {
    const dispatch = useDispatch();
    const onRateUp = useCallback(() => {
        dispatch(updateUserRate({ id: user.id, modifier: +1 }))
    }, [dispatch, user.id]);

    const onRateDown = useCallback(() => {
        dispatch(updateUserRate({ id: user.id, modifier: -1 }))
    }, [dispatch, user.id]);

    const onRateReset = useCallback(() => {
        dispatch(resetUserRating({ id: user.id }))
    }, [dispatch, user.id]);

    return (
        <ButtonGroup color='info' size='small' className={styles.ButtonBlock}>
            <Button variant="contained" onClick={onRateDown} title="Decrease rating"><RemoveCircleOutlineOutlinedIcon /></Button>
            <Button variant="contained" onClick={onRateUp} title="Increase rating"><AddCircleOutlineOutlinedIcon /></Button>
            {
                user.isRated ? <Button variant="contained" onClick={onRateReset} title="Reset rating"><HighlightOffIcon /></Button> : null
            }

        </ButtonGroup>
    );
};