import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8000/"
})

api.interceptors.request.use(
    (config) => {
    let token = localStorage.getItem("access_token")
    config.headers.access_token = token
    return config
    },
    (error) => {
        console.log(error)
        return Promise.reject(error)
    }
)