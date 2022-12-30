import axios from 'axios';

// const API_URL = process.env['REACT_APP_API_URL'];

const axiosInstance = axios.create({
  baseURL: '',
});

export default axiosInstance;
