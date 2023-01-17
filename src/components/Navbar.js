import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
    return(
        <div className="navbar">
            <NavLink
            to='/shop'
            >Shop
            </NavLink>
            <NavLink
            to='/checkout'
            >Checkout
            </NavLink>
        </div>
    )
}

export default Navbar;