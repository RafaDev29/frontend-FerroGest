import axiosInstance from '@/config/http.config';


const baseURL = process.env.VUE_APP_BASE_URL;


export function listOutputsApi(token) {
  
    return axiosInstance.get(`${baseURL}/warehouse-outputs`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export function createOutputsApi(token, payload) {
  
    return axiosInstance.post(`${baseURL}/warehouse-outputs`, payload,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


