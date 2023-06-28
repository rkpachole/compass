import React, { Component } from "react";

export default class Footer extends Component {
    render() {
        return (
            <>
                <footer className="">
                    <p className="socal-midia justify-content-center nav">
                        <a className="nav-link"> <i className="fab fa-facebook-f"></i> </a>
                        <a className="nav-link"> <i className="fab fa-youtube"></i> </a>
                        <a className="nav-link"> <i className="fab fa-twitter"></i> </a>
                        <a className="nav-link"> <i className="fab fa-linkedin-in"></i> </a>
                        <a className="nav-link"> <i className="fab fa-instagram"></i> </a>
                    </p>
                </footer>
            </>
        );
    }
}
