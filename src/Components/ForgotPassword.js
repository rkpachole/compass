/* eslint-disable linebreak-style */
import React, { Component } from "react";
import axios from "axios";
import { APIURL } from "../Constant/common";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "../Assets/img/logo.png";
import { Button, Spinner } from "reactstrap";

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            scsMsg: "",
            errMsg: "",
            redirect: false,
            isLoading: false,
        };
    }
    handleUserName = (e) => {
        this.setState({
            email: e.target.value
        });
    };
    handleSubmit(e) {
        e.preventDefault();

        this.setState({ isLoading: true });
        axios
            .post(APIURL + "password/reset", {
                email: this.state.email,
            })
            .then((response) => {
                this.setState({
                    isLoading: false,
                    scsMsg: response.data.message
                });
                setTimeout(() => this.setState({ scsMsg: "" }), 3000);
                setTimeout(() => this.setState({ redirect: true }), 4000);
            })
            .catch((error) => {

                console.log(error.response.data.errors);
                this.setState({
                    isLoading: false,
                    errMsg: error.response.data.errors,
                });
                setTimeout(() => this.setState({ errMsg: "" }), 4000);
            });
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />;
        }
        return (
            <>
                {this.state.isLoading && <div className="loader"><Spinner color="dark" type="border" >Loading...</Spinner></div>}
                <div>
                    <div className='header'>
                        <nav className="navbar navbar-expand-lg navbar-light bg-white">
                            <div className="container">
                                <span className="navbar-brand" ><img style={{ "width": "150px" }} src={Logo} alt={this.props.alt} /></span>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <Link className="nav-link text-primary fw-bold active" aria-current="page" to="/">Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link " to="/signup">Sign Up</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className='bg-light'>
                        <div className='login-form'>
                            <div className='col-5 m-auto'>
                                <h3 className="text-center mb-4">Forget Your Password</h3>
                                <form noValidate className='page__stat' onSubmit={(e) => this.handleSubmit(e)}>
                                    {this.state.scsMsg ? <div className="alert alert-success" role="alert">
                                        {this.state.scsMsg}
                                    </div> : ""}
                                    <div className="mb-3 position-relative input-block">
                                        {/* <label htmlFor="exampleInputEmail1" className="field__label">Email address<strong className="text-danger"> *</strong></label> */}
                                        <input
                                            className="form-control"
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={this.state.email}
                                            onChange={this.handleUserName}
                                            required
                                        />
                                        <span className="placeholder">  Email Address  </span>
                                        <span className="text-danger">{this.state.errMsg}</span>
                                        <div id="emailHelp" className="form-text">Please enter your email address to reset password</div>
                                    </div>
                                    <div className='d-grid gap-2 mt-4'>
                                        <Button
                                            type="submit"
                                            color=""
                                            className="btn btn__primary  mx-4 btn-block rounded-pill"
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                    <p className='text-center'><Link to="/" className='text-primary fw-bold'> Go to sign In </Link> </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
