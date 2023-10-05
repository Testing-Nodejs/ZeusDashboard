/**
 * @author KIMOSABE
 * @email Kimosabe@mail.com
 * @create date 2021-11-25 17:00:15
 * @modify date 2021-12-06 15:32:46
 * @desc [description]
 */

import React, { useState } from "react";
import axios from "axios";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CInput,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { MyApiUrl } from "src/services/service";
import DateFilter from "../masters/DateFilter";
import Swal from "sweetalert2";
import "../../style.css";

const CurrentDayReport = (props) => {

  const [ResponseData, setResponseData] = useState([]);
  const [fromDate, setfromDate] = useState();
  const [toDate, settoDate] = useState();
  const [kimo, setkimo] = useState();
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const GetAllAttendance = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "GetCurrentDayReport",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        setResponseData(response.data);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });

    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var date = new Date();
    setkimo(months[date.getMonth()] + " " + date.getFullYear());
  };

  const FilterDates = () => {
    if (fromDate === "" || fromDate === null || fromDate === undefined) {
      Toast.fire({
        icon: "warning",
        title: "Please Select From Date!",
      });
    } else if (toDate === "" || toDate === null || toDate === undefined) {
      Toast.fire({
        icon: "warning",
        title: "Please Select To Date!",
      });
    } else {
      document.getElementById("divLoading").className = "show";
      setkimo(fromDate + " TO " + toDate);

      axios({
        method: "GET",
        url: MyApiUrl + "GetCurrentDayReportBydate/" + fromDate + "/" + toDate,
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          setResponseData(response.data);
          document.getElementById("divLoading").className = "hide";
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const ToExcel = () => {
    document.getElementById("divLoading").className = "show";
    var cnt = 0;
    // eslint-disable-next-line no-array-constructor
    var csvData = new Array();
    csvData.push(
      '"Sl No","Employee Type","Employee Sub Type","HQ","Company","Employee Name","Employee Email","Contact Number","Date","Week Name","Attendance","Login Time","Login Latitude","Login Longitude","Total Orders","Visited Customers","Logout Time","Logout Latitude","Logout Longitude"'
    );
    let Status = "";
    ResponseData.map((item) => {
      if (item.AttStatus === "0") {
        Status = "Absent";
      } else if (item.AttStatus === "1") {
        Status = "Present";
      } else if (item.AttStatus === "2") {
        Status = "Leave";
      }
      let idate = new Date(new Date(item.MDate).toISOString().split("T")[0]);
      let dateMDY = `${idate.getDate().toString().padStart(2, "0")}-${(
        idate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${idate.getFullYear()}`;
      return (
        cnt++,
        csvData.push(
          '"' +
            cnt +
            '","' +
            item.EMPLOYEE_TYPE_NAME +
            '","' +
            item.EMPLOYEE_SUB_TYPE_NAME +
            '","' +
            item.HQ_NAME +
            '","' +
            item.COMPANY_NAME +
            '","' +
            item.EMPLOYEE_NAME +
            '","' +
            item.EMPLOYEE_EMAIL +
            '","' +
            item.EMPLOYEE_CONTACT +
            '","' +
            dateMDY +
            '","' +
            item.WeekName +
            '","' +
            Status +
            '","' +
            item.LoginTime +
            '","' +
            item.LoginLat +
            '","' +
            item.LoginLong +
            '","' +
            item.TotalOrders +
            '","' +
            item.VisitedCustomer +
            '","' +
            item.LogoutTime +
            '","' +
            item.LogoutLat +
            '","' +
            item.LogoutLong +
            '"'
        )
      );
    });

    const fileName = "Employee Attendance List ( " + kimo + " ).csv";
    const buffer = csvData.join("\n");
    const blob = new Blob([buffer], {
      type: "text/csv;charset=utf8;",
    });

    //IN IE
    const link = document.createElement("a");
    if (link.download !== undefined) {
      link.setAttribute("href", window.URL.createObjectURL(blob));
      link.setAttribute("download", fileName);
      link.style = "visibility:hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, fileName);
    } else {
    }
    document.getElementById("divLoading").className = "hide";
  };

  React.useEffect(() => {
    GetAllAttendance();
  }, []);
  let history = useHistory();
  return (
    <div>
      <div id="divLoading"> </div>
      <h1 id="ccmaster">Current Day Report</h1>
      <CRow style={{ marginTop: "3%" }}>
        <CCol md="2" />
        <CCol md="12">
        <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
            <CCardBody>
              <br />
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>
                      <CRow>
                        <CCol md="4">Report ( {kimo} )</CCol>
                        <CCol md="2">
                          <CInput
                            type="date"
                            onChange={(event) => {
                              setfromDate(event.target.value);
                            }}
                            value={fromDate}
                          />
                        </CCol>
                        <CCol md="2">
                          <CInput
                            type="date"
                            onChange={(event) => {
                              settoDate(event.target.value);
                            }}
                            value={toDate}
                          />
                        </CCol>
                        <CCol md="2">
                          <CButton
                            size="sm"
                            color="info"
                            style={{ width: "100%" }}
                            onClick={FilterDates}
                          >
                            GET
                          </CButton>
                        </CCol>
                        <CCol col="2">
                          <CButton
                            onClick={ToExcel}
                            color="primary"
                            style={{
                              marginTop: "0%",
                            }}
                            size="sm"
                            id="AddEmp"
                          >
                            Export To Excel
                          </CButton>
                        </CCol>
                      </CRow>
                    </CCardHeader>
                    <CCardBody>
                      <CRow>
                        <CCol md="12">
                          <div style={{ overflow: "auto" }}>
                            <table id="Attendence">
                              <thead>
                                <tr>
                                  <th>Sl</th>
                                  <th>Date</th>
                                  <th>Week Name</th>
                                  <th>Employee Name</th>
                                  <th>Attendance</th>
                                  <th>Login Time</th>
                                  <th>Login Lat</th>
                                  <th>Login Long</th>
                                  <th>Total Orders</th>
                                  <th>Visited Customers</th>
                                  <th>Logout Time</th>
                                  <th>Logout Lat</th>
                                  <th>Logout Long</th>
                                </tr>
                              </thead>
                              <tbody>
                                {ResponseData.map((i, index) => {
                                  let cname = "";
                                  if (i.AttStatus === "0") {
                                    cname = '<p class="absent">Absent</p>';
                                  } else if (i.AttStatus === "1") {
                                    cname = '<p class="present">Present</p>';
                                  } else if (i.AttStatus === "2") {
                                    cname = '<p class="leave">Leave</p>';
                                  }
                                  return (
                                    <tr>
                                      <td>{index + 1}</td>
                                      <td>{<DateFilter date={i.MDate} />}</td>
                                      <td>{i.WeekName}</td>
                                      <td>{i.EMPLOYEE_NAME}</td>
                                      <td>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: cname,
                                          }}
                                        />
                                      </td>
                                      <td>{i.LoginTime}</td>
                                      <td>{i.LoginLat}</td>
                                      <td>{i.LoginLong}</td>
                                      <td>
                                        <CButton
                                          onClick={() => {
                                            let propsData = {
                                              EMPLOYEE_TYPE_NAME:
                                                i.EMPLOYEE_TYPE_NAME,
                                              EMPLOYEE_SUB_TYPE_NAME:
                                                i.EMPLOYEE_SUB_TYPE_NAME,
                                              HQ_NAME: i.HQ_NAME,
                                              COMPANY_NAME: i.COMPANY_NAME,
                                              EMPLOYEE_NAME: i.EMPLOYEE_NAME,
                                              EMPLOYEE_EMAIL: i.EMPLOYEE_EMAIL,
                                              EMPLOYEE_CONTACT:
                                                i.EMPLOYEE_CONTACT,
                                              EMPLOYEE_DOJ: i.EMPLOYEE_DOJ,
                                              EMPLOYEE_PKID: i.EmpID,
                                            };
                                            history.push("/EmployeeOrders", {
                                              data: { i, propsData },
                                            });
                                          }}
                                        >
                                          {i.TotalOrders}
                                        </CButton>
                                      </td>
                                      <td>
                                        <CButton
                                          onClick={() => {
                                            let propsData = {
                                              EMPLOYEE_TYPE_NAME:
                                                i.EMPLOYEE_TYPE_NAME,
                                              EMPLOYEE_SUB_TYPE_NAME:
                                                i.EMPLOYEE_SUB_TYPE_NAME,
                                              HQ_NAME: i.HQ_NAME,
                                              COMPANY_NAME: i.COMPANY_NAME,
                                              EMPLOYEE_NAME: i.EMPLOYEE_NAME,
                                              EMPLOYEE_EMAIL: i.EMPLOYEE_EMAIL,
                                              EMPLOYEE_CONTACT:
                                                i.EMPLOYEE_CONTACT,
                                              EMPLOYEE_DOJ: i.EMPLOYEE_DOJ,
                                              EMPLOYEE_PKID: i.EmpID,
                                            };
                                            history.push("/VisitedCustomers", {
                                              data: { i, propsData },
                                            });
                                          }}
                                        >
                                          {i.VisitedCustomer}
                                        </CButton>
                                      </td>
                                      <td>{i.LogoutTime}</td>
                                      <td>{i.LogoutLat}</td>
                                      <td>{i.LogoutLong}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md="2" />
      </CRow>
    </div>
  );
};

export default CurrentDayReport;
