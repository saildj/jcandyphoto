export interface User {
  id: number;
  username: string;
  nickname: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user';
  createdAt: string;
  status?: 'active' | 'inactive' | 'banned' | 'pending';
  updatedAt?: Date;
  blogCount?: number;
  commentCount?: number;
  phone?: string;
  gender?: string;
  birthday?: Date;
  bio?: string;
  location?: string;
  hobbies?: string[];
  github?: string;
  weibo?: string;
  twitter?: string;
  website?: string;
  motto?: string;
  job?: string;
  icpLicense?: string;
  publicSecurityLicense?: string;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface UserQuery {
  id?: number;
}

export interface UserProfile {
  name: string;
  job: string;
  motto: string;
  shortBio: string;
  detailedBio?: string;
  location?: string;
  interests: string[];
  email: string;
  funFact: string;
  github?: string;
  twitter?: string;
  weibo?: string;
}
