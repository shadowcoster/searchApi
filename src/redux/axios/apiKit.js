import axios from 'axios';

export const url = 'https://dummyjson.com'; // server URL

export const finalURL = url;
const APIKit = axios.create({
  baseURL: finalURL,
  timeout: 60000000,
});

const requestInterceptor = async config => {
  console.log('Request Interceptor Config:', config);
  return config;
};

const responseInterceptor = response => {
  console.log('Response Interceptor Response:', response); 
  return response;
};

APIKit.interceptors.request.use(requestInterceptor);
APIKit.interceptors.response.use(responseInterceptor);

export default APIKit;
