// /* eslint-disable linebreak-style */
// import React, { Component } from "react";
// import Chart1 from "../../../../Assets/img/chart1.png";
// import { Redirect } from "react-router-dom";
// // import Compassicon  from "../../../../Assets/img/compass-icon.png";
// import Navbar from "../../../Layout/Navbar/Index";
// import RightSidebar from "../../../Layout/RightSidebar/Index";
// import CompassMenu from "../../../Layout/CompassMenuBar";

// export default class Index extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             user: JSON.parse(localStorage.getItem("userData")),
//             navigate: false
//         };
//     }
//     onLogoutHandler = () => {
//         localStorage.removeItem("isLoggedIn");
//         localStorage.removeItem("userData");
//         localStorage.removeItem("switchUser");
//         const check = localStorage.getItem("checkbox");
//         if (check === "false" || check === false)
//             localStorage.removeItem("checkbox");
//         this.setState({
//             navigate: true,
//         });
//     };
//     render() {
//         if (this.state.navigate) {
//             return <Redirect to="/" push={true} />;
//         }
//         if (!this.state.user) {
//             return <Redirect to="/" />;
//         }
//         if (this.state.user && this.state.user.user_type !== "Guide Manager") {
//             return <Redirect to="/guide/dashboard" />;
//         }
//         return (
//             <div>
//                 <Navbar />
//                 <div className='page'>
//                     <div className='page__wrapper'>
//                         <div className='page__center container-fluid'>
//                             <div className='row'>
//                                 <div className='col-9'>
//                                     <div className=''>
//                                         <div className='page__wrapper-conten'>
//                                             <div className='mb-5 text-center'>
//                                                 {/* <LineChart width={400} height={400} data={data}>
//                                                         <Line type="monotone" dataKey="uv" stroke="#8884d8" />
//                                                     </LineChart> */}
//                                                 <img className="sidebar__pic sidebar__pic_black" src={Chart1} alt="" />
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <CompassMenu activePage="Dashboard" />
//                                 </div>
//                                 <div className='col-3'>
//                                     <RightSidebar />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

/* eslint-disable linebreak-style */
import React, { Component } from "react";
// import Chart1 from "../../../../Assets/img/chart1.png";
import { Redirect } from "react-router-dom";
// import Compassicon  from "../../../../Assets/img/compass-icon.png";
import Navbar from "../../../Layout/Navbar/Index";
import RightSidebar from "../../../Layout/RightSidebar/Index";
import CompassMenu from "../../../Layout/CompassMenuBar";

