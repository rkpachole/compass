/* eslint-disable linebreak-style */
import React, { Component } from "react";
import axios from "axios";
import { APIURL } from "../../../../Constant/common";
import { Button } from "reactstrap";
import { Redirect, Link } from "react-router-dom";
import Select from "react-select";
import Navbar from "../../../Layout/Navbar/Index";
import RightSidebar from "../../../Layout/RightSidebar/Index";
import CompassMenu from "../../../Layout/CompassMenuBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dateFormat from "dateformat";
import { Spinner } from "reactstrap";

const userType = [
    { value: "", label: " Type", },
    {
        value: "Manual", label: "Manual"
    },
    {
        value: "Automatic", label: "Automatic",
    },
];

const frequencyList = [
    { value: "Only Once", label: "Only Once" },
    { value: "Everyday Once", label: "Everyday Once" },
    { value: "Specific Days", label: "Specific Days", },
    { value: "Always", label: "Always" },
];
// const weekList = [
//     { value: "Monday", label: "Mon" },
//     { value: "Tuesday", label: "Tue" },
//     { value: "Wednesday", label: "wed" },
//     { value: "Thursday", label: "Thu" },
//     { value: "Friday", label: "Fri" },
//     { value: "Saturday", label: "Sat", },
//     { value: "Sunday", label: "Sun" },
// ];


export default class Add extends Component {
    constructor(props) {
        super(props);


        this.state = {
            token: JSON.parse(localStorage.getItem("token")),
            userType: { value: "", label: "Type" },
            name: "",
            selectedSegments: "",
            seriesweekArr: [{ name: "Mon", status: false }, { name: "Tue", status: false }, { name: "Wed", status: false }, { name: "Thu", status: false }, { name: "Fri", status: false }, { name: "Sat", status: false }, { name: "Sun", status: false }],
            frequencyList: [],
            selectedType: [],
            selectedweek: [],
            segmentList: [],
            selectedList: [],
            startDate: "",
            endDate: "",
            user_type_id: 0,
            frequency: { value: "", label: "Select" },
            user_Type: "",
            selectType: "",
            weeks: [],
            days: [],
            isLoading: false,
        };
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
    }

