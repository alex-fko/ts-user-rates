/**
 * ✅ DX Best Practice
 * Use branded type to entity id to
 * don't to be confused with other identifiers
 */
export type UserId = Brand<Id, 'UserId'>

export type User = {
    id: UserId
    firstName: string
    lastName: string
    birthDate: DateIso,
    uid: string,
    username: string,
    isRated: boolean,
    rating: number,

    /**
     * ✅ DX Best Practice
     * Use type aliases for primitive types
     * to improve developer experience
     *
     * @see types/app.d.ts
     */
    avatar: Url,
}