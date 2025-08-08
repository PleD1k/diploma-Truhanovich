const apiClient = require('../../src/utils/apiClient');
const endpoints = require('../../src/utils/endpoints');

describe('Comments API Tests', () => {

  // ---------- GET ----------
  describe('GET /comments', () => {
    it('Get all comments', async () => {
      const res = await apiClient.get(endpoints.COMMENTS);
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  // ---------- DELETE ----------
  describe('DELETE /comments/:id', () => {
    it('Delete a comment by id', async () => {
      const res = await apiClient.delete(`${endpoints.COMMENTS}/1`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual({});
    });
  });

});
