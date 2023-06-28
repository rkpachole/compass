import React, { Component } from "react";
import Logo from "../../../Assets/img/logo.png";
import { Redirect, Link } from "react-router-dom";
import { Button } from "reactstrap";

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("userData")),
            navigate: false,
            userType: JSON.parse(localStorage.getItem("user_type")),
            search: ""
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

    render() {

        const { userType } = this.state;

        if (this.state.navigate) {
            return <Redirect to="/" push={true} />;
        }
        if (!this.state.user) {
            return <Redirect to="/" />;
        }
        return (
            <div className='header'>
                <nav className="navbar navbar-expand-lg navbar-light bg-white">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            <span className="navbar-brand" href="#"><img style={{ "width": "150px" }} src={Logo} alt={this.props.alt} /></span>
                        </Link>

                        <div className="ms-auto mb-2 mb-lg-0 px-lg-3 me-4 d-block d-lg-none">
                            {
                                this.props.activePage === "resetpassword" ? "" :
                                    <ul className="nav ms-auto">
                                        <li className="nav-item">
                                            <Link className="nav-link trend_btn" to="/admin/trending" >Trending</Link>
                                        </li>
                                        <li className="nav-item">
                                            <div className='d-flex'>
                                                <div className="dropdown">
                                                    <button className='icon__mg' type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i className='fas fa-user icon'></i>
                                                    </button>
                                                    {this.state.user.user_type === "Admin" &&
                                                        <ul className="dropdown-menu position-absolute dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                                                            {this.props.activePage !== "profile" && <li><Link className="dropdown-item btn text-start" to={"/admin/profile"}>Profile</Link></li>
                                                            }
                                                            <li><Link className="dropdown-item btn text-start" to="/admin/companysetting"> Company Setting</Link></li>
                                                            <li><Link className="dropdown-item btn text-start" to="/admin/changepassword"> Change Password</Link></li>
                                                            <li><Link className="dropdown-item btn text-start" to="/admin/packages">Upgrade Package</Link></li>
                                                            <li><Button onClick={() => this.onLogoutHandler()} className='dropdown-item text-start'> Logout </Button></li>
                                                        </ul>
                                                    }
                                                    {this.state.user.user_type === "Guide Manager" &&
                                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                                                            {this.props.activePage !== "profile" && <li><Link className="dropdown-item btn text-start" to="/guide/profile">Profile</Link></li>}

                                                            <li><Link className="dropdown-item btn text-start" to="/guide/companysetting"> Company Setting</Link></li>
                                                            <li><Link className="dropdown-item btn text-start" to="/guide/changepassword"> Change Password</Link></li>
                                                            <li><Button onClick={() => this.onLogoutHandler()} className='dropdown-item text-start'> Logout </Button></li>
                                                        </ul>
                                                    }
                                                    {this.state.user.user_type === "Staff" &&
                                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                                                            {this.props.activePage !== "profile" && <li><Link className="dropdown-item btn text-start" to="/staff/profile">Profile</Link></li>}

                                                            <li><Link className="dropdown-item btn text-start" to="/staff/companysetting"> Company Setting</Link></li>
                                                            <li><Link className="dropdown-item btn text-start" to="/staff/changepassword"> Change Password</Link></li>
                                                            {/* <li><Link className="dropdown-item btn text-start" to="/staff/packages">Upgrade Package</Link></li> */}
                                                            <li><Button onClick={() => this.onLogoutHandler()} className='dropdown-item text-start'> Logout </Button></li>
                                                        </ul>
                                                    }
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                            }
                        </div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse d-none" id="navbarSupportedContent">

                            {
                                this.props.activePage === "resetpassword" ? "" :
                                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 px-lg-3 d-none d-lg-block">
                                        <li className="nav-item">

                                            <div className='d-flex justify-content-end'>
                                                <a className='nav-link noti-btn d-none'>
                                                    <i className="fas fa-bell icon text-white"></i>
                                                </a>
                                                <div className="dropdown">
                                                    <button className='icon__mg' type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i className='fas fa-user icon'></i>
                                                    </button>
                                                    {this.state.user.user_type === "Admin" &&
                                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                                                            {this.props.activePage !== "profile" && <li><Link className="dropdown-item btn text-start" to={"/admin/profile"}>Profile</Link></li>}
                                                            {this.props.activePage !== "setting" && <li><Link className="dropdown-item btn text-start" to="/admin/companysetting"> Company Setting</Link></li>}
                                                            {this.props.activePage !== "change_password" && <li><Link className="dropdown-item btn text-start" to="/admin/changepassword"> Change Password</Link></li>}
                                                            {this.props.activePage !== "package" && <li><Link className="dropdown-item btn text-start" to="/admin/packages">Upgrade Package</Link></li>}
                                                            {this.props.activePage !== "script" && <li><Link className="dropdown-item btn text-start" to="/clipboard">Script Compass</Link></li>}
                                                            <li><Button onClick={() => this.onLogoutHandler()} className='dropdown-item text-start'> Logout </Button></li>
                                                        </ul>
                                                    }
                                                    {this.state.user.user_type === "Guide Manager" &&
                                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                                                            {this.props.activePage !== "profile" && <li><Link className="dropdown-item btn text-start" to="/guide/profile">Profile</Link></li>}

                                                            <li><Link className="dropdown-item btn text-start" to="/guide/companysetting"> Company Setting</Link></li>
                                                            <li><Link className="dropdown-item btn text-start" to="/guide/changepassword"> Change Password</Link></li>
                                                            <li><Button onClick={() => this.onLogoutHandler()} className='dropdown-item text-start'> Logout </Button></li>
                                                        </ul>
                                                    }
                                                    {this.state.user.user_type === "Staff" &&
                                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                                                            {this.props.activePage !== "profile" && <li><Link className="dropdown-item btn text-start" to="/staff/profile">Profile</Link></li>}

                                                            <li><Link className="dropdown-item btn text-start" to="/staff/companysetting"> Company Setting</Link></li>
                                                            <li><Link className="dropdown-item btn text-start" to="/staff/changepassword"> Change Password</Link></li>
                                                            {/* <li><Link className="dropdown-item btn text-start" to="/staff/packages">Upgrade Package</Link></li> */}
                                                            <li><Button onClick={() => this.onLogoutHandler()} className='dropdown-item text-start'> Logout </Button></li>
                                                        </ul>
                                                    }
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                            }
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 px-lg-3 d-block d-lg-none">
                                <li className="nav-item">
                                    <Link className="nav-link" to={userType === "Admin" ? "/admin/dashboard" : userType === "Guide Manager" ? "/guide/dashboard" : userType === "Staff" ? "/staff/dashboard" : "/"}> Dashboard </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={userType === "Admin" ? "/admin/users" : userType === "Guide Manager" ? "/guide/users" : userType === "Staff" ? "/staff/users" : "/"}> Users </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={userType === "Admin" ? "/admin/department" : userType === "Guide Manager" ? "/guide/department" : userType === "Staff" ? "/staff/department" : "/"}> Department </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={userType === "Admin" ? "/admin/segments" : userType === "Guide Manager" ? "/guide/segments" : userType === "Staff" ? "/staff/segments" : "/"}> Segments </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={userType === "Admin" ? "/admin/guides" : userType === "Guide Manager" ? "/guide/guides" : userType === "Staff" ? "/staff/guides" : "/"}> Guides </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <Link className="search-icon-mobile" to={{ pathname: userType === "Admin" ? "/admin/search" : userType === "Guide Manager" ? "/guide/search" : userType === "Staff" ? "/staff/search" : "/", state: { SearchData: this.state.search } }} >
                    <i className="fas fa-search"></i>
                </Link>
            </div>
        );
    }

}