import Chart1 from "./Chart1/Index";
import Chart2 from "./Chart2/Index";
import Chart3 from "./Chart3/Index";
import Chart4 from "./Chart4/Index";
import Chart5 from "./Chart5/Index";
import BarChart1 from "./BarChart1/Index";
import BarChart2 from "./BarChart2/Index";
import Barchart3 from "./Barchart3/Index";
import RadialChat from "./RadialChat/Index";
import ProgressChat from "./ProgressChat/Index";
import Map from "./Map/Index";
import axios from "axios";
import { APIURL } from "../../../../Constant/common";
import "rsuite/dist/styles/rsuite-default.css";
import "../Calender.css";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { DateRangePicker } from "rsuite";

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RotationDegree: 0,
            user: JSON.parse(localStorage.getItem("userData")),
            navigate: false,
            mapData: [],
            startDate: "",
            endDate: "",
            value: [new Date(), new Date()],
            token: JSON.parse(localStorage.getItem("token")),
            isLoading: false,
            fromDateTime: "",
            toDateTime: "",
            filterType: "Day",
            highCompletionData: [],
            high: [],
            low: [],
            LowCompletionData: [],
            mostUsedGuides: [],
            mostUsedGuidesStatus: true,
            progressDataList: [],
            GuidesPerformance: [],
            activeUser: [],
            firstTimeUsers: [],
            averageTimeData: [],
            activFirstTimeUser: [],
            aveargeSessionDuration: [],
            radial: [],
            activeDay: false,
            activeWeek: false,
            activeMonth: false,
            activeYear: false,
            date: "",
            series: [{
                data: [],
            }],
            activeUsers: [
                { "Active User": 400, }, { "Active User": 300, }, { "Active User": 500, }, { "Active User": 280, },
                { "Active User": 590, }, { "Active User": 390, }, { "Active User": 690, }, { "Active User": 300, }, { "Active User": 500, },
            ],
            firstUser: [
                { "First Time User": 400, }, { "First Time User": 300, }, { "First Time User": 500, }, { "First Time User": 280, },
                { "First Time User": 590, }, { "First Time User": 390, }, { "First Time User": 690, }, { "First Time User": 300, }, { "First Time User": 500, },

            ],
            aveageData: [
                { "Average Users": 400, }, { "Average Users": 300, }, { "Average Users": 500, }, { "Average Users": 280, },
                { "Average Users": 590, }, { "Average Users": 390, }, { "Average Users": 690, }, { "Average Users": 300, }, { "Average Users": 500, },
            ],
        };
        this.onChange = this.onChange.bind(this);


    }
    calcAngleDegrees(e) {
        this.setState({
            RotationDegree: (180 * e.clientX) / screen.width
        });
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

    onChange(filterType, value) {
        this.setState({ value });
        const start = value.filter((item, index) => index === 0);
        const end = value.filter((item, index) => index === 1);
        this.selectDateCalender(start, end, "Custom");
        this.setState({
            fromDateTime: start,
            toDateTime: end,
            activeDay: false,
            activeWeek: false,
            activeMonth: false,
            activeYear: false,
        }, () => this.setState({ filterType: filterType }));
    }
    selectDateCalender(fromDate, toDate, filtertype) {
        this.getMostUsedGuide(fromDate, toDate);
        this.getHighToLowCompletionRate(fromDate, toDate);
        this.getLowToHighCompletionrate(fromDate, toDate);
        this.getGuidesPerSegment(fromDate, toDate);
        this.getOverallGuidesPerformance(fromDate, toDate);
        this.getActiveUsers(fromDate, toDate);
        this.getFirstTimeUsers(fromDate, toDate);
        this.getAveragesessionData(fromDate, toDate, filtertype);
        this.getAveargeSessionDuration(fromDate, toDate, filtertype);
        this.getActiveUserAndFirstTime(fromDate, toDate, filtertype);
        this.mapCounty(fromDate, toDate);
    }
    handleDate = () => {
        // console.log("dates", new Date());
        let newDate = new Date();
        this.setState({
            fromDateTime: newDate,
            toDateTime: newDate,
            activeDay: true,
            activeWeek: false,
            activeMonth: false,
            activeYear: false,
            value: [new Date(), new Date()],
        }, () => {
            this.selectDateCalender(this.state.fromDateTime, this.state.toDateTime, "Day");
        });
    };
    handleweek() {
        let newDate = new Date();
        var first = newDate.getDate() - newDate.getDay();
        var today = new Date;
        var firstday = new Date(newDate.setDate(first));
        this.setState({
            fromDateTime: firstday,
            toDateTime: today,
            activeDay: false,
            activeWeek: true,
            activeMonth: false,
            activeYear: false,
            value: [firstday, new Date()],
        }, () => {
            this.selectDateCalender(firstday, today, "Week");
        });
    }
    handleMonth = () => {
        var date = new Date();
        var fromDateTime = new Date(date.getFullYear(), date.getMonth(), 1);
        this.setState({
            fromDateTime,
            toDateTime: date,
            activeDay: false,
            activeWeek: false,
            activeMonth: true,
            activeYear: false,
            value: [new Date(date.getFullYear(), date.getMonth(), 1), new Date()],
        }, () => {
            this.selectDateCalender(this.state.fromDateTime, this.state.toDateTime, "Month");

        });
    };
    handleYear = () => {
        var date = new Date();
        // var month = date.getMonth() - 4;
        // var fromDateTime = new Date(date.getFullYear(), month, 1);
        const currentYear = new Date().getFullYear();
        const firstDay = new Date(currentYear, 0, 1);
        console.log(firstDay);
        this.setState({
            fromDateTime: firstDay,
            toDateTime: date,
            activeDay: false,
            activeWeek: false,
            activeMonth: false,
            activeYear: true,
            value: [firstDay, new Date()],
        }, () => {
            this.selectDateCalender(this.state.fromDateTime, this.state.toDateTime, "Year");

        });
    };
    getHighToLowCompletionRate = (fromDate, toDate) => {
        var token = this.state.token;
        const formData = new FormData();

        formData.append("fromDateTimeFilter", dateFormat(fromDate, "yyyy-mm-dd"));
        formData.append("toDateTimeFilter", dateFormat(toDate, "yyyy-mm-dd"));
        axios
            .post(APIURL + "admin/graph/get-guides-with-high-to-low-completion-rate", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    isLoading: false,
                    // highCompletionData: response.data.data,
                });
                var high = response.data.data;
                let data = [];
                for (var c = 0; c < high.length; c++) {
                    data.push({ name: high[c].name, short_name: high[c].short_name + (c + 1), Completed: high[c].uv, Pending: high[c].pv });
                }
                if (data.length == 2) {
                    data.push({ name: "", short_name: "", Completed: 0, Pending: 0 });
                }
                this.setState({
                    high: data
                });
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    isLoading: false,
                });
            });
    };
    getLowToHighCompletionrate = (fromDate, toDate) => {
        var token = this.state.token;
        const formData = new FormData();

        formData.append("fromDateTimeFilter", dateFormat(fromDate, "yyyy-mm-dd"));
        formData.append("toDateTimeFilter", dateFormat(toDate, "yyyy-mm-dd"));
        axios
            .post(APIURL + "admin/graph/get-guides-with-low-to-high-completion-rate", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    isLoading: false,
                    // LowCompletionData: response.data.data

                });
                let low = response.data.data;
                let data = [];
                for (var c = 0; c < low.length; c++) {
                    data.push({ name: low[c].name, short_name: low[c].short_name + (c + 1), Completed: low[c].uv, Pending: low[c].pv });
                }
                if (data.length == 2) {
                    data.push({ name: "", short_name: "", Completed: 0, Pending: 0 });
                }
                this.setState({ low: data });
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    isLoading: false,
                });
            });
    };
    getMostUsedGuide = (fromDate, toDate) => {
        var token = this.state.token;
        const formData = new FormData();
        formData.append("fromDateTimeFilter", dateFormat(fromDate, "yyyy-mm-dd"));
        formData.append("toDateTimeFilter", dateFormat(toDate, "yyyy-mm-dd"));

        axios
            .post(APIURL + "admin/graph/get-most-used-guides", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    isLoading: false,
                    mostUsedGuides: response.data.data

                });
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    isLoading: false,
                });
            });
    };
    getGuidesPerSegment = (fromDate, toDate) => {
        var token = this.state.token;
        const formData = new FormData();

        formData.append("fromDateTimeFilter", dateFormat(fromDate, "yyyy-mm-dd"));
        formData.append("toDateTimeFilter", dateFormat(toDate, "yyyy-mm-dd"));
        axios
            .post(APIURL + "admin/graph/get-guides-per-segmentation", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {

                this.setState({
                    isLoading: false,
                    progressDataList: response.data.data

                });
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    isLoading: false,
                });
            });
    };
    getOverallGuidesPerformance = (fromDate, toDate) => {
        var token = this.state.token;
        const formData = new FormData();

        formData.append("fromDateTimeFilter", dateFormat(fromDate, "yyyy-mm-dd"));
        formData.append("toDateTimeFilter", dateFormat(toDate, "yyyy-mm-dd"));
        axios
            .post(APIURL + "admin/graph/get-overall-guides-performance", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    isLoading: false,
                    GuidesPerformance: response.data.data

                });

            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    isLoading: false,
                });
            });
    };
    getActiveUsers = (fromDate, toDate) => {
        var token = this.state.token;
        const formData = new FormData();

        formData.append("fromDateTimeFilter", dateFormat(fromDate, "yyyy-mm-dd"));
        formData.append("toDateTimeFilter", dateFormat(toDate, "yyyy-mm-dd"));
        axios
            .post(APIURL + "admin/graph/get-active-users", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    isLoading: false,
                    activeUser: response.data.data

                });

            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    isLoading: false,
                });
            });
    };
    getFirstTimeUsers = (fromDate, toDate) => {
        var token = this.state.token;
        const formData = new FormData();

        formData.append("fromDateTimeFilter", dateFormat(fromDate, "yyyy-mm-dd"));
        formData.append("toDateTimeFilter", dateFormat(toDate, "yyyy-mm-dd"));
        axios
            .post(APIURL + "admin/graph/get-first-time-users", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    isLoading: false,
                    firstTimeUsers: response.data.data

                });

            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    isLoading: false,
                });
            });
    };
    getAveragesessionData = (fromDate, toDate, filtertype) => {
        var token = this.state.token;
        const formData = new FormData();

        formData.append("fromDateTimeFilter", dateFormat(fromDate, "yyyy-mm-dd"));
        formData.append("toDateTimeFilter", dateFormat(toDate, "yyyy-mm-dd"));
        formData.append("filterType", filtertype);
        axios
            .post(APIURL + "admin/graph/get-average-time", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                // console.log("raksha",response.data.data);
                this.setState({
                    isLoading: false,
                    averageTimeData: response.data.data

                });

            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    isLoading: false,
                });
            });
    };
    getActiveUserAndFirstTime = (fromDate, toDate, filtertype) => {
        var token = this.state.token;
        const formData = new FormData();

        formData.append("fromDateTimeFilter", dateFormat(fromDate, "yyyy-mm-dd"));
        formData.append("toDateTimeFilter", dateFormat(toDate, "yyyy-mm-dd"));
        formData.append("filterType", filtertype);
        axios
            .post(APIURL + "admin/graph/get-active-and-first-time-users", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    isLoading: false,
                    activFirstTimeUser: response.data.data.graph,
                    recordIn: response.data.data.recordIn

                });

            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    isLoading: false,
                });
            });
    };
    getAveargeSessionDuration = (fromDate, toDate, filtertype) => {
        var token = this.state.token;
        const formData = new FormData();
        formData.append("fromDateTimeFilter", dateFormat(fromDate, "yyyy-mm-dd"));
        formData.append("toDateTimeFilter", dateFormat(toDate, "yyyy-mm-dd"));
        formData.append("filterType", filtertype);
        axios
            .post(APIURL + "admin/graph/get-average-session-duration", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                // console.log("aveargeSessionDuration", response.data.data.graph);
                this.setState({
                    isLoading: false,
                    // aveargeSessionDuration: response.data.data.graph,
                    recordInMonth: response.data.data.recordIn
                });
                var high = response.data.data.graph;
                let data = [];
                for (var c = 0; c < high.length; c++) {
                    data.push({ name: high[c].name, average: high[c].Average, hours: high[c].hours });
                }
                this.setState({
                    aveargeSessionDuration: data
                });

            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    isLoading: false,
                });
            });
    };

    mapCounty = (fromDate, toDate) => {
        var token = this.state.token;
        const formData = new FormData();
        formData.append("fromDateTimeFilter", dateFormat(fromDate, "yyyy-mm-dd"));
        formData.append("toDateTimeFilter", dateFormat(toDate, "yyyy-mm-dd"));
        axios
            .post(APIURL + "admin/graph/get-users-across-the-world", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    mapData: response.data.data
                });
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    isLoading: false,
                });
            });
    };
    componentDidMount() {
        setTimeout(() => {
            // this.getCountries(this.state.fromDateTime, this.state.toDateTime);
        }, 3000);
        let newDate = new Date();
        this.setState({
            fromDateTime: newDate,
            toDateTime: newDate,
            activeDay: true,
            activeWeek: false,
            activeMonth: false,
            activeYear: false,
            value: [new Date(), new Date()],
        });
        this.selectDateCalender(this.state.fromDateTime, this.state.toDateTime, "Day");
        // this.getMostUsedGuide(this.state.fromDateTime, this.state.toDateTime);
        // this.getHighToLowCompletionRate(this.state.fromDateTime, this.state.toDateTime);
        // this.getLowToHighCompletionrate(this.state.fromDateTime, this.state.toDateTime);
        // this.getGuidesPerSegment(this.state.fromDateTime, this.state.toDateTime);
        // this.getOverallGuidesPerformance(this.state.fromDateTime, this.state.toDateTime);
        // this.getActiveUsers(this.state.fromDateTime, this.state.toDateTime);
        // this.getFirstTimeUsers(this.state.fromDateTime, this.state.toDateTime);
        // this.getAveragesessionData(this.state.fromDateTime, this.state.toDateTime);
        // this.getActiveUserAndFirstTime(this.state.fromDateTime, this.state.toDateTime);
        // this.getAveargeSessionDuration(this.state.fromDateTime, this.state.toDateTime);
        // this.mapCounty(this.state.fromDateTime, this.state.toDateTime);
    }
    render() {
        if (this.state.navigate) {
            return <Redirect to="/" push={true} />;
        }
        if (!this.state.user) {
            return <Redirect to="/" />;
        }
        if (this.state.user && this.state.user.user_type !== "Guide Manager") {
            return <Redirect to="/guide/dashboard" />;
        }
        return (
            <div onMouseOver={(e) => this.calcAngleDegrees(e)}>
                <Navbar />
                <div className='page'>
                    <div className='page__wrapper'>
                        <div className='page__center container-fluid'>
                            <div className='row'>
                                <div className='col-12 col-md-12 col-lg-12 col-xl-9'>
                                    <div className=''>
                                        <div className='page__wrapper-conten dashboard'>
                                            <div className="row">
                                                <div className="d-flex justify-content-center align-items-center mb-4">
                                                    <div className="">
                                                        <div className="card">
                                                            <div className="">
                                                                <ul className="nav justify-content-center">

                                                                    <li className="nav-item">
                                                                        <Link className={this.state.activeDay ? "nav-link active" : "nav-link"} style={{ cursor: "pointer" }} aria-current="page"
                                                                            onClick={() => this.handleDate()} >Day</Link>

                                                                    </li>
                                                                    <li className="nav-item">
                                                                        <Link className={this.state.activeWeek ? "nav-link active" : "nav-link"} style={{ cursor: "pointer" }} aria-current="page"
                                                                            onClick={() => this.handleweek()} >Week</Link>
                                                                    </li>
                                                                    <li className="nav-item">
                                                                        <Link className={this.state.activeMonth ? "nav-link active" : "nav-link"} style={{ cursor: "pointer" }} aria-current="page"
                                                                            onClick={() => this.handleMonth()} >Month</Link>
                                                                    </li>

                                                                    <li className="nav-item">
                                                                        <Link className={this.state.activeYear ? "nav-link active" : "nav-link"} style={{ cursor: "pointer" }} aria-current="page"
                                                                            onClick={() => this.handleYear()}
                                                                        >Year</Link>
                                                                    </li>
                                                                    <li className="nav-item">
                                                                        <DateRangePicker
                                                                            value={this.state.value}
                                                                            onChange={this.onChange.bind(this, "Custom")}
                                                                        /></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Chart1 data={this.state.activeUsers} ActiveUser={this.state.activeUser} />
                                                <Chart2 firstUsers={this.state.firstUser} First={this.state.firstTimeUsers} />
                                                <Chart3 AverageData={this.state.aveageData} Time={this.state.averageTimeData} />
                                                <Chart4 activFirstTimeUser={this.state.activFirstTimeUser} recordIn={this.state.recordIn} />
                                                <Chart5 duration={this.state.aveargeSessionDuration} recordIn={this.state.recordInMonth} cundata={this.state.cundata} />
                                                <BarChart1 BarData={this.state.high} />
                                                <div className='text-center'>
                                                    <BarChart2 Data={this.state.low} /></div>
                                                <Barchart3 mostUsedGuides={this.state.mostUsedGuides} />
                                                <RadialChat radial={this.state.GuidesPerformance} />
                                                <ProgressChat progress={this.state.progressDataList} />
                                                <Map mapData={this.state.mapData} data={{
                                                    fromDate: this.state.fromDateTime,
                                                    toDate: this.state.toDateTime,
                                                    filterType: this.state.filterType
                                                }} />
                                            </div>
                                        </div>
                                    </div>
                                    <CompassMenu activePage="Dashboard" RotationDegree={this.state.RotationDegree} />
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