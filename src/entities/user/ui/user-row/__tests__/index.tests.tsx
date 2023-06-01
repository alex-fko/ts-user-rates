import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import * as React from "react";
import {UserRow} from "../index";

import {UserId} from "../../../model/types";

const user = {
    username: 'AB',
    firstName: 'Alfred',
    rating: 2,
    isRated: true,
    avatar: 'test',
    lastName: 'Benton',
    uid: '2',
    id: 2 as UserId,
    birthDate: '2000.03.01'
}

describe('testing user UI - UserRow component', () => {
    test('render UserRow with default props and dummy user', async () => {
        render(<UserRow key="user1" user={user} after={null} />);
        const userInfo = await screen.findByText('Alfred Benton');
        expect(userInfo).toBeInTheDocument();
    })
})