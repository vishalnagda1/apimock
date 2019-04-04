import * as handlers from './handlers';

let routes = [
  {
    method: 'POST',
    path: '/explorer',
    handler: handlers.create
  },
  {
    method: 'GET',
    path: '/explorer',
    handler: handlers.list
  },
  {
    method: 'PUT',
    path: '/explorer',
    handler: handlers.rename
  },
  {
    method: 'DELETE',
    path: '/explorer',
    handler: handlers.remove
  }
];

export default routes;
