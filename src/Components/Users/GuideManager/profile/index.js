/* eslint-disable linebreak-style */
import React, { Component } from "react";
import axios from "axios";
import { APIURL } from "../../../../Constant/common";
import Navbar from "../../../Layout/Navbar/Index";
import RightSidebar from "../../../Layout/RightSidebar/Index";
import CompassMenu from "../../../Layout/CompassMenuBar";
import { Spinner } from "reactstrap";

export default class profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RotationDegree:0,
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            first_name: "",
            last_name: "",
            email: "",
            errMsg: "",
            scsMsg: "",
            isLoading: false,
        };
    }

    componentDidMount() {
        this.getProfileInfo();
    }
    onChangeEmail = (e) => {
        this.setState({
            email: e,
        });
    };
    onChangeFname = (e) => {
        this.setState({
            first_name: e,
        });
    };
    onChangeLname = (e) => {
        this.setState({
            last_name: e,
        });
    };
    getProfileInfo() {
        if (this.state.user) {
            // console.log("sbh", this.state.user)
            this.setState({
                isLoading: true
            });
            const formData = new FormData();
            formData.append("user_id", this.state.user.user_id);
            var token = this.state.token;
            var app_url = APIURL + "guide-manager/edit-profile";
            axios
                .post(app_url, formData, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then((response) => {
                    const info = response.data.data;
                    console.log("first_name", response.data.data);
                    this.setState({
                        isLoading: false,
                        company_name: info.company_name,
                        phone: info.phone,

                        first_name: info.first_name,
                        last_name: info.last_name,
                        email: info.email,
                    });

                })
                .catch((error) => {
                    this.setState({
                        errMsg: error.response.data.errors,
                        isLoading: false
                    });
                });
        }
    }
    onSubmitHandler = (e) => {
        e.preventDefault();
        // const { userInfo } = this.state;
        this.setState({
            isLoading: true,
            Loader: true,
        });
        var token = this.state.token;
        const formData = new FormData();
        formData.append("user_id", this.state.user.user_id);
        formData.append("first_name", this.state.first_name);
        formData.append("last_name", this.state.last_name);
        formData.append("email", this.state.email);
        this.setState({ isLoading: true });
        axios
            .post(APIURL + "guide-manager/update-profile", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    isLoading: false,
                    Loader: false
                });
                this.setState({
                    scsMsg: response.data.message,
                });
                setTimeout(() => this.setState({ scsMsg: "" }), 3000);

            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    isLoading: false,
                    Loader: false,
                });
                setTimeout(() => this.setState({ errMsg: "" }), 4000);
            });
    };
    calcAngleDegrees(e) {
        this.setState({
            RotationDegree: (180 * e.clientX) / screen.width
        });
    }

    render() {
        return (
            <div onMouseOver={(e) => this.calcAngleDegrees(e)}>
                <Navbar activePage="profile" />
                {this.state.isLoading && <div className="loader"><Spinner color="dark" type="border" >Loading...</Spinner></div>}
                <div className='page'>
                    <div className='page__wrapper'>
                        <div className='page__center container-fluid'>
                            <div className='row'>
                                <div className='col-12 col-md-12 col-lg-12 col-xl-9'>
                                    <div className=''>
                                        <div className='page__wrapper-conten'>
                                            <div className='page__content page__content_pt64'>
                                                <div className='page__stat'>
                                                    <div className="page__heading"> <h4>Profile</h4> </div>
                                                    <div className='profile-apge'>

                                                        <form noValidate onSubmit={(e) => this.onSubmitHandler(e)}>
                                                            {this.state.scsMsg ? <div className="alert alert-success" role="alert">
                                                                {this.state.scsMsg}
                                                            </div> : ""}

                                                            <div className="row">
                                                                <div className="mb-3 col-sm-6 col-12">
                                                                    <label htmlFor="exampleInputEmail1" className="field__label">First Name
                                                                        <strong className="text-danger" > *</strong></label>
                                                                    <div className="input-block">
                                                                        <input type="text" name="" className="form-control"
                                                                            value={this.state.first_name}
                                                                            onChange={(e) => this.onChangeFname(e.target.value)} required />
                                                                        <span className="placeholder">First Name</span>
                                                                    </div>
                                                                    {this.state.errMsg && <span className="text-danger">{this.state.errMsg.first_name}</span>}
                                                                </div>
                                                                <div className="mb-3 col-sm-6 col-12">
                                                                    <label htmlFor="exampleInputEmail1" className="field__label">Last Name
                                                                        <strong className="text-danger" > *</strong></label>
                                                                    <div className="input-block">
                                                                        <input type="text" name="" className="form-control"
                                                                            value={this.state.last_name}
                                                                            onChange={(e) => this.onChangeLname(e.target.value)} required />
                                                                        <span className="placeholder">Last Name</span>
                                                                    </div>
                                                                    {this.state.errMsg && <span className="text-danger">{this.state.errMsg.last_name}</span>}
                                                                </div>
                                                                <div className="mb-3 col-sm-6 col-12">
                                                                    <label htmlFor="exampleInputEmail1" className="field__label">Email Address
                                                                        <strong className="text-danger" > *</strong></label>

                                                                    <div className="input-block">
                                                                        <input disabled type="email" className="form-control"
                                                                            value={this.state.email}
                                                                            onChange={(e) => this.onChangeEmail(e.target.value)} required />
                                                                        {/* <span className="placeholder">Email Address</span> */}
                                                                    </div>
                                                                    {this.state.errMsg && <span className="text-danger">{this.state.errMsg.email}</span>}
                                                                </div>
                                                                <div className="">
                                                                    <div className="col-4 mt-5">
                                                                        <button className="btn_2 btn__primary w-100 btn-block rounded-pill p-3"
                                                                        >
                                                                            Submit
                                                                        </button>
                                                                    </div>
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
                </div>
            </div>
        );
    }
}
