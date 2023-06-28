import React, { Component } from "react";
// import { Col, TabPane, Row, NavItem, NavLink, TabContent, Nav, } from "reactstrap";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // msg: "1",
            fromDateTime: "",
            toDateTime: "",
            date: "",

        };


    }
    componentDidMount() {
        this.handleDate();
    }

    // handleDate = (e) => {
    //     const fromDateTime = new Date();
    //     this.setState({
    //         fromDateTime: e.target.value
    //     });
    // };

    handleweek = (e) => {
        alert("SDc");
        this.setState({
            fromDateTime: e.target.value
        });
        console.log("jdsv");
    };


    handleMonth = (e) => {
        alert("SDc");
        this.setState({
            fromDateTime: e.target.value
        });
        console.log("jdsv");
    };
    handleYear = (e) => {
        alert("SDc");
        this.setState({
            fromDateTime: e.target.value
        });
        console.log("jdsv");
    };
   

    handleDate = () => {
        var day = new Date();
        const current = new Date();
        var toDateTime = `${current.getFullYear()}/${current.getMonth()+1}/${day.getDate()}`;
        var fromDateTime = `${day.getDate()}/${day.getMonth()+1}/${day.getFullYear()}`;
        
        this.setState({ fromDateTime ,
            toDateTime});
        console.log("datesxxb",toDateTime);
        console.log("datesxxb",fromDateTime);
    };
   

    noRefCheck(e) {
        this.setState({ msg: e },);
    }

    render() {
        // console.log("msg", this.state.msg);
        return (
            <div>

                <div className="d-flex justify-content-center align-items-center mb-4">
                    <div className="col-xxl-5 col-md-5">

                        <div className="card">
                            <div className="">
                                {/* <h5 className="mb-2 mt-2" >Day  Week  Month   Year<span><i className="fa fa-calendar" aria-hidden="true"
                                        style={{ margin: 10, font: 20 }}></i></span></h5> */}
                                <ul className="nav justify-content-center">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page"
                                            value=""
                                            onClick={(e) => this.handleDate(e)} href="#">Day</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#" value=""
                                            onClick={(e) => this.handleweek(e)}>Week</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#" value=""
                                            onClick={(e) => this.handleMonth(e)}>Month</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#" value="" onClick={(e) => this.handleYear(e, 3)}
                                        >Year</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#"><i className="fa fa-calendar text-primary" aria-hidden="true"
                                        ></i></a>
                                    </li>
                                </ul>
                            </div>

                        </div>

                    </div>
                </div>
                {/* <div>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className="active"
                                onClick={this.noRefCheck.bind(this, "1")}
                            >
                                Day 
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className="active"
                                onClick={this.noRefCheck.bind(this, "2")}
                            >
                                Day2
                            </NavLink>
                        </NavItem>

                    </Nav>
                    <TabContent activeTab={this.state.msg}>
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">
                                    <h4>
                                        Tab 1 Contents
                                    </h4>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="12">
                                    <h4>
                                        Tab 12 Contents
                                    </h4>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>

                </div> */}
            </div >

        );
    }
}
export default Index;
