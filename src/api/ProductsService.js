import axiosInstance from '@/config/http.config';


const baseURL = process.env.VUE_APP_BASE_URL;


export function listProductsApi(token) {
  
    return axiosInstance.get(`${baseURL}/products`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export function createProductsApi(token, payload) {
  
    return axiosInstance.post(`${baseURL}/products`, payload,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


