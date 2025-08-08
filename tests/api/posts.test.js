const apiClient = require('../../src/utils/apiClient');
const endpoints = require('../../src/utils/endpoints');

describe('Posts API Tests', () => {

  // ---------- GET ----------
  describe('GET /posts', () => {
    it('Get all posts', async () => {
      const res = await apiClient.get(endpoints.POSTS);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('Get post with id=1', async () => {
      const res = await apiClient.get(`${endpoints.POSTS}/1`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', 1);
    });

    it('Get non-existent post returns 404', async () => {
      try {
        await apiClient.get(`${endpoints.POSTS}/99999`);
      } catch (error) {
        expect(error.status).toBe(404);
      }
    });
  });

  // ---------- POST ----------
  describe('POST /posts', () => {
    it('Create a new post', async () => {
      const res = await apiClient.post(endpoints.POSTS, { title: 'foo', body: 'bar', userId: 1 });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
    });

    it('Create post without title field', async () => {
      const res = await apiClient.post(endpoints.POSTS, { body: 'no title', userId: 1 });
      expect(res.status).toBe(201);
    });

    it('Create a post with numeric userId', async () => {
      const res = await apiClient.post(endpoints.POSTS, { title: 'hello', body: 'test', userId: 999 });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('userId', 999);
    });

    it('Create a post with empty body', async () => {
      const res = await apiClient.post(endpoints.POSTS, {});
      expect(res.status).toBe(201);
    });

    it('Create a post with invalid JSON should fail', async () => {
      try {
        // Для невалидного JSON используем superagent напрямую
        const request = require('superagent');
        await request
          .post(`${process.env.API_BASE_URL}${endpoints.POSTS}`)
          .set('Content-Type', 'application/json')
          .send('not a json');
      } catch (error) {
        expect(error.status).toBeGreaterThanOrEqual(400);
      }
    });
  });

  // ---------- PUT ----------
  describe('PUT /posts/:id', () => {
    it('Fully update a post', async () => {
      const res = await apiClient.put(`${endpoints.POSTS}/1`, { id: 1, title: 'new title', body: 'new body', userId: 1 });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('title', 'new title');
    });

    it('Update only the title field', async () => {
      const res = await apiClient.put(`${endpoints.POSTS}/1`, { title: 'only title' });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('title', 'only title');
    });

    it('Update post with non-existent id', async () => {
      try {
        const res = await apiClient.put(`${endpoints.POSTS}/99999`, { title: 'xxx' });
        expect([200, 404]).toContain(res.status);
      } catch (error) {
        expect([404, 500]).toContain(error.status);
      }
    });

    it('Update post with empty body', async () => {
      const res = await apiClient.put(`${endpoints.POSTS}/1`, {});
      expect(res.status).toBe(200);
    });

    it('Update post without id in body', async () => {
      const res = await apiClient.put(`${endpoints.POSTS}/2`, { title: 'title without id' });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('title', 'title without id');
    });
  });

  // ---------- PATCH ----------
  describe('PATCH /posts/:id', () => {
    it('Patch title field only', async () => {
      const res = await apiClient.patch(`${endpoints.POSTS}/1`, { title: 'patched title' });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('title', 'patched title');
    });

    it('Patch body field only', async () => {
      const res = await apiClient.patch(`${endpoints.POSTS}/1`, { body: 'patched body' });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('body', 'patched body');
    });

    it('Patch with empty body', async () => {
      const res = await apiClient.patch(`${endpoints.POSTS}/1`, {});
      expect(res.status).toBe(200);
    });

    it('Patch non-existent post id', async () => {
      const res = await apiClient.patch(`${endpoints.POSTS}/99999`, { title: 'nonexistent' });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('title', 'nonexistent');
    });

    it('Patch with extra field', async () => {
      const res = await apiClient.patch(`${endpoints.POSTS}/1`, { extra: 'field' });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('extra', 'field');
    });
  });

  // ---------- DELETE ----------
  describe('DELETE /posts/:id', () => {
    it('Delete a post by id', async () => {
      const res = await apiClient.delete(`${endpoints.POSTS}/1`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual({});
    });

    it('Delete a non-existent post', async () => {
      const res = await apiClient.delete(`${endpoints.POSTS}/99999`);
      expect(res.status).toBe(200);
    });

    it('Delete with invalid id', async () => {
      const res = await apiClient.delete(`${endpoints.POSTS}/abc`);
      expect(res.status).toBe(200);
    });
  });

});
