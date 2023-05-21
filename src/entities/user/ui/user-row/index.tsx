import {User} from "../../model/types";

import styles from './styles.module.scss'

export const UserRow = ({ firstName, lastName, username }: User) => {
    return (
        <div className={styles.userRow}>
            <div className={styles.userName}>{username}</div>
            <div className={styles.userInfo}>{`${firstName} ${lastName}`}</div>
        </div>
    )
}