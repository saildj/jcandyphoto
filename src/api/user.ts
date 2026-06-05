import { accessUrl } from "@/utils/funcUtils";
import { get } from "./request";
import { ResponseData, User, UserQuery } from "@/types";

function makeUrl(url: string) {
  return accessUrl('AU', url)
}

export function getUserAvatar(params?: UserQuery): Promise<ResponseData<User>> {
  return get(makeUrl('/sys-avatar'), { params });
}

export function getUserInfo(params?: UserQuery): Promise<ResponseData<User>> {
  return get(makeUrl('/profile/simple'), { params });
}