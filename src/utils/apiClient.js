require('dotenv').config();
const request = require('superagent');

const BASE_URL = process.env.API_BASE_URL;

const apiClient = {
  get: async (endpoint) => {
    try {
      const res = await request.get(`${BASE_URL}${endpoint}`);
      return res;
    } catch (error) {
      throw error;
    }
  },

  post: async (endpoint, body) => {
    try {
      const res = await request.post(`${BASE_URL}${endpoint}`).send(body);
      return res;
    } catch (error) {
      throw error;
    }
  },

  put: async (endpoint, body) => {
    try {
      const res = await request.put(`${BASE_URL}${endpoint}`).send(body);
      return res;
    } catch (error) {
      throw error;
    }
  },

  patch: async (endpoint, body) => {
    try {
      const res = await request.patch(`${BASE_URL}${endpoint}`).send(body);
      return res;
    } catch (error) {
      throw error;
    }
  },

  delete: async (endpoint) => {
    try {
      const res = await request.delete(`${BASE_URL}${endpoint}`);
      return res;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = apiClient;
