import { getWorksUrl } from '../config/api.config'
import { IWork } from '@/shared/types/product.types'
import { axiosClassic } from 'api/interceptors'
import axios from "../api/interceptors"
import { IWorkEditInput } from '@/components/screens/admin/work/work-edit.interface'

export const WorkService = {
  async getAll(searchTerm?: string) {
    return axiosClassic.get<IWork[]>(getWorksUrl(``), {
      params: searchTerm ? { searchTerm, } : {},
    })
  },
  async getById(_id: string) {
    return axios.get<IWorkEditInput>(getWorksUrl(`/${_id}`))
  },
  async createWork() {
    return axios.post<string>(getWorksUrl(`/`))
  },
  async deleteWork(_id: string) {
    return axios.delete<string>(getWorksUrl(`/${_id}`))
  },
  async updateWork(_id: string, data: IWorkEditInput) {
    return axios.put<string>(getWorksUrl(`/${_id}`), data)
  }
}