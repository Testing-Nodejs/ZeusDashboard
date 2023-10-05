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
  CDataTable,
  CButton,
  CLink,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { MyApiUrl, ViewImg } from "src/services/service";
import Swal from "sweetalert2";
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields = [{ key: "Sl No" }, { key: "Name" }, { key: "Document" }];

const ExpensesDocuments = (props) => {
  const Date = props.location.state.data.EMPLOYEE_EXPENSES_DATE;
  const TravelFrom = props.location.state.data.EMPLOYEE_EXPENSES_TRAVEL_FROM;
  const TravelTo = props.location.state.data.EMPLOYEE_EXPENSES_TRAVEL_TO;
  const Company = props.location.state.data.COMPANY_NAME;
  const Name = props.location.state.data.EMPLOYEE_NAME;
  const Pho = props.location.state.data.EMPLOYEE_CONTACT;
  const Distance = props.location.state.data.EMPLOYEE_EXPENSES_DISTANCE;
  const Mode = props.location.state.data.EMPLOYEE_EXPENSES_MODE;
  const DailyAllowance =
    props.location.state.data.EMPLOYEE_EXPENSES_DAILY_ALLOWANCE;
  const TotalAmount = props.location.state.data.EMPLOYEE_EXPENSES_TOTAL;
  const ExpensesID = props.location.state.data.EMPLOYEE_EXPENSES_PKID;
  const Status = props.location.state.data.EMPLOYEE_EXPENSES_STATUS;

  const [ResponseData, setResponseData] = useState([]);

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

  const GetAllOrderItems = () => {
    axios({
      method: "GET",
      url: MyApiUrl + "GetExpensesDocument/" + ExpensesID,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const items = response.data.map((item, index) => {
          return {
            ...item,
            Name: item.EMPLOYEE_EXPENSES_DOC_NAME,
            "Sl No": index + 1,
          };
        });
        setResponseData(items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetButtons = () => {
    if (Status === "0" || Status === 0) {
      return (
        <React.Fragment>
          <CCol md="1">
            <CButton
              color="primary"
              size="sm"
              onClick={() => {
                AcceptRequest();
              }}
            >
              Accept
            </CButton>
          </CCol>
          <CCol md="1">
            <CButton
              color="danger"
              size="sm"
              onClick={() => {
                RejectRequest();
              }}
            >
              Deny
            </CButton>
          </CCol>
        </React.Fragment>
      );
    } else {
      return <CCol md="2"></CCol>;
    }
  };

  const AcceptRequest = () => {
    axios.put(MyApiUrl + "AcceptEmpExpenses/" + ExpensesID).then((response) => {
      if (response.data === true) {
        Swal.fire({
          title: "Employee Expenses Accepted!",
          icon: "success",
          confirmButtonText: "OK",
        });
        history.push("/EmployeeExpenses");
      } else {
        Swal.fire({
          title: "Failed To Confirm Employee Expenses!",
          icon: "error",
          confirmButtonText: "OK",
        });
        history.push("/EmployeeExpenses");
      }
    });
  };

  const RejectRequest = () => {
    axios.put(MyApiUrl + "RejectEmpExpenses/" + ExpensesID).then((response) => {
      if (response.data === true) {
        Swal.fire({
          title: "Employee Expenses Denied!",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Failed To Deny Employee Expenses!",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });
  };

  React.useEffect(() => {
    GetAllOrderItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let history = useHistory();
  return (
    <div>
      <h1 id="ccmaster">Expenses Documents</h1>
      <CRow style={{ marginTop: "3%" }}>
        <CCol md="2" />
        <CCol md="12">
          <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
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
                        <CCol md="10">Expenses Details</CCol>
                        {GetButtons()}
                      </CRow>
                    </CCardHeader>
                    <CCardBody>
                      <CRow>
                        <CCol md="12">
                          <table style={{ width: "100%" }} id="customerDetails">
                            <tr>
                              <td>
                                <tr>
                                  <th>
                                    <p className="p1">Employee Company :</p>
                                  </th>
                                  <td>
                                    <p className="p2">{Company}</p>
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <p className="p1">Employee Name :</p>
                                  </th>
                                  <td>
                                    <p className="p2">{Name}</p>
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <p className="p1">Contact Number :</p>
                                  </th>
                                  <td>
                                    <p className="p2">{Pho}</p>
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <p className="p1">Date :</p>
                                  </th>
                                  <td>
                                    <p className="p2"> {Date}</p>
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <p className="p1">Travel From :</p>
                                  </th>
                                  <td>
                                    <p className="p2">{TravelFrom}</p>
                                  </td>
                                </tr>
                              </td>
                              <td>
                                <tr>
                                  <th>
                                    <p className="p1">Travel To :</p>
                                  </th>
                                  <td>
                                    <p className="p2">{TravelTo}</p>
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <p className="p1">Distance :</p>
                                  </th>
                                  <td>
                                    <p className="p2">{Distance}</p>
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <p className="p1">Mode :</p>
                                  </th>
                                  <td>
                                    <p className="p2">{Mode}</p>
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <p className="p1">Daily Allowance :</p>
                                  </th>
                                  <td>
                                    <p className="p2">{DailyAllowance}</p>
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <p className="p1">Total Amount :</p>
                                  </th>
                                  <td>
                                    <p className="p2">{TotalAmount}</p>
                                  </td>
                                </tr>
                              </td>
                            </tr>
                          </table>
                        </CCol>
                      </CRow>
                      <hr />
                      <CRow>
                        <CCol md="4">
                          <h4 className="p1">Expenses Documents</h4>
                        </CCol>
                      </CRow>
                      <br />
                      <CDataTable
                        items={ResponseData}
                        fields={fields}
                        hover
                        striped
                        bordered
                        sorter
                        tableFilter={table}
                        itemsPerPage={10}
                        pagination
                        size="sm"
                        itemsPerPageSelect={items}
                        scopedSlots={{
                          Document: (item) => {
                            return (
                              <td>
                                <CLink
                                  href={ViewImg + "/" + item.EMPLOYEE_EXPENSES_DOC_FILENAME}
                                  target="_blank"
                                >
                                  {item.EMPLOYEE_EXPENSES_DOC_FILENAME}
                                </CLink>
                              </td>
                            );
                          },
                        }}
                      />
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

export default ExpensesDocuments;
