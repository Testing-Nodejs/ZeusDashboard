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
  CInput,
  CLabel,
} from "@coreui/react";
import { MyApiUrl, ViewImg } from "src/services/service";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import DateFilter from "../masters/DateFilter";
import "../../style.css";

const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields2 = [
//   { key: "Action" },
  { key: "Name" },
  { key: "Gender" },
  { key: "Designation" },
  { key: "Qualification" },
  { key: "Date Of Birth" },
  { key: "Email" },
  { key: "Alt Email" },
  { key: "Contact Number" },
  { key: "Alternate Number" },
  { key: "HQ" },
  { key: "Company" },
  { key: "Region" },
  { key: "Manager / Officer" },
  { key: "Employee Type" },
  { key: "Sub Type" },
  { key: "Password" },
  { key: "Salary" },
  { key: "Joining Date" },
  { key: "Previous Experience" },
  { key: "Experience Till Now" },
  { key: "Releaving Date" },
  { key: "Profile" },
  { key: "Reporting To" },
//   { key: "Incentive" },
  { key: "Address" },
  { key: "Uploaded Docs" },
  { key: "Covered Area" },
//   { key: "Separation" },
];

const CoverdArea = [
  { key: "Country" },
  { key: "State" },
  { key: "District" },
  { key: "Taluk" },
];

