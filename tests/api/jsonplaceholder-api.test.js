const request = require('superagent');

// ---------- GET ----------
describe('GET /posts', () => {
  it('Get all posts', async () => {
    const res = await request.get('https://jsonplaceholder.typicode.com/posts');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('Get post with id=1', async () => {
    const res = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
  });

  it('Get all comments', async () => {
    const res = await request.get('https://jsonplaceholder.typicode.com/comments');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('Get user with id=1', async () => {
    const res = await request.get('https://jsonplaceholder.typicode.com/users/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('name');
  });

  it('Get non-existent resource returns 404', async () => {
    try {
      await request.get('https://jsonplaceholder.typicode.com/posts/99999');
    } catch (error) {
      expect(error.status).toBe(404);
    }
  });
});

// ---------- POST ----------
describe('POST /posts', () => {
  it('Create a new post', async () => {
    const res = await request
      .post('https://jsonplaceholder.typicode.com/posts')
      .send({ title: 'foo', body: 'bar', userId: 1 });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('Create post without title field', async () => {
    const res = await request
      .post('https://jsonplaceholder.typicode.com/posts')
      .send({ body: 'no title', userId: 1 });
    expect(res.status).toBe(201);
  });

  it('Create a post with numeric userId', async () => {
    const res = await request
      .post('https://jsonplaceholder.typicode.com/posts')
      .send({ title: 'hello', body: 'test', userId: 999 });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('userId', 999);
  });

  it('Create a post with empty body', async () => {
    const res = await request
      .post('https://jsonplaceholder.typicode.com/posts')
      .send({});
    expect(res.status).toBe(201);
  });

  it('Create a post with invalid JSON should fail', async () => {
    try {
      await request
        .post('https://jsonplaceholder.typicode.com/posts')
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
    const res = await request
      .put('https://jsonplaceholder.typicode.com/posts/1')
      .send({ id: 1, title: 'new title', body: 'new body', userId: 1 });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('title', 'new title');
  });

  it('Update only the title field', async () => {
    const res = await request
      .put('https://jsonplaceholder.typicode.com/posts/1')
      .send({ title: 'only title' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('title', 'only title');
  });

  it('Update post with non-existent id', async () => {
    try {
      const res = await request
        .put('https://jsonplaceholder.typicode.com/posts/99999')
        .send({ title: 'xxx' });
      expect([200, 404]).toContain(res.status);
    } catch (error) {
      expect([404, 500]).toContain(error.status);
    }
  });

  it('Update post with empty body', async () => {
    const res = await request
      .put('https://jsonplaceholder.typicode.com/posts/1')
      .send({});
    expect(res.status).toBe(200);
  });

  it('Update post without id in body', async () => {
    const res = await request
      .put('https://jsonplaceholder.typicode.com/posts/2')
      .send({ title: 'title without id' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('title', 'title without id');
  });
});

// ---------- PATCH ----------
describe('PATCH /posts/:id', () => {
  it('Patch title field only', async () => {
    const res = await request
      .patch('https://jsonplaceholder.typicode.com/posts/1')
      .send({ title: 'patched title' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('title', 'patched title');
  });

  it('Patch body field only', async () => {
    const res = await request
      .patch('https://jsonplaceholder.typicode.com/posts/1')
      .send({ body: 'patched body' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('body', 'patched body');
  });

  it('Patch with empty body', async () => {
    const res = await request
      .patch('https://jsonplaceholder.typicode.com/posts/1')
      .send({});
    expect(res.status).toBe(200);
  });

  it('Patch non-existent post id', async () => {
    const res = await request
      .patch('https://jsonplaceholder.typicode.com/posts/99999')
      .send({ title: 'nonexistent' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('title', 'nonexistent');
  });

  it('Patch with extra field', async () => {
    const res = await request
      .patch('https://jsonplaceholder.typicode.com/posts/1')
      .send({ extra: 'field' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('extra', 'field');
  });
});

// ---------- DELETE ----------
describe('DELETE /posts/:id', () => {
  it('Delete a post by id', async () => {
    const res = await request
      .delete('https://jsonplaceholder.typicode.com/posts/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({});
  });

  it('Delete a comment by id', async () => {
    const res = await request
      .delete('https://jsonplaceholder.typicode.com/comments/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({});
  });

  it('Delete a non-existent post', async () => {
    const res = await request
      .delete('https://jsonplaceholder.typicode.com/posts/99999');
    expect(res.status).toBe(200);
  });

  it('Delete a user', async () => {
    const res = await request
      .delete('https://jsonplaceholder.typicode.com/users/1');
    expect(res.status).toBe(200);
  });

  it('Delete with invalid id', async () => {
    const res = await request
      .delete('https://jsonplaceholder.typicode.com/posts/abc');
    expect(res.status).toBe(200);
  });
});
