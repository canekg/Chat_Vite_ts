const apiPath = '/api/v1';

// interface IRoutes {
//   loginPath: () => string,
//   home: () => string,
//   login: () => string,
//   signup: () => string,
//   signupPage: () => string,
//   dataPath: () => string,
//   notFoundPage: () => string,
// }

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  home: () => '/',
  login: () => '/login',
  signup: () => '/signup',
  signupPage: () => [apiPath, 'signup'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  notFoundPage: () => '*',
};

export default routes;
