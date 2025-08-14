const apiClient = require('../utils/apiClient');
const endpoints = require('../utils/endpoints');

describe('Users API Tests', () => {

  describe('GET /users/:id', () => {
    it('Get user with id=1', async () => {
      const res = await apiClient.get(endpoints.users.byId(1));

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name');
    });
  });

  describe('DELETE /users/:id', () => {
    it('Delete a user', async () => {
      const res = await apiClient.delete(endpoints.users.byId(1));
      
      expect(res.status).toBe(200);
    });
  });

});
