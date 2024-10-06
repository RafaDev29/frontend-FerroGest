
import axiosInstance from '@/config/http.config';


const baseURL = process.env.VUE_APP_BASE_URL;


export function listSuppliersApi(token) {
  
    return axiosInstance.get(`${baseURL}/suppliers`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export function createSuppliersApi(token, payload) {
  
    return axiosInstance.post(`${baseURL}/suppliers`, payload,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

