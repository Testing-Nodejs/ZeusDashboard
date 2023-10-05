/**
 * @author KIMOSABE
 * @email Kimosabe@mail.com
 * @create date 2021-11-29 13:04:12
 * @modify date 2021-12-07 12:25:56
 * @desc [description]
 */
import React, { useState } from "react";
import axios from "axios";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
} from "@coreui/react";
import { MyApiUrl } from "src/services/service";
import { useHistory } from "react-router-dom";
import DateFilter from "../masters/DateFilter";
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields2 = [
  { key: "Status" },
  { key: "Date" },
  { key: "Company" },
  { key: "Name" },
  { key: "Contact Number" },
  { key: "Travel From" },
  { key: "Travel To" },
  { key: "Distance" },
  { key: "Mode" },
  { key: "Daily Allowance" },
  { key: "Total Amount" },
  { key: "Documents" },
];

const EmployeeExpensesWithStatus = (props) => {
  const empid = props.location.state.data.EMPLOYEE_PKID;
  const [ResponseData, setResponseData] = useState([]);

  const GetEmployeeExpensesRequest = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "AllEmpExpenses/" + empid + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const items = response.data.map((item, index) => {
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
          };
        });
        setResponseData(items);
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
      '"Sl No","Status","Date","Company","Employee Name","Contact Number","Travel From","Travel To","Distance","Mode","Daily Allowance","Total Amount"'
    );
    let Status = "";
    ResponseData.map((item) => {
      if (
        item.EMPLOYEE_EXPENSES_STATUS === "0" ||
        item.EMPLOYEE_EXPENSES_STATUS === 0
      ) {
        Status = "Pending";
      } else if (
        item.EMPLOYEE_EXPENSES_STATUS === "1" ||
        item.EMPLOYEE_EXPENSES_STATUS === 1
      ) {
        Status = "Accepted";
      } else if (
        item.EMPLOYEE_EXPENSES_STATUS === "2" ||
        item.EMPLOYEE_EXPENSES_STATUS === 2
      ) {
        Status = "Denied";
      }
      let idate = new Date(
        new Date(item.EMPLOYEE_EXPENSES_DATE).toISOString().split("T")[0]
      );
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
          Status +
          '","' +
          dateMDY +
          '","' +
          item.COMPANY_NAME +
          '","' +
          item.EMPLOYEE_NAME +
          '","' +
          item.EMPLOYEE_CONTACT +
          '","' +
          item.EMPLOYEE_EXPENSES_TRAVEL_FROM +
          '","' +
          item.EMPLOYEE_EXPENSES_TRAVEL_TO +
          '","' +
          item.EMPLOYEE_EXPENSES_DISTANCE +
          '","' +
          item.EMPLOYEE_EXPENSES_MODE +
          '","' +
          item.EMPLOYEE_EXPENSES_DAILY_ALLOWANCE +
          '","' +
          item.EMPLOYEE_EXPENSES_TOTAL +
          '"'
        )
      );
    });

    const fileName = "Employee Expenses.csv";
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
                    <CCardHeader>
                      <CRow>
                        <CCol col="6">Expenses Request</CCol>
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
                          Status: (item) => {
                            if (
                              item.EMPLOYEE_EXPENSES_STATUS === "0" ||
                              item.EMPLOYEE_EXPENSES_STATUS === 0
                            ) {
                              return (
                                <td>
                                  <span className="PendingOrder">Pending</span>
                                </td>
                              );
                            } else if (
                              item.EMPLOYEE_EXPENSES_STATUS === "1" ||
                              item.EMPLOYEE_EXPENSES_STATUS === 1
                            ) {
                              return (
                                <td>
                                  <span className="ReadyForDelivery">
                                    Accepted
                                  </span>
                                </td>
                              );
                            } else if (
                              item.EMPLOYEE_EXPENSES_STATUS === "2" ||
                              item.EMPLOYEE_EXPENSES_STATUS === 2
                            ) {
                              return (
                                <td>
                                  <span className="Rejected">Denied</span>
                                </td>
                              );
                            }
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
      </CRow>
    </div>
  );
};

export default EmployeeExpensesWithStatus;