const EmployeeSeparation = () => {
  const [ResponseData, setResponseData] = useState([]);
  const [EmployeeCoveredArea, setEmployeeCoveredArea] = useState([]);
  const [EmployeeUploadedDoc, setEmployeeUploadedDoc] = useState([]);
  const [EmployeeAddress, setEmployeeAddress] = useState([]);

  const [block5, setBlock5] = useState(false);
  const [SeparationData, setSeparationData] = useState("");
  const [EmployeePKID, setEmployeePKID] = useState("");
  const [SeparationReason, setSeparationReason] = useState("");

  const [block2, setBlock2] = useState(false);
  const [block3, setBlock3] = useState(false);
  const [block4, setBlock4] = useState(false);

  const GetAllEmployees = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "GetSeparationEmp",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const items = response.data.map((item) => {
          return {
            ...item,
            "Employee Type": item.EMPLOYEE_TYPE_NAME,
            "Sub Type": item.EMPLOYEE_SUB_TYPE_NAME,
            HQ: item.HQ_NAME,
            Company: item.COMPANY_NAME,
            Name: item.EMPLOYEE_NAME,
            Email: item.EMPLOYEE_EMAIL,
            "Alt Email": item.EMPLOYEE_ALT_EMAIL,
            "Contact Number": item.EMPLOYEE_CONTACT == null || item.EMPLOYEE_CONTACT == "" ? item.EMPLOYEE_CONTACT : ("+ " + item.EMPLOYEE_PHONE_CODE + " " + item.EMPLOYEE_CONTACT),
            "Alternate Number": item.EMPLOYEE_ALT_CONTACT == null || item.EMPLOYEE_ALT_CONTACT == "" ? item.EMPLOYEE_ALT_CONTACT : ("+ " + item.EMPLOYEE_ALT_PHONE_CODE + " " + item.EMPLOYEE_ALT_CONTACT),
            Designation: item.EMPLOYEE_DESIGNATION,
            Qualification: item.EMPLOYEE_QUALIFICATION,
            Region: item.EMPLOYEE_REGION,
            Gender: item.EMPLOYEE_GENDER,
            "Reporting To": item.ReportingManager,
            Password: item.EMPLOYEE_PASSWORD,
            "Manager / Officer": item.ManagerType,
            "Previous Experience": item.EMPLOYEE_PREV_EXPERIENCE,
            Salary: item.EMPLOYEE_SALARY,
            "Releaving Date": item.EMPLOYEE_DOR,
            "Experience Till Now": item.TotalExp,
          };
        });
        setResponseData(items);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ViewEmployeeAddress = (pkid) => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "GetEmployeeAddress/" + pkid + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        setEmployeeAddress(response.data);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
    setBlock2(!block2);
  };

  const ViewEmployeeCoveredAreas = (pkid) => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "GetEmployeeCoveredAreas/" + pkid + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const items = response.data.map((item) => {
          return {
            ...item,
            Country: item.COUNTRY_NAME,
            State: item.STATE_NAME,
            District: item.DISTRICT_NAME,
            Taluk: item.TALUK_NAME,
          };
        });
        setEmployeeCoveredArea(items);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
    setBlock3(!block3);
  };

  const ViewUploadedDocs = (pkid) => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "GetEmployeeOtherDocs/" + pkid + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        setEmployeeUploadedDoc(response.data);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
    setBlock4(!block4);
  };

  const DeleteEmployee = (pkid) => {
    // eslint-disable-next-line no-restricted-globals
    var res = confirm("Are you sure you want to delete");
    if (res) {
      document.getElementById("divLoading").className = "show";
      axios.put(MyApiUrl + "deletemps/" + pkid).then((response) => {
        if (response.data === true) {
          Swal.fire({
            title: "Employee Deleted Successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
          GetAllEmployees();
          document.getElementById("divLoading").className = "hide";
        } else {
          Swal.fire({
            title: "Failed To Delete Employee!",
            icon: "success",
            confirmButtonText: "OK",
          });
          document.getElementById("divLoading").className = "hide";
        }
      });
    }
  };

  const ToExcel = () => {
    document.getElementById("divLoading").className = "show";
    var cnt = 0;
    // eslint-disable-next-line no-array-constructor
    var csvData = new Array();
    csvData.push(
      '"Sl No","Employee Name","Gender","Designation","Qualification","Date Of Birth","Email","Alternate Email","Contact Number","Alternate Number","HQ","Company","Region","Manager / Officer","Employee Type","Sub Type","Password","Salary","Joining Date","Previous Experience","Experience Till Now","Releaving Date","Reporting To"'
    );
    let Status = "";
    ResponseData.map((item) => {
      let dob = "";
      let dob_ = "";

      let jod = "";
      let jod_ = "";

      let reldate = "";
      let reldate_ = "";

      if (item.EMPLOYEE_DOB == null || item.EMPLOYEE_DOB === "") {
        dob_ = "-";
      } else {
        dob = new Date(
          new Date(item.EMPLOYEE_DOB).toISOString().split("T")[0]
        );
        dob_ = `${dob.getDate().toString().padStart(2, "0")}-${(
          dob.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${dob.getFullYear()}`;
      }

      if (item.EMPLOYEE_DOJ == null || item.EMPLOYEE_DOJ === "") {
        jod_ = "-";
      } else {
        jod = new Date(
          new Date(item.EMPLOYEE_DOJ).toISOString().split("T")[0]
        );
        jod_ = `${jod.getDate().toString().padStart(2, "0")}-${(
          jod.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${jod.getFullYear()}`;
      }

      if (item.EMPLOYEE_DOR == null || item.EMPLOYEE_DOR === "") {
        reldate_ = "-";
      } else {
        reldate = new Date(
          new Date(item.EMPLOYEE_DOR).toISOString().split("T")[0]
        );
        reldate_ = `${reldate.getDate().toString().padStart(2, "0")}-${(
          jod.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${reldate.getFullYear()}`;
      }

      return (
        cnt++,
        csvData.push(
          '"' +
          cnt +
          '","' +
          item.EMPLOYEE_NAME +
          '","' +
          item.EMPLOYEE_GENDER +
          '","' +
          item.EMPLOYEE_DESIGNATION +
          '","' +
          item.EMPLOYEE_QUALIFICATION +
          '","' +
          dob_ +
          '","' +
          item.EMPLOYEE_EMAIL +
          '","' +
          item.EMPLOYEE_ALT_EMAIL +
          '","' +
          item.EMPLOYEE_CONTACT +
          '","' +
          item.EMPLOYEE_ALT_CONTACT +
          '","' +
          item.HQ_NAME +
          '","' +
          item.COMPANY_NAME +
          '","' +
          item.EMPLOYEE_REGION +
          '","' +
          item.ManagerType +
          '","' +
          item.EMPLOYEE_TYPE_NAME +
          '","' +
          item.EMPLOYEE_SUB_TYPE_NAME +
          '","' +
          item.EMPLOYEE_PASSWORD +
          '","' +
          item.EMPLOYEE_SALARY +
          '","' +
          jod_ +
          '","' +
          item.EMPLOYEE_PREV_EXPERIENCE +
          '","' +
          item.TotalExp +
          '","' +
          reldate_ +
          '","' +
          item.ReportingManager +
          '"'
        )
      );
    });

    const fileName = "All Employees.csv";
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
  }

  const EmployeeSeparation = (pkid) => {
    setEmployeePKID(pkid);
    setBlock5(!block5);
  };

  const ConfirmSeparation = () => {
    setBlock5(!block5);
    document.getElementById("divLoading").className = "show";
    const obj = {
      "EmployeePKID": EmployeePKID,
      "SeparationData": SeparationData,
      "SeparationReason": SeparationReason,
    };
    axios.post(MyApiUrl + "EmployeeSeparation/", obj).then((response) => {
      if (response.data === true) {
        Swal.fire({
          title: "Employee Separation Submitted!",
          icon: "success",
          confirmButtonText: "OK",
        });
        GetAllEmployees();
        document.getElementById("divLoading").className = "hide";
      } else {
        Swal.fire({
          title: "Failed To Separation Request!",
          icon: "info",
          confirmButtonText: "OK",
        });
        GetAllEmployees();
        document.getElementById("divLoading").className = "hide";
      }
    });
  }

  React.useEffect(() => {
    GetAllEmployees();
  }, []);

  let history = useHistory();
  return (
    <div id="city">
      <div id="divLoading"> </div>
      <h1 id="ccmaster">Separation Employees</h1>
      <CRow style={{ marginTop: "1%" }}>
        <CCol col="12">
          <CCard style={{ boxShadow: "0px 0px 1px 1px #959595", height: "450px" }}>
            <CCardBody>
              <CRow>
                <CCol>
                  <CCard style={{ height: "410px" }}>
                    <CCardHeader>
                      <CRow>
                        <CCol md="8">
                          All Separation Confirmed Employees
                        </CCol>
                        <CCol md="4">
                          <CButton
                            size="sm"
                            color="primary"
                            onClick={ToExcel}
                            style={{ float: "right" }}
                          >
                            Export To Excel
                          </CButton>
                        </CCol>
                        {/* <CCol md="2">
                          <CButton
                            size="sm"
                            color="success"
                            onClick={() => {
                              history.push("/Employee");
                            }}
                          >
                            Add Employee
                          </CButton>
                        </CCol> */}
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
                        fixedHeader={true}
                        scopedSlots={{
                          "Joining Date": (item) => (
                            <td>{item.EMPLOYEE_DOJ === null ? "-" : <DateFilter date={item.EMPLOYEE_DOJ} />}</td>
                          ),
                          "Date Of Birth": (item) => (
                            <td>{item.EMPLOYEE_DOB === null ? "-" : <DateFilter date={item.EMPLOYEE_DOB} />}</td>
                          ),
                        //   Incentive: (i) => (
                        //     <td>
                        //       <CRow>
                        //         <CCol md="8">
                        //           <CButton
                        //             color="primary"
                        //             size="sm"
                        //             id="AddEmp"
                        //             onClick={() =>
                        //               history.push("/AddEmployeeIncentive", {
                        //                 data: i,
                        //               })
                        //             }
                        //           >
                        //             ADD
                        //           </CButton>
                        //         </CCol>
                        //       </CRow>
                        //     </td>
                        //   ),
                        //   Separation: (item) => (
                        //     <td>
                        //       <CButton
                        //         color="primary"
                        //         size="sm"
                        //         id="AddEmp"
                        //         onClick={() => {
                        //           EmployeeSeparation(item.EMPLOYEE_PKID);
                        //         }}
                        //       >
                        //         Confirm Separation
                        //       </CButton>
                        //     </td>
                        //   ),
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
                                      style={{ width: "30%" }}
                                    />
                                  </CLink>
                                </td>
                              </React.Fragment>
                            );
                          },
                          Address: (i) => (
                            <td>
                              <CRow>
                                <CCol md="8">
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
                                <CCol md="8">
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
                                <CCol md="8">
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
                        //   Action: (item) => (
                        //     <td>
                        //       <CButton
                        //         onClick={() =>
                        //           history.push("/EditEmployee", {
                        //             data: item,
                        //           })
                        //         }
                        //         size="sm"
                        //         id="war-btn"
                        //       >
                        //         <EditIcon />
                        //         {item.status}
                        //       </CButton>
                        //       <CButton
                        //         onClick={() => {
                        //           DeleteEmployee(item.EMPLOYEE_PKID);
                        //         }}
                        //         size="sm"
                        //         id="war-btn1"
                        //       >
                        //         <DeleteSharpIcon />
                        //         {item.status}
                        //       </CButton>
                        //     </td>
                        //   ),
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
      {/* <CModal show={block5} onClose={() => setBlock5(!block5)} color="dark">
        <CModalHeader closeButton>
          <CModalTitle>Separation Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md="12">
              <CLabel
                htmlFor="exampleInputName2"
                className="pr-1"
              >
                Separation Date
              </CLabel>
              <CInput
                type="date"
                id="exampleInputName2"
                placeholder="Separation Date"
                value={SeparationData}
                onChange={(event) => {
                  setSeparationData(event.target.value);
                }}
              />
            </CCol>
            <CCol md="12" style={{ marginTop: "5%;" }}>
              <CLabel
                htmlFor="exampleInputName1"
                className="pr-1"
                style={{ marginTop: "5%;" }}
              >
                Reason
              </CLabel>
              <CInput
                type="text"
                id="exampleInputName1"
                placeholder="Reason"
                value={SeparationReason}
                onChange={(event) => {
                  setSeparationReason(event.target.value);
                }}
              />
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={ConfirmSeparation}>
            Confirm
          </CButton>
          <CButton color="secondary" onClick={() => setBlock5(!block5)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal> */}
    </div>
  );
};

export default EmployeeSeparation;
