import {useCallback, useEffect, useState} from "react";
import {Button, Dialog} from "@mui/material";
import { useDispatch } from "react-redux";
import { resetUserRating } from "entities/user/model";
import {User} from "entities/user/model/types";

import styles from './styles.module.scss'

interface ResetUserDialogProps {
    user: User
}

export const ResetUserDialog = ({ user }: ResetUserDialogProps) => {
    const dispatch = useDispatch();
    // @todo global store can be used to keep this state too.
    // @todo Move isRewardOpen & isBanOpen to the store instead of using local state.
    const [isRewardOpen, setIsRewardOpen] = useState(false);
    const [isBanOpen, setIsBanOpen] = useState(false);

    useEffect(() => {
        if (user.rating >= 5) {
            setIsRewardOpen(true);
        }
        if (user.rating <= -5) {
            setIsBanOpen(true);
        }
    }, [user.rating])

    const handleRewardClose = useCallback(() => {
        setIsRewardOpen(false);
    }, []);
    const handleBanClose = useCallback(() => {
        setIsBanOpen(false);
    }, []);

    const handleReset = useCallback(() => {
        dispatch(resetUserRating({ id: user.id }))
    }, [dispatch, user.id])

    return (
        <>
            <Dialog open={isRewardOpen} onClose={handleRewardClose} >
                <div className={styles.DialogContent}>
                    Would you like to reward this user? :)
                    <Button variant="contained"  onClick={handleReset}>Reward user</Button>
                </div>
            </Dialog>
            <Dialog open={isBanOpen} onClose={handleBanClose} >
                <div className={styles.DialogContent}>
                    Would you like to BAN this user? &gt;:|
                    <Button variant="contained"  onClick={handleReset}>Ban user</Button>
                </div>
            </Dialog>
        </>

    );
};