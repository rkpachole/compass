import React, { Component } from "react";
import { Progress } from "reactstrap";


export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: [],
            name: "",
            value: "",
            data: "",
            progressDataList: [],
            user: JSON.parse(localStorage.getItem("userData")),
            token: JSON.parse(localStorage.getItem("token")),
            navigate: false,
            isLoading: false,
            fromDateTime: "",
            toDateTime: "",





        };
    }

    render() {
        return (

            <div className="col-xxl-6 col-md-6">

                <div className="h-100 card">
                    <div className="pb-0 card-header bg-transparent border-0">
                        <h4 className="mb-0 mt-2 text-center">No. Of Guides Per Segmentation</h4>
                    </div>
                    <div className="card-body">

                        <div>
                            {this.props.progress.length > 0 ?
                                this.props.progress.map((person, index) => (
                                    <div key={index} className="mb-2"> <p className="mb-1 fw-bold"> <i className="fab fa-telegram-plane me-1 text-info"></i> {person.name} <span className="float-end">{person.count}</span></p> <Progress color="info" value={person.value} />
                                    </div>

                                ))
                                : <div className="text-center w-100 my-4 h4">No Records</div>
                            } </div>

                    </div>

                </div>
            </div>

        );
    }


}
