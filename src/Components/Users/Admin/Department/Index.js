import React, { Component } from "react";
import axios from "axios";
import { APIURL } from "../../../../Constant/common";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import Pagination from "react-js-pagination";
import Navbar from "../../../Layout/Navbar/Index";
import RightSidebar from "../../../Layout/RightSidebar/Index";
import CompassMenu from "../../../Layout/CompassMenuBar";
import { Link, Redirect } from "react-router-dom";
import { Spinner } from "reactstrap";

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RotationDegree: 0,
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            actionModal: false,
            deleteModal: false,
            addDepartment: false,
            DepartmentName: "",
            DepartmentList: [],
            activePage: 1,
            limit: 0,
            totalItemsCount: 0,
            search: "",
            errMsg: "",
            no_record: false,
            departmentDescription: "",
            toggle: false,
            status: "",
            isLoading: false,
            DeleteDeptId:""
        };
    }

    deleteDepartmentData = () => {
        var token = this.state.token;
        const formData = new FormData();
        formData.append("id", this.state.DeleteDeptId);
        this.setState({
            Loader: true,
            isLoading: true
        });
        axios
            .post(APIURL + "admin/delete-department", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    DepartmentName: response.data.data.name,
                    deleteModal:false,
                    isLoading: false,
                }, () => {
                    this.DeparementRecords();
                });
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false
                });
            });
    };
    deleteDeptModal(data) {
        console.log("status", data.status);
        this.setState({
            actionModal: !this.state.actionModal,
            deptId: data.id,
            DepartmentName: data.name,
            status: data.status
        });
    }
    closeactionModal = () => {
        this.setState({
            actionModal: false,
            DepartmentName: ""
        });
    };
    deleteModal(data_id) {
        this.setState({
            deleteModal: !this.state.deleteModal,
            DeleteDeptId: data_id,
        });
    }
    closeDeleteModal = () => {
        this.setState({
            deleteModal:false,
            DeleteDeptId: false,
        });
    };
    DeparementRecords = () => {
        this.setState({ isLoading: true });
        var token = this.state.token;
        const formData = new FormData();
        formData.append("page", this.state.activePage);
        formData.append("search", this.state.search);
        formData.append("limit", this.state.limit);
        formData.append("sortby", "asc");
        formData.append("sorttype", "name");


        this.setState({ Loader: true });
        axios
            .post(APIURL + "admin/department-list", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    DepartmentList: response.data.data.data,
                    activePage: response.data.data.current_page,
                    totalItemsCount: response.data.data.total,
                    limit: response.data.data.per_page,
                    no_record: true,
                    isLoading: false
                });
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false,
                    no_record: true
                });
            });
    };
    deleteDepartment = (status) => {
        var token = this.state.token;
        const formData = new FormData();
        formData.append("id", this.state.deptId);
        formData.append("status", status);
        this.setState({
            Loader: true,
            isLoading: true
        });
        axios
            .post(APIURL + "admin/update-department-status", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    DepartmentName: response.data.data.name,
                    actionModal: false,
                    isLoading: false,
                }, () => {
                    this.DeparementRecords();
                });
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false
                });
            });
    };
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState(
            { activePage: pageNumber }
            , () => {
                this.DeparementRecords();
            }
        );
    }
    handleSearch(e) {
        this.setState(
            { search: e.target.value, activePage: 1 }
            , () => {
                setTimeout(() => {
                    this.DeparementRecords();
                }, 300);
            });
    }
    handleReadmore(data) {
        this.setState({
            readmore: true,
            departmentDescription: data.descriptionData.read_more
        });
    }
    closeReadMoreModal = () => {
        this.setState({
            readmore: false,
            departmentDescription: ""
        });
    };
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
    componentDidMount = () => {
        this.DeparementRecords();
    };
    render() {
        // console.log("stavxww", this.state.status);
        if (!this.state.user) {
            return <Redirect to="/" />;
        }
        if (this.state.user && this.state.user.user_type !== "Admin") {
            return <Redirect to="/" />;
        }
        return (
            <div onMouseOver={(e) => this.calcAngleDegrees(e)}>
                {this.state.isLoading && <div className="loader"><Spinner color="dark" type="border" >Loading...</Spinner></div>}
                <Navbar />
                <div className='page'>
                    <div className='page__wrapper'>
                        <div className='page__center container-fluid'>
                            <div className='row'>
                                <div className='col-12 col-md-12 col-lg-12 col-xl-9'>
                                    <div className='department'>
                                        <div className='page__wrapper-conten'>
                                            <div className='page__content page__content_pt64'>
                                                <div className='page__stat'>
                                                    <div className="d-flex justify-content-between align-items-center mb-4"><div className="h4 my-0">Department List</div></div>
                                                    <div className="row justify-content-between mb-5">
                                                        <div className="col-12 col-md-4 col-sm-5">
                                                            <div className="mb-sm-0 mb-lg-0 mb-md-0 mb-xl-0 mb-2">
                                                                <div className="input-block">
                                                                    <input className="form-control" type="text" onChange={(e) => this.handleSearch(e)} required />
                                                                    <span className="placeholder">Search Department</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-md-4 col-sm-5">
                                                            <div className='float-end'>
                                                                <Link to="/admin/add/department"
                                                                    color="primary"
                                                                    className="btn_2 btn__primary rounded-pill"
                                                                >
                                                                    Add Department
                                                                </Link >
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        {
                                                            this.state.DepartmentList.length > 0 && this.state.DepartmentList.map((dept, index) =>
                                                                <div key={index} className="col-12 col-md-4 col-sm-6 mb-4">
                                                                    <div className="card">
                                                                        <div className="card-body">
                                                                            <h5 className="card-title">{dept.name} {dept.status == "active" ? <i className="fas fa-check-circle text-success float-end"></i> : <i className="far fa-check-circle text-danger float-end"></i>}</h5>
                                                                            <p id={`btn-${index}`} className="card-text">
                                                                                {dept.description}
                                                                            </p>
                                                                            <Link to={"/admin/edit/department/" + dept.id} className="card-link btn-md btn btn-success"><i className="fas fa-pen"></i></Link>

                                                                            {dept.status == "active" ? <Button onClick={this.deleteDeptModal.bind(this, dept)} className="ms-1 btn-md btn btn-danger">Deactivate</Button> : <Button onClick={this.deleteDeptModal.bind(this, dept)} className="ms-1 btn-md btn btn-success"> Activate</Button>}
                                                                            {/* {<Button onClick={() => this.deleteModal(dept.id)} className="ms-1 btn-md btn btn-danger">Delete</Button>} */}

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                        {this.state.DepartmentList.length === 0 && this.state.no_record === true &&
                                                            <div className="text-center">No Data Available</div>
                                                        }
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
                                    <CompassMenu activePage="Department" RotationDegree={this.state.RotationDegree} />
                                </div>
                                <RightSidebar />
                            </div>
                        </div>
                    </div>

                    <Modal size="sm" isOpen={this.state.readmore} toggle={() => this.closeReadMoreModal()}>
                        <ModalHeader className="header-less ml-3" toggle={() => this.closeReadMoreModal()}>
                            { }
                        </ModalHeader>
                        <ModalBody className="border-0 text-center">
                            {this.state.departmentDescription}
                        </ModalBody>
                        <ModalFooter>
                            <div className="d-flex justify-content-end w-100">
                                <span className="text-success">{this.state.scsMsg}</span>
                                <span className="text-danger">{this.state.errMsg}</span>
                                <Button className="btn btn-danger ms-1" onClick={() => this.closeReadMoreModal()}> Close </Button>
                            </div>
                        </ModalFooter>
                    </Modal>
                    {/* Action  Confirm Modal  */}
                    <Modal size="sm" isOpen={this.state.actionModal} toggle={() => this.closeactionModal()}>
                        <ModalHeader className="header-less ml-3" toggle={() => this.closeactionModal()}>
                            Change status
                        </ModalHeader>
                        <ModalBody className="border-0 text-center">
                            Are You sure to {this.state.status === "active" ? "Deactivate" : "Activate"} department?
                        </ModalBody>
                        <ModalFooter>
                            <div className="d-flex justify-content-end w-100">
                                <span className="text-success">{this.state.scsMsg}</span>
                                <span className="text-danger">{this.state.errMsg}</span>
                                <Button className="btn btn-success"
                                    onClick={this.state.status === "active" ? this.deleteDepartment.bind(this, "deactive") : this.deleteDepartment.bind(this, "active")}
                                > Yes </Button>
                                <Button className="btn btn-danger ms-1" onClick={() => this.closeactionModal()}> No </Button>
                            </div>
                        </ModalFooter>
                    </Modal>
                    {/* Delete Confirm Modal end  */}
                    <Modal size="sm" isOpen={this.state.deleteModal} toggle={() => this.closeDeleteModal()}>
                        <ModalHeader className="header-less ml-3" toggle={() => this.closeDeleteModal()}>
                        Delete department
                        </ModalHeader>
                        <ModalBody className="border-0 text-center">
                            Are You sure to want to delete department?
                        </ModalBody>
                        <ModalFooter>
                            <div className="d-flex justify-content-end w-100">
                                <span className="text-success">{this.state.scsMsg}</span>
                                <span className="text-danger">{this.state.errMsg}</span>
                                <Button className="btn btn-success"
                                    onClick={this.deleteDepartmentData.bind(this)}
                                > Yes </Button>
                                <Button className="btn btn-danger ms-1" onClick={() => this.closeDeleteModal()}> No </Button>
                            </div>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}
