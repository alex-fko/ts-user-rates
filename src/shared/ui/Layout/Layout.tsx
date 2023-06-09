import { type ReactNode } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import css from './Layout.module.scss'
import {Link} from "@mui/material";

type Props = {
    navbarSlot?: ReactNode
    headerSlot: ReactNode
    bottomSlot?: ReactNode
    sidebarSlot?: ReactNode
}

export function Layout(props: Props) {
    return (
        <div className={css.root}>
            {props.navbarSlot}
            {props.headerSlot}
            <div className={css.container}>
                <div className={css.content}>
                    <Outlet />
                </div>
                {props.sidebarSlot && (
                    <aside className={css.sidebar}>{props.sidebarSlot}</aside>
                )}
            </div>
            <footer className={css.footer}>
                <div className="text_sm">
                    {new Date().getFullYear()}, see source code on{' '}
                    <Link href="https://github.com/alex-fko/ts-user-rates">
                        github.com/alex-fko/ts-user-rates
                    </Link>
                </div>
            </footer>
            {props.bottomSlot}
            <ScrollRestoration />
        </div>
    )
}