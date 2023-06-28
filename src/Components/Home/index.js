import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Logo from "../../Assets/img/logo.png";
// import PackagePlans from "./PackagePlans";
import Footer from "./Footer";
import Header from "./Header";


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("userData")),
        };
    }
    render() {
        if (this.state.user) {
            return <Redirect to="/checkuser" />;
        }
        return (
            <div>
                <div className='header'>
                    <nav className="navbar navbar-expand-lg navbar-light bg-white">
                        <div className="container justify-content-center d-flex">
                            <span className="navbar-brand" href="#"><img style={{ "width": "150px" }} src={Logo} alt={this.props.alt} /></span>
                            <button className="navbar-toggler d-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                    </nav>
                </div>
                <Header params={this.props.match.params} />
                {/* <PackagePlans /> */}
                <Footer />   
            </div>
        );
    }
}
