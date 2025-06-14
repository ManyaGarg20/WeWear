
import { mockProducts } from './mockData';
import { Product } from '../types/Product';
import { mockUsers } from './mockData';
import { User } from '../types/User';

export const fetchAllProducts = async (): Promise<Product[]> => {
  return mockProducts;
};

export const fetchProductById = async (id: number): Promise<Product | undefined> => {
  return mockProducts.find(product => product.id === id);
};

export const fetchProductsByIds = async (ids: number[]): Promise<Product[]> => {
  return mockProducts.filter(product => ids.includes(product.id));
};

export const fetchAllUsers = async (): Promise<User[]> => {
  return mockUsers;
};

export const fetchUserById = async (id: string): Promise<User | undefined> => {
  return mockUsers.find(user => user.id === id);
};