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
import DateFilter from "../masters/DateFilter";
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields2 = [
  { key: "Report" },
  { key: "Leave" },
  { key: "Tour Plan" },
  { key: "Employee Type" },
  { key: "Sub Type" },
  { key: "HQ" },
  { key: "Company" },
  { key: "Name" },
  { key: "Email" },
  { key: "Alt Email" },
  { key: "Contact Number" },
  { key: "Alternate Number" },
  { key: "Designation" },
  { key: "Qualification" },
  { key: "Joining Date" },
  { key: "Date Of Birth" },
  { key: "Region" },
  { key: "Gender" },
  { key: "Reporting To" },
  { key: "Password" },
  { key: "Profile" },
  { key: "Is Manager" },
  { key: "Salary" },
  { key: "Releaving Date" },
  { key: "Address" },
  { key: "Uploaded Docs" },
  { key: "Covered Area" },
  { key: "Other Covered Area" },
];

const CoverdArea = [
  { key: "Country" },
  { key: "State" },
  { key: "City" },
  { key: "Area" },
];

const TotalEmployeeByCompany = (props) => {
  const CompanyID = props.location.state.data.CompanyID;
  const COMPANY_NAME = props.location.state.data.CompanyName;
  const [ResponseData, setResponseData] = useState([]);
  const [EmployeeCoveredArea, setEmployeeCoveredArea] = useState([]);
  const [EmployeeOtherCoveredArea, setEmployeeOtherCoveredArea] = useState([]);
  const [EmployeeUploadedDoc, setEmployeeUploadedDoc] = useState([]);
  const [EmployeeAddress, setEmployeeAddress] = useState([]);
  const [block, setBlock] = useState(false);
  const [block2, setBlock2] = useState(false);
  const [block3, setBlock3] = useState(false);
  const [block4, setBlock4] = useState(false);

  const GetAllEmployees = () => {
    axios({
      method: "GET",
      url: MyApiUrl + "getAllEmpsByCompId/" + CompanyID,
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
            "Alt Email": item.EMPLOYEE_ALT_EMAIL,
            "Contact Number": item.EMPLOYEE_CONTACT,
            "Alternate Number": item.EMPLOYEE_ALT_CONTACT,
            Designation: item.EMPLOYEE_DESIGNATION,
            Qualification: item.EMPLOYEE_QUALIFICATION,
            Region: item.EMPLOYEE_REGION,
            Gender: item.EMPLOYEE_GENDER,
            "Reporting To": item.ReportingManager,
            Password: item.EMPLOYEE_PASSWORD,
            "Is Manager": item.ManagerType,
            Salary: item.EMPLOYEE_SALARY,
          };
        });
        setResponseData(items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ViewEmployeeAddress = (pkid) => {
    console.log(pkid);
    axios({
      method: "GET",
      url: MyApiUrl + "GetEmployeeAddress/" + pkid + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        setEmployeeAddress(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setBlock2(!block2);
  };

  const ViewEmployeeCoveredAreas = (pkid) => {
    axios({
      method: "GET",
      url: MyApiUrl + "GetEmployeeCoveredAreas/" + pkid + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        setEmployeeCoveredArea(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setBlock3(!block3);
  };

  const ViewEmployeeOtherCoveredAreas = (pkid) => {
    axios({
      method: "GET",
      url: MyApiUrl + "GetEmployeeOtherCoveredAreas/" + pkid + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        setEmployeeOtherCoveredArea(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setBlock(!block);
  };

  const ViewUploadedDocs = (pkid) => {
    axios({
      method: "GET",
      url: MyApiUrl + "GetEmployeeOtherDocs/" + pkid + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        setEmployeeUploadedDoc(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setBlock4(!block4);
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
                          Leave: (i) => (
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
                          Profile: (i) => {
                            let profile = "";
                            if (
                              i.EMPLOYEE_PROFILE === "" ||
                              i.EMPLOYEE_PROFILE === null
                            ) {
                              profile = "NoImage.png";
                            } else {
                              profile = i.EMPLOYEE_PROFILE;
                            }
                            return (
                              <React.Fragment>
                                <td>
                                  <CLink
                                    href={ViewImg + "/" + profile}
                                    target="_blank"
                                  >
                                    <CImg
                                      src={ViewImg + "/" + profile}
                                      fluid
                                      className="mb-2"
                                      style={{ width: "100%" }}
                                    />
                                  </CLink>
                                </td>
                              </React.Fragment>
                            );
                          },
                          "Date Of Birth": (i) => (
                            <td>{<DateFilter date={i.EMPLOYEE_DOB} />}</td>
                          ),
                          "Joining Date": (i) => (
                            <td>{<DateFilter date={i.EMPLOYEE_DOJ} />}</td>
                          ),
                          "Releaving Date": (i) => (
                            <td>{<DateFilter date={i.EMPLOYEE_DOR} />}</td>
                          ),
                          Address: (i) => (
                            <td>
                              <CRow>
                                <CCol md="10">
                                  <CButton
                                    color="primary"
                                    size="sm"
                                    id="AddEmp"
                                    onClick={() => {
                                      ViewEmployeeAddress(i.EMPLOYEE_PKID);
                                    }}
                                  >
                                    View
                                  </CButton>
                                </CCol>
                              </CRow>
                            </td>
                          ),
                          "Uploaded Docs": (i) => (
                            <td>
                              <CRow>
                                <CCol md="10">
                                  <CButton
                                    color="primary"
                                    size="sm"
                                    id="AddEmp"
                                    onClick={() => {
                                      ViewUploadedDocs(i.EMPLOYEE_PKID);
                                    }}
                                  >
                                    View
                                  </CButton>
                                </CCol>
                              </CRow>
                            </td>
                          ),
                          "Covered Area": (i) => (
                            <td>
                              <CRow>
                                <CCol md="10">
                                  <CButton
                                    color="primary"
                                    size="sm"
                                    id="AddEmp"
                                    onClick={() => {
                                      ViewEmployeeCoveredAreas(i.EMPLOYEE_PKID);
                                    }}
                                  >
                                    View
                                  </CButton>
                                </CCol>
                              </CRow>
                            </td>
                          ),
                          "Other Covered Area": (i) => (
                            <td>
                              <CRow>
                                <CCol md="10">
                                  <CButton
                                    color="primary"
                                    size="sm"
                                    id="AddEmp"
                                    onClick={() => {
                                      ViewEmployeeOtherCoveredAreas(
                                        i.EMPLOYEE_PKID
                                      );
                                    }}
                                  >
                                    View
                                  </CButton>
                                </CCol>
                              </CRow>
                            </td>
                          ),
                          Report: (i) => (
                            <td>
                              <CRow>
                                <CCol md="10">
                                  <button
                                    type="button"
                                    class="btn btn-dark rounded-pill"
                                    style={{ marginLeft: "25px" }}
                                    onClick={() => {
                                      history.push("/ViewEmployeeAttendance", {
                                        data: i,
                                      });
                                    }}
                                  >
                                    View
                                  </button>
                                </CCol>
                              </CRow>
                            </td>
                          ),
                          "Tour Plan": (i) => (
                            <td>
                              <CRow>
                                <CCol md="10">
                                  <button
                                    type="button"
                                    class="btn btn-dark rounded-pill"
                                    style={{ marginLeft: "25px" }}
                                    onClick={() => {
                                      history.push("/ViewEmployeeTourPlan", {
                                        data: i,
                                      });
                                    }}
                                  >
                                    View
                                  </button>
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
      <CModal show={block2} onClose={() => setBlock2(!block2)} color="dark">
        <CModalHeader closeButton>
          <CModalTitle>Employee Address</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            {EmployeeAddress.map((i) => (
              <React.Fragment>
                <CCol md="6">
                  <p
                    style={{
                      fontWeight: "700",
                      fontFamily: "sans-serif",
                      textAlign: "center",
                      borderBottom: "1px solid #ebedef",
                      paddingBottom: "5%",
                    }}
                  >
                    Permanent Address
                  </p>
                  <table>
                    <tr>
                      <td>{i.EMPLOYEE_ADDRESS1}</td>
                    </tr>
                    <tr>
                      <td>{i.EMPLOYEE_ADDRESS2}</td>
                    </tr>
                    <tr>
                      <td>{i.EMPLOYEE_ADDRESS3}</td>
                    </tr>
                    <tr>
                      <td>{i.EMPLOYEE_ADDRESS_ZIP}</td>
                    </tr>
                  </table>
                </CCol>
                <CCol md="6">
                  <p
                    style={{
                      fontWeight: "700",
                      fontFamily: "sans-serif",
                      textAlign: "center",
                      borderBottom: "1px solid #ebedef",
                      paddingBottom: "5%",
                    }}
                  >
                    Correspondence Address
                  </p>
                  <table>
                    <tr>
                      <td>{i.EMPLOYEE_ALT_ADDRESS1}</td>
                    </tr>
                    <tr>
                      <td>{i.EMPLOYEE_ALT_ADDRESS2}</td>
                    </tr>
                    <tr>
                      <td>{i.EMPLOYEE_ALT_ADDRESS3}</td>
                    </tr>
                    <tr>
                      <td>{i.EMPLOYEE_ALT_ADDRESS_ZIP}</td>
                    </tr>
                  </table>
                </CCol>
              </React.Fragment>
            ))}
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setBlock2(!block2)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal show={block3} onClose={() => setBlock3(!block3)} color="dark">
        <CModalHeader closeButton>
          <CModalTitle>Employee Covered Areas</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md="12">
              <CDataTable
                items={EmployeeCoveredArea}
                fields={CoverdArea}
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
                  Country: (i) => <td>{i.COUNTRY_NAME}</td>,
                  State: (i) => <td>{i.STATE_NAME}</td>,
                  City: (i) => <td>{i.CITY_NAME}</td>,
                  Area: (i) => <td>{i.AREA_NAME}</td>,
                }}
              />
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setBlock3(!block3)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal show={block} onClose={() => setBlock(!block)} color="dark">
        <CModalHeader closeButton>
          <CModalTitle>Employee Other Covered Areas</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md="12">
              <CDataTable
                items={EmployeeOtherCoveredArea}
                fields={CoverdArea}
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
                  Country: (i) => <td>{i.COUNTRY_NAME}</td>,
                  State: (i) => <td>{i.STATE_NAME}</td>,
                  City: (i) => <td>{i.CITY_NAME}</td>,
                  Area: (i) => <td>{i.AREA_NAME}</td>,
                }}
              />
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setBlock(!block)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal show={block4} onClose={() => setBlock4(!block4)} color="dark">
        <CModalHeader closeButton>
          <CModalTitle>Other Uploaded Documents</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            {EmployeeUploadedDoc.map((i) => (
              <CCol md="3">
                <CImg
                  src={ViewImg + "/" + i.EMPLOYEE_DOCS_FILE}
                  fluid
                  className="mb-2"
                  style={{ width: "100%" }}
                />
              </CCol>
            ))}
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setBlock4(!block4)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default TotalEmployeeByCompany;
