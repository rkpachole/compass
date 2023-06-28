import React, { Component } from "react";
import { ResponsiveContainer, XAxis, AreaChart, Area, Tooltip, YAxis } from "recharts";


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
                <div className="h-md-100 card">

                    <div className="pb-0 card-header bg-transparent border-0">
                        <h4 className="mb-0 mt-2 text-center">Active Users & First Time Users</h4>
                    </div>
                    <div className="d-flex justify-content-between align-items-end card-body">
                        {this.props.activFirstTimeUser.length > 0 ?
                            <ResponsiveContainer width="100%" height={260}>


                                <AreaChart width={730} height={250} data={this.props.activFirstTimeUser}
                                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                                    <YAxis allowDecimals={false} type="number" domain={[0, "dataMax + 1"]}   />
                                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                    <Tooltip />
                                    <Area type="monotone" dataKey="Active User" stroke="#9CC3F2" fill="#D1E4FB"  stackId="Active User" />
                                    <Area type="monotone" dataKey="First Time User" stroke="#C0BCED" fill="#DDDBF3" />
                                </AreaChart>
                                {/* <LineChart data={this.props.activFirstTimeUser}
                                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                                    <YAxis type="number" domain={[dataMin => (0 - Math.abs(dataMin)), dataMax => (dataMax * 2)]} interval="preserveStart" />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="Active User" stroke="#9CC3F2" />
                                    <Line type="monotone" dataKey="First Time User" stroke="#C0BCED" />
                                </LineChart> */}
                            </ResponsiveContainer>
                            : <div className="text-center w-100 my-4 h4">No Records</div>
                        }
                    </div> <div className="d-flex justify-content-center mb-2"><h4>{this.props.activFirstTimeUser.length > 0 ? this.props.recordIn : ""}</h4></div>
                </div>
            </div>
        );
    }
}
