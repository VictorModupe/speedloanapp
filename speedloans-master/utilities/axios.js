const axiosInstance = require('axios') 

var axios = axiosInstance.create({
    baseURL: '' //later
})
axios.interceptors.request.use(
     (config) => {
      return config;
    }
  );
  module.exports = axios