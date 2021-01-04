import React from "react";

const HomePage = React.lazy(() => import(/* webpackChunkName: "view-home" */ "./HomePage"));

const routes = [
  {
    path: "/",
    component: HomePage,
    exact: true,
  },
];

export default routes;
