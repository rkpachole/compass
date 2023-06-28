/* eslint-disable linebreak-style */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Logo from "../Assets/img/logo.png";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
    render() {
        return (
            <div className='header'>
                <nav className="navbar navbar-expand-lg navbar-light bg-white">
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                            <span className="navbar-brand" href="#"><img style={{ "width": "150px" }} src={Logo} alt={this.props.alt} /></span>
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className={this.props.activePage === "SignIn" ? "nav-link text-primary fw-bold active" : "nav-link "} aria-current="page" to="/">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={this.props.activePage === "SignUp" ? "nav-link text-primary fw-bold active" : "nav-link "} to="/signup">Sign Up</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}
Navbar.propTypes = {
    activePage: PropTypes.string
};