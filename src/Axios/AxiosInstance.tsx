import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://www.koakjo.com:9190',
  headers: {
    post: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  },
});

export default instance;
