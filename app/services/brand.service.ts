import { getBrandsUrl } from '../config/api.config'
import { IBrand } from '@/shared/types/product.types'
import { axiosClassic } from 'api/interceptors'
import axios from "../api/interceptors"
import { IBrandEditInput } from '@/components/screens/admin/brand/brand-edit.interface'

export const BrandService = {
  async getAll(searchTerm?: string) {
    return axiosClassic.get<IBrand[]>(getBrandsUrl(``), {
      params: searchTerm ? { searchTerm, } : {},
    })
  },
  async getById(_id: string) {
    return axios.get<IBrandEditInput>(getBrandsUrl(`/${_id}`))
  },
  async getBySlug(slug: string) {
    return axiosClassic.get<IBrand>(getBrandsUrl(`/by-slug/${slug}`))
  },
  async createBrand() {
    return axios.post<string>(getBrandsUrl(`/`))
  },
  async deleteBrand(_id: string) {
    return axios.delete<string>(getBrandsUrl(`/${_id}`))
  },
  async updateBrand(_id: string, data: IBrandEditInput) {
    return axios.put<string>(getBrandsUrl(`/${_id}`), data)
  }
}