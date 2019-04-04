import * as handlers from './handlers';

let routes = [
    {
        method: 'GET',
        path: '/explorer',
        handler: handlers.test
    }
];

export default routes;
