import React, { Component } from "react";
import { Button } from "reactstrap";
import { Redirect } from "react-router-dom";

export default class RightMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("userData")),
            navigate: false
        };
    }
    onLogoutHandler = () => {
        localStorage.removeItem("userData");
        localStorage.removeItem("token");
        const check = localStorage.getItem("checkbox");
        if (check === "false" || check === false)
            localStorage.removeItem("checkbox");
        this.setState({
            navigate: true,
        });
    };
    render() {
        if (this.state.navigate) {
            return <Redirect to="/" push={true} />;
        }
        return (
            <>
                <div className='d-flex justify-content-center mb-3'>
                    <a className='nav-link noti-btn'>
                        <i className="fas fa-bell icon text-white"></i>
                    </a>
                    <a className='nav-link profile-btn mx-2'>
                        <i className='fas fa-user icon text-white'></i>
                    </a>
                    <Button onClick={() => this.onLogoutHandler()} className='nav-link logout-btn'>
                        <i className='fas fa-sign-out-alt icon text-white rounded-circle'></i>
                    </Button>
                </div>
                <div className='search mb-4'>
                    <i className="fas fa-search"></i>
                    <input placeholder='search' className="bg-transparent border-0 w-100 mb-0" />
                </div>
            </>
        );
    }
}
