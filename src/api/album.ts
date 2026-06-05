import { accessUrl, defaultPageAlbum, defaultPageResult } from '@/utils/funcUtils';
import { get } from './request';
import type { Album, AlbumQuery, PageResult, PageResultAlbum, ResponseData } from '@/types';

function makeUrl(url: string) {
  return accessUrl('PH', url)
}

export function getAlbums(params: AlbumQuery): Promise<ResponseData<PageResult<Album>>> {
  const { flag } = params;
  if (flag === 'tag') {
    return getTagAlbums(params);
  } else if (flag === 'category') {
    return getCategoryAlbums(params);
  }

  return defaultPageResult<Album>();
}

function getTagAlbums(params: AlbumQuery): Promise<ResponseData<PageResult<Album>>> {
  return get(makeUrl('/group/tag'), { params });
}

function getCategoryAlbums(params: AlbumQuery): Promise<ResponseData<PageResult<Album>>> {
  return get(makeUrl('/group/category'), { params });
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
  return get(makeUrl(`/tag/${id}`), { params })
}

function getAlbumPhotosByCategoryId(id: number, params: AlbumQuery): Promise<ResponseData<PageResultAlbum>> {
  return get(makeUrl(`/category/${id}`), { params })
}

