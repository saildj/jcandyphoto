import { get } from "./request";
import { ResponseData, User, UserQuery } from "@/types";

export function getUserAvatar(params?: UserQuery): Promise<ResponseData<User>> {
  return get('/auth/avatar', { params });
}

export function getUserInfo(params?: UserQuery): Promise<ResponseData<User>> {
  return get('/auth/profile/simple', { params });
}