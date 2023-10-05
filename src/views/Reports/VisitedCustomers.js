/* eslint-disable react-hooks/exhaustive-deps */
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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModalBody,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { MyApiUrl } from "src/services/service";
import DateFilter from "../masters/DateFilter";
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };

const VisitedCustomers = (props) => {
  console.log(props);
  const EmployeeType = props.location.state.data.propsData.EMPLOYEE_TYPE_NAME;
  const EmployeeSubType =
    props.location.state.data.propsData.EMPLOYEE_SUB_TYPE_NAME;
  const EmployeeHQ = props.location.state.data.propsData.HQ_NAME;
  const Company = props.location.state.data.propsData.COMPANY_NAME;
  const EmployeeName = props.location.state.data.propsData.EMPLOYEE_NAME;
  const EmployeeEmail = props.location.state.data.propsData.EMPLOYEE_EMAIL;
  const ContactNumber = props.location.state.data.propsData.EMPLOYEE_CONTACT;
  const JoiningDate = props.location.state.data.propsData.EMPLOYEE_DOJ;
  const EmployeeID = props.location.state.data.propsData.EMPLOYEE_PKID;

  const AttendenceDate = props.location.state.data.i.MDate;

  const [block, setBlock] = useState(false);
  const [Remark, setRemark] = useState();
  const [ResponseData, setResponseData] = useState([]);

  const GetEmployeeOrders = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url:
        MyApiUrl +
        "/getCustomersDetailsFromAttendenceDate/" +
        EmployeeID +
        "/" +
        AttendenceDate,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data);
        setResponseData(response.data);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ToExcel = () => {
    document.getElementById("divLoading").className = "show";
    var cnt = 0;
    // eslint-disable-next-line no-array-constructor
    var csvData = new Array();
    csvData.push(
      '"Sl No","Employee Type","Employee Sub Type","HQ","Company","Employee Name","Employee Email","Contact Number","Visited Date","Visited Time","Customer Category","Customer Type","Customer Sub Type","Customer Name","Email","Contact Number","Firm Name"'
    );
    ResponseData.map((item) => {
      let idate = new Date(
        new Date(item.EMPLOYEE_VISITED_CUSTOMERS_DATE)
          .toISOString()
          .split("T")[0]
      );
      let dateMDY = `${idate.getDate().toString().padStart(2, "0")}-${(
        idate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${idate.getFullYear()}`;

      let visitedTime = new Date(item.EMPLOYEE_VISITED_CUSTOMERS_TIME)
        .toISOString()
        .split("T")[1]
        .slice(0, -1);
      return (
        cnt++,
        csvData.push(
          '"' +
          cnt +
          '","' +
          EmployeeType +
          '","' +
          EmployeeSubType +
          '","' +
          EmployeeHQ +
          '","' +
          Company +
          '","' +
          EmployeeName +
          '","' +
          EmployeeEmail +
          '","' +
          ContactNumber +
          '","' +
          dateMDY +
          '","' +
          visitedTime +
          '","' +
          item.CUSTOMER_CATEGORY_NAME +
          '","' +
          item.CUSTOMER_TYPE_NAME +
          '","' +
          item.CUSTOMER_SUBTYPE_NAME +
          '","' +
          item.CUSTOMER_NAME +
          '","' +
          item.CUSTOMER_EMAIL +
          '","' +
          item.CUSTOMER_MOBILE +
          '","' +
          item.CUSTOMER_FIRM_NAME +
          '"'
        )
      );
    });

    const fileName = "Employee Visited Customers.csv";
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

  const ViewRemark = (remarks) => {
    setRemark(remarks);
    setBlock(!block);
  };

  React.useEffect(() => {
    GetEmployeeOrders();
  }, []);
  let history = useHistory();
  return (
    <div>
      <div id="divLoading"> </div>
      <h1 id="ccmaster">Employee Attendance</h1>
      <br />
      <CRow>
        <CCol md="2" />
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
                        <CCol col="6">Employee Details</CCol>
                        <CCol col="6">
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
                          <table id="customerDetails" style={{ width: "100%" }}>
                            <tr>
                              <td style={{ borderRight: "1px solid #7e0103" }}>
                                <tr>
                                  <th>
                                    <b>Employee Type :</b>
                                  </th>
                                  <td>{EmployeeType}</td>
                                </tr>
                                <tr>
                                  <th>
                                    <b>Employee Sub Type :</b>
                                  </th>
                                  <td>{EmployeeSubType}</td>
                                </tr>
                                <tr>
                                  <th>
                                    <b>HQ :</b>
                                  </th>
                                  <td>{EmployeeHQ}</td>
                                </tr>
                                <tr>
                                  <th>
                                    <b>Company :</b>
                                  </th>
                                  <td>{Company}</td>
                                </tr>
                              </td>
                              <td style={{ borderRight: "1px solid #7e0103" }}>
                                <tr>
                                  <th>
                                    <b>Employee Name :</b>
                                  </th>
                                  <td>{EmployeeName}</td>
                                </tr>
                                <tr>
                                  <th>
                                    <b>Email Address :</b>
                                  </th>
                                  <td>{EmployeeEmail}</td>
                                </tr>
                                <tr>
                                  <th>
                                    <b>Contact Number :</b>
                                  </th>
                                  <td>{ContactNumber}</td>
                                </tr>
                                <tr>
                                  <th>
                                    <b>Joining Date :</b>
                                  </th>
                                  <td>{JoiningDate}</td>
                                </tr>
                              </td>
                            </tr>
                          </table>
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCard>
                  <CCard>
                    <CCardHeader>
                      Visited Customers ( {<DateFilter date={AttendenceDate} />} )
                    </CCardHeader>
                    <CCardBody>
                      <CRow>
                        <CCol md="12">
                          <div style={{ overflow: "auto" }}>
                            <table id="Attendence">
                              <thead>
                                <tr>
                                  <th>Sl</th>
                                  <th>Visited Date</th>
                                  <th>Visited Time</th>
                                  <th>Customer Category</th>
                                  <th>Customer Type</th>
                                  <th>Customer Sub Type</th>
                                  <th>Customer Name</th>
                                  <th>Email</th>
                                  <th>Contact Number</th>
                                  <th>Contact People Name</th>
                                  <th>Contact People Email</th>
                                  <th>Contact People Alt Email</th>
                                  <th>Contact People Number</th>
                                  <th>Contact People Alt Number</th>
                                  <th>Remark</th>
                                </tr>
                              </thead>
                              <tbody>
                                {ResponseData.map((i, index) => {
                                  return (
                                    <tr>
                                      <td>{index + 1}</td>
                                      <td>
                                        {
                                          <DateFilter
                                            date={
                                              i.EMPLOYEE_VISITED_CUSTOMERS_DATE
                                            }
                                          />
                                        }
                                      </td>
                                      <td>
                                        {new Date(
                                          i.EMPLOYEE_VISITED_CUSTOMERS_TIME
                                        )
                                          .toISOString()
                                          .split("T")[1]
                                          .slice(0, -1)}
                                      </td>
                                      <td>{i.CUSTOMER_CATEGORY_NAME}</td>
                                      <td>{i.CUSTOMER_TYPE_NAME}</td>
                                      <td>{i.CUSTOMER_SUBTYPE_NAME}</td>
                                      <td>{i.CUSTOMER_NAME}</td>
                                      <td>{i.CUSTOMER_EMAIL}</td>
                                      <td>{i.CUSTOMER_MOBILE}</td>
                                      <td>{i.CUSTOMER_CONTACT_PERSON_NAME}</td>
                                      <td>{i.CUSTOMER_CONTACT_PERSON_EMAIL}</td>
                                      <td>{i.CUSTOMER_CONTACT_PERSON_EMAIL2}</td>
                                      <td>{i.CUSTOMER_CONTACT_PERSON_PHO}</td>
                                      <td>{i.CUSTOMER_CONTACT_PERSON_PHO2}</td>
                                      <td>
                                        <CRow>
                                          <CCol md="8">
                                            <CButton
                                              color="primary"
                                              size="sm"
                                              id="AddEmp"
                                              style={{ fontSize: "12px" }}
                                              onClick={() => {
                                                ViewRemark(
                                                  i.EMPLOYEE_VISITED_CUSTOMERS_REMARK
                                                );
                                              }}
                                            >
                                              Click Here
                                            </CButton>
                                          </CCol>
                                        </CRow>
                                      </td>
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
      <CModal show={block} onClose={() => setBlock(!block)} color="dark">
        <CModalHeader closeButton>
          <CModalTitle>Visited Remark</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <p style={{ marginLeft: "2%" }}>
              {Remark}
            </p>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setBlock(!block)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default VisitedCustomers;
