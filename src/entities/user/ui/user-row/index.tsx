import {ReactNode} from "react";
import {User} from "../../model/types";

import styles from './styles.module.scss'

interface IProps {
    user: User,
    after: ReactNode
}

export const UserRow: React.FC<IProps> = ({ user: { firstName, lastName, avatar }, after}) => {
    return (
        <div className={styles.userRow}>
            <img src={avatar} alt={`${firstName}'s avatar`} className={styles.userRowImage}/>
            <div className={styles.userInfo}>{`${firstName} ${lastName}`}</div>
            { after }
        </div>
    )
}