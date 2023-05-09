import axios, { axiosClassic } from "../api/interceptors";
import { IGetProducts, IProduct } from "@/shared/types/product.types";
import { getProductsUrl } from "../config/api.config";
import { IProductEditInput } from "@/components/screens/admin/product/product-edit.interface";

export const ProductService = {
  async getAll(searchTerm?: string, page?: string, orderBy?: string, sortBy?: string, categoryIds?: string, brandIds?: string) {
    return axiosClassic.get<IGetProducts>(getProductsUrl(``), {
      params: {
        searchTerm,
        page,
        orderBy,
        sortBy,
        categoryIds,
        brandIds,
      },
    });
  },
  async getMostPopularProducts() {
    const { data: product } = await axiosClassic.get<IProduct[]>(
      getProductsUrl(`/most-popular`),
    );
    return product;
  },
  async getById(_id: string) {
    return axios.get<IProductEditInput>(getProductsUrl(`/${_id}`));
  },

  async getBySlug(slug: string) {
    return axiosClassic.get<IProduct>(getProductsUrl(`/by-slug/${slug}`));
  },

  async getByCategory(categoryIds: string[]) {
    return axiosClassic.post<IProduct[]>(getProductsUrl(`/by-categories`), {
      categoryIds,
    });
  },
  async updateCountOpened(slug: string) {
    return axiosClassic.put(getProductsUrl(`/update-count-opened`), {
      slug,
    });
  },
  async createProduct() {
    return axios.post<string>(getProductsUrl(`/`));
  },
  async updateProduct(_id: string, data: IProductEditInput) {
    return axios.put<string>(getProductsUrl(`/${_id}`), data);
  },
  async deleteProduct(_id: string) {
    return axios.delete<string>(getProductsUrl(`/${_id}`));
  },
};
