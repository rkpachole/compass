import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { APIURL } from "../../../Constant/common";
// import Index from "../Navbar/Index";
export default class RightSidebar extends Component {
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

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.setState({
                searchPage: true,

            });

        }
    };


    // onButtonClickHandler = () => {
    //     this.setState({
    //         search: true
    //     });
    // };

    handleSearch(e) {
        localStorage.removeItem("searchResult");
        if (this.state.serach != "") {
            this.setState(
                {
                    search: e.target.value,
                    // searchPage: true,
                    serachIcon: true,

                });
        }
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



    handleClick = () => {
        this.setState(
            {
                searchPage: true,
            });
    };


    componentDidMount() {
        this.getRightSideBarData();
    }

    render() {
        if (this.state.searchPage && this.state.user.user_type === "Admin") {
            return <Redirect to={{ pathname: "/admin/search", state: { SearchData: this.state.search } }} />;
        }
        if (this.state.searchPage && this.state.user.user_type === "Guide Manager") {
            return <Redirect to={{ pathname: "/guide/search", state: { SearchData: this.state.search } }} />;
        }
        if (this.state.searchPage && this.state.user.user_type === "Staff") {
            return <Redirect to={{ pathname: "/staff/search", state: { SearchData: this.state.search } }} />;
        }
        return (
            <>
                <div className='col-xl-3 col-xxl-3 d-none d-md-none d-lg-none d-xl-block d-xxl-block'>
                    <div className='rightsidebar'>
                        {
                            this.props.activePage != "Search" ?
                                <div className='search mb-4'>
                                    {this.state.serachIcon ? <i className="fas fa-search search__icon" onClick={this.handleClick}></i> : <i className="fas fa-search search__icon"></i>}
                                    {/* <i className="fas fa-search search__icon"  onClick={this.handleClick}></i> */}
                                    <input placeholder="Search"
                                        type="text"
                                        onKeyDown={this.handleKeyDown}
                                        value={this.state.serach}
                                        onChange={(e) => this.handleSearch(e)}

                                        // onChange={this.onChangeSearch}
                                        // onFocus={this.onButtonClickHandler}
                                        className="search__input" />
                                </div> : ""}
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
            </>
        );
    }
}
