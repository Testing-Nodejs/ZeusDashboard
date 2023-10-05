/**
 * @author KIMOSABE
 * @email Kimosabe@mail.com
 * @create date 2021-11-29 12:14:40
 * @modify date 2021-12-06 15:20:08
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
  CLink,
  CTextarea,
} from "@coreui/react";
import { MyApiUrl, ViewImg } from "src/services/service";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DateFilter from "../masters/DateFilter";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields2 = [
  { key: "Action" },
  { key: "Employee Name" },
  { key: "Is Manager" },
  { key: "Leave Count" },
  { key: "Leave Type" },
  { key: "From Date" },
  { key: "To Date" },
  { key: "Reason" },
  { key: "Attachment" },
];

const LeaveRequest = () => {
  const [ResponseData, setResponseData] = useState([]);
  const [block, setBlock] = useState(false);
  const [DelReason, setDelReason] = useState();
  const [LeavePkid, setLeavePkid] = useState();
  const [block3, setblock3] = useState(false);
  const [LeaveRemarkRes, setLeaveRemarkRes] = useState("");

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

  const GetAllLeaveRequest = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "leaves",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const items = response.data.map((item) => {
          let manager = "";
          if (item.EMPOLYEE_IS_MANAGER === 1) {
            manager = "Manager";
          } else {
            manager = "Officer";
          }
          return {
            ...item,
            "Is Manager": manager,
            "Employee Name": item.EMPLOYEE_NAME,
            "Leave Type": item.LEAVE_TYPE,
          };
        });
        setResponseData(items);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const AcceptRequest = (pkid) => {
    document.getElementById("divLoading").className = "show";
    axios.put(MyApiUrl + "acceptleaves/" + pkid).then((response) => {
      if (response.data === true) {
        Swal.fire({
          title: "Leave Confirmed!",
          icon: "success",
          confirmButtonText: "OK",
        });
        GetAllLeaveRequest();
        document.getElementById("divLoading").className = "hide";
      } else {
        Swal.fire({
          title: "Failed!",
          icon: "error",
          confirmButtonText: "OK",
        });
        document.getElementById("divLoading").className = "hide";
      }
    });
  };

  const RejectRequest = (pkid) => {
    setblock3(!block3);
    setLeavePkid(pkid);
  };

  const ConfirmLeaveReject = () => {
    // eslint-disable-next-line no-restricted-globals
    var res = confirm("Are you sure you want to Deny");
    if (res) {
      document.getElementById("divLoading").className = "show";
      var obj = {
        LEAVE_PKID: LeavePkid,
        LEAVE_REMARKS: LeaveRemarkRes,
      }
      axios.put(MyApiUrl + "rejectleaves/" + LeavePkid, obj).then((response) => {
        if (response.data === true) {
          Swal.fire({
            title: "Leave Request Denied!",
            icon: "success",
            confirmButtonText: "OK",
          });
          setblock3(!block3);
          setLeaveRemarkRes("");
          GetAllLeaveRequest();
          document.getElementById("divLoading").className = "hide";
        } else {
          Swal.fire({
            title: "Failed!",
            icon: "error",
            confirmButtonText: "OK",
          });
          document.getElementById("divLoading").className = "hide";
        }
      });
    }
  }

  const LeaveReason = (pkid) => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "leavereason/" + pkid + "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        setDelReason(response.data[0].LEAVE_REASON);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
    setBlock(!block);
  };

  React.useEffect(() => {
    GetAllLeaveRequest();
  }, []);

  let history = useHistory();

  return (
    <div id="city">
      <div id="divLoading"> </div>
      <h1 id="ccmaster">Employee Leave Request</h1>
      <CRow style={{ marginTop: "3%" }}>
        <CCol col="12">
          <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
            <CCardBody>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>View Employee Leave Request</CCardHeader>
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
                          "From Date": (item) => (
                            <td>
                              {<DateFilter date={item.LEAVE_FROM_DATE} />}
                            </td>
                          ),
                          "To Date": (item) => (
                            <td>{<DateFilter date={item.LEAVE_TO_DATE} />}</td>
                          ),
                          Attachment: (i) => (
                            <td>
                              <CLink
                                href={ViewImg + "/" + i.LEAVE_FILE}
                                target="_blank"
                              >
                                {i.LEAVE_FILE}
                              </CLink>
                            </td>
                          ),
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
                          Reason: (i) => (
                            <td>
                              <CRow>
                                <CCol md="8">
                                  <CButton
                                    color="primary"
                                    size="sm"
                                    id="AddEmp"
                                    onClick={() => {
                                      LeaveReason(i.LEAVE_PKID);
                                    }}
                                  >
                                    View
                                  </CButton>
                                </CCol>
                              </CRow>
                            </td>
                          ),
                          Action: (i) => (
                            <td>
                              <CButton
                                onClick={() => {
                                  AcceptRequest(i.LEAVE_PKID);
                                }}
                                size="sm"
                                color="success"
                              >
                                Accept
                                {i.status}
                              </CButton>&nbsp;&nbsp;&nbsp;
                              <CButton
                                onClick={() => {
                                  RejectRequest(i.LEAVE_PKID);
                                }}
                                size="sm"
                                color="danger"
                              >
                                Deny
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
      <CModal show={block} onClose={() => setBlock(!block)} color="dark">
        <CModalHeader closeButton>
          <CModalTitle>Reason</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>{DelReason}</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setBlock(!block)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal show={block3} onClose={() => setblock3(!block3)} color="dark">
        <CModalHeader closeButton>
          <CModalTitle>Remark</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow style={{ padding: "0% 5% 0% 5% !important" }}>
            <CTextarea
              class="form-control"
              value={LeaveRemarkRes}
              onChange={(event) => {
                setLeaveRemarkRes(event.target.value);
              }}
              id="exampleFormControlTextarea1"
              rows="3"
              style={{ height: "200px", fontSize: "16px" }}
            ></CTextarea>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setblock3(!block3)}>
            Close
          </CButton>
          <CButton color="secondary" onClick={ConfirmLeaveReject}>
            Submit
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default LeaveRequest;
