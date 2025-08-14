const apiClient = require('../utils/apiClient');
const endpoints = require('../utils/endpoints');

describe('Comments API Tests', () => {

  describe('GET /comments', () => {
    it('Get all comments', async () => {
      const res = await apiClient.get(endpoints.comments.base);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe('DELETE /comments/:id', () => {
    it('Delete a comment by id', async () => {
      const res = await apiClient.delete(endpoints.comments.byId(1));
      
      expect(res.status).toBe(200);
      expect(res.body).toEqual({});
    });

    it('Delete non-existent comment should return 200 or suitable status', async () => {
      const res = await apiClient.delete(endpoints.comments.byId(99999));
      
      expect(res.status).toBe(200);
    });
  });

});
