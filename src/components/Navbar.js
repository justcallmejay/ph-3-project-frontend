import React from "react";
import { NavLink } from "react-router-dom";
import '../css/Navbar.css'

function Navbar() {

    const linkStyles = {
        display: "inline-block",
        width: "100px",
        height: "40px",
        padding: "12px",
        margin: " 10px 15px 10px 10px",
        float: "right",
        position: "relative",
        textDecoration: "none",
        color: "white",
        fontSize: "16px"
    }
    
    const activeLink = {
        textDecoration: "underline",
        color: "white"
    }

    return(
        <div className="navbar">
            <NavLink
            to='/'
            exact style={linkStyles}
            activeStyle={activeLink}
            >About Us
            </NavLink>
            <NavLink
            to='/checkout'
            exact style={linkStyles}
            activeStyle={activeLink}
            >Checkout
            </NavLink>
            <NavLink
            to='/my-account'
            exact style={linkStyles}
            activeStyle={activeLink}
            >My Account
            </NavLink>
            <NavLink
            to='/shop'
            exact style={linkStyles}
            activeStyle={activeLink}
            >Shop
            </NavLink>
        </div>
    )
}

export default Navbar;