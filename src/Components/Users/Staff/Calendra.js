import React, { Component } from "react";
// import "./App.css";
import { WorldMap } from "react-svg-worldmap";

class Index extends Component {
    constructor() {
        super();
        this.state = {
            data:
                [
                    { country: "cn", value: 1389618778 }, // china
                    { country: "in", value: 1311559204 }, // india
                    { country: "us", value: 331883986 },  // united states
                    { country: "id", value: 264935824 },  // indonesia
                    { country: "pk", value: 210797836 },  // pakistan
                    { country: "br", value: 210301591 },  // brazil
                    { country: "ng", value: 208679114 },  // nigeria
                    { country: "bd", value: 161062905 },  // bangladesh
                    { country: "ru", value: 141944641 },  // russia
                    { country: "mx", value: 127318112 }   // mexico
                ],

        };


    }
    stylingFunction = (context) => {
        const opacityLevel = 0.1 + (1.5 * (context.countryValue - context.minValue) / (context.maxValue - context.minValue));
        return {
            fill: context.country === "US" ? "blue" : context.color,
            fillOpacity: opacityLevel,
            stroke: "green",
            strokeWidth: 1,
            strokeOpacity: 0.2,
            cursor: "pointer"
        };
    };

    render() {
        return (
            <div className="App" >
                <WorldMap color="#0DA4F5" title="Top 10 Populous Countries" className="text-center"
                    tooltipBgColor={"#0DA4F5"}
                    value-suffix="people" size="lg" data={this.state.data} />
            </div>
        );
    }
}
export default Index;