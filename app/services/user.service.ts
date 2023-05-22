import { IUser } from "@/shared/types/user.types";
import { getUsersUrl } from "../config/api.config";
import axios from "../api/interceptors";
import { IProfileInput } from "@/components/screens/Porfile/profile.interface";
import { IProduct } from "@/shared/types/product.types";

export const UserService = {
  async getAll(searchTerm?: string) {
    return axios.get<IUser[]>(getUsersUrl(``), {
      params: searchTerm ? { searchTerm } : {},
    });
  },
  async getById(_id: string) {
    return axios.get<IUser>(getUsersUrl(`/${_id}`));
  },
  async updateUser(_id: string, data: IProfileInput) {
    return axios.put<string>(getUsersUrl(`/${_id}`), data);
  },
  async getFavorites() {
    return axios.get<IProduct[]>(getUsersUrl(`/profile/favorites`));
  },
  async toggleFavorite(productId: string) {
    return axios.put(getUsersUrl(`/profile/favorites`), { productId });
  },
  async removeFavorite() {
    return axios.put(getUsersUrl(`/profile/favorites/remove`));
  },
  async getProfile() {
    return axios.get<IUser>(getUsersUrl(`/profile`));
  },

  async updateProfile(data: IProfileInput) {
    return axios.put<string>(getUsersUrl(`/profile`), data);
  },

  async deleteUser(_id: string) {
    return axios.delete<string>(getUsersUrl(`/${_id}`));
  },
};
