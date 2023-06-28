import React, { Component } from "react";
import { ResponsiveContainer, Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("userData")),
            token: JSON.parse(localStorage.getItem("token")),
            navigate: false,
            isLoading: false,
            fromDateTime: "",
            toDateTime: "",
            highCompletionData: [],
            date: "",
            value: "",
        };
    }

    componentDidMount() {
        let low = this.props.BarData;
        for (var c = 0; c < low.length; c++) {
            this.state.highCompletionData.push({ name: low[c].name, completion: low[c].uv, pending: low[c].pv });
        }
        
    }

    render() {
        const CustomTooltip = ({ active, payload }) => {
            if (active && payload && payload.length) {
                return (
                    <div className="border" style={{ backgroundColor: "white", padding: "10px", borderWidth: "5px", borderColor: "#fc0" }}>
                        <p style={{ color: "text-dark fw-bolder" }}> {payload[0].payload.name}</p>
                        <p style={{ color: "#FAA040" }}>{`${"Completed"} : ${Number(payload[0].value).toFixed(2)}`}</p>
                        <p style={{ color: "#4EBAE1" }} className="">{`${"Pending"} : ${Number(payload[1].value).toFixed(2)}`}</p>
                    </div>
                );
            }

            return null;
        };
        return (
            <div className="col-xxl-12 col-md-12 my-4">
                <div className="card h-100">
                    <div className="pb-0 card-header bg-transparent border-0">
                        <h4 className="mb-0 mt-2 text-center">Guides with High Completion rate</h4>
                    </div>
                    <div className="d-flex justify-content-between align-items-end card-body">
                        {this.props.BarData.length > 0 ?
                            <ResponsiveContainer
                                // minWidth={"30%"} width={10*this.props.BarData.length+"%"} 
                                width="100%"
                                height={250}>
                                <BarChart width={500} height={250} data={this.props.BarData}
                                    barSize={15}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="short_name" axisLine={false} tickLine={false}
                                        padding={{ left: 50, right: 50 }} scale="point"
                                    />
                                    <YAxis tickFormatter={(tick) => {
                                        return `${tick}%`;
                                    }} axisLine={false} tickLine={false} type="number" domain={[0, 100]} />
                                    <Tooltip content={<CustomTooltip />} />

                                    <Bar dataKey="Completed" fill="#FAA040" />
                                    <Bar dataKey="Pending" fill="#4EBAE1" />
                                </BarChart>
                            </ResponsiveContainer>
                            : <div className="text-center w-100 my-4 h4">No Records </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
