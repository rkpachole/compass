import React, { Component } from "react";
import PropTypes from "prop-types";
import Logo from "../../../Assets/img/logo.png";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

export default class LeftSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("userData")),
            navigate: false
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
        if (this.state.navigate) {
            return <Redirect to="/" push={true} />;
        }
        return (
            <div>
                <div className="sidebar">
                    <div className="sidebar__top">
                        <button className="sidebar__close">
                            {/* 
              // <svg className="icon icon-close">
              //     <use xlink:href="img/sprite.svg#icon-close"></use>
              //   </svg> */}
                        </button>
                        <a className="sidebar__logo" href="index.html">
                            <img className="sidebar__pic sidebar__pic_black" src={Logo} alt="" />
                            <img className="sidebar__pic sidebar__pic_white" src="img/logo-white.png" alt="" />
                        </a>
                        <button className="sidebar__burger"></button></div>
                    <div className="sidebar__wrapper">
                        <div className="sidebar__inner">
                            <a className="sidebar__logo" href="index.html">
                                <img className="sidebar__pic" src="img/logo-sm.png" alt="" />
                            </a>
                            <div className="sidebar__list">
                                <div className="sidebar__group">
                                    <div className="sidebar__caption caption-sm">Admin<span> tools</span></div>
                                    <div className="sidebar__menu">
                                        <Link to="/checkuser" className={this.props.activePage === "dashboard" ? "sidebar__item active" : "sidebar__item"} href="index.html">
                                            <div className="sidebar__icon">
                                                <svg className="icon icon-bag" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 352C309 352 352 309 352 256C352 202.1 309 160 256 160C202.1 160 160 202.1 160 256C160 309 202.1 352 256 352z" />
                                                </svg>
                                            </div>
                                            <div className="sidebar__text">DashBoard</div>
                                        </Link>
                                        <Link to="/admin/users" className={this.props.activePage === "users" ? "sidebar__item active " : "sidebar__item"} href="products.html">
                                            <div className="sidebar__icon">
                                                <svg className="icon icon-bag" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 352C309 352 352 309 352 256C352 202.1 309 160 256 160C202.1 160 160 202.1 160 256C160 309 202.1 352 256 352z" />
                                                </svg>
                                            </div>
                                            <div className="sidebar__text">Users</div>
                                        </Link>
                                        <Link to="/admin/department" className={this.props.activePage === "department" ? "sidebar__item active" : "sidebar__item"} href="campaigns.html">
                                            <div className="sidebar__icon">
                                                <svg className="icon icon-bag" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 352C309 352 352 309 352 256C352 202.1 309 160 256 160C202.1 160 160 202.1 160 256C160 309 202.1 352 256 352z" />
                                                </svg>
                                            </div>
                                            <div className="sidebar__text">Department</div>
                                        </Link>
                                        <Link to="/admin/Segments" className={this.props.activePage === "Segments" ? "sidebar__item active" : "sidebar__item"} href="schedules.html">
                                            <div className="sidebar__icon">
                                                <svg className="icon icon-bag" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 352C309 352 352 309 352 256C352 202.1 309 160 256 160C202.1 160 160 202.1 160 256C160 309 202.1 352 256 352z" />
                                                </svg>
                                            </div>
                                            <div className="sidebar__text">Segments</div>
                                        </Link>
                                        <Link to="/admin/guides" className={this.props.activePage === "guides" ? "sidebar__item active" : "sidebar__item"} href="payouts.html">
                                            <div className="sidebar__icon">
                                                <svg className="icon icon-bag" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 352C309 352 352 309 352 256C352 202.1 309 160 256 160C202.1 160 160 202.1 160 256C160 309 202.1 352 256 352z" />
                                                </svg>
                                            </div>
                                            <div className="sidebar__text">Guides</div>
                                        </Link>
                                        <Link className="sidebar__item" href="statement.html">
                                            <div className="sidebar__icon">
                                                <svg className="icon icon-bag" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 352C309 352 352 309 352 256C352 202.1 309 160 256 160C202.1 160 160 202.1 160 256C160 309 202.1 352 256 352z" />
                                                </svg>
                                            </div>
                                            <div className="sidebar__text">Company Setting</div>
                                        </Link>

                                    </div>
                                </div>
                            </div>
                            {/* <div class="sidebar__profile">
                <div class="sidebar__details d-block"><a class="sidebar__link" href="#">
                    <div class="sidebar__icon">
                        <i class="fas fa-user icon"></i>
                    </div>
                    <div class="sidebar__text">Profile</div>
                  </a>
                  <a onClick={() => this.onLogoutHandler()} class="sidebar__link" href="#">
                    <div class="sidebar__icon">
                    <i class="fas fa-sign-out-alt icon"></i>
                    </div>
                    <div  class="sidebar__text">Log out</div>
                  </a>
                  </div>
                  <a class="sidebar__user active" href="#">
                  <div class="sidebar__ava">
                    <img class="sidebar__pic" src="https://ui8-unity.herokuapp.com/img/ava.png" alt="" />
                    </div>
                  <div class="sidebar__desc">
                    <div class="sidebar__man">Tam Tran</div>
                    <div class="sidebar__status caption">Free account</div>
                  </div>
                  <div class="sidebar__arrow">
                  
                  </div>
                </a>
              </div> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
LeftSidebar.propTypes = {
    activePage: PropTypes.string
};