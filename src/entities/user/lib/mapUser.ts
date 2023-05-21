import { type UserDto } from 'shared/api'
import { type User, type UserId } from '../model/types'

export function mapUser(dto: UserDto): User {
    return {
        id: dto.id as UserId,
        firstName: dto.first_name,
        lastName: dto.last_name,
        birthDate: dto.date_of_birth,
        uid: dto.uid,
        username: dto.username,
        avatar: dto.avatar,
        rating: 0,
        isRated: false
    }
}

export function mapUsers(list: UserDto[]): User[] {
    return list.map((dto) => mapUser(dto))
}