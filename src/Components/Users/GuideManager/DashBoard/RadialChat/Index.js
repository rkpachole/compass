import React, { Component } from "react";
import Chart from "react-apexcharts";


export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radial: [],
            labels: [],
            options: {
                fill: {
                    colors: ["#0dcaf0", "#6c5dd3", "#ffc107"],
                },
                legend: {
                    show: true,
                    floating: true,
                    fontSize: "16px",
                    position: "right",
                    offsetX: 160,
                    offsetY: 364,
                    labels: {
                        useSeriesColors: false
                    },
                    itemMargin: {
                        horizontal: 10,
                        vertical: 10
                    },
                    inverseOrder: true
                },
                stroke: {
                    curve: "smooth",
                    lineCap: "round"
                },
                chart: {
                    animations: {
                        enabled: true,
                        easing: "easeinout",
                        speed: 2000,
                        animateGradually: {
                            enabled: true,
                            delay: 500
                        },
                        dynamicAnimation: {
                            enabled: true,
                            speed: 250
                        }
                    }
                },
                plotOptions: {
                    radialBar: {
                        size: undefined,
                        inverseOrder: false,
                        startAngle: -140,
                        endAngle: 140,
                        offsetX: 0,
                        offsetY: 0,
                        hollow: {
                            size: "50%",
                            background: "transparent"
                        },
                        track: {
                            show: true,
                            background: "#E8EAEC",
                            strokeWidth: "100%",
                            opacity: 1,
                            margin: 5
                        },
                        dataLabels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: "10px",
                                fontFamily: undefined,
                                color: undefined,
                                offsetY: 0
                            },
                            value: {
                                show: true,
                                fontSize: "20px",
                                fontFamily: undefined,
                                color: undefined,
                                offsetY: -10,
                                formatter: function (val) {
                                    return val + " %";
                                }
                            },
                            total: {
                                show: false,
                                label: "%",
                                color: "#000000",
                                // formatter: function (w) {
                                //     return (
                                //         w.globals.seriesTotals.reduce((a, b) => {
                                //             return a + b;
                                //         }, 0) /
                                //         w.globals.radial.length +
                                //         " %"
                                //     );
                                // }
                            },
                        }
                    }
                },
                labels: ["", "", ""]
            },


        };
    }


    render() {
        return (
            <div className="col-xxl-6 col-md-6">
                <div className="h-md-100 card">
                    <div className="pb-0 card-header bg-transparent border-0">
                        <h4 className="mb-0 mt-2 text-center">Guides</h4>
                    </div>
                    <div className="d-flex justify-content-center align-items-end card-body">
                        <div>
                            <Chart
                                options={this.state.options}
                                series={this.props.radial.map((value) => value.value)}
                                type="radialBar"
                                width="100%"
                                height={200}
                            />
                            <div className="col-8 m-auto mt-1">
                                {this.props.radial.map((person, index) => (
                                    <div key={index} className="mb-2">
                                        <h6> <i className={index === 0 ? "fas fa-circle me-2 text-info" : index === 1 ? "fas fa-circle me-2 text-primary" : index === 2 ? "fas fa-circle me-2  text-warning" : "fas fa-circle me-2"}></i>{person.name} </h6>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
