/* eslint-disable react-hooks/exhaustive-deps */
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
  { key: "SL No" },
  { key: "Orders" },
  { key: "Employee Type" },
  { key: "Sub Type" },
  { key: "HQ" },
  { key: "Company" },
  { key: "Name" },
  { key: "Email" },
  { key: "Contact Number" },
  { key: "Gender" },
];

const SalesReportByEmployee = (props) => {
  const CompanyID = props.location.state.data.CompanyID;
  const COMPANY_NAME = props.location.state.data.COMPANY_NAME;

  const [ResponseData, setResponseData] = useState([]);

  const GetAllEmployees = () => {
    axios({
      method: "GET",
      url: MyApiUrl + "EmployeeSalesReportWithOrderByCompany/" + CompanyID,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const items = response.data.map((item, index) => {
          return {
            ...item,
            "SL No": index + 1,
            "Employee Type": item.EMPLOYEE_TYPE_NAME,
            "Sub Type": item.EMPLOYEE_SUB_TYPE_NAME,
            HQ: item.HQ_NAME,
            Company: item.COMPANY_NAME,
            Name: item.EMPLOYEE_NAME,
            Email: item.EMPLOYEE_EMAIL,
            "Contact Number": item.EMPLOYEE_CONTACT,
            Gender: item.EMPLOYEE_GENDER,
          };
        });
        setResponseData(items);
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
      <h1 id="ccmaster">Employees From {COMPANY_NAME}</h1>
      <br />
      <CRow>
        <CCol col="12">
          <CCard id="city-table">
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
                    <CCardHeader>Employees List</CCardHeader>
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
                          Orders: (i) => (
                            <td>
                              <CButton
                                onClick={() => {
                                  history.push("/SalesReportEmployeeOrders", {
                                    data: i,
                                  });
                                }}
                              >
                                {i.orderscnt}
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

export default SalesReportByEmployee;
