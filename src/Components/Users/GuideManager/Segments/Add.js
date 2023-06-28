/* eslint-disable linebreak-style */
import React, { Component } from "react";
import axios from "axios";
import { APIURL } from "../../../../Constant/common";
import { Button, Spinner } from "reactstrap";
import { Redirect, Link } from "react-router-dom";
import Navbar from "../../../Layout/Navbar/Index";
import RightSidebar from "../../../Layout/RightSidebar/Index";
import CompassMenu from "../../../Layout/CompassMenuBar";
import Select from "react-select";
// import { MultiSelect } from "react-multi-select-component";


export default class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RotationDegree:0,
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            userType: "",
            firstName: "",
            lastName: "",
            DepartmentList: [],
            selectedDepartment: [],
            userId: "",
            userIds: [],
            adduser: false,
            userName: "",
            userList: [],
            data: {
                name: "",
                url: "",
                Loader: false
            },
            isLoading: false,
        };
    }
    onChangehandlerName = (e) => {
        const { data } = this.state;
        data["name"] = e.target.value;
        this.setState({ data, errMsg: "" });
    };
    onChangehandlerUrl = (e) => {
        const { data } = this.state;
        data["url"] = e.target.value;
        this.setState({ data, errMsg: "" });
    };
    DeparementRecords = () => {
        this.setState({
            Loader: true,
            isLoading: false,
        });
        var token = this.state.token;
        const formData = new FormData();
        this.setState({
            Loader: true,
            isLoading: true
        });
        axios
            .post(APIURL + "guide-manager/all-active-department-list", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    isLoading: false
                });
                let DepartmentList = response.data.data;
                for (var c = 0; c < DepartmentList.length; c++) {
                    this.state.DepartmentList.push({ value: DepartmentList[c].id, label: DepartmentList[c].name });
                }
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false,
                    isLoading: false,
                });
            });
    };
    handleDepartments = (selectedDepartment) => {
        this.setState({
            selectedDepartment: selectedDepartment !== null ? selectedDepartment : [],
        });
    };
    allDepartmentHandle = () => {
        this.setState({
            selectedDepartment: this.state.DepartmentList
        });
    };
    departmentResetHandle = () => {
        this.setState({
            selectedDepartment: []
        });
    };
    submitHandle = (e) => {
        console.log(JSON.stringify(this.state.selectedDepartment));
        const { data } = this.state;
        e.preventDefault();
        window.scrollTo(0, 0);
        this.setState({
            Loader: true,
            isLoading: true,
        });
        var token = this.state.token;
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("url", data.url);
        formData.append("department_ids", JSON.stringify(this.state.selectedDepartment) != "[]" ? JSON.stringify([this.state.selectedDepartment]) : JSON.stringify(this.state.selectedDepartment));

        this.setState({ Loader: true });
        axios
            .post(APIURL + "guide-manager/add-segment", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    scsMsg: response.data.message,
                    Loader: false,
                    isLoading: false
                }, () => {
                    setTimeout(() =>
                        this.setState({
                            scsMsg: "",
                            redirect: true
                        }), 3000);
                });
            })
            .catch((error) => {
                // console.log("adduser", error.response.data.error);
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
        this.DeparementRecords();
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/guide/segments" />;
        }
        if (!this.state.user) {
            return <Redirect to="/" />;
        }
        if (this.state.user && this.state.user.user_type !== "Guide Manager") {
            return <Redirect to="/" />;
        }
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
                                                    <div className="page__title h4 mt-0 d-flex align-items-center"><Link className="back-btn" to="/guide/segments"><i className="fas fa-angle-left"></i></Link> Segment List </div>
                                                    {this.state.scsMsg ? <div className="alert alert-success" role="alert">
                                                        {this.state.scsMsg}
                                                    </div> : ""}
                                                    <div className='profile-apge'>
                                                        <form noValidate className='' onSubmit={(e) => this.submitHandle(e)}>
                                                            <div className="row">
                                                                <div className="mb-3 col-sm-6 col-12">
                                                                    <label htmlFor="exampleInputEmail1" className="field__label mb-3">Name <strong className="text-danger" > *</strong></label>
                                                                    <div className="input-block">
                                                                        <input type="text"  value={this.state.data.name} onChange={this.onChangehandlerName} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                                                                        {this.state.errMsg && <span className="text-danger">{this.state.errMsg.name}</span>}
                                                                        <span className="placeholder">
                                                                            Enter name
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                {/* <div className="mb-3 col-sm-6 col-12">
                                                                    <label htmlFor="exampleInputEmail1" className="field__label mb-3">Name <strong className="text-danger" > *</strong></label>
                                                                    <input type="text" placeholder="Enter name" value={this.state.data.name} onChange={this.onChangehandlerName} className="field__input" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                                    {this.state.errMsg && <span className="text-danger">{this.state.errMsg.name}</span>}
                                                                </div> */}
                                                                <div className="mb-3 col-sm-6 col-12">
                                                                    <label htmlFor="exampleInputEmail1" className="field__label">Department <strong className="text-danger" > *</strong></label>
                                                                    <Select
                                                                        // isMulti
                                                                        placeholder="Select Department"
                                                                        options={this.state.DepartmentList}
                                                                        value={this.state.selectedDepartment}
                                                                        onChange={this.handleDepartments}
                                                                        isClearable={true}
                                                                    />
                                                                    {this.state.errMsg && <span className="text-danger">{this.state.errMsg.department_ids}</span>}
                                                                </div>
                                                                <div className="mb-3 col-sm-6 col-12">
                                                                    <label htmlFor="exampleInputEmail1" className="field__label">Url <strong className="text-danger" > *</strong></label>
                                                                    <div className="input-block">
                                                                        <input type="text"  name="firstName" value={this.state.data.url} onChange={this.onChangehandlerUrl} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                                                                        {this.state.errMsg && <span className="text-danger">{this.state.errMsg.url}</span>}
                                                                        <span className="placeholder">
                                                                            Enter url 
                                                                        </span>
                                                                    </div>    
                                                                </div>
                                                                {/* <div className="mb-3 col-sm-6 col-12">
                                                                    <label htmlFor="exampleInputEmail1" className="field__label">Url <strong className="text-danger" > *</strong></label>
                                                                    <input type="text" placeholder="Enter url" name="firstName" value={this.state.data.url} onChange={this.onChangehandlerUrl} className="field__input" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                                    {this.state.errMsg && <span className="text-danger">{this.state.errMsg.url}</span>}
                                                                </div> */}
                                                                <div className="">
                                                                    <div className="col-3 mt-5">
                                                                        <Button type='submit' color="primary" className='btn_2 btn__primary w-100 btn-block rounded-pill p-3'>
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
                                    <CompassMenu activePage="Segments" RotationDegree={this.state.RotationDegree} />
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