import React, { Component } from "react";
import axios from "axios";
import { APIURL } from "../../Constant/common";
import { Modal, ModalBody, ModalHeader, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";

import ReCAPTCHA from "react-google-recaptcha";
export default class PackagePlans extends Component {
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

            },
            checked: false,
            msg: "",
            errMsg: {},
            scsMsg: "",
            redirect: false,
            isLoading: false,
            fullscrLoader: true,
            showPassword: false,
            Cofirm_showPassword: false,
            captchaToken: false,
            CaptchaErrMsg: "",
            AcceptTnc: "",
            signUpModal: false,
            SubPlanData: [],
            packageId: "",

        };
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleCaptch = this.handleCaptch.bind(this);
        this.handleRemember = this.handleRemember.bind(this);
        // this.signUpModal = this.signUpModal.bind(this);
    }

    signUpModal(data) {
        this.setState({
            packageId: data.id,
            signUpModal: true,
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
        });
    }
    closeModal = () => {
        this.setState({
            signUpModal: false
        });
    };

    onChangehandler = (e) => {
        const { signupData } = this.state;
        signupData[e.target.name] = e.target.value;
        this.setState({ signupData, errMsg: "" });
        console.log(signupData);
    };

    handleCaptch(value) {
        console.log("Captcha value:", value);
        this.setState({
            captchaToken: value
        });
    }
    handleRemember(e) {
        this.setState({
            checked: e.target.checked,
        });
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        this.setState({
            isLoading: true,
        });
        if (this.state.captchaToken && this.state.checked) {
            window.scrollTo(0, 0);
            const { signupData } = this.state;
            const formData = new FormData();
            formData.append("first_name", signupData.name);
            formData.append("last_name", signupData.last_name);
            formData.append("phone", signupData.phone);
            formData.append("email", signupData.email);
            formData.append("password", signupData.password);
            formData.append("password_confirmation", signupData.c_password);
            formData.append("company_name", signupData.company_name);
            formData.append("accept_tnc", this.state.checked);
            formData.append("package_id", this.state.packageId);
            this.setState({
                isLoading: true,
                signUpModal: true
            });
            axios
                .post(APIURL + "register", formData)
                .then((response) => {
                    // console.log("register", response.data.accountVerified)
                    this.setState({
                        scsMsg: response.data.message,
                        isLoading: false,
                    }, () => {
                        //  this.SignUpSuccess(this.state.scsMsg)
                    });
                    setTimeout(() => {
                        if (response.data.url !== "") {
                            window.location.href = response.data.url;
                        }
                    }, 1000);
                    localStorage.setItem("accountVerified", response.data.accountVerified);
                    setTimeout(() => this.setState({
                        redirect: true,
                        signUpModal: false
                    }), 5000);
                })
                .catch(error => {
                    this.setState({
                        isLoading: false,
                        redirect: false,
                        errMsg: error.response.data.error,
                    });

                });
        } else {
            if (!this.state.captchaToken) {
                this.setState({
                    CaptchaErrMsg: "Please Verify Captcha"
                });
            }
            if (!this.state.checked) {
                this.setState({
                    AcceptTnc: "Accept Terms And condition"
                });
            }
        }
    };

    getSubscriptionPlan = () => {
        // console.log("sbh", this.state.user);
        this.setState({
            isLoading: true,
        });
        var token = this.state.token;
        const formData = new FormData();
        axios
            .get(APIURL + "get-subscription-plan", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("response", response.data.data);
                this.setState({
                    SubPlanData: response.data.data,
                    isLoading: false

                });

            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.errors,
                    Loader: false
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
        this.getSubscriptionPlan();
        document.addEventListener("mousedown", this.handleClickOutside);
        window.scrollTo(0, 0);
        setTimeout(() => this.setState({ fullscrLoader: "" }), 500);
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

        return (
            <>
                {this.state.isLoading && <div className="isLoading"><Spinner color="dark" type="border" >Loading...</Spinner></div>}
                <div className="plans-packages">
                    <section className="pricing-plans">
                        <div className="home-heading text-center">
                            <h3>pricing plans</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                        </div>


                        <div className="container">
                            <div className="pricing-tables row">
                                {
                                    this.state.SubPlanData.length > 0 ? this.state.SubPlanData.map((item, index) =>
                                        <div key={index} className="col-md-3 col-12">
                                            <div className="pricing-plan">
                                                {/* <div class="featured-ribbon">Best Value</div> */}
                                                <h2 className="plan-title">{item.name}</h2>
                                                <div className="plan-cost">
                                                    <p className="plan-price">${item.price}</p>
                                                    <span>/</span>
                                                    <p className="plan-type">Monthly</p>
                                                </div>
                                                <ul className="plan-features">
                                                    {item.specifications.map((sItem, idx) =>
                                                        <li key={idx}>{sItem.name}</li>
                                                    )}
                                                </ul>
                                                <Link onClick={this.signUpModal.bind(this, item)} className="btn_2 btn__primary mx-3 mt-3" href="">Select Plan</Link>
                                            </div>
                                        </div>
                                    ) :
                                        ""
                                }
                            </div>
                        </div>
                    </section>
                    <Modal size="md" isOpen={this.state.signUpModal} toggle={() => this.closeModal()} >
                        <ModalHeader className="header-less ml-3 h4" toggle={() => this.closeModal()}>
                            Sign Up
                        </ModalHeader>
                        <ModalBody className="border-0">
                            <form className='' onSubmit={(e) => this.onSubmitHandler(e)}>
                                <div className="mb-3 position-relative">
                                    <label htmlFor="exampleInputEmail1" className="field__label">First Name
                                        <strong className="text-danger" > *</strong></label>
                                    <input
                                        autoFocus={true}
                                        className="field__input"
                                        
                                        type="text"
                                        name="name"
                                        placeholder="First Name"
                                        value={this.state.signupData.name}
                                        onChange={this.onChangehandler}
                                    />
                                    <span className="text-danger">{this.state.errMsg.first_name}</span>
                                </div>
                                <div className="mb-3 position-relative">
                                    <label htmlFor="exampleInputEmail1" className="field__label">Last Name
                                        <strong className="text-danger" > *</strong></label>
                                    <input
                                        className="field__input"
                                        
                                        type="text"
                                        name="last_name"
                                        placeholder="Last Name"
                                        value={this.state.signupData.last_name}
                                        onChange={this.onChangehandler}
                                    />
                                    <span className="text-danger">{this.state.errMsg.last_name}</span>
                                </div>
                                <div className="mb-3 position-relative">
                                    <label htmlFor="exampleInputEmail1" className="field__label">Email address
                                        <strong className="text-danger" > *</strong></label>
                                    <input
                                        className="field__input"
                                        
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={this.state.signupData.email}
                                        onChange={this.onChangehandler}
                                    />
                                    <span className="text-danger">{this.state.errMsg.email}</span>
                                    <div id="emailHelp" className="form-text">We&apos;ll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3 position-relative">
                                    <label htmlFor="exampleInputEmail1" className="field__label">Phone</label>
                                    <input
                                        className="field__input"
                                        
                                        type="tel"
                                        min="0"
                                        name="phone"
                                        onKeyPress="return isNumberKey(event)"
                                        placeholder="Phone Number"
                                        value={this.state.signupData.phone}
                                        onChange={this.onChangehandler}
                                    />
                                </div>
                                <div className="mb-3 position-relative">
                                    <label htmlFor="exampleInputEmail1" className="field__label">Company Name
                                        <strong className="text-danger" > *</strong></label>
                                    <input
                                        className="field__input"
                                        
                                        type="text"
                                        name="company_name"
                                        placeholder="Company Name"
                                        value={this.state.signupData.company_name}
                                        onChange={this.onChangehandler}
                                    />
                                    <span className="text-danger">{this.state.errMsg.company_name}</span>
                                </div>
                                <div className="mb-3 position-relative">
                                    <label htmlFor="exampleInputPassword1" className="field__label">Password
                                        <strong className="text-danger" > *</strong></label>
                                    <input
                                        className="field__input"
                                        
                                        type={this.state.showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Password"
                                        value={this.state.signupData.password}
                                        onChange={this.onChangehandler}
                                    />
                                    {this.state.showPassword ?
                                        <span className="fa-eye-pass"> <i onClick={() => this.showPassword()} className="fas fa-eye-slash"></i> </span>
                                        :
                                        <span className="fa-eye-pass"> <i onClick={() => this.showPassword()} className="fas fa-eye"></i> </span>
                                    }
                                    <span className="text-danger">{this.state.errMsg.password}</span>
                                </div>
                                <div className="mb-3 position-relative">
                                    <label htmlFor="exampleInputPassword1" className="field__label">Confirm Password
                                        <strong className="text-danger" > *</strong></label>
                                    <input
                                        className="field__input"
                                        
                                        type={this.state.Cofirm_showPassword ? "text" : "password"}
                                        name="c_password"
                                        placeholder="Confirm Password"
                                        value={this.state.signupData.c_password}
                                        onChange={this.onChangehandler}
                                    />
                                    {this.state.Cofirm_showPassword ?
                                        <span className="fa-eye-pass"> <i onClick={() => this.Cofirm_showPassword()} className="fas fa-eye-slash"></i> </span>
                                        :
                                        <span className="fa-eye-pass"> <i onClick={() => this.Cofirm_showPassword()} className="fas fa-eye"></i> </span>
                                    }
                                    <span className="text-danger">{this.state.errMsg.password_confirmation}</span>
                                </div>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className="form-check">
                                        <Input
                                            className="form-check-input"
                                            type="checkbox"
                                            value="lsRememberMe"
                                            id="rememberMe"
                                            onChange={this.handleRemember}
                                            checked={this.state.checked}
                                        />
                                        <label className="form-check-label ms-1" htmlFor="exampleCheck1">I accept the terms and conditions</label>
                                        <br /><span className="text-danger">{this.state.AcceptTnc}</span>

                                    </div>
                                </div>
                                <div className="mb-3 position-relative text-center my-4 justify-content-center d-flex">
                                    <ReCAPTCHA
                                        sitekey="6Lffmf4eAAAAAGudVgXC823mWt_Naqin6HmAR0Ns"
                                        onChange={this.handleCaptch}
                                    />
                                </div>
                                <span className="text-danger">{this.state.CaptchaErrMsg}</span>
                                {this.state.scsMsg ? <div className="alert alert-success" role="alert">
                                    {this.state.scsMsg}
                                </div> : ""}
                                <div className='d-grid gap-2 mt-4'>
                                    <Button
                                        type="submit"
                                        color=""
                                        className="btn_2 btn__primary  btn-block rounded-pill w-100 mx-4"
                                    >
                                        Sign Up
                                    </Button>
                                </div>
                                {/* <p className='text-center'>Already have an account? <Link to="/" className='text-primary fw-bold'> Sign In </Link> </p> */}
                            </form>
                        </ModalBody>
                    </Modal>
                </div>
            </>
        );
    }
}
