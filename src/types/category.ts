// 分类
export interface Category {
  id: number;
  name: string;
  slug?: string;
  color?: string;
  description?: string;
  photos: number | 0;
}

// 标签
export interface Tag {
  id: number;
  name: string;
  slug?: string;
  color?: string;
  description?: string;
  photos: number | 0;
}
