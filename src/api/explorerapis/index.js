import * as handlers from './handlers';

let routes = [
    {
        method: 'POST',
        path: '/explorer',
        handler: handlers.create
    },
];

export default routes;
