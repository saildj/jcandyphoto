export interface User {
  id: number;
  username: string;
  nickname: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user';
  createdAt: string;
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
  work: string;
  slogan: string;
  shortBio: string;
  detailedBio: string;
  location: string;
  interests: string[];
  email: string;
  funFact: string;
}
