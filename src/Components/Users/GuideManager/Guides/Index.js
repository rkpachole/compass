/* eslint-disable linebreak-style */
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { APIURL } from "../../../../Constant/common";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import Select from "react-select";
import Pagination from "react-js-pagination";
import Navbar from "../../../Layout/Navbar/Index";
import RightSidebar from "../../../Layout/RightSidebar/Index";
import CompassMenu from "../../../Layout/CompassMenuBar/index";
import { Spinner } from "reactstrap";

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RotationDegree:0,
            token: JSON.parse(localStorage.getItem("token")),
            activePage: 1,
            limit: 0,
            totalItemsCount: 0,
            search: "",
            DepartmentList: [],
            selectedSegments: [],
            selectedDepartment: [],
            guideId: "",
            segmentList: [],
            deleteModal: false,
            sort: false,
            sortby: "desc",
            columnName: "",
            status: "",
            guideList: [],
            isLoading: false,
            isClearable: true,
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
                    this.guideList();
                });

            }
            if (!this.state.sort) {
                this.setState({
                    sortby: "desc",
                    columnName: e
                }, () => {
                    this.guideList();
                });
            }
        });
    }
    deleteModal(data) {
        this.setState({
            deleteModal: !this.state.deleteModal,
            guideId: data.id,
            status: data.status
        });
    }
    closeDeleteModal = () => {
        this.setState({
            deleteModal: false
        });
    };
    segmentRecords = () => {
        var token = this.state.token;
        const formData = new FormData();
        this.setState({
            Loader: true,
            isLoading: true
        });
        axios
            .post(APIURL + "guide-manager/active-segment-list", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                let segmentList = response.data.data;
                for (var c = 0; c < segmentList.length; c++) {
                    this.state.segmentList.push({ value: segmentList[c].id, label: segmentList[c].name });
                }
                this.setState({
                    isLoading: false,
                });
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
            selectedDepartment: selectedDepartment
        });
    };
    deleteGuide = (status) => {
        this.setState({ isLoading: true });
        var token = this.state.token;
        const formData = new FormData();
        formData.append("id", this.state.guideId);
        formData.append("status", status);
        this.setState({ Loader: true });
        axios
            .post(APIURL + "guide-manager/update-guide-status", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(() => {
                this.setState({
                    deleteModal: false,
                    isLoading: false,
                }, () => {
                    this.guideList();
                });
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false,
                    isLoading: false,
                });
            });
    };
    handleSegmentsFilter = (selectedSegments) => {
        this.setState({
            selectedSegments: selectedSegments
        }, this.guideList());
    };
    isClearable = () => {
        this.setState({
            selectedSegments: [],
        }, () => { this.guideList(); });
    };
    guideList = () => {
        var token = this.state.token;
        const formData = new FormData();
        this.setState({
            isLoading: true,
        });
        formData.append("page", this.state.activePage);
        formData.append("search", this.state.search);
        formData.append("sortby", this.state.sortby);
        formData.append("sorttype", this.state.columnName);
        formData.append("limit", this.state.limit);
        // this.state.selectedSegments.map((result) => {
        //     selectedSegments.push(result.value);
        // });
        formData.append("segmentFilter", JSON.stringify(this.state.selectedSegments.value) ? JSON.stringify(this.state.selectedSegments.value) : "");
        axios
            .post(APIURL + "guide-manager/guide-list", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("", response.data.data.data);
                this.setState({
                    isLoading: false,
                    guideList: response.data.data.data,
                    activePage: response.data.data.current_page,
                    totalItemsCount: response.data.data.total,
                    limit: response.data.data.per_page,

                });
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    isLoading: false,
                });
            });
    };
    handlePageChange(pageNumber) {
        this.setState(
            { activePage: pageNumber }
            , () => {
                this.guideList();
            }
        );
    }
    handleSearch(e) {
        this.setState(
            { search: e.target.value, activePage: 1 }
            , () => {
                setTimeout(() => {
                    this.guideList();
                }, 300);
            });
    }
    calcAngleDegrees(e) {
        this.setState({
            RotationDegree: (180 * e.clientX) / screen.width
        });
    }
    componentDidMount() {
        this.segmentRecords();
        this.guideList();
    }
    render() {
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
                                                        <div className="h4 my-0">Guides List</div>
                                                        <div className="float-end">
                                                            <Link to="/guide/add/guide"
                                                                className="btn_2 btn__primary rounded-pill"
                                                                color='primary'
                                                            >
                                                                Add Guide
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="sorting">
                                                        <div className="row justify-content-between">
                                                            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                                                <div className="mb-sm-2 mb-lg-0 mb-md-0 mb-xl-0 mb-2">
                                                                    <div className="input-block">
                                                                        <input className="form-control" type="text" onChange={(e) => this.handleSearch(e)} required />
                                                                        <span className="placeholder">
                                                                            Search Guide
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                                                <div className="col-12  mb-sm-2 mb-lg-0 mb-md-0 mb-xl-0 mb-2">
                                                                    <div className="position-relative">
                                                                        <Select
                                                                            // isMulti
                                                                            placeholder="Select Segment"
                                                                            value={this.state.selectedSegments}
                                                                            onChange={this.handleSegmentsFilter}
                                                                            options={this.state.segmentList}
                                                                            isClearable={true}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className=''>
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">#</th>
                                                                    <th className="sort-by" scope="col" onClick={this.SortBy.bind(this, "name")} >Guide Name </th>
                                                                    <th className="sort-by" scope="col" onClick={this.SortBy.bind(this, "flow_type")}>Flow Type </th>
                                                                    <th className="sort-by" scope="col" onClick={this.SortBy.bind(this, "start_date")}>Start Date </th>
                                                                    <th className="sort-by" scope="col" onClick={this.SortBy.bind(this, "end_date")}>End Date </th>
                                                                    <th scope="col"> Status</th>
                                                                    <th scope="col" className='text-end'>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    this.state.guideList.length > 0 && this.state.guideList.map((guide, index) =>
                                                                        <tr key={index}>
                                                                            <td data-label="Guide Name" scope="row">{index + 1}</td>
                                                                            <td data-label="Flow Type">{guide.name}</td>
                                                                            <td data-label="Start Date">{guide.flow_type}</td>
                                                                            <td data-label="End Date">{guide.start_date}</td>
                                                                            <td data-label="Status">{guide.end_date}</td>
                                                                            <td data-label="">{guide.status === 1 ? "Active" : "Deactive"}</td>
                                                                            <td data-label="Action" className='text-end'>
                                                                                <Link to={"/guide/edit/guide/" + guide.id} color='success' className='btn btn-sm me-1 btn-success'> <i className="fas fa-pen"></i> </Link>
                                                                                {guide.status === 0 ? <Button onClick={this.deleteModal.bind(this, guide)} color='success' className='btn btn-sm btn- btn-width'> Activate</Button> : <Button onClick={this.deleteModal.bind(this, guide)} color='danger' className='btn btn-sm btn- btn-width'>deactivate</Button>}
                                                                            </td>
                                                                        </tr>
                                                                    )}
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
                                    <CompassMenu activePage="Guides" RotationDegree={this.state.RotationDegree}  />
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
                            Are You sure to {this.state.status === 1 ? "deactivate" : "activate"} guide ?
                        </ModalBody>
                        <ModalFooter>
                            <div className="d-flex justify-content-end w-100">
                                <Button className="btn btn-success" onClick={this.state.status === 1 ? this.deleteGuide.bind(this, 0) : this.deleteGuide.bind(this, 1)}
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