import React, { Component } from "react";
import { ResponsiveContainer, Area, AreaChart } from "recharts";


export default class Index extends Component {
    render() {
       
        return (
            <div className="col-xxl-4 col-md-4 mb-3 mb-md-0">
                <div className="h-100 card">
                    <div className="pb-0 card-header bg-transparent border-0">
                        <h6 className="mb-0 mt-2">Active Users<span><i className="fas fa-arrow-up text-success ms-1"></i></span></h6>
                    </div>
                    <div className="d-flex justify-content-between align-items-end card-body flex-wrap">
                        <div>
                            <h4 className="mb-1 text-700 fw-normal lh-1">{this.props.ActiveUser}</h4>
                            {/* <div className="me-2 fs--2 badge badge-soft-success rounded-pill text-success">+3.5%</div> */}
                        </div>
                        <div>
                            <ResponsiveContainer width={200} height="100%" aspect={3}>
                                <AreaChart data={this.props.data}
                                    margin={{ top: 10, right: 10, left:0, bottom: 10 }}>
                                    {/* <Tooltip /> */}

                                    <Area type="monotone" dataKey="Active User" stroke="#9CC3F2" fill="#D1E4FB" />
                                </AreaChart>
                            </ResponsiveContainer>

                        </div>

                    </div>
                </div>
            </div>

        );
    }
}
