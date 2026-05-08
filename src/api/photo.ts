import { get, post, put, del, upload } from './request';
import type { Blog, PhotoQuery, PageResult, ResponseData } from '@/types';

export function getPhotos(params?: PhotoQuery): Promise<ResponseData<PageResult<Blog>>> {
  return get('/photos/blogs', { params });
}

export function getPhotosWithAdditions(params?: PhotoQuery): Promise<ResponseData<PageResult<Blog>>> {
  return get('/photos/with-photos', { params });
}

export function getPhotoById(id: number): Promise<ResponseData<Blog>> {
  return get(`/photos/view/${id}`);
}

export function createPhoto(data: Partial<Blog>): Promise<ResponseData<Blog>> {
  return post('/photos', data);
}

export function updatePhoto(id: number, data: Partial<Blog>): Promise<ResponseData<Blog>> {
  return put(`/photos/${id}`, data);
}

export function deletePhoto(id: number): Promise<ResponseData<null>> {
  return del(`/photos/${id}`);
}

export function uploadPhoto(formData: FormData): Promise<ResponseData<Blog>> {
  return upload('/photos/upload', formData);
}

export function likePhoto(id: number): Promise<ResponseData<null>> {
  return post(`/photos/${id}/like`);
}

export function unlikePhoto(id: number): Promise<ResponseData<null>> {
  return del(`/photos/${id}/like`);
}

export function getFeaturedPhoto(): Promise<ResponseData<PageResult<Blog>>> {
  return get('/photos/featured');
}

export function searchPhotos(keyword: string, params?: PhotoQuery): Promise<ResponseData<PageResult<Blog>>> {
  return get('/photos/search-photos', { params: { search: keyword, ...params } });
}
