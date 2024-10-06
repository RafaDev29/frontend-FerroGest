import axiosInstance from '@/config/http.config';


const baseURL = process.env.VUE_APP_BASE_URL;



export function listCategoryApi(token) {
  
    return axiosInstance.get(`${baseURL}/categories`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export function createCategoryApi(token, payload) {
  
    return axiosInstance.post(`${baseURL}/categories`, payload,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}



