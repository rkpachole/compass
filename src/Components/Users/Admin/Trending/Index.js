import React, { Component } from "react";
import { Spinner } from "reactstrap";
import Navbar from "../../../Layout/Navbar/Index";
import CompassMenu from "../../../Layout/CompassMenuBar";
import axios from "axios";
import { APIURL } from "../../../../Constant/common";
// import { Link } from "react-router-dom";



export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("userData")),
            token: JSON.parse(localStorage.getItem("token")),
            navigate: false,
            isLoading: false,
            searchPage: false,
            SerachR: false,
            search: "",
            RightSidebarData: [],
        };
    }

    calcAngleDegrees(e) {
        this.setState({
            RotationDegree: (180 * e.clientX) / screen.width
        });
    }
    getRightSideBarData = () => {
        var token = this.state.token;
        const formData = new FormData();

        axios
            .post(APIURL + "admin/get-trending-notifications", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    isLoading: false,
                    RightSidebarData: response.data.data,
                });
                // console.log("1232", this.state.RightSidebarData);
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    isLoading: false,
                });
            });
    };
    componentDidMount() {
        this.getRightSideBarData();

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
                                <div className='col-12 col-md-12 col-lg-12 d-xl-none'>
                                    <div className=''>
                                        <div className='page__wrapper-conten'>
                                            <div className="rightsidebar page__stat">
                                                <h4 className="mb-3">Trending Activities</h4> 
                                                {this.state.RightSidebarData.length > 0 ? this.state.RightSidebarData.map((users, index) =>
                                                    <ul key={index} className="list-group page__stat2 p-0 border-0">
                                                        <li className="list-group-item border-0 border-bottom bg-transparent " aria-current="true">
                                                            <div className=''>
                                                                <h4 className='mb-1'> {users.name} </h4>
                                                                <p className='mb-0  small text-muted'>{users.description}</p>
                                                            </div>
                                                        </li>
                                                    </ul>) : <div className="text-center pt-4">No Records </div>}
                                            </div>
                                        </div>
                                        <CompassMenu activePage="" RotationDegree={this.state.RotationDegree} />
                                    </div>

                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
