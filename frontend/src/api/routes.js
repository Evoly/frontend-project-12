export const apiPath = '/api/v1';

export const userRoutes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  usersPath: () => [apiPath, 'data'].join('/'),
};

export const dataRoutes = {
  channels: () => [apiPath, 'channels'].join('/'),
  channel: (id) => [apiPath, 'channels', id].join('/'),
  messages: () => [apiPath, 'messages'].join('/'),
};