/* eslint-disable linebreak-style */
import React, { Component } from "react";
import axios from "axios";
import { APIURL } from "../../../../Constant/common";
import { Button, Spinner } from "reactstrap";
import { Redirect, Link } from "react-router-dom";
import Select from "react-select";
import Navbar from "../../../Layout/Navbar/Index";
import RightSidebar from "../../../Layout/RightSidebar/Index";
import CompassMenu from "../../../Layout/CompassMenuBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dateFormat from "dateformat";

const frequencyList = [
    { value: "Only Once", label: "Only Once" },
    { value: "Everyday Once", label: "Everyday Once" },
    { value: "Specific Days", label: "Specific Days", },
    { value: "Always", label: "Always" },
];

export default class Add extends Component {
    constructor(props) {
        super(props);

        this.state = {
            RotationDegree:0,
            token: JSON.parse(localStorage.getItem("token")),
            FlowType: [
                { value: "", label: "Select" },
                { value: "Manual", label: "Manual" },
                { value: "Automatic", label: "Automatic" },
            ],
            name: "",
            SelectedFlowType: "",
            Frequency: "",
            selectedSegments: { value: "", label: "select" },
            seriesweekArr: [{ name: "Mon", status: false }, { name: "Tue", status: false }, { name: "Wed", status: false }, { name: "Thu", status: false }, { name: "Fri", status: false }, { name: "Sat", status: false }, { name: "Sun", status: false }],
            Days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            frequencyList: [],
            selectedType: [],
            selectedweek: [],
            segmentList: [],
            selectedList: [],
            startDate: new Date("2015-03-25"),
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
    handleFlowType = (FlowType) => {
        console.log(FlowType);
        this.setState({
            SelectedFlowType: FlowType
        });
        if (FlowType.value !== "Automatic") {
            this.setState({
                frequency: { value: "", label: "Select" },
                weeks: []
            });
        }
    };
    handleFrequency = (frequency) => {
        console.log("frequency", frequency.value);
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
            .post(APIURL + "guide-manager/active-segment-list", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                let segmentList = response.data.data;
                for (var c = 0; c < segmentList.length; c++) {
                    this.state.segmentList.push({ value: segmentList[c].id, label: segmentList[c].name });
                }
                this.setState({
                    isLoading: false,
                }, () => this.editGuideDetail());

            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false
                });
            });
    };
    handleSegments = (selectedSegments) => {
        console.log(selectedSegments);
        this.setState({
            selectedSegments: selectedSegments === null ? [] : selectedSegments,
            errMsg: ""
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
    UpdateGuide = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        this.setState({ isLoading: true });
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
        formData.append("id", this.props.match.params.guide_id);
        formData.append("flow_type", this.state.SelectedFlowType.value);
        formData.append("name", this.state.name);
        if (this.state.SelectedFlowType.value === "Manual") {
            formData.append("frequency", "");
            formData.append("specific_days", "");
        }
        if (this.state.SelectedFlowType.value === "Automatic") {
            formData.append("frequency", this.state.frequency.value);
            if (this.state.frequency.value === "Specific Days") {
                formData.append("specific_days", SelectedWeekDays);
            }
        }
        formData.append("start_date", dateFormat(this.state.startDate, "yyyy-mm-dd"));
        formData.append("end_date", dateFormat(this.state.endDate, "yyyy-mm-dd"));
        formData.append("segment_id", JSON.stringify(this.state.selectedSegments.value) ? JSON.stringify(this.state.selectedSegments.value) : "");

        axios
            .post(APIURL + "guide-manager/update-guide", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    scsMsg: response.data.message,
                    isLoading: false,
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
    editGuideDetail = () => {
        var token = this.state.token;
        const formData = new FormData();
        formData.append("id", this.props.match.params.guide_id);
        this.setState({ isLoading: true });
        axios
            .post(APIURL + "guide-manager/edit-guide", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    SelectedFlowType: { "value": response.data.data.flow_type, "label": response.data.data.flow_type },
                    startDate: new Date(response.data.data.start_date),
                    endDate: new Date(response.data.data.end_date),
                    name: response.data.data.name,
                    isLoading: false
                });
                let found = "";
                found = this.state.segmentList.filter(element => element.value == parseInt(response.data.data.segment_id));
                if (found.length > 0) {
                    this.setState({ selectedSegments: { value: found[0].value, label: found[0].label } });
                }
                let org = response.data.data.specific_days.split(",");
                let map = {};
                this.state.Days.forEach(i => map[i] = false);
                org.forEach(i => map[i] === false && (map[i] = true));
                let jsonArray = Object.keys(map).map(k => ({ name: k, status: map[k] }));

                this.setState({
                    seriesweekArr: jsonArray
                });
                this.setState({ frequency: { "value": response.data.data.frequency, "label": response.data.data.frequency }, });

                // const Type = [response.data.data.flow_type];
                // let SelectedType = Type.reduce((acc, value) => {
                //     const matches = this.state.FlowType.filter(message => message.value === value);
                //     if (matches.length > 0) {
                //         acc = acc.concat(matches);
                //     }
                //     console.log("typeee",acc);
                //     return acc;
                // }, []);
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    Loader: false,
                    isLoading: false
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
        console.log("props", this.props);
        if (this.state.redirect) {
            return <Redirect to="/guide/guides" />;
        }
        return (
            <div onMouseOver={(e) => this.calcAngleDegrees(e)}>
                {this.state.isLoading && <div className="loader"><Spinner color="dark" type="border" >Loading...</Spinner></div>}
                <Navbar activePage="profile" />
                <div className="page">
                    <div className="page__wrapper">
                        <div className="page__center container-fluid">
                            <div className="row">
                                <div className="col-12 col-md-12 col-lg-12 col-xl-9">
                                    <div className="">
                                        <div className="page__wrapper-conten">
                                            <div className="page__content page__content_pt64">
                                                <div className="page__stat">
                                                    <div className="page__title h4 mt-0 d-flex align-items-center"><Link className="back-btn" to="/guide/guides"><i className="fas fa-angle-left"></i></Link> Edit Guide </div>
                                                    {this.state.scsMsg ? <div className="alert alert-success" role="alert">
                                                        {this.state.scsMsg}
                                                    </div> : ""}
                                                    <div className="profile-apge">
                                                        <form noValidate className="" onSubmit={(e) => this.UpdateGuide(e)}>
                                                            <div className="row">
                                                                <div className="mb-3 col-sm-6 col-12">
                                                                    <label htmlFor="exampleInputEmail1" className="field__label">Guide Name <strong className="text-danger" > *</strong></label>
                                                                    <div className="input-block">
                                                                        <input type="text" value={this.state.name} onChange={this.onChangehandlerName} className="form-control" required />
                                                                        <span className="placeholder">
                                                                            Name
                                                                        </span>
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
                                                                        isClearable={true}
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
                                                                        name="startDate"
                                                                        dateFormat="dd/MM/yyyy"
                                                                        autoComplete="off"
                                                                    />
                                                                    {this.state.errMsg && <span className="text-danger">{this.state.errMsg.end_date}</span>}
                                                                </div>
                                                                <div className="mb-3 col-sm-6 col-12">
                                                                    <label htmlFor="exampleInputEmail1" className="field__label">Type <strong className="text-danger" > *</strong></label>
                                                                    <Select
                                                                        // isMulti
                                                                        placeholder="Type"
                                                                        value={this.state.SelectedFlowType}
                                                                        onChange={this.handleFlowType}
                                                                        options={this.state.FlowType}
                                                                    />

                                                                    {this.state.errMsg && <span className="text-danger">{this.state.errMsg.flow_type}</span>}
                                                                </div>
                                                                {this.state.SelectedFlowType.value === "Automatic" ?
                                                                    <div className="mb-3 col-sm-6 col-12">
                                                                        <label htmlFor="exampleInputEmail1" className="field__label">Frequency <strong className="text-danger" > *</strong></label>
                                                                        <Select
                                                                            // isMulti
                                                                            placeholder="Select Frequency"
                                                                            value={this.state.frequency}
                                                                            onChange={this.handleFrequency}
                                                                            options={frequencyList}
                                                                            getOptionLabel={e => (
                                                                                <div style={{ display: "flex", alignItems: "center" }}>

                                                                                    <span style={{ marginLeft: 5 }}>{e.label}</span>
                                                                                </div>
                                                                            )}
                                                                        />

                                                                        {this.state.errMsg && <span className="text-danger">{this.state.errMsg.frequency}</span>}
                                                                    </div>
                                                                    : ""}
                                                                {this.state.SelectedFlowType.value === "Automatic" && this.state.frequency.value === "Specific Days" ?
                                                                    <div className="mb-3 col-sm-6 col-12">
                                                                        <label htmlFor="exampleInputEmail1" className="field__label">Days of the week <strong className="text-danger" > *</strong></label>
                                                                        <div className="d-flex d-flexwrap weekDays-selector">
                                                                            <input className="form-check-input" checked={this.state.seriesweekArr[0]["status"] == true || this.state.seriesweekArr[0]["status"] == "true"} onChange={(e) => this.handleSeriesWeek(e, 0)} type="checkbox" value="" id="Mon" />
                                                                            <label className="form-check-label" htmlFor="Mon">
                                                                                Mon
                                                                            </label>

                                                                            <input className="form-check-input" checked={this.state.seriesweekArr[1]["status"] == true || this.state.seriesweekArr[1]["status"] == "true"} onChange={(e) => this.handleSeriesWeek(e, 1)} type="checkbox" value="" id="Tue" />
                                                                            <label className="form-check-label" htmlFor="Tue">
                                                                                Tue
                                                                            </label>

                                                                            <input className="form-check-input" checked={this.state.seriesweekArr[2]["status"] == true || this.state.seriesweekArr[2]["status"] == "true"} onChange={(e) => this.handleSeriesWeek(e, 2)} type="checkbox" value="" id="Wed" />
                                                                            <label className="form-check-label" htmlFor="Wed">
                                                                                Wed
                                                                            </label>

                                                                            <input className="form-check-input" checked={this.state.seriesweekArr[3]["status"] == true || this.state.seriesweekArr[3]["status"] == "true"} onChange={(e) => this.handleSeriesWeek(e, 3)} type="checkbox" value="" id="Thu" />
                                                                            <label className="form-check-label" htmlFor="Thu">
                                                                                Thu
                                                                            </label>

                                                                            <input className="form-check-input" checked={this.state.seriesweekArr[4]["status"] == true || this.state.seriesweekArr[4]["status"] == "true"} onChange={(e) => this.handleSeriesWeek(e, 4)} type="checkbox" value="" id="Fri" />
                                                                            <label className="form-check-label" htmlFor="Fri">
                                                                                Fri
                                                                            </label>

                                                                            <input className="form-check-input" checked={this.state.seriesweekArr[5]["status"] == true || this.state.seriesweekArr[5]["status"] == "true"} onChange={(e) => this.handleSeriesWeek(e, 5)} type="checkbox" value="" id="Sat" />
                                                                            <label className="form-check-label" htmlFor="Sat">
                                                                                Sat
                                                                            </label>
                                                                            <input className="form-check-input" checked={this.state.seriesweekArr[6]["status"] == true || this.state.seriesweekArr[6]["status"] == "true"} onChange={(e) => this.handleSeriesWeek(e, 6)} type="checkbox" value="" id="Sun" />
                                                                            <label className="form-check-label" htmlFor="Sun">
                                                                                Sun
                                                                            </label>
                                                                            {this.state.errMsg && <span className="text-danger">{this.state.errMsg.specific_days}</span>}
                                                                        </div>
                                                                        {/* {this.state.errMsg && <span className="text-danger">{this.state.errMsg.segment_condition}</span>} */}
                                                                    </div>

                                                                    : ""}
                                                                <div className="">
                                                                    <div className="col-3 mt-5">
                                                                        <Button type="submit" color="primary" className="btn_2 btn__primary w-100 btn-block rounded-pill p-3">
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
                                    <CompassMenu activePage="Guides" RotationDegree={this.state.RotationDegree}  />
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
