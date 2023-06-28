/* eslint-disable linebreak-style */
import React, { Component } from "react";
import axios from "axios";
import { APIURL } from "../../../../Constant/common";
// import { Link } from "react-router-dom";
import Navbar from "../../../Layout/Navbar/Index";
import { Redirect } from "react-router-dom";
import CompassMenu from "../../../Layout/CompassMenuBar";
import RightSidebar from "../../../Layout/RightSidebar/Index";
import { Spinner } from "reactstrap";
import { Button } from "reactstrap";

export default class PackagePlans extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RotationDegree: 0,
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            signupData: {
                name: "",
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                password: "",
                c_password: "",
                company_name: "",
                username: "",
            },
            PlanData: {
                expire_date: "",
                name: "",
            },
            checked: false,
            msg: "",
            errMsg: {},
            scsMsg: "",
            redirect: false,
            isLoading: false,
            fullscrLoader: true,
            showPassword: false,
            Cofirm_showPassword: false,
            captchaToken: false,
            CaptchaErrMsg: "",
            AcceptTnc: "",
            signUpModal: false,
            SubPlanData: [],
            package_id: 1,

        };
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    activeplan = () => {
        this.setState({ isLoading: true });
        var token = this.state.token;
        const formData = new FormData();
        axios
            .post(APIURL + "admin/active-plan-details", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("response1233", response.data.data);
                if (response.data.data === null) {
                    this.setState({
                        package_id: 1
                    });
                }
                this.setState({
                    package_id: response.data.data.plan_id,
                    PlanData: response.data.data
                });

            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false,
                    isLoading: false
                });
            });
    };

    getSubscriptionPlan = () => {
        this.setState({
            isLoading: true
        });
        // console.log("sbh", this.state.user);
        var token = this.state.token;
        const formData = new FormData();
        axios
            .get(APIURL + "get-subscription-plan", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("response", response.data.data);
                this.setState({
                    SubPlanData: response.data.data,
                    isLoading: false,

                });

            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.errors,
                    Loader: false
                });
            });

    };
    calcAngleDegrees(e) {
        this.setState({
            RotationDegree: (180 * e.clientX) / screen.width
        });
    }
    componentDidMount() {
        this.activeplan();
        this.getSubscriptionPlan();
        document.addEventListener("mousedown", this.handleClickOutside);
        window.scrollTo(0, 0);
        setTimeout(() => this.setState({ fullscrLoader: "" }), 500);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }
    myRef = React.createRef();

    handleClickOutside = e => {
        if (!this.myRef.current.contains(e.target)) {
            this.setState({
                portrait: false
            });
        }
    };

    onPackageSelect(item) {
        window.scrollTo(0, 0);
        var token = this.state.token;
        const formData = new FormData();
        formData.append("package_id", item.id);
        this.setState({ Loader: true });
        axios
            .post(APIURL + "admin/payment/create", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({ Loader: false });
                setTimeout(() => {
                    if (response.data.url !== "") {
                        window.location.href = response.data.url;
                    }
                }, 1000);
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false
                });
                setTimeout(() => this.setState({ errMsg: "" }), 4000);
            });
    }
    render() {

        if (this.state.redirect) {
            return <Redirect to="/" />;
        }
        if (!this.state.user) {
            return <Redirect to="/" />;
        }
        return (
            <div onMouseOver={(e) => this.calcAngleDegrees(e)}>
                <Navbar activePage="package" />
                {this.state.isLoading && <div className="loader"><Spinner color="dark" type="border" >Loading...</Spinner></div>}
                <div className='page'>
                    <div className='page__wrapper'>
                        <div className='page__center container-fluid'>

                            <div className='row'>
                                <div className='col-12 col-md-12 col-lg-12 col-xl-9'>
                                    <div className=''>
                                        <div className='page__wrapper-conten'>
                                            <div className='page__content page__content_pt64'>
                                                <div className=''>
                                                    <div className="plans-packages">
                                                        <section className="pricing-plans">
                                                            <div className="pricing-tables row col-10 m-auto">
                                                                <p className="text-left mb-4"> <h6>Current Plan -  {this.state.PlanData.name},   Expire Date -  {this.state.PlanData.expire_date}</h6> </p>
                                                                {
                                                                    this.state.SubPlanData.length > 0 ? this.state.SubPlanData.map((item, index) =>
                                                                        <div key={index} className="col-md-6 col-12 mb-4">
                                                                            <div className="pricing-plan">
                                                                                <h2 className="plan-title">{item.name}</h2>
                                                                                <div className="plan-cost">
                                                                                    <p className="plan-price">${item.price}</p>
                                                                                    <span>/</span>
                                                                                    <p className="plan-type">Monthly</p>
                                                                                </div>
                                                                                <ul className="plan-features">
                                                                                    {item.specifications.map((sItem, idx) =>
                                                                                        <li key={idx}>{sItem.name}</li>
                                                                                    )}
                                                                                </ul>
                                                                                <div className="px-4">
                                                                                    {
                                                                                        item.id === this.state.package_id ?
                                                                                            <Button onClick={this.onPackageSelect.bind(this, item)} to="#" color="success" className="btn_2  w-100 mt-3 btn btn__success" href="">Current Plan</Button>
                                                                                            :
                                                                                            <Button disabled={item.id == 1}  onClick={this.onPackageSelect.bind(this, item)} to="#" className="btn_2 btn__primary w-100  mt-3" href="">Select Plan</Button>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ) :
                                                                        ""
                                                                }
                                                            </div>
                                                        </section>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <CompassMenu RotationDegree={this.state.RotationDegree} />
                                </div>
                                <RightSidebar />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
