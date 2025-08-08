const apiClient = require('../../src/utils/apiClient');
const endpoints = require('../../src/utils/endpoints');

describe('Users API Tests', () => {

  // ---------- GET ----------
  describe('GET /users/:id', () => {
    it('Get user with id=1', async () => {
      const res = await apiClient.get(`${endpoints.USERS}/1`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name');
    });
  });

  // ---------- DELETE ----------
  describe('DELETE /users/:id', () => {
    it('Delete a user', async () => {
      const res = await apiClient.delete(`${endpoints.USERS}/1`);
      expect(res.status).toBe(200);
    });
  });

});
