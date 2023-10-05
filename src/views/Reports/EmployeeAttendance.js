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
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields2 = [
  { key: "Employee Type" },
  { key: "Sub Type" },
  { key: "HQ" },
  { key: "Company" },
  { key: "Name" },
  { key: "Email" },
  { key: "Contact Number" },
  { key: "Attendance" },
];

const EmployeeAttendance = () => {
  const [ResponseData, setResponseData] = useState([]);

  const GetAllEmployees = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "emps",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const items = response.data.map((item, index) => {
          return {
            ...item,
            "Employee Type": item.EMPLOYEE_TYPE_NAME,
            "Sub Type": item.EMPLOYEE_SUB_TYPE_NAME,
            HQ: item.HQ_NAME,
            Company: item.COMPANY_NAME,
            Name: item.EMPLOYEE_NAME,
            Email: item.EMPLOYEE_EMAIL,
            "Contact Number": item.EMPLOYEE_CONTACT,
          };
        });
        setResponseData(items);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    GetAllEmployees();
  }, []);

  let history = useHistory();
  return (
    <div id="city">
      <div id="divLoading"> </div>
      <h1 id="ccmaster">View Employees</h1>
      <CRow style={{ marginTop: "3%" }}>
        <CCol col="12">
        <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
            <CCardBody>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>All Employees</CCardHeader>
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
                          Attendance: (i) => (
                            <td>
                              <CRow>
                                <CCol md="8">
                                  <CButton
                                    color="primary"
                                    size="sm"
                                    id="AddEmp"
                                    onClick={() => {
                                      history.push("/ViewEmployeeAttendance", {
                                        data: i,
                                      });
                                    }}
                                  >
                                    View
                                  </CButton>
                                </CCol>
                              </CRow>
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

export default EmployeeAttendance;
