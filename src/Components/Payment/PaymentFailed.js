import React, { Component } from "react";
import Logo from "../../Assets/img/logo.png";
import CardPay from "../../Assets/img/card-pay.webp";
import { Link } from "react-router-dom";


export default class PaymentFailed extends Component {
    render() {
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
                <div className="errorpage">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 m-auto">
                        <div>
                            <img style={{ width: "200px" }} src={CardPay} alt="card" />
                            <h2 className="mt-5">Payment Failed</h2>
                            <p>Your transaction has failed due to some technical error.<br />Please try again.</p>
                        </div>
                        <Link to="/home" className="btn btn-primary text-white">Go Home</Link>
                    </div>
                </div>
            </div >
        );
    }
}
