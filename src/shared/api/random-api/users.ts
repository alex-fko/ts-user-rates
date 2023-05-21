import type { AxiosPromise } from "axios";
import { apiInstance } from "./base";
import type { UserDto } from "./types";

const BASE_URL = "/users"

export type GetUsersParams = {
    size: number;
};

export type GetUsersPaginatedParams = {
    size: number,
    page: number
};

export const getUsers = (params: GetUsersParams): AxiosPromise<UserDto[]> => {
    return apiInstance.get(BASE_URL, { params });
};

export const getUsersPaginated = (params: GetUsersPaginatedParams): AxiosPromise<UserDto[]> => {
    return apiInstance.get(BASE_URL, { params });
};