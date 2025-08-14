const apiClient = require('../utils/apiClient');
const endpoints = require('../utils/endpoints');
const request = require('superagent');

const testData = {
  newPost: { title: 'foo', body: 'bar', userId: 1 },
  postWithoutTitle: { body: 'no title', userId: 1 },
  postWithNumericUserId: { title: 'hello', body: 'test', userId: 999 },
  emptyPost: {},
  updateFullPost: { id: 1, title: 'new title', body: 'new body', userId: 1 },
  updateOnlyTitle: { title: 'only title' },
  updateTitleWithoutId: { title: 'title without id' },
  patchTitle: { title: 'patched title' },
  patchBody: { body: 'patched body' },
  patchExtraField: { extra: 'field' },
  patchNonExistent: { title: 'nonexistent' },
};

describe('Posts API Tests', () => {

  describe('GET /posts', () => {
    it('Get all posts', async () => {
      const res = await apiClient.get(endpoints.posts.base);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('Get post with id=1', async () => {
      const res = await apiClient.get(endpoints.posts.byId(1));

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', 1);
    });

    it('Get non-existent post returns 404', async () => {
      await expect(apiClient.get(endpoints.posts.byId(99999))).rejects.toMatchObject({
        status: 404,
      });
    });
  });

  describe('POST /posts', () => {
    it('Create a new post', async () => {
      const res = await apiClient.post(endpoints.posts.base, testData.newPost);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toMatchObject({
        title: testData.newPost.title,
        body: testData.newPost.body,
        userId: testData.newPost.userId,
      });
    });

    it('Create post without title field', async () => {
      const res = await apiClient.post(endpoints.posts.base, testData.postWithoutTitle);

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({
        body: testData.postWithoutTitle.body,
        userId: testData.postWithoutTitle.userId,
      });
      expect(res.body).toHaveProperty('id');
      expect(res.body).not.toHaveProperty('title');
    });

    it('Create a post with numeric userId', async () => {
      const res = await apiClient.post(endpoints.posts.base, testData.postWithNumericUserId);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('userId', 999);
      expect(res.body).toMatchObject({
        title: testData.postWithNumericUserId.title,
        body: testData.postWithNumericUserId.body,
      });
      expect(res.body).toHaveProperty('id');
    });

    it('Create a post with empty body', async () => {
      const res = await apiClient.post(endpoints.posts.base, testData.emptyPost);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
    });

    it('Create a post with invalid JSON should fail', async () => {
      await expect(
        request
          .post(`${process.env.API_BASE_URL}${endpoints.posts.base}`)
          .set('Content-Type', 'application/json')
          .send('not a json')

      ).rejects.toHaveProperty('status', expect.any(Number));
    });
  });

  describe('PUT /posts/:id', () => {
    it('Fully update a post', async () => {
      const res = await apiClient.put(endpoints.posts.byId(1), testData.updateFullPost);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        id: testData.updateFullPost.id,
        title: testData.updateFullPost.title,
        body: testData.updateFullPost.body,
        userId: testData.updateFullPost.userId,
      });
    });

    it('Update only the title field', async () => {
      const res = await apiClient.put(endpoints.posts.byId(1), testData.updateOnlyTitle);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('title', testData.updateOnlyTitle.title);
    });

    it('Update post with non-existent id', async () => {
      try {
        const res = await apiClient.put(endpoints.posts.byId(99999), testData.updateOnlyTitle);
        expect([200, 404]).toContain(res.status);
        if (res.status === 200) {
          expect(res.body).toHaveProperty('title', testData.updateOnlyTitle.title);
        }
      } catch (err) {
        expect([404, 500]).toContain(err.status);
      }
    });

    it('Update post with empty body', async () => {
      const res = await apiClient.put(endpoints.posts.byId(1), testData.emptyPost);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', 1);
    });

    it('Update post without id in body', async () => {
      const res = await apiClient.put(endpoints.posts.byId(2), testData.updateTitleWithoutId);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('title', testData.updateTitleWithoutId.title);
    });
  });

  describe('PATCH /posts/:id', () => {
    it('Patch title field only', async () => {
      const res = await apiClient.patch(endpoints.posts.byId(1), testData.patchTitle);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('title', testData.patchTitle.title);
    });

    it('Patch body field only', async () => {
      const res = await apiClient.patch(endpoints.posts.byId(1), testData.patchBody);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('body', testData.patchBody.body);
    });

    it('Patch with empty body', async () => {
      const res = await apiClient.patch(endpoints.posts.byId(1), testData.emptyPost);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', 1);
    });

    it('Patch non-existent post id', async () => {
      const res = await apiClient.patch(endpoints.posts.byId(99999), testData.patchNonExistent);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('title', testData.patchNonExistent.title);
    });

    it('Patch with extra field', async () => {
      const res = await apiClient.patch(endpoints.posts.byId(1), testData.patchExtraField);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('extra', testData.patchExtraField.extra);
    });
  });

  describe('DELETE /posts/:id', () => {
    it('Delete a post by id', async () => {
      const res = await apiClient.delete(endpoints.posts.byId(1));

      expect(res.status).toBe(200);
      expect(res.body).toEqual({});
    });

    it('Delete a non-existent post', async () => {
      const res = await apiClient.delete(endpoints.posts.byId(99999));

      expect(res.status).toBe(200);
    });

    it('Delete with invalid id', async () => {
      const res = await apiClient.delete(`${endpoints.posts.base}/abc`);
      
      expect(res.status).toBe(200);
    });
  });

});
