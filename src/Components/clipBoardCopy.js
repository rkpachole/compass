/* eslint-disable linebreak-style */
import React, { Component } from "react";
import Navbar from "../Components/Layout/Navbar/Index";
import RightSidebar from "../Components/Layout/RightSidebar/Index";
import CompassMenu from "../Components/Layout/CompassMenuBar";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button } from "reactstrap";
import { Redirect } from "react-router-dom";
// import { Button } from "reactstrap";

export default class profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: JSON.parse(localStorage.getItem("token")),
            user: JSON.parse(localStorage.getItem("userData")),
            first_name: "",
            last_name: "",
            email: "",
            errMsg: "",
            scsMsg: "",
            isLoading: false,
            // data: "12345",
            value: ""
        };

    }


    onCopy = () => {
        this.setState({ copied: true }, () => setTimeout(() => {
            this.setState({ copied: false });
        }, 1000));
    };

    render() {
        if (!this.state.user) {
            return <Redirect to="/" />;
        }
        const Code =
            `
<script>
let sct = document.createElement("script");
sct.type = "text/javascript";
sct.src = "https://qa-compass.tekclansolutions.com/root.min.js?v="+Math.floor(Math.random() * 100);
document.getElementsByTagName('head')[0].append(sct);

let lnk = document.createElement("link");
lnk.href = "https://qa-compass.tekclansolutions.com/main.css?v="+Math.floor(Math.random() * 100);
lnk.type = "text/css";
lnk.rel = "stylesheet";
document.getElementsByTagName('head')[0].append(lnk);

var script   = document.createElement("script");
script.type  = "text/javascript";
script.innerHTML = 'var compassAccountId = "${this.state.user.account_id}" , compassAccountSecret="", compassAccountScope = "basic";';
document.body.append(script);
</script>
`;

        return (
            <>
                <Navbar activePage="script" />
                <div className='page'>
                    <div className='page__wrapper'>
                        <div className='page__center container-fluid'>
                            <div className='row'>
                                <div className='col-12 col-md-12 col-lg-12 col-xl-9'>
                                    <div className=''>
                                        <div className='page__wrapper-conten'>
                                            <div className='page__content page__content_pt64'>
                                                <div>
                                                    <h4>Script Compass</h4>
                                                    <pre className="code-script card card-body mt-4 pb-4">
                                                        {Code}
                                                        <CopyToClipboard text={Code}
                                                            onCopy={() => navigator.clipboard.writeText(Code)}>

                                                            <div className="text-center">
                                                                <Button color="primary"
                                                                    onClick={() => this.onCopy()}>
                                                                    {this.state.copied ? "Copied" : "Copy to clipboard"}
                                                                </Button>
                                                            </div>
                                                        </CopyToClipboard>
                                                    </pre>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <CompassMenu MenuBar={true} />
                                </div>
                                <RightSidebar />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
