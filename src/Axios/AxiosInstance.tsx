import axios from 'axios';

const instance = axios.create({
<<<<<<< HEAD
  baseURL: 'http://www.koakjo.com:9290/',
=======
  baseURL: 'http://www.koakjo.com:9290',
>>>>>>> main
  headers: {
    post: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  },
});

export default instance;