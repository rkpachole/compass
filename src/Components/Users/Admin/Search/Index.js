import React, { Component } from "react";
import { Spinner } from "reactstrap";
import Navbar from "../../../Layout/Navbar/Index";
import CompassMenu from "../../../Layout/CompassMenuBar";
import RightSidebar from "../../../Layout/RightSidebar/Index";
import axios from "axios";
import { APIURL } from "../../../../Constant/common";
import { Link } from "react-router-dom";



export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RotationDegree:0,
            user: JSON.parse(localStorage.getItem("userData")),
            token: JSON.parse(localStorage.getItem("token")),
            navigate: false,
            isLoading: false,
            serachList: [],
            search: "",
            departmentsList: [],
            segmentsList: [],
            usersList: [],
            guidesList: [],
            guideData: false,
            userData: false,
            segmentData: false,
            departmentsData: false,
        };
    }

    onLogoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userData");
        localStorage.removeItem("switchUser");
        const check = localStorage.getItem("checkbox");
        if (check === "false" || check === false)
            localStorage.removeItem("checkbox");
        this.setState({
            navigate: true,
        });
    };

    handleSearch(e) {
        // console.log("search", e.target.value);
        this.setState(
            { search: e.target.value }
            , () => {
                localStorage.setItem("searchResult", this.state.search);
                setTimeout(() => {
                    this.getSerachList();
                }, 300);
            });



    }
    getSerachList = () => {
        var token = this.state.token;
        const formData = new FormData();
        formData.append("search", this.state.search);
        axios
            .post(APIURL + "admin/search-for-all", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    isLoading: false,
                    serachList: response.data.data,
                    guidesList: response.data.data.guides,
                    departmentsList: response.data.data.departments,
                    segmentsList: response.data.data.segments,
                    usersList: response.data.data.users,


                });
                // console.log("response", this.state.usersList);
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    isLoading: false,
                });
            });
    };
    calcAngleDegrees(e) {
        this.setState({
            RotationDegree: (180 * e.clientX) / screen.width
        });
    }
    componentDidMount() {
        this.setState({
            search: localStorage.getItem("searchResult") ? localStorage.getItem("searchResult") : this.props.location.state.SearchData
        }, () => {
            this.getSerachList();
        });

    }

    render() {
        // console.log("data ",);

        return (
            <div onMouseOver={(e) => this.calcAngleDegrees(e)}>

                {/* {this.state.isLoading && <div className="loader"><Spinner color="dark" type="border" >Loading...</Spinner></div>} */}
                <Navbar />
                {this.state.isLoading && <div className="loader"><Spinner color="dark" type="border" >Loading...</Spinner></div>}
                <div className='page'>
                    <div className='page__wrapper'>
                        <div className='page__center container-fluid'>
                            <div className='row'>
                                <div className='col-12 col-sm-12 col-md-12 col-lg-9'>
                                    <div className=''> 
                                        <div className='page__wrapper-conten search-secrion'>
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-9 m-auto">

                                                <div className="col-sm-12 col-md-12 col-lg-7">
                                                    <div className='search mb-4'>
                                                        <i className="fas fa-search search__icon"
                                                        ></i>
                                                        <input placeholder="Search" className="search__input" value={this.state.search}
                                                            type="text" onChange={(e) => this.handleSearch(e)}  />
                                                    </div>
                                                </div>

                                                {
                                                    this.state.guidesList.length > 0 &&

                                                    <div className="row">
                                                        <div className='mb-3 col-sm-12'>
                                                            <div className="card">
                                                                <div className="card-header py-3">
                                                                    Guides List
                                                                </div>
                                                                <div className="card-body">
                                                                    <table className="table responsiveTable">
                                                                        <thead>
                                                                            <tr>

                                                                                <th scope="col">Name</th>
                                                                                <th scope="col">Flow Type</th>
                                                                                <th scope="col">Start Date</th>
                                                                                <th scope="col">End Date</th>
                                                                                <th scope="col">Status</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {
                                                                                this.state.guidesList.length > 0 ? this.state.guidesList.map((guide, index) =>
                                                                                    <tr key={index} >

                                                                                        <td data-label="Name"> <Link to={"/admin/edit/guide/" + guide.id}>{guide.name}</Link></td>
                                                                                        <td data-label="Flow Type"> {guide.flow_type} </td>
                                                                                        <td data-label="Start Date">{guide.start_date} </td>
                                                                                        <td data-label="End Date"> {guide.end_date} </td>
                                                                                        <td data-label="Status"> {guide.status === 1 ? <span >Active</span> : <span >Deactive</span>}</td>

                                                                                    </tr>
                                                                                ) : <tr>
                                                                                    <td data-label="" colSpan={12} className="border-0">
                                                                                        <div className="text-center pt-4">No Records </div>
                                                                                    </td>
                                                                                </tr>}

                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }



                                                {
                                                    this.state.segmentsList.length > 0 &&
                                                    <div className="row">
                                                        <div className='mb-3 col-sm-12'>
                                                            <div className="card">
                                                                <div className="card-header py-3">
                                                                    Segement List
                                                                </div>
                                                                <div className="card-body">
                                                                    <table className="table responsiveTable">
                                                                        <thead>
                                                                            <tr>
                                                                                <th scope="col">Name</th>
                                                                                <th scope="col">URL</th>
                                                                                <th className="text-end" scope="col">Status</th>

                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {
                                                                                this.state.segmentsList.length > 0 ? this.state.segmentsList.map((segment, index) =>
                                                                                    <tr key={index}>
                                                                                        <td data-label="Name"> <Link to={"/admin/edit/segment/" + segment.id} >{segment.name}</Link></td>
                                                                                        <td data-label="URL"> {segment.url}</td>
                                                                                        <td data-label="Status" className="text-end"> {segment.status === 1 ? <span >Active</span> : <span >Deactive</span>}</td> </tr>
                                                                                ) : <tr>
                                                                                    <td data-label="" colSpan={12} className="border-0">
                                                                                        <div className="text-center pt-4">No Records </div>
                                                                                    </td>
                                                                                </tr>}



                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }

                                                {
                                                    this.state.usersList.length > 0 &&
                                                    <div className="row">
                                                        <div className='mb-3 col-sm-12'>
                                                            <div className="card">
                                                                <div className="card-header py-3">
                                                                    Users List
                                                                </div>
                                                                <div className="card-body">
                                                                    <table className="table responsiveTable">
                                                                        <thead>
                                                                            <tr>

                                                                                <th scope="col">First Name</th>
                                                                                <th scope="col">Last Name</th>
                                                                                <th scope="col"> Email</th>
                                                                                <th scope="col">Status</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {
                                                                                this.state.usersList.length > 0 ? this.state.usersList.map((user, index) =>
                                                                                    <tr key={index}>
                                                                                        {/* <Link to="/admin/guides" > </Link> */}
                                                                                        <td data-label="First Name"> <Link to={"/admin/edit/user/" + user.user_id} >{user.first_name}</Link></td>
                                                                                        <td data-label="Last Name"> {user.last_name}</td>
                                                                                        <td data-label="Email"> {user.email}</td>
                                                                                        <td data-label="Status">{user.status === 1 ? <span >Active</span> : <span >Deactive</span>}</td>

                                                                                    </tr>
                                                                                ) : <tr>
                                                                                    <td data-label="" colSpan={12} className="border-0">
                                                                                        <div className="text-center pt-4">No Records </div>
                                                                                    </td>
                                                                                </tr>}



                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    this.state.departmentsList.length > 0 &&
                                                    <div className="row">
                                                        <div className='mb-3 col-sm-12'>
                                                            <div className="card">
                                                                <div className="card-header py-3">
                                                                    Departments List
                                                                </div>
                                                                <div className="card-body">
                                                                    <table className="table responsiveTable">
                                                                        <thead>
                                                                            <tr>

                                                                                <th style={{width: 190}} scope="col">Name</th>
                                                                                <th scope="col text-center" >Description</th>
                                                                                <th scope="col" className="text-end">Status</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {
                                                                                this.state.departmentsList.length > 0 ? this.state.departmentsList.map((dept, index) =>
                                                                                    <tr key={index}>
                                                                                        <td data-label="Name"> <Link to={"/admin/edit/department/" + dept.id}>{dept.name} </Link></td>
                                                                                        <td data-label="Description" className="position-relative"> <div className="description"> {dept.description} </div></td>
                                                                                        <td data-label="Status" className="text-end"> {dept.status === 1 ? <span >Active</span> : <span >Deactive</span>}</td>

                                                                                    </tr>
                                                                                ) : <tr>
                                                                                    <td data-label="" colSpan={12} className="border-0">
                                                                                        <div className="text-center pt-4">No Records </div>
                                                                                    </td>
                                                                                </tr>}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    this.state.usersList.length === 0 &&
                                                    this.state.guidesList.length === 0 &&
                                                    this.state.segmentsList.length === 0 &&
                                                    this.state.departmentsList.length === 0 &&


                                                    <div className="row">
                                                        <div className='mb-3 col-sm-12'>
                                                            <div className="card">
                                                                <div className="card-body text-center">
                                                                    No Records
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }

                                            </div>
                                        </div>
                                        <CompassMenu activePage="" RotationDegree={this.state.RotationDegree}/>
                                    </div>

                                </div>
                                <RightSidebar activePage="Search" />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
