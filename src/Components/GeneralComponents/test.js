import React, { Component } from "react";
import type { CountryContext } from "react-svg-worldmap";
import WorldMap from "react-svg-worldmap";

export default class test extends Component {
    constructor() {
        super();
        this.state = {
            date: [
                { country: "us", value: 331883986 },  // united states
                { country: "id", value: 264935824 },  // indonesia
                { country: "pk", value: 210797836 },  // pakistan
                { country: "br", value: 210301591 },  // brazil
                { country: "ng", value: 208679114 },  // nigeria
                { country: "bd", value: 161062905 },  // bangladesh
                { country: "ru", value: 141944641 },  // russia
                { country: "mx", value: 127318112 },   // mexico
                { country: "cn", value: 1389618778 }, // china
                { country: "in", value: 1311559204 },// india
                { country: "lk", value: 10 } // Sri lanka
            ],
        };
    }
    stylingFunction = ({
        countryValue,
        countryCode,
        minValue,
        maxValue,
        color,
    }: CountryContext) => {
        const opacityLevel = countryValue
            ? 0.1 + (1.5 * (countryValue - minValue)) / (maxValue - minValue)
            : 0;
        return {
            fill: countryCode === "US" ? "blue" : color,
            fillOpacity: opacityLevel,
            stroke: "green",
            strokeWidth: 1,
            strokeOpacity: 0.2,
            cursor: "pointer",
        };
    };
    render() {
        return (
            <div>
                <WorldMap
                    color="red"
                    tooltipBgColor="#D3D3D3"
                    title="Custom Styles Map"
                    valueSuffix="points"
                    data={this.state.data}
                    frame
                    styleFunction={this.stylingFunction}
                />
            </div>
        );
    }
}
