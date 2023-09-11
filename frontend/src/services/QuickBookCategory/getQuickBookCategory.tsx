import { API } from '../api'

export const retrieveQuickBookCategoryData = async () => {
  const response = await API.get(`quickbook-category/`)
  return response.data
}
