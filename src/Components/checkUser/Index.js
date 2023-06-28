import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class CheckUser extends Component {
    constructor(){
        super();
        this.state = {
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            user_type:JSON.parse(localStorage.getItem("user_type")),
            navigate:false
        };
    }

    componentDidMount(){
        this.setState({
            navigate:true
        });
    }
    render() {
        if(!this.state.user){
            return <Redirect to="/" />;
        }
        if(this.state.navigate){
            if(this.state.user_type === "Admin"){
                return <Redirect to="/Admin/dashboard" />;
            }
            if(this.state.user_type === "Guide Manager"){
                return <Redirect to="/guide/dashboard" />;
            }
            if(this.state.user_type === "Staff"){
                return <Redirect to="/staff/dashboard" />;
            }
        }
        return (
            <>
            </>
        );
    }
}
