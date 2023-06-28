import React, { Component } from "react";
import Logo from "../../Assets/img/logo.png";
import axios from "axios";
import { APIURL } from "../../Constant/common";
import queryString from "query-string";
import { Link } from "react-router-dom";

export default class PaymentSuccess extends Component {
    constructor() {
        super();
        this.state = {
            navigate: false,
            scsMsg: [],
            suMesage: false,
            nonVarifyMesage: false
        };
    }


    componentDidMount() {
        this.paymentCheck();
    }

    paymentCheck() {
        const value = queryString.parse(this.props.location.search);
        const suid = value.session_id;
        console.log(suid);
        if (suid) {
            const formData = new FormData();
            formData.append("suid", suid);
            axios.post(APIURL + "payment-check", formData)
                .then((response) => {
                    console.log("payment123",response.data);
                    if (response.data.activation_status == 0) {
                        this.setState({
                            nonVarifyMesage: true
                        });
                    }
                    this.setState({
                        scsMsg: response.data.message,
                        suMesage: true
                    });
                    var self = this;
                    setTimeout(function () {
                        self.setState({
                            scsMsg: ""
                        });
                    }, 2000);
                });
        }
    }
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
                <div className="thankspage">
                    <div className="col-5 m-auto">
                        <div>
                            <i className="fas fa-check-circle"> </i>
                            <h1>Thank You !</h1>
                            <p>
                                {this.state.suMesage == true &&
                                    "Thank you for purchasing the subscription plan."
                                }
                                <br />
                                {/* {this.state.nonVarifyMesage == true &&
                                    "You will receive a confirmation email to verify your profile. Please check your email."
                                } */}
                            </p>
                        </div>
                        <Link to="/" className="btn btn-primary text-white">Go Home</Link>
                    </div>
                </div>
            </div>
        );
    }
}
