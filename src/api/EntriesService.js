import axiosInstance from '@/config/http.config';


const baseURL = process.env.VUE_APP_BASE_URL;


export function listEntriesApi(token) {
  
    return axiosInstance.get(`${baseURL}/warehouse-entries`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export function createEntriesApi(token, payload) {
  
    return axiosInstance.post(`${baseURL}/warehouse-entries`, payload,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


