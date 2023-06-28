/* eslint-disable linebreak-style */
import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { APIURL } from "../Constant/common";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
// import Navbar from "../Components/Layout/Navbar/Index";
import { Button, Spinner } from "reactstrap";
import Logo from "../Assets/img/logo.png";

export default class SetUserPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                email: "",
                password: "",
                password_confirmation: ""
            },
            errMsg: "",
            showPassword: false,
            Cofirm_showPassword: false,
            isLoading: false
        };
    }
    onChangehandler = (e) => {
        const { userInfo } = this.state;
        userInfo[e.target.name] = e.target.value;
        this.setState({
            userInfo,
            errMsg: ""
        });
        console.log(userInfo);
    };
    onLogoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userData");
        localStorage.removeItem("switchUser");
        const check = localStorage.getItem("checkbox");
        if (check === "false" || check === false)
            localStorage.removeItem("checkbox");
        this.setState({
            navigate: true,
        });
    };
    GetDetails = () => {
        this.setState({ isLoading: true });
        const formData = new FormData();
        axios.post(APIURL + "password/set/" + this.props.match.params.token, formData, {
            // headers: {
            //     "Authorization": `Bearer ${this.props.match.params.token}`
            // }
        })
            .then((response) => {
                this.setState({
                    userInfo: {
                        email: response.data.email,
                    },
                    isLoading: false
                });
                console.log(this.state.userInfo.email);
            })
            .catch(() => {
                this.setState({
                    // errMsg: error.response.data.error,
                    isLoading: false
                });
                setTimeout(() => this.setState({ errMsg: "" }), 4000);
            });
    };
    onSubmitHandler = (e) => {
        e.preventDefault();
        // const params = this.props.match.params;
        this.setState({ isLoading: true });
        axios
            .post(APIURL + "password-set/update", {
                email: this.state.userInfo.email,
                password: this.state.userInfo.password,
                password_confirmation: this.state.userInfo.password_confirmation,
                token: this.props.match.params.token
            })
            .then((response) => {
                this.setState({
                    scsMsg: response.data.message,
                    isLoading: false
                }, () => this.onLogoutHandler());
                setTimeout(() => this.setState({ scsMsg: "" }), 3000);
                setTimeout(() => this.setState({ redirect: true }), 4000);
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    isLoading: false
                });
                setTimeout(() => this.setState({ errMsg: "" }), 4000);
            });
    };
    showPassword() {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }
    Cofirm_showPassword() {
        this.setState({
            Cofirm_showPassword: !this.state.Cofirm_showPassword
        });
    }
    componentDidMount() {
        this.GetDetails();
    }
    render() {
        console.log("suyash y", this.props);
        if (this.state.redirect) {
            return <Redirect to="/" />;
        }
        return (
            <div>
                {this.state.isLoading && <div className="loader"><Spinner color="dark" type="border" ></Spinner></div>}
                <div className='header'>
                    <nav className="navbar navbar-expand-lg navbar-light bg-white">
                        <div className="container justify-content-center d-flex">
                            <Link className="navbar-brand" to="/">
                                <span className="navbar-brand" href="#"><img style={{ "width": "150px" }} src={Logo} alt={this.props.alt} /></span>
                            </Link>
                            <button className="navbar-toggler d-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                    </nav>
                    {/* <Navbar activePage="resetpassword" /> */}
                </div>
                <div className='bg-light'>
                    <div className='login-form'>
                        <div className='col-11 col-sm-11 col-md-10 col-lg-10 col-xl-5 m-auto'>
                            <form className='page__stat' onSubmit={(e) => this.onSubmitHandler(e)}>
                                {this.state.scsMsg ? <div className="alert alert-success" role="alert">
                                    {this.state.scsMsg}
                                </div> : ""}
                                <div className="mb-3 position-relative">
                                    <label htmlFor="exampleInputEmail1" className="field__label">Email address  <strong className="text-danger" >*</strong>
                                    </label>
                                    <div className="position-relative input-block">
                                        <input
                                            className="form-control"
                                            type="email"
                                            name="email"
                                            disabled
                                            value={this.state.userInfo.email}
                                            onChange={this.onChangehandler}
                                            required
                                        />
                                        <span className="placeholder"> Email Address </span>
                                    </div>
                                    <span className="text-danger">{this.state.errMsg.email}</span>
                                </div>
                                <div className="mb-3 position-relative">
                                    <label htmlFor="exampleInputPassword1" className="field__label">New Password <strong className="text-danger" >*</strong></label>
                                    <div className="position-relative input-block">
                                        <input
                                            className="form-control"
                                            type={this.state.showPassword ? "text" : "password"}
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.onChangehandler}
                                            required
                                        />
                                        <span className="placeholder"> New Password </span>
                                        {this.state.showPassword ?
                                            <span className="fa-eye-pass"> <i onClick={() => this.showPassword()} className="fas fa-eye-slash"></i> </span>
                                            :
                                            <span className="fa-eye-pass"> <i onClick={() => this.showPassword()} className="fas fa-eye"></i> </span>
                                        }
                                    </div>
                                    <span className="text-danger">{this.state.errMsg.password}</span>

                                </div>
                                <div className="mb-3 position-relative">
                                    <label htmlFor="exampleInputPassword1" className="field__label">Confirm Password  <strong className="text-danger" >*</strong></label>
                                    <div className='position-relative input-block'>
                                        <input
                                            className="form-control"
                                            type={this.state.Cofirm_showPassword ? "text" : "password"}
                                            name="password_confirmation"
                                            value={this.state.password_confirmation}
                                            onChange={this.onChangehandler}
                                            required
                                        />
                                        <span className="placeholder"> New Password </span>
                                        {this.state.Cofirm_showPassword ?
                                            <span className="fa-eye-pass"> <i onClick={() => this.Cofirm_showPassword()} className="fas fa-eye-slash"></i> </span>
                                            :
                                            <span className="fa-eye-pass"> <i onClick={() => this.Cofirm_showPassword()} className="fas fa-eye"></i> </span>
                                        }
                                    </div>
                                </div>
                                <div className="d-grid gap-2 mt-4">
                                    <Button type='submit' color="primary" className="btn btn__primary  btn-block rounded-pill mx-4">Set Password</Button>
                                </div>
                                <p className="text-center" >Don &apos; t have an account? <Link to="/" className='text-primary fw-bold'> Go to sign In </Link> </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
SetUserPassword.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string
        })
    })
};