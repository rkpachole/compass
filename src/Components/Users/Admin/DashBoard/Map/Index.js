import React, { Component } from "react";
import { WorldMap } from "react-svg-worldmap";
import axios from "axios";
import { CountryContext } from "react-svg-worldmap";
import { APIURL } from "../../../../../Constant/common";
import dateFormat from "dateformat";

class Index extends Component {
    constructor() {
        super();
        this.state = {
            user: JSON.parse(localStorage.getItem("userData")),
            token: JSON.parse(localStorage.getItem("token")),
            code: "IN",
            countries: [],
            allCountry: [],
            getCountrydata: [],
            result: [],
            data: [],
            mapData: []
            // mapData:
            //     [
            //         { country: "US", value: 33 }, // united states
            //         { country: "CN", value: 138 }, // china
            //         { country: "IN", value: 131 }, // india
            //         { country: "ID", value: 26 }, // indonesia
            //         { country: "PK", value: 21 }, // pakistan
            //         { country: "BR", value: 21 }, // brazil
            //         { country: "NG", value: 20 }, // nigeria
            //         { country: "BD", value: 16 }, // bangladesh
            //         { country: "RU", value: 14 }, // russia
            //         { country: "MX", value: 12 }, // mexico

            //     ],
        };
    }

    componentDidMount() {
        this.getCountries();
    }

    UNSAFE_componentWillReceiveProps() {
        this.getCountries();
    }

    getCountries() {
        axios
            .get(APIURL + "countries")
            .then((response) => {
                let country = response.data.countries;
                let cundata = [];
                for (var c = 0; c < country.length; c++) {
                    cundata.push({ country: country[c].code });
                }
                this.setState({
                    countries: cundata
                });
                let end = [];
                for (var i = 0; i < this.props.mapData.length; i++) {
                    end.push(this.props.mapData[i].country);
                }
                this.setState({ getCountrydata: end });
            });
    }
    mapCounty = (fromDate, toDate) => {
        var token = this.state.token;
        const formData = new FormData();
        formData.append("fromDateTimeFilter", dateFormat(fromDate, "yyyy-mm-dd"));
        formData.append("toDateTimeFilter", dateFormat(toDate, "yyyy-mm-dd"));
        axios
            .post(APIURL + "admin/graph/get-users-across-the-world", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                // console.log("response1233",response.data.data);
                this.setState({
                    mapData: response.data.data
                });
            })
            .catch((error) => {
                this.setState({
                    errMsg: error.response.data.error,
                    isLoading: false,
                });
            });
    };
    stylingFunction = ({
        // countryValue,
        // minValue,
        // maxValue,
        countryCode,
        color,
    }: CountryContext) => {
        // const opacityLevel = countryValue
        //     ? 0.1 + (1.5 * (countryValue - minValue)) / (maxValue - minValue)
        //     : 0;
        return {
            fill: this.state.getCountrydata.includes(countryCode) ? "#777" : color,
            fillOpacity: 1,
            stroke: "#000",
            strokeWidth: 0,
            strokeOpacity: 0.2,
            cursor: "pointer",
            borderColor: "#000"
        };
    };
    render() {
        return (
            <div className="col-sm-12">
                <div className="card mt-4">
                    <div className="pb-0 card-header bg-transparent border-0">
                        <h4 className="text-center">Users Across The World </h4>
                    </div>
                    <div className="card-body py-0">
                        <div className="position-relative overflow-auto justify-content-center d-flex" style={{
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                            width: "100%",
                        }}>
                            <WorldMap
                                color="#999"
                                styleFunction={this.stylingFunction}
                                value-suffix="people"
                                tooltipBgColor={"#85bddb"}
                                size="xl"
                                data={this.props.mapData}

                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Index;
