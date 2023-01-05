import { getNewUrl } from '../config/api.config'
import { INew } from '@/shared/types/product.types'
import { axiosClassic } from 'api/interceptors'
import axios from "../api/interceptors"
import { INewEditInput } from '@/components/screens/admin/new/new-edit.interface'

export const NewService = {

  async getBySlug(slug: string) {
    return axiosClassic.get<INew>(getNewUrl(`/by-slug/${slug}`))
  },
  async getAll(searchTerm?: string) {
    return axiosClassic.get<INew[]>(getNewUrl(``), {
      params: searchTerm ? { searchTerm, } : {},
    })
  },
  async getLastNew() {
    const { data: news } = await axiosClassic.get<INew[]>(
      getNewUrl('')
    )
    return news
  },
  async updateCountOpened(slug: string) {
    return axiosClassic.put(getNewUrl('/update-count-opened'), {
      slug,
    })
  },
  async getById(_id: string) {
    return axios.get<INewEditInput>(getNewUrl(`/${_id}`))
  },
  async createNew() {
    return axios.post<string>(getNewUrl(`/`))
  },
  async deleteNew(_id: string) {
    return axios.delete<string>(getNewUrl(`/${_id}`))
  },
  async updateNew(_id: string, data: INewEditInput) {
    return axios.put<string>(getNewUrl(`/${_id}`), data)
  }
}