export interface User {
  id: string;
  name: string;
  email: string;
  location?: string;
  profileImage?: string;
  bio?: string;
  rating: number;
  reviewCount: number;
  isSeller: boolean;
  createdAt: string;
}