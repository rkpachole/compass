/* eslint-disable linebreak-style */
import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { APIURL } from "../../../../Constant/common";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, Input, Tooltip } from "reactstrap";
import Select from "react-select";
import Pagination from "react-js-pagination";
import Navbar from "../../../Layout/Navbar/Index";
import RightSidebar from "../../../Layout/RightSidebar/Index";
import CompassMenu from "../../../Layout/CompassMenuBar/index";
import AdminIcon from "../../../../Assets/img/admin.png";
import StaffIcon from "../../../../Assets/img/teamwork.png";
import Guide from "../../../../Assets/img/tour-guide.png";
import { MultiSelect } from "react-multi-select-component";

const userTypeList = [
    { value: "", label: "User Type", },

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
            RotationDegree:0,
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            userType: "",
            firstName: "",
            lastName: "",
            email: "",
            activePage: 1,
            limit: 0,
            totalItemsCount: 0,
            search: "",
            userTypeFilter: { value: "", label: "User Type" },
            DepartmentList: [],
            DepartmentListFilter: [],
            departmentFilter: [],
            selectedDepartment: [],
            userId: "",
            userIds: [],
            adduser: false,
            userName: "",
            userList: [],
            deleteModal: false,
            no_record: false,
            sort: false,
            sortby: "desc",
            columnName: "",
            status: ""
        };

    }
    SortBy(e) {
        this.setState({
            sort: !this.state.sort,
        }, () => {
            if (this.state.sort) {
                this.setState({
                    sortby: "asc",
                    columnName: e
                }, () => {
                    this.userRecords();
                });

            }
            if (!this.state.sort) {
                this.setState({
                    sortby: "desc",
                    columnName: e
                }, () => {
                    this.userRecords();
                });
            }
        });
    }



    deleteModal(data) {
        this.setState({
            deleteModal: !this.state.deleteModal,
            userId: data.user_id,
            status: data.status
        });
    }
    closeDeleteModal = () => {
        this.setState({
            deleteModal: false
        });
    };
    handleUserType(e) {
        this.setState({
            userType: e.target.value
        });
    }
    handleUserTypeFilter = (userTypeFilter) => {
        this.setState({
            userTypeFilter: userTypeFilter
        }, () => { this.userRecords(); });

    };
    DeparementRecords = () => {
        this.setState({ isLoading: true });
        var token = this.state.token;
        const formData = new FormData();
        this.setState({ Loader: true });
        axios
            .post(APIURL + "guide-manager/all-active-department-list", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                let DepartmentList = response.data.data;
                var DepartmentListArray = [];
                for (var c = 0; c < DepartmentList.length; c++) {
                    DepartmentListArray.push({ value: DepartmentList[c].id, label: DepartmentList[c].name });
                }
                this.setState({
                    DepartmentList: DepartmentListArray
                });
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false
                });
            });
    };
    handleDepartments = (selectedDepartment) => {
        this.setState({
            selectedDepartment: selectedDepartment
        });
    };
    handleDepartmentFilter = (departmentFilter) => {
        this.setState({
            departmentFilter: departmentFilter
        }, () => { this.userRecords(); });
    };
    deleteUser = (status) => {
        this.setState({ isLoading: true });
        var token = this.state.token;
        const formData = new FormData();
        formData.append("id", this.state.userId);
        formData.append("status", status);

        this.setState({ Loader: true });
        axios
            .post(APIURL + "guide-manager/update-user-status", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    DepartmentName: response.data.data.name,
                    deleteModal: false
                }, () => {
                    this.userRecords();
                });
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false
                });
            });
    };
    userRecords = () => {
        var departmentFilter = [];
        var token = this.state.token;
        const formData = new FormData();
        formData.append("page", this.state.activePage);
        formData.append("search", this.state.search);
        formData.append("sortby", this.state.sortby);
        formData.append("limit", this.state.limit);
        formData.append("sorttype", this.state.columnName);
        formData.append("userTypeFilter", this.state.userTypeFilter["value"]);
        this.state.departmentFilter.map((reuslt) => {
            departmentFilter.push(reuslt.value);
        });
        formData.append("departmentFilter", departmentFilter);

        axios
            .post(APIURL + "guide-manager/user-list", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("user list ", response.data.data.data);
                this.setState({
                    userList: response.data.data.data,
                    activePage: response.data.data.current_page,
                    totalItemsCount: response.data.data.total,
                    limit: response.data.data.per_page,
                    no_record: true
                });
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    no_record: true
                });
            });
    };
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState(
            { activePage: pageNumber }
            , () => {
                this.userRecords();
            }
        );
    }
    handleSearch(e) {
        this.setState(
            { search: e.target.value, activePage: 1 }
            , () => {
                setTimeout(() => {
                    this.userRecords();
                }, 300);
            });
    }
    toggle = targetName => {
        if (!this.state[targetName]) {
            this.setState({
                ...this.state,
                [targetName]: {
                    tooltipOpen: true
                }
            });
        } else {
            this.setState({
                ...this.state,
                [targetName]: {
                    tooltipOpen: !this.state[targetName].tooltipOpen
                }
            });
        }
    };
    isToolTipOpen = targetName => {
        return this.state[targetName] ? this.state[targetName].tooltipOpen : false;
    };
    calcAngleDegrees(e) {
        this.setState({
            RotationDegree: (180 * e.clientX) / screen.width
        });
    }
    componentDidMount() {
        this.DeparementRecords();
        this.userRecords();
    }
    render() {
        if (!this.state.user) {
            return <Redirect to="/" />;
        }
        if (this.state.user && this.state.user.user_type !== "Guide Manager") {
            return <Redirect to="/" />;
        }
        return (
            <div onMouseOver={(e) => this.calcAngleDegrees(e)}>
                < Navbar />
                <div className='page'>
                    <div className='page__wrapper'>
                        <div className='page__center container-fluid'>
                            <div className='row'>
                                <div className='col-12 col-md-12 col-lg-12 col-xl-9'>
                                    <div className=''>
                                        <div className='page__wrapper-conten'>
                                            <div className='page__content page__content_pt64'>
                                                <div className='page__stat'>
                                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                                        <div className="h4 my-0">User List</div>
                                                    </div>
                                                    <div className="sorting">
                                                        <div className="row justify-content-between">
                                                            <div className="col-12 col-sm-12 col-md-4 col-lg-3">
                                                                <div className="col-12  mb-sm-0 mb-lg-0 mb-md-0 mb-xl-0 mb-2 input-block">
                                                                    <div className="input-block">
                                                                        <Input className="form-control" type="text" onChange={(e) => this.handleSearch(e)} required />
                                                                        <span className="placeholder">Search User</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-sm-12 col-md-4 col-lg-3">
                                                                <div className="col-12  mb-sm-0 mb-lg-0 mb-md-0 mb-xl-0 mb-2">
                                                                    <div className="position-relative">
                                                                        <Select
                                                                            placeholder="User Type"
                                                                            value={this.state.userTypeFilter}
                                                                            onChange={this.handleUserTypeFilter}
                                                                            options={userTypeList}
                                                                            getOptionLabel={e => (
                                                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                                                    {e.icon}
                                                                                    <span style={{ marginLeft: 5 }}>{e.label}</span>
                                                                                </div>
                                                                            )}
                                                                        />

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-sm-12 col-md-4 col-lg-6">
                                                                <div className="mb-sm-0 mb-lg-0 mb-md-0 mb-xl-0 mb-2">
                                                                    <div className="position-relative">
                                                                        <MultiSelect
                                                                            value={this.state.departmentFilter}
                                                                            onChange={this.handleDepartmentFilter}
                                                                            options={this.state.DepartmentList}
                                                                            disableSearch={true}
                                                                            overrideStrings={{
                                                                                selectSomeItems: "Select Departments",
                                                                                allItemsAreSelected: "All Departments are Selected",
                                                                                selectAll: "Select All Departments",
                                                                                search: "Search",
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div className="sorting">
                                                        <div className="row justify-content-between">
                                                            <div className="col-3">
                                                                <div className="col-12  mb-sm-0 mb-lg-0 mb-md-0 mb-xl-0 mb-2">
                                                                    <Input className="field__input" type="text" onChange={(e) => this.handleSearch(e)} placeholder="Search User" />
                                                                </div>
                                                            </div>
                                                            <div className="col-3">
                                                                <div className="col-12  mb-sm-0 mb-lg-0 mb-md-0 mb-xl-0 mb-2">
                                                                    <div className="position-relative">
                                                                        <Select
                                                                            placeholder="User Type"
                                                                            value={this.state.userTypeFilter}
                                                                            onChange={this.handleUserTypeFilter}
                                                                            options={userTypeList}
                                                                            getOptionLabel={e => (
                                                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                                                    {e.icon}
                                                                                    <span style={{ marginLeft: 5 }}>{e.label}</span>
                                                                                </div>
                                                                            )}
                                                                        />

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="col-12  mb-sm-0 mb-lg-0 mb-md-0 mb-xl-0 mb-2">
                                                                    <div className="position-relative">
                                                                        <MultiSelect
                                                                            value={this.state.departmentFilter}
                                                                            onChange={this.handleDepartmentFilter}
                                                                            options={this.state.DepartmentList}
                                                                            labelledBy={"Select Deparment"}
                                                                            disableSearch={true} 
                                                                            overrideStrings={{
                                                                                selectSomeItems: "Select Departments",
                                                                                allItemsAreSelected: "All Departments are Selected",
                                                                                selectAll: "Select All Departments",
                                                                                search: "Search",
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                    <div className=''>
                                                        <table className="table responsiveTable">
                                                            <thead>
                                                                <tr>
                                                                    <th className="" scope="col">#</th>
                                                                    <th className="sort-by" scope="col">Icon</th>
                                                                    <th className="sort-by" scope="col" style={{ cursor: "pointer" }} onClick={this.SortBy.bind(this, "first_name")}>User Name </th>
                                                                    {/* <th className="sort-by" scope="col" style={{ cursor: "pointer" }} onClick={this.SortBy.bind(this, "company_name")}>Company Name </th> */}
                                                                    <th className="sort-by" scope="col" style={{ cursor: "pointer" }} onClick={this.SortBy.bind(this, "user_type")} >User Type </th>
                                                                    <th scope="col">Departments</th>
                                                                    {/* <th className="text-end" scope="col">Status</th>
                                                                    <th className="text-end" scope="col">Action</th> */}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    this.state.userList.length > 0 && this.state.userList.map((user, index) =>
                                                                        <tr key={index}>
                                                                            <td data-label="#" scope="row">{index + 1}</td>
                                                                            <td data-label="Icon" scope="row">{user.user_type === "Staff" ? <img style={{ height: "20px", width: "20px" }} src={StaffIcon} /> : user.user_type === "Admin" ? <img style={{ height: "20px", width: "20px" }} src={AdminIcon} /> : <img style={{ height: "20px", width: "20px" }} src={Guide} />}</td>
                                                                            <td data-label="User Name ">{user.first_name} {user.last_name}</td>
                                                                            {/* <td data-label="">{user.company_name}</td> */}
                                                                            <td data-label="User Type ">{user.user_type}</td>
                                                                            {
                                                                                user.departments.length > 0 ?
                                                                                    <td data-label="Departments">
                                                                                        {
                                                                                            user.departments.length > 0 &&
                                                                                            <div id={`btn-${index}`} >
                                                                                                {user.departments.length === 1 ? user.departments[0].name : user.departments[0].name + "..."}
                                                                                            </div>
                                                                                        }
                                                                                    </td>
                                                                                    :
                                                                                    <td data-label="Departments">
                                                                                        <div id={`btn-${index}`}></div>
                                                                                    </td>
                                                                            }

                                                                            {/* <td>{user.email_verified == 1 ? "Verified" : "Pending"}</td>
                                                                            <td className='text-end'>

                                                                                {user.status === "active" ? <Button color='success' className='btn btn-sm btn- btn-width'> active</Button> : <Button color='danger' className='btn btn-sm btn- btn-width'>deactive</Button>}
                                                                            </td> */}
                                                                            <Tooltip
                                                                                placement="top"
                                                                                isOpen={this.isToolTipOpen(`btn-${index}`)}
                                                                                target={`btn-${index}`}
                                                                                toggle={() => this.toggle(`btn-${index}`)}>
                                                                                {user.departments.length > 0 && user.departments.map((dep, ind) =>
                                                                                    <div key={ind}>
                                                                                        {dep.name} {ind >= 0 &&
                                                                                            ind + 1 !== user.departments.length ? ", " : ""
                                                                                        }
                                                                                    </div>
                                                                                )}
                                                                            </Tooltip>
                                                                        </tr>
                                                                    )
                                                                }
                                                                {
                                                                    this.state.userList.length === 0 && this.state.no_record == true &&

                                                                    <tr>
                                                                        <td className="text-center" colSpan={7}>No Data Available</td>
                                                                    </tr>
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="d-flex justify-content-center">
                                                        {this.state.totalItemsCount > 10 &&
                                                            <div className="pagination-rounded">
                                                                <Pagination
                                                                    activePage={this.state.activePage}
                                                                    itemsCountPerPage={this.state.limit}
                                                                    totalItemsCount={this.state.totalItemsCount}
                                                                    pageRangeDisplayed={5}
                                                                    onChange={this.handlePageChange.bind(this)}
                                                                />
                                                            </div>
                                                        }
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
                    {/* Delete Confirm Modal  */}
                    <Modal size="sm" isOpen={this.state.deleteModal} toggle={() => this.closeDeleteModal()}>
                        <ModalHeader className="header-less ml-3" toggle={() => this.closeDeleteModal()}>
                            Action
                        </ModalHeader>
                        <ModalBody className="border-0 text-center">
                            Are You sure {this.state.status === "active" ? "deactive" : "active"}  ?
                        </ModalBody>
                        <ModalFooter>
                            <div className="d-flex justify-content-end w-100">
                                <Button className="btn btn-success" onClick={this.state.status === "active" ? this.deleteUser.bind(this, "deactive") : this.deleteUser.bind(this, "active")}
                                > Yes </Button>
                                <Button className="btn btn-danger ms-1" onClick={() => this.closeDeleteModal()}> No </Button>
                            </div>
                        </ModalFooter>
                    </Modal>
                    {/* Delete Confirm Modal end  */}
                </div>
            </div>
        );
    }
}
