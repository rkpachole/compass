/* eslint-disable linebreak-style */
import React, { Component } from "react";
import axios from "axios";
import { APIURL } from "../../../../Constant/common";
import { Input, Tooltip } from "reactstrap";
import Pagination from "react-js-pagination";
import Navbar from "../../../Layout/Navbar/Index";
import RightSidebar from "../../../Layout/RightSidebar/Index";
import CompassMenu from "../../../Layout/CompassMenuBar";
import { Redirect } from "react-router-dom";
import { Spinner } from "reactstrap";

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RotationDegree:0,
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
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
            isLoading: false
        };
    }


    DeparementRecords = () => {
        this.setState({ isLoading: true });
        var token = this.state.token;
        const formData = new FormData();
        formData.append("page", this.state.activePage);
        formData.append("search", this.state.search);
        formData.append("limit", this.state.limit);
        this.setState({ Loader: true });
        axios
            .post(APIURL + "staff/department-list", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("deptlist", response.data);
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
            .post(APIURL + "staff/all-active-department-list", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("staff", response.data);
                this.setState({
                    DepartmentName: response.data.data.name,
                    deleteModal: false,
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
        if (!this.state.user) {
            return <Redirect to="/" />;
        }
        if (this.state.user && this.state.user.user_type !== "Staff") {
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
                                                    <div className="row justify-content-between mb-5">
                                                        <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                                                            <div className="mb-sm-0 mb-lg-0 mb-md-0 mb-xl-0 mb-2">
                                                                <div className="input-block">
                                                                    <Input className="form-control" type="text" onChange={(e) => this.handleSearch(e)} required />
                                                                    <span className="placeholder">Search Department</span>
                                                                </div>
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

                                                                            {/* {dept.status !== "active" ? <Button color='danger' className='btn btn-sm btn- btn-width'>Deactive </Button> : <Button color='success' className='btn btn-sm btn- btn-width'>Active</Button>} */}
                                                                        </div>
                                                                    </div>
                                                                    <Tooltip
                                                                        style={{ backgroundColor: "#000", color: "#fff" }}
                                                                        placement="top"
                                                                        isOpen={this.isToolTipOpen(`btn-${index}`)}
                                                                        target={`btn-${index}`}
                                                                        toggle={() => this.toggle(`btn-${index}`)}>
                                                                        {dept.description}
                                                                    </Tooltip>
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
                                    <CompassMenu activePage="Department" RotationDegree={this.state.RotationDegree}/>
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
