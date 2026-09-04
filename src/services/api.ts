import axios from "axios"

export const apiClient = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
})

export default apiClient
