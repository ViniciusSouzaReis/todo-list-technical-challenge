import axios from 'axios';

const httpRequestAxios = async (method, URL, data, config) => {
  try {
    return await axios[method](URL, data, config);
  } catch (error) {
    return error.response;
  }
};

export default httpRequestAxios;