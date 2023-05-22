import {
    getUserEntries,
    getMoreUsers,
    setUsersList,
    getUsersListAsyncObservable, setUsersAreFetching
} from "../users";
import { of } from 'rxjs';

import {UserId} from "../types";

jest.mock("axios");

describe('testing user model', () => {
    // it('test empty data initial state', () => {
    //     const state = store.getState().users;
    //     expect(state).toEqual(initialState)
    // })
    it('test getUserEntries action creator', () => {
        const action = getUserEntries({size: 5, overwrite: false})
        expect(action.type).toEqual('users/getUserEntries');
        expect(action.payload).toEqual({parameters: {size: 5, overwrite: false}});
    })
    it('test getMoreUsers action creator', () => {
        const action = getMoreUsers({size: 7})
        expect(action.type).toEqual('users/getMoreUsers');
        expect(action.payload).toEqual({parameters: {size: 7}});
    })
    it('test setUsersList action creator', () => {
        const action = setUsersList([{
            username: 'A',
            firstName: 'B',
            rating: 2,
            isRated: true,
            avatar: 'test',
            lastName: 'C',
            uid: '2',
            id: 2 as UserId,
            birthDate: '2000.03.01'
        }])
        expect(action.type).toEqual('users/setUsersList');
        expect(action.payload).toEqual([{
            "avatar": "test",
            "birthDate": "2000.03.01",
            "firstName": "B",
            "id": 2,
            "isRated": true,
            "lastName": "C",
            "rating": 2,
            "uid": "2",
            "username": "A"
        }]);
    })
    it('test getUsersListAsyncObservable epic - check users are fetching', (done) => {
        // given
        const users = [
            { id: 1, name: "John" },
            { id: 2, name: "Andrew" },
        ];
        const action$ = of({ type: getUserEntries.type, payload: { parameters: { size: 2, overwrite: true } } });
        // @ts-ignore
        const epic$ = getUsersListAsyncObservable(action$, { value: { users: { data: [] }}},
            () => new Promise((resolve) => {
                resolve(users);
            }));

        epic$.subscribe((action) => {
            expect(action.type).toBe(setUsersAreFetching.type);
            expect(action.payload).toBe(true);
            done();
        })
    })
})