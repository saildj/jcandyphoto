import { Album } from './album';

export interface ResponseData<T> {
  code: number;
  data: T;
  message: string;
  success: boolean;
  stack?: string;
}

export interface PageResult<T> {
  records: T[];
  pagination: Pagination;
}

export interface Pagination {
  current: number;
  size: number;
  total: number;
  pages?: number;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export interface PageResultAlbum {
  album: Album;
  pagination: Pagination;
}

export * from './photo';
export * from './album';
export * from './user';
export * from './category';