    handleUserType = (userType) => {
        console.log("userType", userType.value);
        this.setState({
            userType: userType
        });
        if (userType.value !== "Automatic") {
            this.setState({
                frequency: { value: "", label: "Select" },
                weeks: []
            });

        }
    };
    handleFrequency = (frequency) => {
        this.setState({
            frequency: frequency
        });

        if (frequency.value !== "Specific Days") {
            this.setState({
                weeks: []
            });
        }

    };
    handleDays = (selectType) => {
        this.setState({
            selectType: selectType
        });
    };
    onChangehandlerName = (e) => {
        this.setState({ name: e.target.value });
    };
    handleSeriesWeek = (e, index) => {
        console.log();
        const seriesweekArr = this.state.seriesweekArr;
        seriesweekArr[index]["status"] = e.target.checked;
        this.setState({
            seriesweekArr: seriesweekArr
        });
        console.log(this.state.seriesweekArr);
    };
    segmentRecords = () => {
        this.setState({ isLoading: true });
        var token = this.state.token;
        const formData = new FormData();
        this.setState({ Loader: true });
        axios
            .post(APIURL + "admin/active-segment-list", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    isLoading: false
                });
                let segmentList = response.data.data;
                for (var c = 0; c < segmentList.length; c++) {
                    this.state.segmentList.push({ value: segmentList[c].id, label: segmentList[c].name });
                }

            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false,
                    isLoading: false
                });
            });
    };
    handleSegments = (selectedSegments) => {
        this.setState({
            selectedSegments: selectedSegments
        });
    };
    handleWeeks = (selectedweek) => {
        this.setState({ selectedweek: selectedweek });
    };
    handleStartDate(date) {
        this.setState({
            startDate: date
        });
        console.log(this.state.startDate);
    }
    handleEndDate(date) {
        this.setState({
            endDate: date
        });
        console.log(this.state.startDate);
    }
    submitHandle = (e) => {
        e.preventDefault();
        this.setState({
            isLoading: true,
        });
        window.scrollTo(0, 0);
        let days = [];
        let SelectedWeekDays = [];
        this.state.seriesweekArr.filter(A => A.status === true).map(r =>
            days.push(r)
        );
        let WeekList = days;
        for (var c = 0; c < WeekList.length; c++) {
            SelectedWeekDays.push(WeekList[c].name);
        }

        var token = this.state.token;
        const formData = new FormData();
        formData.append("flow_type", this.state.userType.value);
        formData.append("name", this.state.name);

        if (this.state.userType.value === "Automatic") {
            formData.append("frequency", this.state.frequency.value);
            if (this.state.frequency.value === "Specific Days") {
                formData.append("specific_days", SelectedWeekDays);
            }
        }
        if (this.state.startDate != "") {
            formData.append("start_date", dateFormat(this.state.startDate, "yyyy-mm-dd"));
        } else {
            formData.append("start_date", "");
        }
        if (this.state.endDate != "") {
            formData.append("end_date", dateFormat(this.state.endDate, "yyyy-mm-dd"));
        } else {
            formData.append("end_date", "");
        }
        formData.append("segment_id", JSON.stringify(this.state.selectedSegments.value));

        this.setState({ Loader: true });
        axios
            .post(APIURL + "admin/add-guide", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    isLoading: false,
                    scsMsg: response.data.message,

                }, () => {
                    setTimeout(() =>
                        this.setState({
                            scsMsg: "",
                            redirect: true
                        }), 3000);
                });
            })
            .catch((error) => {
                // console.log("adduser", error.response.data.error);
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false,
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
        this.segmentRecords();
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/admin/guides" />;
        }
        return (
            <div onMouseOver={(e) => this.calcAngleDegrees(e)}>
                {this.state.isLoading && <div className="loader"><Spinner color="dark" type="border" >Loading...</Spinner></div>}
                <Navbar activePage="profile" />
                <div className='page'>
                    <div className='page__wrapper'>
                        <div className='page__center container-fluid'>
                            <div className='row'>
                                <div className='col-12 col-md-12 col-lg-12 col-xl-9'>
                                    <div className=''>
                                        <div className='page__wrapper-conten'>
                                            <div className='page__content page__content_pt64'>
                                                <div className='page__stat'>
                                                    <div className="page__title h4 mt-0 d-flex align-items-center"><Link className="back-btn" to="/admin/guides"><i className="fas fa-angle-left"></i></Link>Add Guide</div>
                                                    {this.state.scsMsg ? <div className="alert alert-success" role="alert">
                                                        {this.state.scsMsg}
                                                    </div> : ""}
                                                    <div className='profile-apge'>
                                                        <form noValidate className='' onSubmit={(e) => this.submitHandle(e)}>
                                                            <div className="row">
                                                                <div className="mb-3 col-sm-6 col-12">
                                                                    <label htmlFor="exampleInputEmail1" className="field__label">Guide Name <strong className="text-danger" > *</strong></label>
                                                                    <div className="input-block">
                                                                        <input type="text" value={this.state.name} onChange={this.onChangehandlerName} className="form-control" required />
                                                                        <span className="placeholder">Name</span>
                                                                    </div>
                                                                    {this.state.errMsg && <span className="text-danger">{this.state.errMsg.name}</span>}
                                                                </div>
                                                                <div className="mb-3 col-sm-6 col-12">
                                                                    <label htmlFor="exampleInputEmail1" className="field__label">Segment <strong className="text-danger" > *</strong></label>
                                                                    <Select
                                                                        // isMulti
                                                                        placeholder="Select Segments"
                                                                        value={this.state.selectedSegments}
                                                                        onChange={this.handleSegments}
                                                                        options={this.state.segmentList}
                                                                    />
                                                                    {this.state.errMsg && <span className="text-danger">{this.state.errMsg.segment_id}</span>}
                                                                </div>

                                                                <div className="mb-3 col-sm-6 col-12">
                                                                    <label htmlFor="exampleInputEmail1" className="field__label">Start Date <strong className="text-danger" > *</strong></label>
                                                                    <DatePicker
                                                                        placeholderText="Start Date"
                                                                        className="form-control"
                                                                        selected={this.state.startDate}
                                                                        onChange={this.handleStartDate}
                                                                        minDate={new Date()}
                                                                        name="startDate"
                                                                        dateFormat="dd/MM/yyyy"
                                                                        autoComplete="off"

                                                                    />
                                                                    {this.state.errMsg && <span className="text-danger">{this.state.errMsg.start_date}</span>}
                                                                </div>
                                                                <div className="mb-3 col-sm-6 col-12">
                                                                    <label htmlFor="exampleInputEmail1" className="field__label">End Date <strong className="text-danger" > *</strong></label>
                                                                    <DatePicker
                                                                        placeholderText="End Date"
                                                                        className="form-control"
                                                                        selected={this.state.endDate}
                                                                        onChange={this.handleEndDate}
                                                                        minDate={new Date()}
                                                                        name="startDate"
                                                                        dateFormat="dd/MM/yyyy"
                                                                        autoComplete='off'
                                                                    />
                                                                    {this.state.errMsg && <span className="text-danger">{this.state.errMsg.end_date}</span>}
                                                                </div>
                                                                <div className="mb-3 col-sm-6 col-12">
                                                                    <label htmlFor="exampleInputEmail1" className="field__label">Type <strong className="text-danger" > *</strong></label>
                                                                    <Select
                                                                        // isMulti
                                                                        placeholder="Type"
                                                                        value={this.state.userType}
                                                                        onChange={this.handleUserType}
                                                                        options={userType}
                                                                        isClearable={true}
                                                                        getOptionLabel={e => (
                                                                            <div style={{ display: "flex", alignItems: "center" }}>

                                                                                <span style={{ marginLeft: 5 }}>{e.label}</span>
                                                                            </div>
                                                                        )}
                                                                    />

                                                                    {this.state.errMsg && <span className="text-danger">{this.state.errMsg.flow_type}</span>}
                                                                </div>
                                                                {this.state.userType.value === "Automatic" ?
                                                                    <div className="mb-3 col-sm-6 col-12">
                                                                        <label htmlFor="exampleInputEmail1" className="field__label">Frequency <strong className="text-danger" > *</strong></label>
                                                                        <Select
                                                                            // isMulti
                                                                            placeholder="Select Frequency"
                                                                            value={this.state.frequency}
                                                                            onChange={this.handleFrequency}
                                                                            options={frequencyList}
                                                                            isClearable={true}
                                                                            getOptionLabel={e => (
                                                                                <div style={{ display: "flex", alignItems: "center" }}>

                                                                                    <span style={{ marginLeft: 5 }}>{e.label}</span>
                                                                                </div>
                                                                            )}
                                                                        />

                                                                        {this.state.errMsg && <span className="text-danger">{this.state.errMsg.frequency}</span>}
                                                                    </div>
                                                                    : ""}
                                                                {this.state.frequency.value === "Specific Days" ?
                                                                    <div className="mb-3 col-sm-6 col-12">
                                                                        <label htmlFor="exampleInputEmail1" className="field__label">Days of the week <strong className="text-danger" > *</strong></label>
                                                                        <div className="d-flex d-flexwrap weekDays-selector">

                                                                            <input className="form-check-input" onChange={(e) => this.handleSeriesWeek(e, 0)} type="checkbox" value="" id="Mon" />
                                                                            <label className="form-check-label" htmlFor="Mon">
                                                                                Mon
                                                                            </label>

                                                                            <input className="form-check-input" onChange={(e) => this.handleSeriesWeek(e, 1)} type="checkbox" value="" id="Tue" />
                                                                            <label className="form-check-label" htmlFor="Tue">
                                                                                Tue
                                                                            </label>

                                                                            <input className="form-check-input" onChange={(e) => this.handleSeriesWeek(e, 2)} type="checkbox" value="" id="Wed" />
                                                                            <label className="form-check-label" htmlFor="Wed">
                                                                                Wed
                                                                            </label>

                                                                            <input className="form-check-input" onChange={(e) => this.handleSeriesWeek(e, 3)} type="checkbox" value="" id="Thu" />
                                                                            <label className="form-check-label" htmlFor="Thu">
                                                                                Thu
                                                                            </label>

                                                                            <input className="form-check-input" onChange={(e) => this.handleSeriesWeek(e, 4)} type="checkbox" value="" id="Fri" />
                                                                            <label className="form-check-label" htmlFor="Fri">
                                                                                Fri
                                                                            </label>

                                                                            <input className="form-check-input" onChange={(e) => this.handleSeriesWeek(e, 5)} type="checkbox" value="" id="Sat" />
                                                                            <label className="form-check-label" htmlFor="Sat">
                                                                                Sat
                                                                            </label>
                                                                            <input className="form-check-input" onChange={(e) => this.handleSeriesWeek(e, 6)} type="checkbox" value="" id="Sun" />
                                                                            <label className="form-check-label" htmlFor="Sun">
                                                                                Sun
                                                                            </label>
                                                                            <br />
                                                                        </div>
                                                                        {this.state.errMsg && <span className="text-danger">{this.state.errMsg.specific_days}</span>}
                                                                    </div>
                                                                    : ""}
                                                                <div className="">
                                                                    <div className="col-3 mt-5">
                                                                        <Button type='submit' color="primary" className='btn_2 btn__primary w-100 btn-block rounded-pill p-3'>
                                                                            Submit
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <CompassMenu activePage="Guides" RotationDegree={this.state.RotationDegree} />
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
