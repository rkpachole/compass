import React, { Component } from "react";
import { ResponsiveContainer, Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
// const value = [
//     { "name": "Guide1", "uv": 45, "pv": 40 },
//     { "name": "Guide2", "uv": 58, "pv": 24 },
//     { "name": "Guide3", "uv": 50, "pv": 30 },
//     { "name": "Guide4", "uv": 33, "pv": 28 },
//     { "name": "Guide5", "uv": 64, "pv": 46 },
// ];


export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
        };
    }
    render() {
        const CustomTooltip = ({ active, payload }) => {
            if (active && payload && payload.length) {
                return (
                    <div className="border" style={{ textAlign: "left", backgroundColor: "white", padding: "10px", borderWidth: "5px", borderColor: "#fc0" }}>
                        <p style={{ color: "text-dark fw-bolder" }}> {payload[0].payload.name}</p>
                        <p style={{ color: "#FAA040" }}>{`${"Completed"} : ${Number(payload[1].value).toFixed(2)}`}</p>
                        <p style={{ color: "#4EBAE1" }} className="">{`${"Pending"} : ${Number(payload[0].value).toFixed(2)}`} </p>
                    </div>
                );
            }
            return null;
        };
        return (
            <div>
                <div className="col-xxl-12 col-md-12 mb-4">
                    <div className="card h-100">
                        <div className="pb-0 card-header bg-transparent border-0">
                            <h4 className="mb-0 mt-2 text-center">Guides with Low Completion rate</h4>
                        </div>
                        <div className="d-flex justify-content-between align-items-end card-body">
                            {this.props.Data.length > 0 ?
                                <ResponsiveContainer
                                    // minWidth={"30%"} width={10*this.props.Data.length+"%"}
                                    width="100%"
                                    height={250} >
                                    <BarChart
                                        width={170}
                                        height={250}
                                        data={this.props.Data}
                                        barSize={16}
                                        barCategoryGap={16}>
                                        <CartesianGrid strokeDasharray="2 2" vertical={false} horizontal={true} />
                                        <XAxis
                                            dataKey="short_name"
                                            mirror={false}
                                            tickLine={false}
                                            axisLine={false}
                                            scale="point"
                                            style={{ textAlign: "left" }}
                                            padding={{ left: 40, right: 40 }}
                                        >
                                        </XAxis>
                                        <YAxis tickFormatter={(tick) => {
                                            return `${tick}%`;
                                        }}
                                        axisLine={false} orientation="right" tickLine={false} hide={false} type="number" domain={[0, 100]} />
                                        <Tooltip contentStyle={{ textAlign: "left" }} content={<CustomTooltip />} />
                                        <Bar dataKey="Pending" fill="#4EBAE1" />
                                        <Bar dataKey="Completed" fill="#FAA040" />

                                    </BarChart>
                                </ResponsiveContainer>
                                : <div className="text-center w-100 my-4 h4">No Records</div>
                            }
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
