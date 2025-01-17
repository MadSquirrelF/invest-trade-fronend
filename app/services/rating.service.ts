import axios from 'api/interceptors';
import { getRatingsUrl } from 'config/api.config';

export const RatingService = {
  async setRating(productId: string, value: number) {
    return axios.post<string>(getRatingsUrl(`/set-rating`), {
      productId,
      value,
    });
  },

  async getByUserProduct(productId: string) {
    return axios.get<number>(getRatingsUrl(`/${productId}`));
  },
};
