module.exports = {
  posts: {
    base: '/posts',
    byId: (id) => `/posts/${id}`,
  },
  comments: {
    base: '/comments',
    byId: (id) => `/comments/${id}`,
  },
  users: {
    base: '/users',
    byId: (id) => `/users/${id}`,
  },
};
