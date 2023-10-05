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

const CompanySalesReport = (props) => {
  const CompanyID = props.location.state.data.COMPANY_PKID;
  const CompanyName = props.location.state.data.COMPANY_NAME;
  const [Response, setResponse] = useState([]);
  const [EmpCount, setEmpCount] = useState([]);
  const [OrderCnt, setOrderCnt] = useState([]);

  const GetAllCompanies = () => {
    axios({
      method: "GET",
      url: MyApiUrl + "getsalesGraphByCompId/" + CompanyID,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        setResponse(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios({
      method: "GET",
      url: MyApiUrl + "getTotalEmpsAndOrdersByCompId/" + CompanyID,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        console.log("1",response);
        setEmpCount(response.data.EmpCount);
        setOrderCnt(response.data.OrderCount);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const options = {
    title: {
      text: "Orders Statistics",
    },
    subtitle: {
      text: "Summary",
    },
    plotOptions: {
      column: {
        borderRadius: 5,
      },
    },
    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    series: [
      {
        type: "column",
        colorByPoint: true,
        data: Response,
        showInLegend: false,
      },
    ],
  };
  console.log("2",options);


  React.useEffect(() => {
    GetAllCompanies();
  }, []);
  let history = useHistory();
  return (
    <div>
      <h1 id="ccmaster">{CompanyName} Complete Details</h1>
      <br />
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
                        <CCol col="6">{CompanyName}</CCol>
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
                            options={options}
                          />
                        </CCol>



                        <CCol md="12">
                          <CRow style={{ marginTop: "5%" }}>
                            <CCol md="3">
                              <div
                                className="container_Dashboard"
                                style={{
                                  width: "100%",
                                  padding: "15%",
                                }}
                              >
                                <CButton
                                  className="DashboardBtn"
                                  onClick={() => {
                                    history.push("/SalesReport", {
                                      data: { CompanyID, CompanyName },
                                    });
                                  }}
                                >
                                  <div className="list" style={{ margin: "0" }}>
                                    <div className="rank">
                                      <span style={{ marginBottom: "20%" }}>
                                        <ShowChart />
                                      </span>
                                    </div>
                                    <div className="creator">
                                      <h4 style={{ marginTop: "33%" }}>
                                        Sales
                                      </h4>
                                    </div>
                                  </div>
                                </CButton>
                              </div>
                            </CCol>
                            <CCol md="3">
                              <div
                                className="container_Dashboard"
                                style={{
                                  width: "100%",
                                  padding: "15%",
                                }}
                              >
                                <CButton
                                  className="DashboardBtn"
                                  onClick={() => {
                                    history.push("/TotalEmployeeByCompany", {
                                      data: { CompanyID, CompanyName },
                                    });
                                  }}
                                >
                                  <div className="list" style={{ margin: "0" }}>
                                    <div className="rank">
                                      <span>
                                        <Assessment />
                                      </span>
                                    </div>
                                    <div className="creator">
                                      <h4 style={{ marginTop: "20%" }}>
                                        Reports
                                      </h4>
                                    </div>
                                  </div>
                                </CButton>
                              </div>
                            </CCol>
                            <CCol md="3">
                              <div
                                className="container_Dashboard"
                                style={{
                                  width: "100%",
                                  padding: "15%",
                                }}
                              >
                                <CButton
                                  className="DashboardBtn"
                                  onClick={() => {
                                    history.push("/TotalOrdersFromCompany", {
                                      data: { CompanyID, CompanyName },
                                    });
                                  }}
                                >
                                  <div className="list" style={{ margin: "0" }}>
                                    <div className="rank">
                                      <span>
                                        <Book />
                                      </span>
                                    </div>
                                    <div className="creator">
                                      <h4 style={{ marginTop: "20%" }}>
                                        Orders
                                      </h4>
                                    </div>
                                  </div>
                                </CButton>
                              </div>
                            </CCol>
                            <CCol md="3">
                              <div
                                className="container_Dashboard"
                                style={{
                                  width: "100%",
                                  padding: "15%",
                                }}
                              >
                                <CButton className="DashboardBtn">
                                  <div className="list" style={{ margin: "0" }}>
                                    <div className="rank">
                                      <span>
                                        <Payments />
                                      </span>
                                    </div>
                                    <div className="creator">
                                      <h4 style={{ marginTop: "17%" }}>
                                        Payments
                                      </h4>
                                    </div>
                                  </div>
                                </CButton>
                              </div>
                            </CCol>
                          </CRow>
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
    </div>
  );
};

export default CompanySalesReport;
