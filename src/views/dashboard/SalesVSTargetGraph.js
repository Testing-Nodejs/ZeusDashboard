/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import "../../../src/style.css";
import "../../../src/Dashboard.scss";
import {
    CCol,
    CRow,
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
} from "@coreui/react";
import axios from "axios";
import { MyApiUrl } from "src/services/service";
import { useHistory } from "react-router-dom";
import ShowChart from "@material-ui/icons/ShowChart";
import Assessment from "@material-ui/icons/Assessment";
import Payments from "@material-ui/icons/Payment";
import Book from "@material-ui/icons/Book";
import Highcharts from "highcharts";
import drilldow from "highcharts/modules/drilldown.js";
import HighchartsReact from "highcharts-react-official";

const SalesVSTargetGraph = (props) => {
    console.log(props);
    const EmployeeID = props.location.state.data.EMPLOYEE_PKID;
    const EmployeeName = props.location.state.data.EMPLOYEE_NAME;
    const [Response, setResponse] = useState([]);
    const [Responsedrill, setResponsedrill] = useState({});
    const [EmpCount, setEmpCount] = useState([]);
    const [OrderCnt, setOrderCnt] = useState([]);

    const GetAllCompanies = () => {
        axios({
            method: "GET",
            url: MyApiUrl + "getTargetVsSales/" + EmployeeID,
            headers: {
                "content-type": "application/json",
            },
        })
            .then((response) => {
                setResponse(response.data.Kimosabey);
                setResponsedrill(response.data.kimoObj);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const option2 = {
        title: {
            text: "Sales VS Target",
        },
        chart: {
            type: 'column'
        },
        xAxis: [{
            type: 'category'
        }, {
            type: 'category'
        }],

        legend: {
            enabled: false
        },

        series: Response,
        drilldown: Responsedrill
    }

    // const option2 = {
    //     title: {
    //         text: "Expenses VS Sales",
    //     },
    //     chart: {
    //         type: 'column'
    //     },
    //     xAxis: [{
    //         type: 'category'
    //     }, {
    //         type: 'category'
    //     }],

    //     legend: {
    //         enabled: false
    //     },

    //     series: [{
    //         name: 'Sales',
    //         colorByPoint: true,
    //         data: [{
    //             name: '2020',
    //             y: 5,
    //             drilldown: '2020'
    //         }, {
    //             name: '2021',
    //             y: 2,
    //             drilldown: '2021'
    //         }, {
    //             name: '2022',
    //             y: 4,
    //             drilldown: '2022'
    //         }]
    //     }, {
    //         name: 'Target',
    //         type: 'line',
    //         colorByPoint: true,
    //         data: [4, 8, 2]
    //     }],
    //     drilldown: {
    //         series: [{
    //             id: '2020',
    //             data: [
    //                 ['Jan', 4],
    //                 ['Feb', 2],
    //                 ['Mar', 1],
    //                 ['April', 2],
    //                 ['May', 1]
    //             ]
    //         }, {
    //             id: '2021',
    //             data: [
    //                 ['Nov', 4],
    //                 ['Dec', 2]
    //             ]
    //         }, {
    //             id: '2022',
    //             data: [
    //                 ['Sep', 4],
    //                 ['Oct', 2],
    //                 ['Nav', 2],
    //                 ['Dec', 2]
    //             ]
    //         }]
    //     }
    // }

    if (option2.drilldown) drilldow(Highcharts);


    React.useEffect(() => {
        GetAllCompanies();
    }, []);
    let history = useHistory();
    return (
        <div>
            <CRow>
                <CCol md="12">
                    <CCard>
                        <CCardBody>
                            <CRow>
                                <CCol md="1">
                                    <CButton
                                        color="danger"
                                        size="sm"
                                        onClick={() => history.goBack()}
                                    >
                                        Back
                                    </CButton>
                                </CCol>
                            </CRow>
                            <br />
                            <CRow>
                                <CCol>
                                    <CCard>
                                        <CCardHeader>
                                            <CRow>
                                                <CCol col="6">( {EmployeeName} ) Sales VS Target Graphs</CCol>
                                            </CRow>
                                        </CCardHeader>
                                        <CCardBody>
                                            <CRow>
                                                <CCol
                                                    md="12"
                                                    style={{ borderRight: "1px solid rgb(217 217 217)" }}
                                                >
                                                    <HighchartsReact
                                                        highcharts={Highcharts}
                                                        options={option2}
                                                    />
                                                </CCol>
                                            </CRow>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div >
    );
};

export default SalesVSTargetGraph;
