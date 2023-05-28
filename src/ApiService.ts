import axios from 'axios';
import instance from './axios/axiosInstance';

export const fetchFromAPI = async (endpoint: string) => {

    const response = instance.get(endpoint)
    .then((response) => {
        console.log("URL:", endpoint);
        console.log("Response:", response);
    })
    .catch(err => {
        console.log("err:", err);
    });
    return response;
}
