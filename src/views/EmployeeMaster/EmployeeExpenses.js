/**
 * @author KIMOSABE
 * @email Kimosabe@mail.com
 * @create date 2021-11-29 13:04:12
 * @modify date 2021-12-07 12:25:56
 * @desc [description]
 */
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CImg,
  CLink,
} from "@coreui/react";
import { MyApiUrl, ViewImg } from "src/services/service";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DateFilter from "../masters/DateFilter";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields2 = [
  { key: "Action" },
  { key: "Date" },
  { key: "Company" },
  { key: "Name" },
  { key: "Contact Number" },
  { key: "Place Of Work" },
  { key: "Travel From" },
  { key: "Travel To" },
  { key: "Distance" },
  { key: "Mode" },
  { key: "Fare" },
  { key: "Daily Allowance" },
  { key: "Others" },
  { key: "Total Amount" },
  { key: "Remarks" },
  { key: "Documents" },
];

const EmployeeExpenses = () => {
  const [ResponseData, setResponseData] = useState([]);
  const [remarksview, setremarksview] = useState();
  const [block, setBlock] = useState(false);

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

  const GetEmployeeExpensesRequest = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "pendingEmpExpenses",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const items = response.data.map((item) => {
          return {
            ...item,
            Company: item.COMPANY_NAME,
            Name: item.EMPLOYEE_NAME,
            "Contact Number": item.EMPLOYEE_CONTACT,
            "Travel From": item.EMPLOYEE_EXPENSES_TRAVEL_FROM,
            "Travel To": item.EMPLOYEE_EXPENSES_TRAVEL_TO,
            Distance: item.EMPLOYEE_EXPENSES_DISTANCE,
            Mode: item.EMPLOYEE_EXPENSES_MODE,
            "Daily Allowance": item.EMPLOYEE_EXPENSES_DAILY_ALLOWANCE,
            "Total Amount": item.EMPLOYEE_EXPENSES_TOTAL,
            "Place Of Work": item.EMPLOYEE_EXPENSES_PLACE_OF_WORK,
            "Fare": item.EMPLOYEE_EXPENSES_FARE,
            "Others": item.EMPLOYEE_EXPENSES_OTHERS,
          };
        });
        setResponseData(items);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const AcceptRequest = (pkid) => {
    document.getElementById("divLoading").className = "show";
    axios.put(MyApiUrl + "AcceptEmpExpenses/" + pkid).then((response) => {
      if (response.data === true) {
        Swal.fire({
          title: "Employee Expenses Accepted!",
          icon: "success",
          confirmButtonText: "OK",
        });
        GetEmployeeExpensesRequest();
        document.getElementById("divLoading").className = "hide";
      } else {
        Swal.fire({
          title: "Failed To Confirm Employee Expenses!",
          icon: "error",
          confirmButtonText: "OK",
        });
        GetEmployeeExpensesRequest();
        document.getElementById("divLoading").className = "hide";
      }
    });
  };

  const RejectRequest = (pkid) => {
    // eslint-disable-next-line no-restricted-globals
    var res = confirm("Are you sure you want to Deny the request");
    if (res) {
      document.getElementById("divLoading").className = "show";
      axios.put(MyApiUrl + "RejectEmpExpenses/" + pkid).then((response) => {
        if (response.data === true) {
          Swal.fire({
            title: "Employee Expenses Denied!",
            icon: "success",
            confirmButtonText: "OK",
          });
          GetEmployeeExpensesRequest();
          document.getElementById("divLoading").className = "hide";
        } else {
          Swal.fire({
            title: "Failed To Deny Employee Expenses!",
            icon: "error",
            confirmButtonText: "OK",
          });
          document.getElementById("divLoading").className = "hide";
        }
      });
    }
  };

  const ViewRemark = (remark) => {
    setremarksview(remark);
    setBlock(!block);
  }

  React.useEffect(() => {
    GetEmployeeExpensesRequest();
  }, []);

  let history = useHistory();
  return (
    <div id="city">
      <div id="divLoading"> </div>
      <h1 id="ccmaster">Employee Expenses</h1>
      <CRow style={{ marginTop: "3%" }}>
        <CCol col="12">
          <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
            <CCardBody>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>Expenses Request</CCardHeader>
                    <CCardBody>
                      <CDataTable
                        items={ResponseData}
                        fields={fields2}
                        hover
                        striped
                        bordered
                        sorter
                        tableFilter={table}
                        itemsPerPageSelect={items}
                        columnFilterSlot
                        size="sm"
                        itemsPerPage={10}
                        pagination
                        scopedSlots={{
                          Date: (i) => (
                            <td>
                              {<DateFilter date={i.EMPLOYEE_EXPENSES_DATE} />}
                            </td>
                          ),
                          Remarks: (i) => (
                            <td>
                              <CButton
                                color="primary"
                                size="sm"
                                id="AddEmp"
                                onClick={() => {
                                  ViewRemark(i.EMPLOYEE_EXPENSES_REMARKS);
                                }}
                              >
                                View
                              </CButton>
                            </td>
                          ),
                          Documents: (i) => (
                            <td>
                              <CButton
                                color="primary"
                                size="sm"
                                onClick={() => {
                                  history.push("/ExpensesDocuments", {
                                    data: i,
                                  });
                                }}
                              >
                                View
                              </CButton>
                            </td>
                          ),
                          Action: (item) => (
                            <td>
                              <CButton
                                onClick={() => {
                                  AcceptRequest(item.EMPLOYEE_EXPENSES_PKID);
                                }}
                                color="primary"
                                size="sm"
                              >
                                Accept
                                {item.status}
                              </CButton>&nbsp;&nbsp;&nbsp;
                              <CButton
                                onClick={() => {
                                  RejectRequest(item.EMPLOYEE_EXPENSES_PKID);
                                }}
                                color="danger"
                                size="sm"
                              >
                                Deny
                                {item.status}
                              </CButton>
                            </td>
                          ),
                        }}
                      />
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CModal show={block} onClose={() => setBlock(!block)} color="dark">
        <CModalHeader closeButton>
          <CModalTitle>Expenses Remark</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md="12">
              {remarksview}
            </CCol>
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

export default EmployeeExpenses;
