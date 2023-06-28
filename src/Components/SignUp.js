/* eslint-disable linebreak-style */
import React, { Component } from "react";
import axios from "axios";
import { APIURL } from "../Constant/common";
import { Link, Redirect } from "react-router-dom";
import Team from "../Assets/img/people-team.jpg";
import { Button, Input, Spinner } from "reactstrap";
import ReCAPTCHA from "react-google-recaptcha";
import Navbar from "./Navbar";

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("userData")),
            signupData: {
                name: "",
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                password: "",
                c_password: "",
                company_name: "",
                username: "",
                isLoading: false
            },
            checked: "",
            msg: "",
            errMsg: {},
            scsMsg: "",
            redirect: false,
            isLoading: false,
            fullscrLoader: true,
            showPassword: false,
            Cofirm_showPassword: false,
            captchaToken: "",
            CaptchaErrMsg: "",
            errMsgphone: "",
            AcceptTnc: "",
            recaptch: false,
            packageId: 1
        };
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleCaptch = this.handleCaptch.bind(this);
        this.handleRemember = this.handleRemember.bind(this);
    }

    onChangehandler = (e) => {
        const { signupData } = this.state;
        if (e.target.name === "phone" && e.target.value.length > 10) {
            this.setState({ errMsgphone: "Phone number must be 10 digits" });
        }else{ 
            this.setState({  errMsgphone: ""});
        }
        if(e.target.name === "password" && /\s/.test(e.target.value)){
            this.setState({  errMsgPassword: "Password must only contain Letters, Numbers, Dashes and Underscores."});
        }else{
            this.setState({  errMsgPassword: ""});
        }
        if(e.target.name === "c_password" && /\s/.test(e.target.value)){
            this.setState({  errMsgCPassword: "Password must only contain Letters, Numbers, Dashes and Underscores."});
        }else{
            this.setState({  errMsgCPassword: ""});
        }

        signupData[e.target.name] = e.target.value;
        this.setState({ signupData, errMsg: "" });
    
    };
    handleCaptch(value) {
        console.log("Captcha value:", value);
        this.setState({
            captchaToken: value
        }, () => {
            if (this.state.captchaToken) {
                this.setState({
                    recaptch: true
                });
            }
        });
    }
    handleRemember(e) {
        this.setState({
            checked: e.target.checked,
        });
    }
    onSubmitHandler = (e) => {
        console.log("captchaToken",this.state.captchaToken);
        e.preventDefault();
        this.setState({
            isLoading: true
        });
        const { signupData } = this.state;
        const formData = new FormData();
        formData.append("accept_tnc", this.state.checked ? this.state.checked : "");
        formData.append("first_name", signupData.name);
        formData.append("last_name", signupData.last_name);
        {signupData.phone &&  formData.append("phone", signupData.phone);}
       
        formData.append("email", signupData.email);
        formData.append("password", signupData.password);
        formData.append("password_confirmation", signupData.c_password);
        formData.append("company_name", signupData.company_name);

        formData.append("recaptch", this.state.captchaToken ? true : "");
        formData.append("package_id", this.state.packageId);
        axios
            .post(APIURL + "register", formData)
            .then((response) => {
                // console.log("register", response.data.accountVerified)
                this.setState({
                    scsMsg: response.data.message,
                    isLoading: false
                });
                window.scrollTo(0, 0);
                setTimeout(() => {
                    if (response.data.url !== "") {
                        window.location.href = response.data.url;
                    }
                }, 1000);

                localStorage.setItem("accountVerified", response.data.accountVerified);
                setTimeout(() => this.setState({
                    redirect: true
                }), 7000);
            })
            .catch(error => {
                this.setState({
                    isLoading: false,
                    redirect: false,
                    errMsg: error.response.data.error,
                });
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
        document.addEventListener("mousedown", this.handleClickOutside);
        window.scrollTo(0, 0);
        setTimeout(() => this.setState({ isLoading: "" }), 500);
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
    toggle() {
        this.setState({
            portrait: !this.state.portrait
        });
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/" push={true} />;
        }
        if (this.state.user) {
            return <Redirect to="/checkuser" />;
        }
        return (
            <>
                {this.state.isLoading && <div className="loader"><Spinner color="dark" type="border" >Loading...</Spinner></div>}
                <Navbar activePage="SignUp" />
                <div className='bg-light'>
                    <div className='login-form h-auto py-4' style={{ "backgroundImage": "url(" + Team + ")", backgroundSize: "100%", backgroundAttachment: "fixed" }}>
                        <div className='col-5 m-auto'>
                            <form noValidate className='page__stat' onSubmit={(e) => this.onSubmitHandler(e)}>
                                {this.state.scsMsg ? <div className="alert alert-success" role="alert">
                                    {this.state.scsMsg}
                                </div> : ""}
                                <div className="mb-3 position-relative">
                                    <label htmlFor="exampleInputEmail1" className="field__label">First Name
                                        <strong className="text-danger" > *</strong></label>
                                    <div className="position-relative input-block">
                                        <input
                                            autoFocus={true}
                                            required
                                            className="form-control"
                                            type="text"
                                            name="name"
                                            value={this.state.signupData.name}
                                            onChange={this.onChangehandler}
                                        />
                                        <span className="placeholder">  First Name </span>
                                    </div>
                                    <span className="text-danger">{this.state.errMsg.first_name}</span>
                                </div>
                                <div className="mb-3 position-relative">
                                    <label htmlFor="exampleInputEmail1" className="field__label">Last Name
                                        <strong className="text-danger" > *</strong></label>
                                    <div className="position-relative input-block">
                                        <input
                                            className="form-control"
                                            required
                                            type="text"
                                            name="last_name"
                                            value={this.state.signupData.last_name}
                                            onChange={this.onChangehandler}
                                        />
                                        <span className="placeholder">  Last Name  </span>
                                    </div>
                                    <span className="text-danger">{this.state.errMsg.last_name}</span>
                                </div>
                                <div className="mb-3 position-relative">
                                    <label htmlFor="exampleInputEmail1" className="field__label">Email address
                                        <strong className="text-danger" > *</strong></label>
                                    <div className="position-relative input-block">
                                        <input
                                            className="form-control"
                                            required
                                            type="email"
                                            name="email"
                                            value={this.state.signupData.email}
                                            onChange={this.onChangehandler}
                                        />
                                        <span className="placeholder">  Email Address  </span>
                                    </div>
                                    <span className="text-danger">{this.state.errMsg.email}</span>
                                    <div id="emailHelp" className="form-text">We&apos;ll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3 position-relative">
                                    <label htmlFor="exampleInputEmail1" className="field__label">Phone</label>
                                    <div className="position-relative input-block">
                                        <input
                                            className="form-control"
                                            required
                                            type='number'
                                            min="0"
                                            name="phone"
                                            // onKeyPress="return isNumberKey(event)"
                                            value={this.state.signupData.phone}
                                            onChange={this.onChangehandler}
                                        />
                                        <span className="placeholder">  Phone  </span>
                                    </div>
                                    {this.state.errMsgphone && <span className="text-danger">{this.state.errMsgphone}</span>}
                                    <span className="text-danger">{this.state.errMsg.phone}</span>
                                </div>
                                <div className="mb-3 position-relative">
                                    <label htmlFor="exampleInputEmail1" className="field__label">Company Name
                                        <strong className="text-danger" > *</strong></label>
                                    <div className="position-relative input-block">
                                        <input
                                            className="form-control"
                                            required
                                            type="text"
                                            name="company_name"
                                            value={this.state.signupData.company_name}
                                            onChange={this.onChangehandler}
                                        />
                                        <span className="placeholder">  Company Name  </span>
                                    </div>
                                    <span className="text-danger">{this.state.errMsg.company_name}</span>

                                </div>
                                <div className="mb-3 position-relative">
                                    <label htmlFor="exampleInputPassword1" className="field__label">Password
                                        <strong className="text-danger" > *</strong></label>
                                    <div className="position-relative">
                                        <div className="position-relative input-block">
                                            <input
                                                className="form-control"
                                                required
                                                type={this.state.showPassword ? "text" : "password"}
                                                name="password"
                                                value={this.state.signupData.password}
                                                onChange={this.onChangehandler}
                                            />
                                            <span className="placeholder">  Password  </span>
                                        </div>
                                        {this.state.showPassword ?
                                            <span className="fa-eye-pass"> <i onClick={() => this.showPassword()} className="fas fa-eye-slash"></i> </span>
                                            :
                                            <span className="fa-eye-pass"> <i onClick={() => this.showPassword()} className="fas fa-eye"></i> </span>
                                        }
                                    </div>
                                    <span className="text-danger">{this.state.errMsg.password}</span>
                                    {this.state.errMsgPassword && <span className="text-danger">{this.state.errMsgPassword}</span>}
                                </div>
                                <div className="mb-3 position-relative">
                                    <div className=" position-relative">
                                        <label htmlFor="exampleInputPassword1" className="field__label">Confirm Password
                                            <strong className="text-danger" > *</strong></label>
                                        <div className="position-relative input-block">
                                            <input
                                                className="form-control"
                                                type={this.state.Cofirm_showPassword ? "text" : "password"}
                                                name="c_password"
                                                value={this.state.signupData.c_password}
                                                onChange={this.onChangehandler}
                                                required
                                            />
                                            <span className="placeholder">  Confirm Password  </span>
                                        </div>
                                        {this.state.Cofirm_showPassword ?
                                            <span className="fa-eye-pass"> <i onClick={() => this.Cofirm_showPassword()} className="fas fa-eye-slash"></i> </span>
                                            :
                                            <span className="fa-eye-pass"> <i onClick={() => this.Cofirm_showPassword()} className="fas fa-eye"></i> </span>
                                        }
                                    </div>
                                    <span className="text-danger">{this.state.errMsg.password_confirmation}</span>
                                    {this.state.errMsgCPassword && <span className="text-danger">{this.state.errMsgCPassword}</span>}
                                </div>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className="form-check">
                                        <div className="position-relative input-block"></div>
                                        <Input
                                            className="form-check-input"
                                            type="checkbox"
                                            value="lsRememberMe"
                                            id="rememberMe"
                                            onChange={this.handleRemember}
                                            checked={this.state.checked}
                                        />

                                        <label className="form-check-label ms-1" htmlFor="exampleCheck1">I accept the terms and conditions</label>
                                        <br /> <span className="text-danger">{this.state.errMsg.accept_tnc}</span>

                                    </div>

                                </div>
                                <div className="mb-3 position-relative text-center my-4 d-flex flex-column">
                                    <div className="justify-content-center d-flex">
                                        <ReCAPTCHA
                                            // sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                            sitekey="6Lffmf4eAAAAAGudVgXC823mWt_Naqin6HmAR0Ns"
                                            onChange={this.handleCaptch}
                                        />
                                    </div>
                                    <div className="">
                                        <span className="text-danger">{this.state.errMsg.recaptch}</span>
                                    </div>
                                </div>

                                <div className='d-grid gap-2 mt-4'>
                                    <Button
                                        type="submit"
                                        color=""
                                        className="btn btn__primary  btn-block rounded-pill mx-4"
                                    >
                                        Sign Up
                                    </Button>
                                </div>
                                <p className='text-center'>Already have an account? <Link to="/" className='text-primary fw-bold'> Sign In </Link> </p>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
