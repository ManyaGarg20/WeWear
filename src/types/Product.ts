export interface Product {
  id: number;
  name: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  brand: string;
  size: string;
  condition: string;
  colors: string[];
  location: string;
  sellerId: any;
  sellerName: string;
  sellerRating: number;
  isFavorite: boolean;
  createdAt: string;
}