import { defaultPageAlbum, defaultPageResult } from '@/utils/funcUtils';
import { get, post, put, del } from './request';
import type { Album, AlbumQuery, PageResult, PageResultAlbum, ResponseData } from '@/types';

export function getAlbums(params: AlbumQuery): Promise<ResponseData<PageResult<Album>>> {
  // return get('/photos/group/tag', { params });
  const { flag } = params;
  if (flag === 'tag') {
    return getTagAlbums(params);
  } else if (flag === 'category') {
    return getCategoryAlbums(params);
  }

  return defaultPageResult<Album>();
}

function getTagAlbums(params: AlbumQuery): Promise<ResponseData<PageResult<Album>>> {
  return get('/photos/group/tag', { params });
}

function getCategoryAlbums(params: AlbumQuery): Promise<ResponseData<PageResult<Album>>> {
  return get('/photos/group/category', { params });
}

export function getAlbumById(id: number, params: AlbumQuery): Promise<ResponseData<PageResultAlbum>> {
  const { flag } = params;
  if (flag === 'tag') {
    return getAlbumPhotosByTagId(id, params);
  } else if (flag === 'category') {
    return getAlbumPhotosByCategoryId(id, params);
  }

  return defaultPageAlbum();
}

function getAlbumPhotosByTagId(id: number, params: AlbumQuery): Promise<ResponseData<PageResultAlbum>> {
  return get(`/photos/tag/${id}`, { params })
}

function getAlbumPhotosByCategoryId(id: number, params: AlbumQuery): Promise<ResponseData<PageResultAlbum>> {
  return get(`/photos/category/${id}`, { params })
}

export function createAlbum(data: Partial<Album>): Promise<ResponseData<Album>> {
  return post('/albums', data);
}

export function updateAlbum(id: number, data: Partial<Album>): Promise<ResponseData<Album>> {
  return put(`/albums/${id}`, data);
}

export function deleteAlbum(id: number): Promise<ResponseData<null>> {
  return del(`/albums/${id}`);
}
