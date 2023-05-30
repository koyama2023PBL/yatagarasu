import axios from 'axios';
import instance from './axios/axiosInstance';

type CpuUsageApiRequest = {
    starttime: Date;
    endtime: Date;
  };

export const fetchFromAPI = async (endpoint: string) => {
    try {
        const response = await instance.get(endpoint);
        console.log("URL:", endpoint);
        console.log("Response:", response);
        return response.data; // Return the response data
    } catch (err) {
        console.log("err:", err);
        throw err; // In case of error, throw it so it can be handled by the calling code
    }
}

export const fetchFromAPIwithRequest = async (endpoint: string, queryParameters: CpuUsageApiRequest) => {
    try {
        // Format the Date objects as strings
        const startTimeString = getDate(queryParameters.starttime);
        const endTimeString = getDate(queryParameters.endtime);

        // Add the query parameters to the URL
        const response = await instance.get(`${endpoint}?starttime=${startTimeString}&endtime=${endTimeString}`);
        console.log("URL:", endpoint);
        console.log("Response:", response);
        return response.data;
    } catch (err) {
        console.log("err:", err);
        throw err;
    }
}


//現在時刻取得（yyyymmddhhmmss）
function getDate(date: Date) {
    var now = date;
    var res = "" + now.getFullYear() + padZero(now.getMonth() + 1) + padZero(now.getDate()) + padZero(now.getHours()) + 
        padZero(now.getMinutes()) + padZero(now.getSeconds());
    return res;
}

//先頭ゼロ付加
function padZero(num: number) {
    return (num < 10 ? "0" : "") + num;
}