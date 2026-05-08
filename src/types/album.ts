import { Photo } from "./photo";

export interface Album {
  id: number;
  name: string;
  description: string;
  coverUrl: string;
  coverThumbnail?: string;
  isPublic?: boolean;
  coverPhoto?: Photo;
  photos?: Photo[];
  photoCount: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AlbumQuery {
  current?: number;
  size?: number;
  search?: string;
  isPublic?: boolean;
  flag?: string;
}
