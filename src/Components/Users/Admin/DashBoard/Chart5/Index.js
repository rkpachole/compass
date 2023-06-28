
import React, { Component } from "react";
import { ResponsiveContainer, XAxis, AreaChart, Area, Tooltip, YAxis } from "recharts";
// import moment from "moment";

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="border" style={{ textAlign: "left", backgroundColor: "white", padding: "10px", borderWidth: "5px", borderColor: "#fc0" }}>
                <p className="text-dark">{payload[0].payload.name}</p>
                <p style={{ color: "#edd363" }} >{`${"Average Time"} : ${(payload[0].payload.average)}`}</p>
            </div>
        );
    }
    return null;
};

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: "",
            endDate: "",
            value: [],
            user: JSON.parse(localStorage.getItem("userData")),
            token: JSON.parse(localStorage.getItem("token")),
        };

    }

    render() {
        return (
            <div className="col-md-12 mt-4">
                <div className="h-100 card">
                    <div className="pb-0 card-header bg-transparent border-0">
                        <h4 className="mb-0 mt-2 text-center">Average Session Duration</h4>
                    </div>
                    <div className="d-flex justify-content-between align-items-end card-body">
                        {this.props.duration.length > 0 ?
                            <ResponsiveContainer width="100%" height={250}>
                                <AreaChart data={this.props.duration}
                                    margin={{ top: 10, right: 40, left: 30, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" />
                                    <YAxis
                                        type="number"
                                        dataKey="hours"
                                        allowDecimals={true}
                                        tickFormatter={(tick) => {
                                            return `${tick}`;
                                        }}
                                        domain={["auto", "auto"]}
                                        unit="-hour"
                                    />
                                    <Tooltip contentStyle={{ textAlign: "left" }} content={<CustomTooltip />} />
                                    <Area type="monotone" dataKey="hours" stroke="#D4BF5B" fill="#E7DCAC " />
                                </AreaChart>
                            </ResponsiveContainer>

                            : <div className="text-center w-100 my-4 h4">No Records</div>
                        }
                    </div>
                    <div className="d-flex justify-content-center mb-2"><h4>{this.props.duration.length > 0 ? this.props.recordIn : ""}</h4></div>
                </div>
            </div >
        );
    }
}
