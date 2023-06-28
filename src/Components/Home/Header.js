/* eslint-disable linebreak-style */
import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { APIURL } from "../../Constant/common";
import { Link, Redirect } from "react-router-dom";
import Team from "../../Assets/img/people-team.jpg";
import { Button, Spinner } from "reactstrap";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            username: "",
            errMsgEmail: "",
            errMsgPwd: "",
            msg: "",
            isLoading: false,
            redirect: false,
            errMsg: [],
            scsMsg: "",
            showPassword: false,
            modal: false,
            fullScrLoader: true,
            user: JSON.parse(localStorage.getItem("userData")),
            accountVerified: true,
            scsMsgResend: "",
            ActiveMsg: "",
            stylePath: true,
            checked: false,
            ActiveAcc: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleRemember = this.handleRemember.bind(this);
    }
    onChangehandler = (e) => {
        this.setState({
            errMsg: ""
        });
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        console.log(data);
        this.setState(data);
    };
    handleRemember(e) {
        this.setState({
            checked: e.target.checked,
        });
    }
    lsRememberMe(check) {
        // if (rmCheck.checked && emailInput.value !== "") {
        if (check) {
            localStorage.username = this.state.email;
            localStorage.password = this.state.password;
            localStorage.checkbox = true;
            // localStorage.checkbox = rmCheck.value;
        } else {
            localStorage.username = "";
            localStorage.password = "";
            localStorage.checkbox = false;
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ isLoading: true });
        const check = this.state.checked;
        this.lsRememberMe(check);
        axios
            .post(APIURL + "login", {
                email: this.state.email,
                password: this.state.password,
            })
            .then((response) => {
                this.setState({
                    isLoading: false,
                });
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("userData", JSON.stringify(response.data.user));
                localStorage.setItem("token", JSON.stringify(response.data.token));
                localStorage.setItem("user_type", JSON.stringify(response.data.user.user_type));
                if (check) {
                    localStorage.setItem("username", this.state.email);
                    localStorage.setItem("password", this.state.password);
                }
                else {
                    localStorage.removeItem("username");
                    localStorage.removeItem("password");
                }
                this.setState({
                    redirect: true,
                });
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    accountVerified: error.response.data.accountVerified,
                    errMsg: error.response.data.error,
                    ActiveAcc: error.response.data.active
                });
            });
    }
    showPassword() {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }
    resendActivationMail = () => {
        this.setState({ isLoading: true });
        axios
            .post(APIURL + "resend/email", {
                email: this.state.email,
            })
            .then((response) => {
                this.setState({
                    scsMsgResend: response.data.message,
                    errMsg: "",
                    isLoading: false
                });
            });
    };
    ActivationMsg = () => {
        if (this.props.params.token) {
            this.setState({ isLoading: true });
            axios
                .get(APIURL + "email/verify/" + this.props.params.token)
                .then((response) => {
                    this.setState({
                        ActivationMsg: response.data.message,
                        isLoading: false
                    });
                    setTimeout(() => this.setState({ ActivationMsg: false }), 7000);
                })
                .catch((error) => {
                    this.setState({
                        errMsg: error.response.data.error,
                        isLoading: false
                    });
                });
        }
    };
    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
        window.scrollTo(0, 0);
        this.ActivationMsg();
        setTimeout(() => this.setState({
            isLoading: false
        }), 500);
        if (localStorage.checkbox && localStorage.checkbox !== "") {
            this.setState({
                checked: true,
                email: localStorage.username,
                password: localStorage.password
            });
        } else {
            this.setState({
                checked: false,
                email: "",
                password: ""
            });
        }
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }
    myRef = React.createRef();
    handleClickOutside = e => {
        if (!this.myRef.current.contains(e.target)) {
            this.setState({
                portrait: false
            });
        }
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to="/checkuser" />;
        }
        return (
            <>
                {this.state.isLoading && <div className="loader"><Spinner color="dark" type="border" >Loading...</Spinner></div>}
                <div className='team-work'>
                    <div className='covar-img' style={{ "backgroundImage": "url(" + Team + ")" }}>
                        <div className="container justify-content-cenetr align-items-center d-flex h-100">
                            <div className="row">
                                <div className="col-12 col-lg-6 justify-content-center align-items-center d-flex">
                                    <div className="">
                                        <h3 className="text-white mb-4">What is Lorem Ipsum?</h3>
                                        <p className="text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                                    </div>
                                </div>
                                <div className="col-12  col-lg-4 ms-auto">
                                    <div className="login-landing">
                                        <div className=" login-form">
                                            <div>
                                                {this.state.errMsg.account_aprove_msg ?
                                                    <div className="alert alert-danger" role="alert">
                                                        {this.state.errMsg.account_aprove_msg} <Link to="/contact"  ><span style={{ color: "blue" }}>Contact us</span></Link><br />
                                                    </div> : ""
                                                }
                                                {this.state.errMsg.message ?
                                                    <div className="alert alert-danger" role="alert">
                                                        {this.state.errMsg.message} <br />
                                                        {!this.state.ActiveAcc ? "" : this.state.accountVerified ? "" :
                                                            <span className="text-secondary font-weight-bold "
                                                                onClick={this.resendActivationMail} >Resend Verification Link</span>
                                                        }
                                                    </div> : ""
                                                }
                                                {/* blocking Message */}
                                                {this.state.errMsg.block_account ?
                                                    <div className="alert alert-danger" role="alert">
                                                        {this.state.errMsg.block_account}
                                                    </div> : ""
                                                }
                                                {/* success msg */}
                                                {this.state.scsMsgResend ?
                                                    <div className="alert alert-success" role="alert">
                                                        {this.state.scsMsgResend}
                                                    </div> : ""
                                                }

                                                {/* activtion msg */}
                                                {this.state.ActivationMsg ?
                                                    <div className="alert alert-success" role="alert">
                                                        {this.state.ActivationMsg}
                                                    </div> : ""
                                                }
                                                <form noValidate className="page__stat" onSubmit={this.handleSubmit}>
                                                    <div className="mb-3 position-relative input-block">
                                                        {/* <label htmlFor="exampleInputEmail1" className="field__label">Email address<strong className="text-danger"> *</strong></label> */}
                                                        <input
                                                            autoFocus={true}
                                                            className="form-control"
                                                            type="text"
                                                            name="email"
                                                            id="email"
                                                            value={this.state.email}
                                                            onChange={this.onChangehandler}
                                                            required
                                                        />
                                                        <span className="placeholder">  Email Address  </span>
                                                        <span className="text-danger">{this.state.errMsg.email}</span>
                                                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                                    </div>
                                                    <div className="mb-3 position-relative ">
                                                        {/* <label htmlFor="exampleInputPassword1" className="field__label">Password<strong className="text-danger"> *</strong></label> */}
                                                        <div className="position-relative input-block">
                                                            <input
                                                                className="form-control"
                                                                type={this.state.showPassword ? "text" : "password"}
                                                                name="password"
                                                                id="password"
                                                                required
                                                                value={this.state.password}
                                                                onChange={this.onChangehandler}
                                                            />

                                                            <span className="placeholder">
                                                                Password
                                                            </span>
                                                            {this.state.showPassword ?
                                                                <span className="fa-eye-pass"> <i onClick={() => this.showPassword()} className="fas fa-eye-slash"></i> </span>
                                                                :
                                                                <span className="fa-eye-pass"> <i onClick={() => this.showPassword()} className="fas fa-eye"></i> </span>
                                                            }
                                                        </div>
                                                        <span className="text-danger">{this.state.errMsg.password}</span>
                                                        <span className="text-danger"></span>
                                                    </div>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                value="lsRememberMe"
                                                                id="rememberMe"
                                                                onChange={this.handleRemember}
                                                                checked={this.state.checked}
                                                            />
                                                            <label className="form-check-label ms-1" htmlFor="exampleCheck1">Remember Me</label>
                                                        </div>
                                                        <Link to='/forgot-password' className="btn p-0">Forgot Password</Link>
                                                    </div>
                                                    <div className="mt-3">
                                                        <Button
                                                            type="submit"
                                                            color=""
                                                            className="btn btn__primary btn-block rounded-pill btn w-100"
                                                        >
                                                            Login
                                                        </Button>
                                                    </div>
                                                    <p className="text-center">Don't have an account? <Link to="/signup" className="text-primary fw-bold"> Sign up </Link> </p>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
Header.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string.is
        })
    })
};
