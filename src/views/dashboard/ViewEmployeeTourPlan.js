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
  { key: "Company" },
  { key: "Name" },
  { key: "Contact Number" },
  { key: "From Date" },
  { key: "To Date" },
  { key: "Places" },
];

const ViewEmployeeTourPlan = (props) => {
  const EmployeeID = props.location.state.data.EMPLOYEE_PKID;

  const [ResponseData, setResponseData] = useState([]);

  const GetEmployeeTourPlan = () => {
    axios({
      method: "GET",
      url: MyApiUrl + "GetEmployeePlansByEmpID/" + EmployeeID,
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
          };
        });
        setResponseData(items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    GetEmployeeTourPlan();
  }, []);

  let history = useHistory();
  return (
    <div id="city">
      <h1 id="ccmaster">Employee 15 Days Plan</h1>
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
                    <CCardHeader>
                      <CRow>
                        <CCol col="6">15 Days Tour Plan</CCol>
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
                          "From Date": (i) => (
                            <td>
                              {
                                <DateFilter
                                  date={i.EMPLOYEE_TOUR_PLANNER_FROM_DATE}
                                />
                              }
                            </td>
                          ),
                          "To Date": (i) => (
                            <td>
                              {
                                <DateFilter
                                  date={i.EMPLOYEE_TOUR_PLANNER_TO_DATE}
                                />
                              }
                            </td>
                          ),
                          Places: (i) => (
                            <td>
                              <CButton
                                color="primary"
                                size="sm"
                                onClick={() => {
                                  history.push("/TourPlaces", {
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
                              item.EMPLOYEE_TOUR_PLANNER_STATUS === "0" ||
                              item.EMPLOYEE_TOUR_PLANNER_STATUS === 0
                            ) {
                              return (
                                <td>
                                  <span className="DispatchedOrders">
                                    Active
                                  </span>
                                </td>
                              );
                            } else if (
                              item.EMPLOYEE_TOUR_PLANNER_STATUS === "1" ||
                              item.EMPLOYEE_TOUR_PLANNER_STATUS === 1
                            ) {
                              return (
                                <td>
                                  <span className="ReadyForDelivery">
                                    Completed
                                  </span>
                                </td>
                              );
                            } else if (
                              item.EMPLOYEE_TOUR_PLANNER_STATUS === "2" ||
                              item.EMPLOYEE_TOUR_PLANNER_STATUS === 2
                            ) {
                              return (
                                <td>
                                  <span className="Rejected">Cancelled</span>
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

export default ViewEmployeeTourPlan;
