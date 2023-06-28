/* eslint-disable linebreak-style */
import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { APIURL } from "../../../../Constant/common";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, Input, Spinner } from "reactstrap";
import Pagination from "react-js-pagination";
import Navbar from "../../../Layout/Navbar/Index";
import RightSidebar from "../../../Layout/RightSidebar/Index";
import CompassMenu from "../../../Layout/CompassMenuBar/index";
import { MultiSelect } from "react-multi-select-component";

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RotationDegree: 0,
            isLoading: false,
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            activePage: 1,
            limit: 0,
            totalItemsCount: 0,
            search: "",
            DepartmentList: [],
            departmentFilter: [],
            segmentId: "",
            segmentList: [],
            no_record: false,
            status: "",
            sortby: "asc",
            columnName: "name",
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
                    this.segmentRecords();
                });

            }
            if (!this.state.sort) {
                this.setState({
                    sortby: "desc",
                    columnName: e
                }, () => {
                    this.segmentRecords();
                });
            }
        });
    }
    deleteModal(data) {
        this.setState({
            deleteModal: !this.state.deleteModal,
            segmentId: data.id,
            status: data.status
        });
    }
    closeDeleteModal = () => {
        this.setState({
            deleteModal: false
        });
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
                let DepartmentList = response.data.data;
                for (var c = 0; c < DepartmentList.length; c++) {
                    this.state.DepartmentList.push({ value: DepartmentList[c].id, label: DepartmentList[c].name });
                }
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false
                });
            });
    };
    handleDepartmentFilter = (departmentFilter) => {
        this.setState({
            departmentFilter: departmentFilter
        }, () => { this.segmentRecords(); });
    };
    updateStatusSegment = (status) => {
        console.log(status);
        this.setState({ isLoading: true });
        var token = this.state.token;
        const formData = new FormData();
        formData.append("id", this.state.segmentId);
        formData.append("status", status);
        this.setState({ Loader: true });
        axios
            .post(APIURL + "admin/update-segment-status", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(() => {
                this.setState({
                    deleteModal: false
                }, () => {
                    this.segmentRecords();
                });
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false
                });
            });
    };
    segmentRecords = () => {
        this.setState({
            isLoading: true,
        });
        var departmentFilter = [];
        var token = this.state.token;
        const formData = new FormData();
        formData.append("page", this.state.activePage);
        formData.append("search", this.state.search);
        formData.append("sorttype", this.state.columnName);
        formData.append("sortby", this.state.sortby);
        formData.append("limit", this.state.limit);
        this.state.departmentFilter.map((reuslt) => {
            departmentFilter.push(reuslt.value);
        });
        formData.append("departmentFilter", departmentFilter);
        axios
            .post(APIURL + "admin/segment-list", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    segmentList: response.data.data.data,
                    activePage: response.data.data.current_page,
                    totalItemsCount: response.data.data.total,
                    limit: response.data.data.per_page,
                    no_record: true,
                    isLoading: false,
                });
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    no_record: true,
                    isLoading: false,
                });
            });
    };
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState(
            { activePage: pageNumber }
            , () => {
                this.segmentRecords();
            }
        );
    }
    handleSearch(e) {
        this.setState(
            { search: e.target.value, activePage: 1 }
            , () => {
                setTimeout(() => {
                    this.segmentRecords();
                }, 300);
            });
    }
    calcAngleDegrees(e) {
        this.setState({
            RotationDegree: (180 * e.clientX) / screen.width
        });
    }
    componentDidMount() {
        this.DeparementRecords();
        this.segmentRecords();
    }
    render() {
        if (!this.state.user) {
            return <Redirect to="/" />;
        }
        if (this.state.user && this.state.user.user_type !== "Admin") {
            return <Redirect to="/" />;
        }
        return (
            <div onMouseOver={(e) => this.calcAngleDegrees(e)}>
                {this.state.isLoading && <div className="loader"><Spinner color="dark" type="border" >Loading...</Spinner></div>}
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
                                                        <div className="h4 my-0">Segment List</div>    
                                                        <div className="float-end">
                                                            <Link to={"/admin/add/segment/"}
                                                                className="btn_2 btn__primary rounded-pill"
                                                                color='primary'
                                                            >
                                                                Add Segment
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="sorting">
                                                        <div className="row">
                                                            <div className="col-lg-4 col-12 col-sm-6">
                                                                <div className="mb-sm-0 mb-lg-0 mb-md-0 mb-xl-0 mb-2">
                                                                    <div className="input-block">
                                                                        <Input className="form-control" type="text" onChange={(e) => this.handleSearch(e)} required />
                                                                        <span className="placeholder">Search Segment</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-8 col-12 col-sm-6">
                                                                <div className="col-12  mb-sm-0 mb-lg-0 mb-md-0 mb-xl-0 mb-2">
                                                                    <div className="position-relative">
                                                                        <MultiSelect
                                                                            value={this.state.departmentFilter}
                                                                            onChange={this.handleDepartmentFilter}
                                                                            options={this.state.DepartmentList}
                                                                            labelledBy={"Select Deparment"}
                                                                            overrideStrings={{
                                                                                selectSomeItems: "Select Departments",
                                                                                allItemsAreSelected: "All Departments Are Selected",
                                                                                selectAll: "Select All Departments",
                                                                                search: "Search",
                                                                            }}
                                                                        />
                                                                        {/* <Select
                                                                            isMulti
                                                                            placeholder="Department"
                                                                            value={this.state.departmentFilter}
                                                                            onChange={this.handleDepartmentFilter}
                                                                            options={this.state.DepartmentList}
                                                                        /> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className=''>
                                                        <table className="table responsiveTable">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">#</th>
                                                                    <th className="sort-by" scope="col" style={{ cursor: "pointer" }} onClick={this.SortBy.bind(this, "name")}>Segment Name </th>
                                                                    <th scope="col">Segment Url </th>
                                                                    <th style={{ minWidth: "130px" }}>Departments</th>
                                                                    <th style={{ minWidth: "100px" }}>Status</th>
                                                                    <th scope="col" className='text-center' style={{ width: "145px" }}>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    this.state.segmentList.length > 0 && this.state.segmentList.map((result, index) =>
                                                                        <tr key={index}>
                                                                            <td data-label="#" scope="row" style={{whiteSpace: "nowrap"}}>{index + 1}</td>
                                                                            <td data-label="Segment Name">{result.name}</td>
                                                                            <td data-label="Segment Url">{result.url}</td>
                                                                            <td data-label="Departments">
                                                                                {result.departments.length > 0 && result.departments.map((dep, ind) =>
                                                                                    <div key={ind}>
                                                                                        {ind > 0 &&
                                                                                            ","
                                                                                        }
                                                                                        {dep.name}
                                                                                    </div>
                                                                                )}
                                                                            </td>
                                                                            <td data-label="Status">{result.status == "0" ? <span >Active</span> : <span >Deactive</span>}</td>
                                                                            <td data-label="Action" className='text-end'>
                                                                                <Link to={"/admin/edit/segment/" + result.id} color='primary' className='btn btn-sm me-1 btn-success'> <i className="fas fa-pen"></i> </Link>

                                                                                {result.status === "0" ? <Button onClick={this.deleteModal.bind(this, result)} color='danger' className='btn btn-sm btn- btn-width'>Deactivate </Button> : <Button onClick={this.deleteModal.bind(this, result)} color='success' className='btn btn-sm btn- btn-width'>Activate</Button>}
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                }
                                                                {
                                                                    this.state.segmentList.length === 0 && this.state.no_record == true &&

                                                                    <tr className="text-center">
                                                                        <td data-label="" colSpan={4}>No Data Available</td>
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
                                    <CompassMenu activePage="Segments" RotationDegree={this.state.RotationDegree} />
                                </div>
                                <RightSidebar />
                            </div>
                        </div>
                    </div>

                    {/* Delete Confirm Modal  */}
                    <Modal size="sm" isOpen={this.state.deleteModal} toggle={() => this.closeDeleteModal()}>
                        <ModalHeader className="header-less ml-3" toggle={() => this.closeDeleteModal()}>
                            Change status
                        </ModalHeader>
                        <ModalBody className="border-0 text-center">
                            Are You sure want to {this.state.status === "0" ? "Deactivate" : "Activate"} ?
                        </ModalBody>
                        <ModalFooter>
                            <div className="d-flex justify-content-end w-100">
                                <Button className="btn btn-success"
                                    onClick={this.state.status === "1" ? this.updateStatusSegment.bind(this, 0) : this.updateStatusSegment.bind(this, 1)}
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