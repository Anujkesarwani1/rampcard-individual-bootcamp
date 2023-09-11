import { API } from '../api'

export const retrieveRampcardStatusData = async () => {
  const response = await API.get(`rampcard-status/`)
  return response.data
}

export const updateCountStatus = async (id: number, updatedCount: number) => {
  const response = await API.patch(`rampcard-status/${id}`, {
    count: updatedCount,
  })
  return response.data
}
