import React, { Component } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell } from "recharts";


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            COLORS: ["#FAA040"],
            norecord: false

        };
    }

    render() {
        // console.log("activeUsers",this.props.mostUsedGuides);
        return (
            <div className="col-xxl-12 col-md-12">
                <div className="card mb-4 chartbar4">
                    <div className="pb-0 card-header bg-transparent border-0">
                        <h4 className="mb-0 mt-2 text-center">Most Used Guides</h4>
                    </div>

                    <div className="card-body py-0" >
                        <div className="position-relative" >
                            {this.props.mostUsedGuides.length > 0 ?
                                <ResponsiveContainer height={this.props.mostUsedGuides.length*50} width="100%" >
                                    <BarChart
                                        data={this.props.mostUsedGuides}
                                        barSize={24}
                                        barCategoryGap={30}
                                        layout={"vertical"}
                                        margin={{ top: 20, left: 50,right:-30, bottom: 50 }}
                                    >
                                        {/* <Tooltip /> */}
                                        <XAxis type={"number"}
                                            hide={true}
                                            mirror={false}
                                            tickLine={false}
                                            orientation={"bottom"}
                                            axisLine={false}
                                            domain={[0, "dataMax"]} reversed >
                                        </XAxis>
                                        <YAxis   width={200}  dataKey="name" type="category" orientation={"right"} axisLine={false} tickLine={false} scale="point"  />
                                        <Bar dataKey={"value"} label={{ fill: "black", fontSize: 10, position: "right" }} labelLine={true}  >
                                            {
                                                this.props.mostUsedGuides.map((entry, index) => (
                                                    <Cell key={index} fill={this.state.COLORS[index % this.state.COLORS.length]} />
                                                ))
                                            }

                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                                :<div className="text-center w-100 my-4 h4">No Records</div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        );

    }
}
export default Index;
