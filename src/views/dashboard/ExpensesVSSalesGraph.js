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

const ExpensesVSSalesGraph = (props) => {
    const EmployeeID = props.location.state.data.EMPLOYEE_PKID;
    const EmployeeName = props.location.state.data.EMPLOYEE_NAME;
    const [Response, setResponse] = useState([]);
    const [Responsedrill, setResponsedrill] = useState({});
    const [EmpCount, setEmpCount] = useState([]);
    const [OrderCnt, setOrderCnt] = useState([]);

    const GetAllCompanies = () => {
        axios({
            method: "GET",
            url: MyApiUrl + "getSalesVsExpenses/" + EmployeeID,
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
            text: "Expenses VS Sales",
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
                                                <CCol col="6">( {EmployeeName} ) Expenses VS Sales Graphs</CCol>
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

export default ExpensesVSSalesGraph;
