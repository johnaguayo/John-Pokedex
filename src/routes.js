import React from "react";
import Home from "./component/Home";
import Menu from "./component/Menu";
import Layout from "./Layout";

const routes = () => [
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <Home />},
            { path: "/equip/:id", element: <Menu />},
        ],
    }
];

export default routes;