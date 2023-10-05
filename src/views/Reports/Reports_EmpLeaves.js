/**
 * @author KIMOSABE
 * @email Kimosabe@mail.com
 * @create date 2021-11-29 12:14:40
 * @modify date 2021-12-06 15:20:08
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
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields2 = [
  { key: "SL No" },
  { key: "Employee Type" },
  { key: "Sub Type" },
  { key: "HQ" },
  { key: "Company" },
  { key: "Employee Name" },
  { key: "Is Manager" },
  { key: "Leave Count" },
];

const Reports_EmpLeaves = () => {
  const [ResponseData, setResponseData] = useState([]);
  const [ResponseData2, setResponseData2] = useState([]);

  const GetAllEmpLeave = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "leavesforallemps",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const items = response.data.map((item, index) => {
          let status = "";
          if (item.EMPOLYEE_IS_MANAGER === 1) {
            status = "Manager";
          } else {
            status = "Officer";
          }
          return {
            ...item,
            "Employee Type": item.EMPLOYEE_TYPE_NAME,
            "Sub Type": item.EMPLOYEE_SUB_TYPE_NAME,
            HQ: item.HQ_NAME,
            Company: item.COMPANY_NAME,
            "SL No": index + 1,
            "Employee Name": item.EMPLOYEE_NAME,
            "Is Manager": status,
          };
        });
        setResponseData(items);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
    axios({
      method: "GET",
      url: MyApiUrl + "getallLeavesinfo",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        setResponseData2(response.data);
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
      '"Sl No","Employee Type","Sub Type","	HQ","Company","Employee Name","Is Manager","Leave Count","Leave Type","From Date","To Date","Reason","Status"'
    );
    let ManagerType = "";
    let status = "";
    ResponseData2.map((item) => {
      if (item.EMPOLYEE_IS_MANAGER === "1" || item.EMPOLYEE_IS_MANAGER === 1) {
        ManagerType = "Manager";
      } else {
        ManagerType = "Officer";
      }
      if (item.LEAVE_ISACTIVE === 0) {
        status = "Pending";
      } else if (item.LEAVE_ISACTIVE === 1) {
        status = "Accepted";
      } else {
        status = "Rejected";
      }
      let idate = new Date(
        new Date(item.LEAVE_FROM_DATE).toISOString().split("T")[0]
      );
      let dateMDY = `${idate.getDate().toString().padStart(2, "0")}-${(
        idate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${idate.getFullYear()}`;

      let idate1 = new Date(
        new Date(item.LEAVE_TO_DATE).toISOString().split("T")[0]
      );
      let dateMDY1 = `${idate1.getDate().toString().padStart(2, "0")}-${(
        idate1.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${idate1.getFullYear()}`;
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
          ManagerType +
          '","' +
          item.LeaveCount +
          '","' +
          item.LEAVE_TYPE +
          '","' +
          dateMDY +
          '","' +
          dateMDY1 +
          '","' +
          item.LEAVE_REASON +
          '","' +
          status +
          '"'
        )
      );
    });

    const fileName = "Employee Leaves.csv";
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
    GetAllEmpLeave();
  }, []);

  let history = useHistory();

  return (
    <div id="city">
      <div id="divLoading"> </div>
      <h1 id="ccmaster">Employee Leaves</h1>
      <CRow style={{ marginTop: "3%" }}>
        <CCol col="12">
        <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
            <CCardBody>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>
                      <CRow>
                        <CCol col="6">View All Employee Leaves</CCol>
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
                          "Leave Count": (i) => (
                            <td>
                              <CButton
                                onClick={() =>
                                  history.push("/EmployeeAllLeaves", {
                                    data: i,
                                  })
                                }
                              >
                                {i.LeaveCount}
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
    </div>
  );
};

export default Reports_EmpLeaves;
