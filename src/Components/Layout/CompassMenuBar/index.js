import React, { Component } from "react";
import Compassicon from "../../../Assets/img/compass-icon.png";
import Compassicon2 from "../../../Assets/img/compass2.png";
import { Link } from "react-router-dom";

export default class CompassMenu extends Component {
    constructor() {
        super();
        this.wrapperRef = React.createRef();
        this.state = {
            RotationDegree: 50,
            RotationDegreeOfCurrentPage: 50,
            compassView: false,
            userType: JSON.parse(localStorage.getItem("user_type"))
        };
        // this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    MouseOver(e) {
        this.setState({
            RotationDegree: e
        });
    }
    MouseOut() {
        this.setState({
            RotationDegree: this.state.RotationDegreeOfCurrentPage
        });
    }
    ShowFullCompass() {
        this.setState({
            compassView: true
        });
    }
    HideFullCompass() {
        setTimeout(() =>
            this.setState({
                compassView: false
            }), 3000);
    }
    // handleClickOutside(event) {
    //     if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
    //         this.setState({
    //             compassView: !this.state.compassView
    //         });
    //     }
    // }
 

    componentDidMount() {

        var p1 = {
            x: 20,
            y: 20
        };

        var p2 = {
            x: 40,
            y: 40
        };

        // angle in radians
        var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);

        // angle in degrees
        var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;

        console.log("angleRadians", angleRadians, "angleDeg", angleDeg);
        if (this.props.MenuBar === false) {
            this.setState({
                compassView: false
            });
            console.log(this.state.compassView);
        }

        if (this.props.currentActive === false) {
            document.removeEventListener("focus", this.handleClickOutside);
        }
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }
    render() {
        const { userType } = this.state;
        return (
            <>
                <div >
                    {
                        this.state.compassView &&
                        <div onMouseOut={this.HideFullCompass.bind(this)} className='compass d-none d-lg-block'>
                            <div className="justify-content-center d-flex">
                                <div className='compass-menu'>
                                    <div className='compass-conten'>
                                        <ul className="nav nav-pills" onMouseOut={() => this.MouseOut()}>
                                            <li onMouseOver={() => this.MouseOver(5)} className="nav-item" data-transform="5deg" style={{ transform: "translate(131px, -72px)" }}>
                                                <Link to={userType === "Admin" ? "/admin/dashboard" : userType === "Guide Manager" ? "/guide/dashboard" : userType === "Staff" ? "/staff/dashboard" : "/"} style={{ transform: "rotate(-28deg)" }} className="nav-link" aria-current="page" href="#">DashBoard</Link>
                                            </li>
                                            <li onMouseOver={() => this.MouseOver(25)} className="nav-item" data-transform="25deg" style={{ transform: "translate(125px, -102px)" }}>
                                                <Link to={userType === "Admin" ? "/admin/users" : userType === "Guide Manager" ? "/guide/users" : userType === "Staff" ? "/staff/users" : "/"}
                                                    style={{ transform: "rotate(-13deg)" }} className="nav-link" href="#">Users</Link>
                                            </li>
                                            <li onMouseOver={() => this.MouseOver(90)} className="nav-item" data-transform="90deg" style={{ transform: "translate(128px, -111px)" }}>
                                                <Link to={userType === "Admin" ? "/admin/department" : userType === "Guide Manager" ? "/guide/department" : userType === "Staff" ? "/staff/department" : "/"}
                                                    style={{ transform: "rotate(0deg)" }} className="nav-link" href="#">Department</Link>
                                            </li>
                                            <li onMouseOver={() => this.MouseOver(150)} className="nav-item" data-transform="150deg" style={{ transform: "translate(128px, -99px)" }}>
                                                <Link to={userType === "Admin" ? "/admin/segments" : userType === "Guide Manager" ? "/guide/segments" : userType === "Staff" ? "/staff/segments" : "/"}
                                                    style={{ transform: "rotate(16deg)" }} className="nav-link" href="#" tabIndex="-1" aria-disabled="true">Segments</Link>
                                            </li>
                                            <li onMouseOver={() => this.MouseOver(170)} className="nav-item" data-transform="170deg" style={{ transform: "translate(124px, -67px)" }}>
                                                <Link to={userType === "Admin" ? "/admin/guides" : userType === "Guide Manager" ? "/guide/guides" : userType === "Staff" ? "/staff/guides" : "/"}
                                                    style={{ transform: "rotate(29deg)" }} className="nav-link" href="#" tabIndex="-1" aria-disabled="true">Guides</Link>
                                            </li>
                                        </ul>
                                        <div className='compass-icon'>
                                            <span style={{ display: "inline-block" }}> <img style={{ width: "50px", transform: `rotate(${this.state.RotationDegree}deg)` }} src={Compassicon} /> </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        !this.state.compassView &&
                        <div onMouseOver={this.ShowFullCompass.bind(this)} className='compass-active d-none d-lg-block'>
                            <div className="justify-content-center d-flex">
                                <div className='compass-menu'>
                                    <div className='compass-conten'>
                                        <div className="compass-col-text" >
                                            <span className="" data-transform="5deg" style={{ transform: "translate(131px, -72px)" }}>
                                                <a style={{ transform: "rotate(-28deg)" }} className="" aria-current="page" href="#">{this.props.activePage}</a>
                                            </span>
                                        </div>
                                        <div className='compass-icon'>
                                            <span style={{ display: "inline-block" }}> <img style={{ width: "40px", transform: `rotate(${this.props.RotationDegree ? this.props.RotationDegree : 90}deg)` }} src={Compassicon2} /> </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </>
        );
    }
}
