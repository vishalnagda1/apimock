import * as handlers from "./handlers";

let routes = [
  {
    method: "GET",
    path: "/dynamicdelay",
    handler: handlers.dynamicdelay
  }
];

export default routes;
