/**
 * @author KIMOSABE
 * @email Kimosabe@mail.com
 * @create date 2021-11-25 17:37:05
 * @modify date 2021-12-07 19:28:04
 * @desc [description]
 */

import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CInput,
  CSelect,
  CRow,
  CDataTable,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CPopover,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
// import Button from "@mui/material/Button";
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields2 = [
  { key: "SlNo" },
  { key: "EmpCode" },
  { key: "EmployeeName" },
  { key: "Date" },
  { key: "LoginTime" },
  { key: "NoOfCustomersVisited" },
  { key: "TotalOrders" },
  { key: "WorkingPlan" },
  { key: "Expenses" },
  { key: "LoginLocation" },
  { key: "LogoutTime" },
  { key: "LogoutLocation" },
];

const AllReports = () => {
  const [visible, setVisible] = useState(false);
  const [ResponseData, setResponseData] = useState([
    {
      SlNo: 1,
      EmpCode: 1234,
      Date: "02/02/2022",
      LoginTime: "9:35AM",
      LogoutTime: "6:30PM",
      LoginLocation: "Siddartha Nagar",
      LogoutLocation: "Siddartha Nagar",
      EmployeeID: "4NI17MCA20",
      EmployeeName: "Harshan",
      NoOfCustomersVisited: 2,
      TotalOrders: 1,
    },
    {
      SlNo: 2,
      EmpCode: 2345,
      Date: "02/02/2022",
      LoginTime: "9:48AM",
      LogoutTime: "6:30PM",
      LoginLocation: "Vijayanagar",
      LogoutLocation: "Siddartha Nagar",
      EmployeeID: "4NI17MCA21",
      EmployeeName: "Dillan",
      NoOfCustomersVisited: 3,
      TotalOrders: 1,
    },
    {
      SlNo: 3,
      EmpCode: 6789,
      Date: "02/02/2022",
      LoginTime: "9:30AM",
      LogoutTime: "6:30PM",
      LoginLocation: "Nazarbad",
      LogoutLocation: "Siddartha Nagar",
      EmployeeID: "4NI17MCA22",
      EmployeeName: "Kimosabe",
      NoOfCustomersVisited: 2,
      TotalOrders: 1,
    },
    {
      SlNo: 4,
      EmpCode: 1234,
      Date: "02/02/2022",
      LoginTime: "9:35AM",
      LogoutTime: "6:30PM",
      LoginLocation: "Nazarbad",
      LogoutLocation: "Siddartha Nagar",
      EmployeeID: "4NI17MCA22",
      EmployeeName: "Kishan",
      NoOfCustomersVisited: 3,
      TotalOrders: 1,
    },
  ]);

  React.useEffect(() => {}, []);

  let history = useHistory();

  const LiveDemo = () => {
    setVisible(!visible);
    return (
      <>
        <CButton onClick={() => setVisible(!visible)}>
          Launch demo modal
        </CButton>
        <CModal visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Modal title</CModalTitle>
          </CModalHeader>
          <CModalBody>
            Woohoo, you&#39;re reading this text in a modal!
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary">Save changes</CButton>
          </CModalFooter>
        </CModal>
      </>
    );
  };

  return (
    <div id="city">
      <h1 id="ccmaster">View All Reports</h1>
      <br />
      <br />

      <CRow>
        <CCol col="12">
          <CCard id="city-table">
            <CCardBody>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardBody>
                      <CRow>
                        <CCol md="2">
                          <CLabel htmlFor="nf-email">Select Month</CLabel>
                          <CSelect
                            custom
                            name="Marchant"
                            id="Marchant"
                            // value={fmonth}
                            // onChange={MonthChange}
                          >
                            <option value="0">All</option>
                            <option value="1">Jan</option>
                            <option value="2">Feb</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">Jun</option>
                            <option value="7">Jul</option>
                            <option value="8">Aug</option>
                            <option value="9">Sept</option>
                            <option value="10">Oct</option>
                            <option value="11">Nov</option>
                            <option value="12">Dec</option>
                          </CSelect>
                        </CCol>
                        <CCol md="2">
                          <CLabel>From:</CLabel>
                          <CInput
                            type="date"
                            // onChange={FromChange}
                            // value={fromDate}
                          />
                        </CCol>

                        <CCol md="2">
                          <CLabel>To:</CLabel>
                          <CInput
                            type="date"
                            // onChange={ToChange}
                            // value={toDate}
                          />
                        </CCol>
                        <CCol md="2">
                          <CLabel>Employee ID:</CLabel>
                          <CInput
                            type="text"
                            // onChange={FromChange}
                            // value={fromDate}
                          />
                        </CCol>
                        <CCol md="2">
                          <CButton
                            size="sm"
                            color="info"
                            style={{ "marginTop": "28px", width: "100%" }}
                            // onClick={FilterDates}
                          >
                            Filter
                          </CButton>
                        </CCol>
                        <CCol md="2">
                          <CButton
                            size="sm"
                            color="danger"
                            style={{ "marginTop": "28px", width: "100%" }}
                            // onClick={FilterReset}
                          >
                            Reset
                          </CButton>
                        </CCol>
                      </CRow>
                      <hr />
                      <CRow></CRow>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol col="12">
          <CCard id="city-table">
            <CCardBody>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>All Reports</CCardHeader>
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
                          Expenses: (item) => (
                            <td>
                              <button
                                className="btn btn-outline-secondary"
                                type="button"
                              >
                                View
                              </button>
                            </td>
                          ),
                          WorkingPlan: (item) => (
                            <td>
                              <CButton
                                // style={{ background: "red" }}
                                className="btn btn-outline-primary"
                                // onClick={() => LiveDemo()}
                                onClick={() => history.push("/WorkingPlan")}
                              >
                                View
                              </CButton>
                            </td>
                          ),

                          Action: (item) => (
                            <td>
                              <button
                                className="btn btn-ghost-primary active"
                                type="button"
                                style={{
                                  fontSize: "0.8rem",
                                }}
                              >
                                Action
                              </button>
                            </td>
                          ),
                          OrderStatus: (item) => (
                            <td>
                              <button
                                className="btn btn-secondary rounded-pill"
                                type="button"
                              >
                                {item.OrderStatus}
                              </button>
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
export default AllReports;
