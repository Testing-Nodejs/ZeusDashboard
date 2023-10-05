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
  CLabel,
  CInput,
  CSelect,
  CDataTable,
} from "@coreui/react";
import Swal from "sweetalert2";
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
  { key: "Submited Date" },
  { key: "From Date" },
  { key: "To Date" },
  { key: "Places" },
  { key: "Export" },
];

const EmployeePlan = () => {
  const [ResponseData, setResponseData] = useState([]);
  const [ResponseData2, setResponseData2] = useState([]);
  const [Fdate, setFdate] = useState("-");
  const [Tdate, setTdate] = useState("-");
  const [empName, setEmpName] = useState("-");
  const [CountryForState, setCountryForState] = useState("");
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
  const GetEmployeeTourPlan = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "getAllEmployeePlanners",
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
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });

    axios({
      method: "GET",
      url: MyApiUrl + "getAllEmployeePlannersWithPlaces",
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


  const GetAllCust = React.useCallback(() => {
    axios({
      method: "GET",
      url: MyApiUrl + "getAllEmployeeNamesPlanners",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const CountryOption = response.data.map((item) => (
          <option value={item.EMPLOYEE_PKID}>{item.EMPLOYEE_NAME}</option>
        ));
        setEmpName(CountryOption);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const CustmerName = (event) => {
    setCountryForState(event.target.value);
  };

  const ToExcel = () => {
    document.getElementById("divLoading").className = "show";
    var cnt = 0;
    // eslint-disable-next-line no-array-constructor
    var csvData = new Array();
    csvData.push(
      '"Sl No","Status","Company","Employee Name","Contact Number","Submited Date","From Date","To Date","Place Visiting Date","Place Name","Remark","Admin Suggestion"'
    );
    let Status = "";
    ResponseData2.map((item) => {
      if (
        item.EMPLOYEE_TOUR_PLANNER_STATUS === "0" ||
        item.EMPLOYEE_TOUR_PLANNER_STATUS === 0
      ) {
        Status = "Active";
      } else if (
        item.EMPLOYEE_TOUR_PLANNER_STATUS === "1" ||
        item.EMPLOYEE_TOUR_PLANNER_STATUS === 1
      ) {
        Status = "Completed";
      } else if (
        item.EMPLOYEE_TOUR_PLANNER_STATUS === "2" ||
        item.EMPLOYEE_TOUR_PLANNER_STATUS === 2
      ) {
        Status = "Cancelled";
      }
      let idate = new Date(
        new Date(item.EMPLOYEE_TOUR_PLANNER_FROM_DATE)
          .toISOString()
          .split("T")[0]
      );
      let dateMDY = `${idate.getDate().toString().padStart(2, "0")}-${(
        idate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${idate.getFullYear()}`;

      let idate2 = new Date(
        new Date(item.EMPLOYEE_TOUR_PLANNER_TO_DATE)
          .toISOString()
          .split("T")[0]
      );
      let dateMDY2 = `${idate2.getDate().toString().padStart(2, "0")}-${(
        idate2.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${idate2.getFullYear()}`;

      let idate3 = new Date(
        new Date(item.EMPLOYEE_TOUR_PLANNER_PLACES_DATE)
          .toISOString()
          .split("T")[0]
      );
      let dateMDY3 = `${idate3.getDate().toString().padStart(2, "0")}-${(
        idate3.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${idate3.getFullYear()}`;

        let idate4 = new Date(
          new Date(item.EMPLOYEE_TOUR_PLANNER_CDATE)
            .toISOString()
            .split("T")[0]
        );
        let dateMDY4 = `${idate4.getDate().toString().padStart(2, "0")}-${(
          idate.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${idate4.getFullYear()}`;

      return (
        cnt++,
        csvData.push(
          '"' +
          cnt +
          '","' +
          Status +
          '","' +
          item.COMPANY_NAME +
          '","' +
          item.EMPLOYEE_NAME +
          '","' +
          item.EMPLOYEE_CONTACT +
          '","' +
          dateMDY4 +
          '","' +
          dateMDY +
          '","' +
          dateMDY2 +
          '","' +
          dateMDY3 +
          '","' +
          item.EMPLOYEE_TOUR_PLANNER_PLACES_NAME +
          '","' +
          item.EMPLOYEE_TOUR_PLANNER_PLACES_REMARK +
          '","' +
          item.EMPLOYEE_TOUR_PLANNER_SUGGESTION +
          '"'
        )
      );
    });

    const fileName = "Employee 15 Days Plan.csv";
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

  const SingleExport = (data, maindata) => {
    document.getElementById("divLoading").className = "show";
    var cnt = 0;
    // eslint-disable-next-line no-array-constructor
    var csvData = new Array();
    csvData.push(
      '"Sl No","Status","Company","Employee Name","Contact Number","From Date","To Date","Place Visiting Date","Place Name","Remark","Admin Suggestion"'
    );
    let Status = "";
    data.map((item) => {
      if (
        maindata.EMPLOYEE_TOUR_PLANNER_STATUS === "0" ||
        maindata.EMPLOYEE_TOUR_PLANNER_STATUS === 0
      ) {
        Status = "Active";
      } else if (
        maindata.EMPLOYEE_TOUR_PLANNER_STATUS === "1" ||
        maindata.EMPLOYEE_TOUR_PLANNER_STATUS === 1
      ) {
        Status = "Completed";
      } else if (
        maindata.EMPLOYEE_TOUR_PLANNER_STATUS === "2" ||
        maindata.EMPLOYEE_TOUR_PLANNER_STATUS === 2
      ) {
        Status = "Cancelled";
      }
      let idate = new Date(
        new Date(maindata.EMPLOYEE_TOUR_PLANNER_FROM_DATE)
          .toISOString()
          .split("T")[0]
      );
      let dateMDY = `${idate.getDate().toString().padStart(2, "0")}-${(
        idate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${idate.getFullYear()}`;

      let idate2 = new Date(
        new Date(maindata.EMPLOYEE_TOUR_PLANNER_TO_DATE)
          .toISOString()
          .split("T")[0]
      );
      let dateMDY2 = `${idate2.getDate().toString().padStart(2, "0")}-${(
        idate2.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${idate2.getFullYear()}`;

      let idate3 = new Date(
        new Date(item.EMPLOYEE_TOUR_PLANNER_PLACES_DATE)
          .toISOString()
          .split("T")[0]
      );
      let dateMDY3 = `${idate3.getDate().toString().padStart(2, "0")}-${(
        idate3.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${idate3.getFullYear()}`;
      return (
        cnt++,
        csvData.push(
          '"' +
          cnt +
          '","' +
          Status +
          '","' +
          maindata.COMPANY_NAME +
          '","' +
          maindata.EMPLOYEE_NAME +
          '","' +
          maindata.EMPLOYEE_CONTACT +
          '","' +
          dateMDY +
          '","' +
          dateMDY2 +
          '","' +
          dateMDY3 +
          '","' +
          item.EMPLOYEE_TOUR_PLANNER_PLACES_NAME +
          '","' +
          item.EMPLOYEE_TOUR_PLANNER_PLACES_REMARK +
          '","' +
          item.EMPLOYEE_TOUR_PLANNER_SUGGESTION +
          '"'
        )
      );
    });

    const fileName = "Employee 15 Days Plan.csv";
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
  const FilterDates = () => {

    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "getAllEmployeePlannersByDate/" + Fdate + "/" + Tdate + "/" + CountryForState,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response, "this is filter response")
        const items = response.data.map((item, index) => {
          return {
            ...item,
            Company: item.COMPANY_NAME,
            Name: item.EMPLOYEE_NAME,
            "Contact Number": item.EMPLOYEE_CONTACT,
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
      url: MyApiUrl + "getAllEmployeePlannersWithPlacesByFilter/" + Fdate + "/" + Tdate + "/" + CountryForState,
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

  }

  React.useEffect(() => {
    GetEmployeeTourPlan();
    GetAllCust();
  }, []);

  let history = useHistory();
  return (
    <div id="city">
      <div id="divLoading"> </div>
      <h1 id="ccmaster">Fortnight Tour Plan</h1>
      <CRow style={{ marginTop: "3%" }}>
        <CCol col="12">
          <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
            <CCardBody>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>
                      <CRow>
                        <CCol col="6">Fortnight Tour Plan</CCol>
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
                      <CRow>
                        <CCol col="3">
                          <CLabel>Select Employee</CLabel>
                          <CSelect
                            custom
                            name="Country"
                            id="Country"
                            onChange={CustmerName}
                            value={CountryForState}
                          >
                            <option value="-1">Select Employee</option>
                            {empName}
                          </CSelect>

                        </CCol>
                        <CCol col="3">
                          <CLabel>From:</CLabel>
                          <CInput
                            type="date"
                            onChange={(event) => {
                              setFdate(event.target.value);
                            }}
                            value={Fdate}
                          />
                        </CCol>
                        <CCol col="3"><CLabel>To:</CLabel>
                          <CInput
                            type="date"
                            onChange={(event) => {
                              setTdate(event.target.value);
                            }}
                            value={Tdate}
                          /></CCol>
                        <CCol col="3">

                          <CButton
                            size="sm"
                            color="info"
                            style={{ marginTop: "28px", width: "100%" }}
                            onClick={FilterDates}
                          >
                            Filter
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
                          "Submited Date": (i) => (
                            <td>
                              {
                                <DateFilter
                                  date={i.EMPLOYEE_TOUR_PLANNER_CDATE}
                                />
                              }
                            </td>
                          ),
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
                          Export: (i) => (
                            <td>
                              <CButton
                                color="primary"
                                size="sm"
                                onClick={() => {
                                  document.getElementById("divLoading").className = "show";
                                  axios({
                                    method: "GET",
                                    url: MyApiUrl + "GetTourPlaces/" + i.EMPLOYEE_TOUR_PLANNER_PKID,
                                    headers: {
                                      "content-type": "application/json",
                                    },
                                  })
                                    .then((response) => {
                                      SingleExport(response.data, i);
                                      document.getElementById("divLoading").className = "hide";
                                    })
                                    .catch((error) => {
                                      console.log(error);
                                    });
                                }}
                              >
                                To Excel
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

export default EmployeePlan;
