/* eslint-disable linebreak-style */
import React, { Component } from "react";
import axios from "axios";
import { APIURL } from "../../../../Constant/common";
import { Button, Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Select from "react-select";
import Navbar from "../../../Layout/Navbar/Index";
import RightSidebar from "../../../Layout/RightSidebar/Index";
import CompassMenu from "../../../Layout/CompassMenuBar";
import AdminIcon from "../../../../Assets/img/admin.png";
import StaffIcon from "../../../../Assets/img/teamwork.png";
import Guide from "../../../../Assets/img/tour-guide.png";
import { MultiSelect } from "react-multi-select-component";

const userType = [
    { value: "", label: "User Type", },
    {
        value: "Admin", label: "Admin", icon: <img style={{ height: "20px", width: "20px" }} src={AdminIcon} />
    },
    {
        value: "Staff", label: "Staff", icon: <img style={{ height: "20px", width: "20px" }} src={StaffIcon} />
    },
    {
        value: "Guide", label: "Guide Manager", icon: <img style={{ height: "20px", width: "20px" }} src={Guide} />
    },
];
export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RotationDegree: 0,
            isLoading: false,
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            userType: { value: "", label: "User Type" },
            firstName: "",
            lastName: "",
            email: "",
            activePage: 1,
            limit: 0,
            totalItemsCount: 0,
            search: "",
            DepartmentList: [],
            selectedDepartment: [],
            userId: this.props.match.params.user_id,
            userIds: [],
            adduser: false,
            userName: "",
            userList: [],
            editModal: false,
            deleteModal: false,
            UserData: {
                firstName: "",
                lastName: "",
                email: "",
            },
            redirect: false,
            errMsg: ""
        };
    }
    onChangehandler = (e) => {
        const { UserData } = this.state;
        UserData[e.target.name] = e.target.value;
        this.setState({ UserData, errMsg: "" });
        console.log(UserData.userType);
    };
    DeparementRecords = () => {
        this.setState({ isLoading: true });
        var token = this.state.token;
        const formData = new FormData();
        this.setState({ Loader: true });
        axios
            .post(APIURL + "admin/active-department-list", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({ isLoading: false });
                let DepartmentList = response.data.data;
                for (var c = 0; c < DepartmentList.length; c++) {
                    this.state.DepartmentList.push({ value: DepartmentList[c].id, label: DepartmentList[c].name });
                }
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    isLoading: false
                });
            });
    };
    handleDepartments = (selectedDepartment) => {
        this.setState({
            selectedDepartment: selectedDepartment
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
    editUserDetail = () => {
        this.setState({ isLoading: true });
        var token = this.state.token;
        const formData = new FormData();
        formData.append("user_id", this.state.userId);
        this.setState({ Loader: true });
        axios
            .post(APIURL + "admin/edit-user", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                let list = response.data.data.departments;
                let userType = response.data.data.user_type;
                let selectedDepartment = [];
                for (var c = 0; c < list.length; c++) {
                    selectedDepartment.push({ "value": list[c].value, "label": list[c].label });
                }
                this.setState({
                    selectedDepartment: selectedDepartment
                });
                this.setState({
                    UserData: {
                        firstName: response.data.data.first_name,
                        lastName: response.data.data.last_name,
                        email: response.data.data.email,
                    },
                    userType: {
                        value: response.data.data.user_type,
                        label: response.data.data.user_type,
                        icon: userType === "Staff" ? <img style={{ height: "20px", width: "20px" }} src={StaffIcon} /> : userType === "Admin" ? <img style={{ height: "20px", width: "20px" }} src={AdminIcon} /> : <img style={{ height: "20px", width: "20px" }} src={Guide} />
                    }
                });
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false
                });
            });
    };
    UpdateUserDetail = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        const { UserData } = this.state;
        this.setState({ isLoading: true });
        var token = this.state.token;
        const formData = new FormData();
        formData.append("user_id", this.state.userId);
        formData.append("user_type", this.state.userType["value"]);
        formData.append("first_name", UserData.firstName);
        formData.append("last_name", UserData.lastName);
        formData.append("email", UserData.email);
        formData.append("department_ids", JSON.stringify(this.state.selectedDepartment) ? JSON.stringify(this.state.selectedDepartment) : "");

        this.setState({ Loader: true });
        axios
            .post(APIURL + "admin/update-user", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    scsMsg: response.data.message,
                    isLoading: false
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
                console.log(error.response.data.error);
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false,
                    isLoading: false
                });
            });
    };
    handleUserType = (userType) => {
        this.setState({
            userType: userType
        });
        if (userType.value == "Admin") {
            this.setState({
                selectedDepartment: [],
            });
        }
    };
    calcAngleDegrees(e) {
        this.setState({
            RotationDegree: (180 * e.clientX) / screen.width
        });
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        this.DeparementRecords();
        this.editUserDetail();
    }
    render() {
        console.log(this.props);
        if (this.state.redirect) {
            return <Redirect to="/admin/users" />;
        }
        if (!this.state.user) {
            return <Redirect to="/" />;
        }
        if (this.state.user && this.state.user.user_type !== "Admin") {
            return <Redirect to="/" />;
        }

        return (
            <div onMouseOver={(e) => this.calcAngleDegrees(e)}>
                {this.state.isLoading && <div className="loader"><Spinner color="dark" type="border" >Loading...</Spinner></div>}

                <Navbar activePage="profile" />
                <div className='page' >
                    <div className='page__wrapper'>
                        <div className='page__center container-fluid'>
                            <div className='row'>
                                <div className='col-12 col-md-12 col-lg-12 col-xl-9'>
                                    <div className=''>
                                        <div className='page__wrapper-conten'>
                                            <div className='page__content page__content_pt64'>
                                                <div className='page__stat'>
                                                    <div className="page__title h4 mt-0 d-flex align-items-center"><Link className="back-btn" to="/admin/users"><i className="fas fa-angle-left"></i></Link> Edit User</div>
                                                    <div className='profile-apge'>
                                                        <form noValidate className='' onSubmit={(e) => this.UpdateUserDetail(e)}>
                                                            {this.state.scsMsg ? <div className="alert alert-success" role="alert">
                                                                {this.state.scsMsg}
                                                            </div> : ""}
                                                            <div className="row">
                                                                <div className="mb-3 col-sm-6 col-12">
                                                                    <label htmlFor="exampleInputEmail1" className="form-label">User Type <strong className="text-danger" > *</strong></label>
                                                                    <div className="position-relative">
                                                                        <Select
                                                                            // isMulti
                                                                            placeholder="User Type"
                                                                            value={this.state.userType}
                                                                            onChange={this.handleUserType}
                                                                            options={userType}
                                                                            getOptionLabel={e => (
                                                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                                                    {e.icon}
                                                                                    <span style={{ marginLeft: 5 }}>{e.label}</span>
                                                                                </div>
                                                                            )}
                                                                        />
                                                                    </div>
                                                                    {this.state.errMsg && <span className="text-danger">{this.state.errMsg.user_type}</span>}
                                                                </div>
                                                                {this.state.userType.value !== "Admin" &&
                                                                    <div className="mb-3 col-sm-6 col-12">
                                                                        <label htmlFor="exampleInputEmail1" className="form-label">Department <strong className="text-danger" > *</strong></label>
                                                                        <MultiSelect
                                                                            className=""
                                                                            value={this.state.selectedDepartment}
                                                                            onChange={this.handleDepartments}
                                                                            options={this.state.DepartmentList}
                                                                            labelledBy="Select"
                                                                            overrideStrings={{
                                                                                selectSomeItems: "Select Department",
                                                                                allItemsAreSelected: "All Departments Are Selected",
                                                                                selectAll: "Select All Departments",
                                                                                search: "Search",
                                                                            }}
                                                                        />
                                                                        {this.state.errMsg && <span className="text-danger">{this.state.errMsg.department_ids}</span>}
                                                                    </div>
                                                                }
                                                                <div className="mb-3 col-sm-6 col-12">
                                                                    <label htmlFor="exampleInputEmail1" className="form-label">First Name <strong className="text-danger" > *</strong></label>
                                                                    <div className="input-block">
                                                                        <input type="text" name="firstName" value={this.state.UserData.firstName} onChange={this.onChangehandler} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                                                                        <span className="placeholder">Enter first name</span>
                                                                    </div>
                                                                    {this.state.errMsg && <span className="text-danger">{this.state.errMsg.first_name}</span>}
                                                                </div>
                                                                <div className="mb-3 col-sm-6 col-12">
                                                                    <label htmlFor="exampleInputEmail1" className="form-label">Last Name <strong className="text-danger" > *</strong></label>
                                                                    <div className="input-block">
                                                                        <input type="text" name="lastName" value={this.state.UserData.lastName} onChange={this.onChangehandler} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                                                                        <span className="placeholder">Enter last name</span>
                                                                    </div>
                                                                    {this.state.errMsg && <span className="text-danger">{this.state.errMsg.last_name}</span>}
                                                                </div>
                                                                <div className="mb-3 col-sm-6 col-12">
                                                                    <label htmlFor="exampleInputEmail1" className="form-label">Email <strong className="text-danger" > *</strong></label>
                                                                    <div className="input-block">
                                                                        <input type="email" name="email" disabled value={this.state.UserData.email} onChange={this.onChangehandler} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                                        <span className="placeholder">Enter email</span>
                                                                    </div>
                                                                </div>
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
                                    <CompassMenu activePage="Users" RotationDegree={this.state.RotationDegree} />
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
