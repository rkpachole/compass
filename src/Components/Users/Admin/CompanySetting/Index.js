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
            company_name: "",
            email: "",
            phone: "",
            address: "",
            website_url: "",
            errMsg: "",
            scsMsg: "",
            Loader: false,
            isLoading: true,
        };
    }

    componentDidMount() {
        this.getCompanyDetail();

    }
    onChangeEmail = (e) => {
        this.setState({
            email: e,
        });
    };
    onChangeWebsite = (e) => {
        this.setState({
            website_url: e,
        });
    };
    onChangeAddress = (e) => {
        this.setState({
            address: e !== null ? e : "",
        });
    };
    handlephone = (e) => {
        this.setState({
            phone: e
        });
    };
    onChangeCompany = (e) => {
        this.setState({
            company_name: e
        });
    };
    getCompanyDetail() {
        if (this.state.user) {
            this.setState({
                isLoading: true,
            });
            const formData = new FormData();
            formData.append("account_id", this.state.user.account_id);
            var token = this.state.token;
            var app_url = APIURL + "admin/edit-company-setting";
            axios
                .post(app_url, formData, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then((response) => {
                    const info = response.data.data;
                    console.log("companyDetail", response.data.data);
                    this.setState({
                        isLoading: false,
                        company_name: info.company_name,
                        email: info.email,
                        phone: info.phone,
                        address: info.address,
                        website_url: info.website_url === "null" ? "" : info.website_url
                    });

                })
                .catch((error) => {
                    this.setState({
                        errMsg: error.response.data.errors,
                        Loader: false
                    });
                });
        }
    }
    onSubmitHandler = (e) => {
        e.preventDefault();
        // const { userInfo } = this.state;
        var token = this.state.token;
        const formData = new FormData();
        formData.append("account_id", this.state.user.account_id);
        formData.append("company_name", this.state.company_name);
        formData.append("phone", this.state.phone);
        formData.append("email", this.state.email);
        formData.append("address", this.state.address);
        formData.append("website_url", this.state.website_url);
        this.setState({ Loader: true });
        axios
            .post(APIURL + "admin/update-company-setting", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({ Loader: false });
                this.setState({
                    scsMsg: response.data.message,
                });
                setTimeout(() => this.setState({ scsMsg: "" }), 3000);
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false
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
                {this.state.isLoading && <div className="loader"><Spinner color="dark" type="border" >Loading...</Spinner></div>}

                <Navbar activePage="setting" />
                <div className='page' activepage="Search">
                    <div className='page__wrapper'>
                        <div className='page__center container-fluid'>
                            <div className='row'>
                                <div className='col-12 col-md-12 col-lg-12 col-xl-9'>
                                    <div className=''>
                                        <div className='page__wrapper-conten'>
                                            <div className='page__content page__content_pt64'>
                                                <div className='page__stat'>
                                                    <div className="page__heading"> <h4>Company Setting</h4> </div>
                                                    <div className='profile-apge'>
                                                        <form noValidate onSubmit={(e) => this.onSubmitHandler(e)}>
                                                            {this.state.scsMsg ? <div className="alert alert-success" role="alert">
                                                                {this.state.scsMsg}
                                                            </div> : ""}
                                                            {this.state.errMsg.message ? <div className="alert alert-success" role="alert">
                                                                {this.state.errMsg.message}
                                                            </div> : ""}

                                                            <div className="row">
                                                                <div className="mb-3 col-sm-6 col-12">
                                                                    <label htmlFor="exampleInputEmail1" className="field__label">Company Name
                                                                        <strong className="text-danger" > *</strong></label>
                                                                    <div className="input-block">
                                                                        <input
                                                                            type="text"
                                                                            name=""
                                                                            className="form-control" required
                                                                            value={this.state.company_name}
                                                                            onChange={(e) => this.onChangeCompany(e.target.value)} />
                                                                        <span className="placeholder">Company Name</span>
                                                                    </div>
                                                                    <span className="text-danger">{this.state.errMsg.company_name}</span>
                                                                </div>
                                                                <div className="mb-3 col-sm-6 col-12">
                                                                    <label htmlFor="exampleInputEmail1" className="field__label">Email
                                                                        <strong className="text-danger" > *</strong> </label>
                                                                    <div className="input-block">
                                                                        <input
                                                                            disabled
                                                                            type="email"
                                                                            className="form-control"
                                                                            required
                                                                            value={this.state.email}
                                                                            onChange={(e) => this.onChangeEmail(e.target.value)} />
                                                                        <span className="placeholder"> Email </span>
                                                                    </div>
                                                                    <span className="text-danger">{this.state.errMsg.email}</span>
                                                                </div>
                                                                <div className="mb-3 col-sm-6 col-12">
                                                                    <label htmlFor="exampleInputEmail1" className="field__label"> Phone <strong className="text-danger" > *</strong></label>
                                                                    <div className="input-block">
                                                                        <input
                                                                            type="number"
                                                                            className="form-control" required
                                                                            value={this.state.phone}
                                                                            onChange={(e) => this.handlephone(e.target.value)} />
                                                                        <span className="placeholder">Phone</span>
                                                                    </div>
                                                                    <span className="text-danger">{this.state.errMsg.phone}</span>
                                                                </div>

                                                                <div className="mb-3 col-sm-6 col-12">
                                                                    <label htmlFor="exampleInputEmail1" className="field__label"> Website URL <strong className="text-danger" > *</strong></label>
                                                                    <div className="input-block">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control" required
                                                                            value={this.state.website_url}
                                                                            onChange={(e) => this.onChangeWebsite(e.target.value)} />
                                                                        <span className="placeholder">Website URL</span>
                                                                    </div>
                                                                    <span className="text-danger">{this.state.errMsg.website_url}</span>
                                                                </div>
                                                                <div className="mb-3 col-sm-6 col-12">
                                                                    <label htmlFor="exampleInputEmail1" className="field__label"> Address</label>
                                                                    <div className="input-block">
                                                                        <textarea
                                                                            type="text"
                                                                            className="form-control" required
                                                                            value={this.state.address}
                                                                            onChange={(e) => this.onChangeAddress(e.target.value)}
                                                                            rows="3"
                                                                        >
                                                                        </textarea>
                                                                        <span className="placeholder">Address</span>
                                                                    </div>
                                                                    {/* 
                                                                        <input
                                                                            placeholder="Address"
                                                                            type="text"
                                                                            className="form-control" required
                                                                            value={this.state.address}
                                                                            onChange={(e) => this.onChangeAddress(e.target.value)} /> */}

                                                                </div>
                                                                <div className="">
                                                                    <div className="col-3 mt-5">
                                                                        <button className="btn_2 btn__primary w-100 btn-block rounded-pill p-3">
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
                                    <CompassMenu RotationDegree={this.state.RotationDegree} />
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
