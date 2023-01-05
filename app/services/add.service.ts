import { IAdds } from "@/shared/types/product.types"
import { getAddsUrl } from "../config/api.config"
import axios, { axiosClassic } from "../api/interceptors"
import { IAddEditInput } from "@/components/screens/admin/add/add-edit.interface"

export const AddService = {
  async getAll(searchTerm?: string) {
    return axiosClassic.get<IAdds[]>(getAddsUrl(''), {
      params: searchTerm ? { searchTerm, } : {},
    })
  },
  async getById(_id: string) {
    return axios.get<IAddEditInput>(getAddsUrl(`/${_id}`))
  },
  async createAdd() {
    return axios.post<string>(getAddsUrl(`/`))
  },
  async deleteAdd(_id: string) {
    return axios.delete<string>(getAddsUrl(`/${_id}`))
  },
  async updateAdd(_id: string, data: IAddEditInput) {
    return axios.put<string>(getAddsUrl(`/${_id}`), data)
  }
}