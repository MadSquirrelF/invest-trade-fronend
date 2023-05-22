import { axiosClassic } from 'api/interceptors';
import { getCategoriesUrl } from '../config/api.config';
import { ICategory } from '@/shared/types/product.types';
import axios from "../api/interceptors";
import { ICategoryEditInput } from '@/components/screens/admin/category/category-edit.interface';

export const CategoryService = {
  async getAll(searchTerm?: string) {
    return axiosClassic.get<ICategory[]>(getCategoriesUrl(``), {
      params: searchTerm ? { searchTerm } : {},
    });
  },
  async getById(_id: string) {
    return axios.get<ICategoryEditInput>(getCategoriesUrl(`/${_id}`));
  },
  async getBySlug(slug: string) {
    return axiosClassic.get<ICategory>(getCategoriesUrl(`/by-slug/${slug}`));
  },
  async createCategory() {
    return axios.post<string>(getCategoriesUrl(`/`));
  },
  async deleteCategory(_id: string) {
    return axios.delete<string>(getCategoriesUrl(`/${_id}`));
  },
  async updateCategory(_id: string, data: ICategoryEditInput) {
    return axios.put<string>(getCategoriesUrl(`/${_id}`), data);
  },
};
