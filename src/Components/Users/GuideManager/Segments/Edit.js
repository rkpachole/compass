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

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RotationDegree:0,
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            DepartmentList: [],
            selectedDepartment: "",
            segment_id: this.props.match.params.segment_id,
            editModal: false,
            deleteModal: false,
            data: {
                name: "",
                url: ""
            },
            redirect: false,
            isLoading: false,
            isarray: false
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
        this.setState({ isLoading: true });
        var token = this.state.token;
        const formData = new FormData();
        this.setState({
            Loader: true,
            isLoading: false
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
                    isLoading: false
                });
            });
    };
    handleDepartments = (selectedDepartment) => {
        this.setState({
            selectedDepartment: selectedDepartment === null ? [] : selectedDepartment,
            isarray: true
        });
    };
    editSegmentDetail = () => {
        this.setState({ isLoading: true });
        var token = this.state.token;
        const formData = new FormData();
        formData.append("id", this.state.segment_id);
        this.setState({ Loader: true });
        axios
            .post(APIURL + "guide-manager/edit-segment", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    isLoading: false
                });
                let list = response.data.data.departments;
                let selectedDepartment = [];
                for (var c = 0; c < list.length; c++) {
                    selectedDepartment.push({ "value": list[c].value, "label": list[c].label });
                }
                this.setState({
                    selectedDepartment: selectedDepartment
                });
                this.setState({
                    data: {
                        name: response.data.data.name,
                        url: response.data.data.url == null ? "" : response.data.data.url
                    }
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
    UpdateSegmentDetail = (e) => {
        e.preventDefault();
        this.setState({
            isLoading: true
        });
        window.scrollTo(0, 0);
        const { data } = this.state;
        this.setState({ isLoading: true });
        var token = this.state.token;
        const formData = new FormData();
        formData.append("id", this.state.segment_id);
        formData.append("name", data.name);
        formData.append("url", data.url);
        formData.append("department_ids", JSON.stringify(this.state.selectedDepartment) != "[]" ? this.state.isarray ? JSON.stringify([this.state.selectedDepartment]) : JSON.stringify(this.state.selectedDepartment) : JSON.stringify(this.state.selectedDepartment));
        this.setState({ Loader: true });
        axios
            .post(APIURL + "guide-manager/update-segment", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    scsMsg: response.data.message,
                    isLoading: false,
                }, () => {
                    setTimeout(() =>
                        this.setState({
                            editModal: false,
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
    handleUserType(e) {
        this.setState({
            userType: e.target.value
        });
    }
    calcAngleDegrees(e) {
        this.setState({
            RotationDegree: (180 * e.clientX) / screen.width
        });
    }
    componentDidMount() {
        this.DeparementRecords();
        this.editSegmentDetail();
    }
    render() {
        console.log(this.props);
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
                                                    <div className="page__title h4 mt-0 d-flex align-items-center"><Link className="back-btn" to="/guide/segments"><i className="fas fa-angle-left"></i></Link>  Edit Segment </div>
                                                    <div className='profile-apge'>
                                                        <form noValidate className='' onSubmit={(e) => this.UpdateSegmentDetail(e)}>
                                                            {this.state.scsMsg ? <div className="alert alert-success" role="alert">
                                                                {this.state.scsMsg}
                                                            </div> : ""}
                                                            <div className="row">
                                                                <div className="mb-3 col-sm-6 col-12">
                                                                    <label htmlFor="exampleInputEmail1" className="field__label">Name <strong className="text-danger" > *</strong></label>
                                                                    <div className="input-block">
                                                                        <input type="text" value={this.state.data.name} onChange={this.onChangehandlerName} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                                                                        <span className="placeholder">
                                                                            Enter name
                                                                        </span>
                                                                    </div>
                                                                    {this.state.errMsg && <span className="text-danger">{this.state.errMsg.name}</span>}
                                                                </div>
                                                                <div className="mb-3 col-sm-6 col-12">
                                                                    <label htmlFor="exampleInputEmail1" className="field__label">Department <strong className="text-danger" > *</strong></label>

                                                                    <Select
                                                                        value={this.state.selectedDepartment}
                                                                        onChange={this.handleDepartments}
                                                                        options={this.state.DepartmentList}
                                                                        labelledBy=""
                                                                        placeholder="Select Department"
                                                                        isClearable={true}
                                                                    />
                                                                    {this.state.errMsg && <span className="text-danger">{this.state.errMsg.department_ids}</span>}
                                                                </div>
                                                                <div className="mb-3 col-sm-6 col-12">
                                                                    <label htmlFor="exampleInputEmail1" className="field__label">Url <strong className="text-danger" > *</strong></label>
                                                                    <div className="input-block">
                                                                        <input type="text" name="firstName" value={this.state.data.url} onChange={this.onChangehandlerUrl} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                                                                        <span className="placeholder">
                                                                            Enter url
                                                                        </span>
                                                                    </div>
                                                                    {this.state.errMsg && <span className="text-danger">{this.state.errMsg.url}</span>}
                                                                </div>

                                                                <div className="">
                                                                    <div className="col-3 mt-5">
                                                                        <Button color="primary" type='submit' className='btn_2 btn__primary w-100 btn-block rounded-pill p-3'>
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
                                    <CompassMenu activePage="Segments" RotationDegree={this.state.RotationDegree}/>
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
