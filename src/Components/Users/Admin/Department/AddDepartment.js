/* eslint-disable linebreak-style */
import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { APIURL } from "../../../../Constant/common";
import { Button } from "reactstrap";
// import Pagination from "react-js-pagination";
import Navbar from "../../../Layout/Navbar/Index";
import RightSidebar from "../../../Layout/RightSidebar/Index";
import CompassMenu from "../../../Layout/CompassMenuBar";
import { Spinner } from "reactstrap";

export default class AddDepartment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RotationDegree: 0,
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            DepartmentName: "",
            description: "",
            search: "",
            errMsg: "",
            isLoading: false,
        };

    }
    addDepartment = (e) => {
        e.preventDefault();
        this.setState({ isLoading: true });
        var token = this.state.token;
        const formData = new FormData();
        formData.append("name", this.state.DepartmentName);
        formData.append("description", this.state.description ? this.state.description : "");
        this.setState({ Loader: true });
        axios
            .post(APIURL + "admin/add-department", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    isLoading: false,
                    scsMsg: response.data.message,
                    errMsg: ""
                }, () => {
                    setTimeout(() =>
                        this.setState({
                            scsMsg: "",
                            redirect: true
                        }), 3000);
                });
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false,
                    isLoading: false
                });
            });
    };
    calcAngleDegrees(e) {
        this.setState({
            RotationDegree: (180 * e.clientX) / screen.width
        });
    }
    componentDidMount() {
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/admin/department" />;
        }
        if (!this.state.user) {
            return <Redirect to="/" />;
        }
        if (this.state.user && this.state.user.user_type !== "Admin") {
            return <Redirect to="/" />;
        }
        const { DepartmentName, description } = this.state;
        return (
            <div onMouseOver={(e) => this.calcAngleDegrees(e)}>
                {this.state.isLoading && <div className="loader"><Spinner color="dark" type="border" >Loading...</Spinner></div>}
                <Navbar activePage="profile" />
                <div className='page'>
                    <div className='page__wrapper'>
                        <div className='page__center container-fluid'>
                            <div className='row'>
                                <div className='col-12 col-md-12 col-lg-12 col-xl-9'>
                                    <div className=''>
                                        <div className='page__wrapper-conten'>
                                            <div className='page__content page__content_pt64'>
                                                <div className='page__stat'>
                                                    <div className="page__title h4 mt-0 d-flex align-items-center"><Link className="back-btn" to="/admin/department"><i className="fas fa-angle-left"></i></Link> Add Department </div>
                                                    {/* <div className="page__heading"> <h4>Add Department </h4> </div> */}
                                                    {this.state.scsMsg ? <div className="alert alert-success" role="alert">
                                                        {this.state.scsMsg}
                                                    </div> : ""}
                                                    <div className='profile-apge'>
                                                        <form noValidate className='' onSubmit={(e) => this.addDepartment(e)} >
                                                            <div className="row">
                                                                <div className="mb-3 col-sm-6 col-12">
                                                                    <label htmlFor="exampleInputEmail1" className="field__label">Department Name <strong className="text-danger" > *</strong></label>
                                                                    <div className="input-block">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            aria-describedby="emailHelp"
                                                                            value={DepartmentName}
                                                                            onChange={(e) => this.setState({ DepartmentName: e.target.value })}
                                                                            required
                                                                        />
                                                                        <span className="placeholder">Department Name</span>
                                                                    </div>
                                                                    {this.state.errMsg && <span className="text-danger">{this.state.errMsg.name}</span>}
                                                                </div>
                                                                <div className="mb-3 col-sm-12 col-12">
                                                                    <label htmlFor="exampleInputEmail1" className="field__label">Description (The maximum length of a description is 100 words) <strong className="text-danger" > *</strong></label>
                                                                    <div className="input-block">
                                                                        <textarea
                                                                            type="text"
                                                                            className="form-control"
                                                                            aria-describedby="emailHelp"
                                                                            value={description}
                                                                            onChange={(e) => this.setState({ description: e.target.value })}
                                                                            rows="6"
                                                                            required
                                                                        >
                                                                        </textarea>
                                                                        <span className="placeholder">Descriptions</span>
                                                                    </div>
                                                                    {this.state.errMsg && <span className="text-danger">{this.state.errMsg.description}</span>}
                                                                </div>
                                                                <div className="">
                                                                    <div className="col-3 mt-5">
                                                                        <Button
                                                                            color="primary" type='submit' className='btn_2 btn__primary w-100 btn-block rounded-pill p-3'>
                                                                            Submit
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <CompassMenu activePage="Department" RotationDegree={this.state.RotationDegree} />
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
