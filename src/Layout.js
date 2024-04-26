import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Menu from "./component/Menu";

const Layout = (props) => {
    return (
    <div>
        <Outlet />
        <Menu /> 
    </div>
    )
}

export default Layout;