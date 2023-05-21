import React from "react";
import {User} from "../../model/types";
import {ListItem} from "@mui/material";

import styles from './styles.module.scss'

interface IProps {
    user: User,
    after?: React.FC<IProps>| React.FC<IProps>[] | null
}

export const UserRow: React.FC<IProps> = ({ user, after: After}) => {
    return (
        <ListItem className={styles.userRow}>
            <img src={user.avatar} alt={`${user.firstName}'s avatar`} className={styles.userRowImage}/>
            <div className={styles.userInfo}>
                { `${user.firstName} ${user.lastName}` }
                { user.isRated ? <span className={user.rating >= 0 ? styles.PositiveRating : styles.NegativeRating}>{ user.rating }</span> : null }
            </div>
            { After
                ? (
                    Array.isArray(After)
                        ? After.map((Element, idx) => <Element user={user} key={idx} />)
                        : <After user={user} />
                )
                : null}
        </ListItem>
    )
}