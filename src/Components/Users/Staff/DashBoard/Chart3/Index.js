import React, { Component } from "react";
import { ResponsiveContainer, Area, AreaChart, } from "recharts";



export default class Index extends Component {
    render() {
        // console.log("mostUsedGuides",this.props.AverageData);
        return (
            <div className="col-xxl-4 col-md-4 mb-3 mb-md-0">
                <div className="h-100 card">
                    <div className="pb-0 card-header bg-transparent border-0">
                        <h6 className="mb-0 mt-2">Average Session Duration<span><i className="fas fa-arrow-up text-success ms-1"></i></span></h6>
                    </div>
                    <div className="d-flex justify-content-between align-items-end card-body flex-wrap">
                        <div>
                            <h4 className="mb-1 text-700 fw-normal lh-1">{this.props.Time}</h4>
                            {/* <div className="me-2 fs--2 badge badge-soft-success rounded-pill text-success">+3.5%</div> */}
                        </div>
                        <div>
                            <ResponsiveContainer width={180} height="100%" aspect={3}>
                                <AreaChart data={this.props.AverageData}
                                    margin={{ top: 10, right: 40, left: 10, bottom: 10 }}>
                                    {/* <Tooltip /> */}

                                    <Area type="monotone" dataKey="Average Users" stroke="#D4BF5B" fill="#E7DCAC" />
                                </AreaChart>
                            </ResponsiveContainer>

                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
