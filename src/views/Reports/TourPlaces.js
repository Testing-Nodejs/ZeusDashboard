/**
 * @author KIMOSABE
 * @email Kimosabe@mail.com
 * @create date 2021-11-25 17:00:15
 * @modify date 2021-12-06 15:32:46
 * @desc [description]
 */

import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModalBody,
  CTextarea,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { MyApiUrl } from "src/services/service";
import DateFilter from "../masters/DateFilter";
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields = [
  { key: "Sl No" },
  { key: "Date" },
  { key: "Place" },
  { key: "Remark" },
  { key: "Suggestion" },
];

const TourPlaces = (props) => {
  const FromDate = props.location.state.data.EMPLOYEE_TOUR_PLANNER_FROM_DATE;
  const ToDate = props.location.state.data.EMPLOYEE_TOUR_PLANNER_TO_DATE;
  const Company = props.location.state.data.COMPANY_NAME;
  const Name = props.location.state.data.EMPLOYEE_NAME;
  const Pho = props.location.state.data.EMPLOYEE_CONTACT;
  const PKID = props.location.state.data.EMPLOYEE_TOUR_PLANNER_PKID;

  const [ResponseData, setResponseData] = useState([]);
  const [Suggention, setSuggention] = useState();
  const [AdminSuggention, setAdminSuggention] = useState([]);
  const [PlacePkid, setPlacePkid] = useState();
  const [block, setBlock] = useState(false);
  const [block1, setBlock1] = useState(false);

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

  const GetTourPlacesList = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "GetTourPlaces/" + PKID,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const items = response.data.map((item, index) => {
          return {
            ...item,
            Place: item.EMPLOYEE_TOUR_PLANNER_PLACES_NAME,
            "Sl No": index + 1,
            Remark: item.EMPLOYEE_TOUR_PLANNER_PLACES_REMARK,
          };
        });
        setResponseData(items);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ManageSuggetion = (pkid, status) => {
    if (status === false) {
      setPlacePkid(pkid);
      setBlock(!block);
      setSuggention("");
    } else {
      document.getElementById("divLoading").className = "show";
      setPlacePkid(pkid);
      axios({
        method: "GET",
        url: MyApiUrl + "GetPlacesAdminSuggestions/" + pkid + "",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          setAdminSuggention(response.data);
          setSuggention(response.data[0].EMPLOYEE_TOUR_PLANNER_SUGGESTION);
          document.getElementById("divLoading").className = "hide";
        })
        .catch((error) => {
          console.log(error);
        });
      setBlock1(!block1);
    }
  };

  const SendSuggestion = () => {
    if (Suggention === "" || Suggention === null) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Suggestion!",
      });
    } else {
      document.getElementById("divLoading").className = "show";
      var obj = {
        EMPLOYEE_TOUR_PLANNER_PLACES_PKID: PlacePkid,
        EMPLOYEE_TOUR_PLANNER_SUGGESTION: Suggention,
      };
      axios.put(MyApiUrl + "AdminSendSuggestion", obj).then((response) => {
        if (response.data === true) {
          Swal.fire({
            title: "Suggestion Sent!",
            icon: "succes",
            confirmButtonText: "OK",
          });
          setSuggention("");
          setBlock(!block);
          GetTourPlacesList();
          document.getElementById("divLoading").className = "hide";
        } else {
          Swal.fire({
            title: "Failed To Send",
            icon: "error",
            confirmButtonText: "OK",
          });
          document.getElementById("divLoading").className = "hide";
        }
      });
    }
  };

  const UpdateSuggetion = () => {
    if (Suggention === "" || Suggention === null) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Suggestion!",
      });
    } else {
      document.getElementById("divLoading").className = "show";
      var obj = {
        EMPLOYEE_TOUR_PLANNER_PLACES_PKID: PlacePkid,
        EMPLOYEE_TOUR_PLANNER_SUGGESTION: Suggention,
      };
      console.log(obj);
      axios.put(MyApiUrl + "AdminSendSuggestion", obj).then((response) => {
        if (response.data === true) {
          Swal.fire({
            title: "Suggestion Updated!",
            icon: "success",
            confirmButtonText: "OK",
          });
          setSuggention("");
          setBlock1(!block1);
          GetTourPlacesList();
          document.getElementById("divLoading").className = "hide";
        } else {
          Swal.fire({
            title: "Failed To Update!",
            icon: "error",
            confirmButtonText: "OK",
          });
          document.getElementById("divLoading").className = "hide";
        }
      });
    }
  }

  React.useEffect(() => {
    GetTourPlacesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let history = useHistory();
  return (
    <div>
      <div id="divLoading"> </div>
      <h1 id="ccmaster">Tour Planed Places</h1>
      <CRow style={{ marginTop: "3%" }}>
        <CCol md="2" />
        <CCol md="12">
        <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
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
                    <CCardHeader>Places List</CCardHeader>
                    <CCardBody>
                      <CRow>
                        <CCol md="12">
                          <table style={{ width: "100%" }} id="customerDetails">
                            <tr>
                              <td>
                                <tr>
                                  <th>
                                    <p className="p1">Employee Company :</p>
                                  </th>
                                  <td>
                                    <p className="p2">{Company}</p>
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <p className="p1">Employee Name :</p>
                                  </th>
                                  <td>
                                    <p className="p2">{Name}</p>
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <p className="p1">Contact Number :</p>
                                  </th>
                                  <td>
                                    <p className="p2">{Pho}</p>
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <p className="p1">From Date :</p>
                                  </th>
                                  <td>
                                    <p className="p2">
                                      {" "}
                                      {<DateFilter date={FromDate} />}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <p className="p1">To Date :</p>
                                  </th>
                                  <td>
                                    <p className="p2">
                                      {<DateFilter date={ToDate} />}
                                    </p>
                                  </td>
                                </tr>
                              </td>
                            </tr>
                          </table>
                        </CCol>
                      </CRow>
                      <hr />
                      <CRow>
                        <CCol md="4">
                          <h4 className="p1">Places List</h4>
                        </CCol>
                      </CRow>
                      <br />
                      <CDataTable
                        items={ResponseData}
                        fields={fields}
                        hover
                        striped
                        bordered
                        sorter
                        tableFilter={table}
                        itemsPerPage={10}
                        pagination
                        size="sm"
                        itemsPerPageSelect={items}
                        scopedSlots={{
                          "Date": (item) => (
                            <td>{<DateFilter date={item.EMPLOYEE_TOUR_PLANNER_PLACES_DATE} />}</td>
                          ),
                          Suggestion: (i) => (
                            <td>
                              <CRow>
                                <CCol md="8">
                                  <CButton
                                    color="primary"
                                    size="sm"
                                    id="AddEmp"
                                    onClick={() => {
                                      ManageSuggetion(
                                        i.EMPLOYEE_TOUR_PLANNER_PLACES_PKID,
                                        i.EMPLOYEE_TOUR_PLANNER_ISACTIVE
                                      );
                                    }}
                                  >
                                    Click Here
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
        <CCol md="2" />
      </CRow>
      <CModal show={block} onClose={() => setBlock(!block)} color="dark">
        <CModalHeader closeButton>
          <CModalTitle>Enter Suggestion</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CTextarea
              class="form-control"
              value={Suggention}
              onChange={(event) => {
                setSuggention(event.target.value);
              }}
              id="exampleFormControlTextarea1"
              rows="3"
              style={{ height: "200px", fontSize: "16px" }}
            ></CTextarea>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setBlock(!block)}>
            Close
          </CButton>
          <CButton color="secondary" onClick={SendSuggestion}>
            Submit
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal show={block1} onClose={() => setBlock1(!block1)} color="dark">
        <CModalHeader closeButton>
          <CModalTitle>View Suggestion</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CTextarea
              class="form-control"
              value={Suggention}
              onChange={(event) => {
                setSuggention(event.target.value);
              }}
              id="exampleFormControlTextarea1"
              rows="3"
              style={{ height: "200px", fontSize: "16px" }}
            ></CTextarea>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setBlock1(!block1)}>
            Close
          </CButton>
          <CButton color="secondary" onClick={UpdateSuggetion}>
            Update
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default TourPlaces;
