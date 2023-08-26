import axios from "axios";
const BASE_URL = "http://localhost:8800/";

const API_URLS = {
  parseFile: `${BASE_URL}api/parse/parseFile`,
};

export const parseFile = (formData) => {
  try {
    return axios.post(`${API_URLS.parseFile}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    throw error;
  }
};

export default API_URLS;
