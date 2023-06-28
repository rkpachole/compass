/* eslint-disable linebreak-style */
import React, { Component } from "react";
import { Button } from "reactstrap";
import axios from "axios";
import { APIURL } from "../../../../Constant/common";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import Navbar from "../../../Layout/Navbar/Index";
import RightSidebar from "../../../Layout/RightSidebar/Index";
import CompassMenu from "../../../Layout/CompassMenuBar";


export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RotationDegree: 0,
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            userInfo: {
                email: "",
                Current_password: "",
                newPassword: "",
                confirm_passwoard: ""
            },
            showPassword: false,
            New_showPassword: false,
            Cofirm_showPassword: false,
            errMsg: {},
            scsMsg: "",
            redirect: false,

        };
    }

    onChangehandler = (e) => {
        console.log(e.target.value);
        const { userInfo } = this.state;
        userInfo[e.target.name] = e.target.value;
        console.log(userInfo);
        this.setState({
            userInfo,
            errMsg: ""
        });

    };


    onSubmitHandler = (e) => {
        e.preventDefault();
        const { userInfo } = this.state;
        var token = this.state.token;
        const formData = new FormData();
        formData.append("current_password", userInfo.Current_password);
        formData.append("password", userInfo.newPassword);
        formData.append("confirm_password", userInfo.confirm_passwoard);
        formData.append("email", userInfo.email);
        this.setState({ Loader: true });
        axios
            .post(APIURL + "change-password/update", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({ Loader: false });
                this.setState({
                    scsMsg: response.data.message,
                });
                setTimeout(() => localStorage.removeItem("userData"), 3000);
                setTimeout(() => this.setState({ scsMsg: "", redirect: true }), 3000);
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false
                });
                setTimeout(() => this.setState({ errMsg: "" }), 4000);
            });
    };


    showPassword() {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    New_showPassword() {
        this.setState({
            New_showPassword: !this.state.New_showPassword
        });
    }
    Cofirm_showPassword() {
        this.setState({
            Cofirm_showPassword: !this.state.Cofirm_showPassword
        });
    }
    calcAngleDegrees(e) {
        this.setState({
            RotationDegree: (180 * e.clientX) / screen.width
        });
    }
    componentDidMount() {
        this.setState({
            userInfo: {
                email: this.state.user.email,
                Current_password: "",
                newPassword: "",
                confirm_passwoard: ""
            },
        });
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />;
        }
        return (
            <div onMouseOver={(e) => this.calcAngleDegrees(e)}>
                <Navbar activePage="change_password" />
                <div className='page'>
                    <div className='page__wrapper'>
                        <div className='page__center container-fluid'>
                            <div className='row'>
                                <div className='col-12 col-md-12 col-lg-12 col-xl-9'>
                                    <div className=''>
                                        <div className='page__wrapper-conten'>
                                            <div className='page__content page__content_pt64'>
                                                <div className='page__stat'>
                                                    <div className="page__heading"> <h4>Change Password</h4> </div>
                                                    <div className='profile-apge'>
                                                        <form noValidate onSubmit={(e) => this.onSubmitHandler(e)}>
                                                            {this.state.scsMsg ? <div className="alert alert-success" role="alert">
                                                                {this.state.scsMsg}
                                                            </div> : ""}
                                                            {this.state.errMsg.message ? <div className="alert alert-danger" role="alert">
                                                                {this.state.errMsg.message}
                                                            </div> : ""}
                                                            <div className="row">

                                                                <div className="mb-3 col-sm-6 col-12">
                                                                    <label htmlFor="exampleInputEmail1" className="field__label">Email address
                                                                        <strong className="text-danger" > *</strong>
                                                                    </label>
                                                                    <div className="input-block">
                                                                        <input
                                                                            disabled
                                                                            className="form-control"
                                                                            type="email"
                                                                            name="email"
                                                                            placeholder="Email Address"
                                                                            value={this.state.userInfo.email}
                                                                            onChange={this.onChangehandler}
                                                                            required
                                                                        />
                                                                        <span className="placeholder">Email Address</span>
                                                                    </div>
                                                                    <span className="text-danger">{this.state.errMsg.email}</span>
                                                                </div>
                                                                <div className="mb-3 col-sm-6 col-12">
                                                                    <div className="position-relative">
                                                                        <label htmlFor="exampleInputEmail1" className="field__label">Current Password
                                                                            <span className="text-danger"> *</span></label>
                                                                        <div className="input-block">
                                                                            <input
                                                                                className="form-control"
                                                                                type={this.state.showPassword ? "text" : "password"}
                                                                                name="Current_password"
                                                                                value={this.state.userInfo.Current_password}
                                                                                onChange={this.onChangehandler}
                                                                                required
                                                                            />
                                                                            <span className="placeholder">Current Password</span>
                                                                            {this.state.showPassword ?
                                                                                <span className="fa-eye-pass"> <i onClick={() => this.showPassword()} className="fas fa-eye-slash"></i> </span>
                                                                                :
                                                                                <span className="fa-eye-pass"> <i onClick={() => this.showPassword()} className="fas fa-eye"></i> </span>
                                                                            }
                                                                        </div>
                                                                        <span className="text-danger">{this.state.errMsg.current_password}</span>

                                                                    </div>
                                                                </div>
                                                                <div className="mb-3 col-sm-6 col-12">
                                                                    <div className="position-relative">
                                                                        <label htmlFor="exampleInputPassword1" className="field__label">New Password
                                                                            <span className="text-danger"> *</span></label>
                                                                        <div className="input-block">
                                                                            <input
                                                                                className="form-control"
                                                                                type={this.state.New_showPassword ? "text" : "password"}
                                                                                name="newPassword"
                                                                                value={this.state.userInfo.newPassword}
                                                                                onChange={this.onChangehandler}
                                                                                required
                                                                            />
                                                                            <span className="placeholder">New Password</span>
                                                                            {this.state.New_showPassword ?
                                                                                <span className="fa-eye-pass"> <i onClick={() => this.New_showPassword()} className="fas fa-eye-slash"></i> </span>
                                                                                :
                                                                                <span className="fa-eye-pass"> <i onClick={() => this.New_showPassword()} className="fas fa-eye"></i> </span>
                                                                            }
                                                                        </div>
                                                                        <span className="text-danger">{this.state.errMsg.password}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="mb-3 col-sm-6 col-12">
                                                                    <div className="position-relative">
                                                                        <label htmlFor="exampleInputPassword1" className="field__label">Confirm Password
                                                                            <span className="text-danger"> *</span></label>
                                                                        <div className="input-block">
                                                                            <input
                                                                                className="form-control"
                                                                                type={this.state.Cofirm_showPassword ? "text" : "password"}
                                                                                name="confirm_passwoard"
                                                                                value={this.state.userInfo.confirm_passwoard}
                                                                                onChange={this.onChangehandler}
                                                                                required
                                                                            />
                                                                            <span className="placeholder">Confirm Password</span>
                                                                            {this.state.Cofirm_showPassword ?
                                                                                <span className="fa-eye-pass"> <i onClick={() => this.Cofirm_showPassword()} className="fas fa-eye-slash"></i> </span>
                                                                                :
                                                                                <span className="fa-eye-pass"> <i onClick={() => this.Cofirm_showPassword()} className="fas fa-eye"></i> </span>
                                                                            }
                                                                        </div>
                                                                        <span className="text-danger">{this.state.errMsg.confirm_password}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-4 mt-5">
                                                                    <Button color="primary" className="btn_2 btn__primary w-100 btn-block rounded-pill p-3">
                                                                        Submit
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <CompassMenu MenuBar={true} RotationDegree={this.state.RotationDegree} />
                                </div>
                                <RightSidebar />
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        );
    }
}


Index.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string
        })
    })
};