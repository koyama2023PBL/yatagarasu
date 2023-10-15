import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://www.koakjo.com:9290/',
  headers: {
    Origin: 'http://www.koakjo.com',
    post: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  },
});

export default instance;