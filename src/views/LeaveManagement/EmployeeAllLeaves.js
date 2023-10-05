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
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CLink,
  CButton,
} from "@coreui/react";
import { MyApiUrl, ViewImg } from "src/services/service";
import { useHistory } from "react-router-dom";
import "../../style.css";
const EmployeeAllLeaves = (props) => {
  const empid = props.location.state.data.LEAVE_EMPLOYEE_FKID;
  const [ResponseData, setResponseData] = useState([]);

  const GetAllLeave = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "leavesbyemp/" + empid,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data);
        setResponseData(response.data);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };
  React.useEffect(() => {
    GetAllLeave();
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
                    <CCardHeader>View Employee All Leaves</CCardHeader>
                    <CCardBody>
                      <CRow>
                        {ResponseData.map((i) => {
                          let status = "";
                          let ste = 0;
                          if (i.LEAVE_ISACTIVE === 0) {
                            status = `<p style="color: #000000;font-weight: 800;
                                font-size: 13px;">Pending</p>`;
                            ste = 0;
                          } else if (i.LEAVE_ISACTIVE === 1) {
                            status = `<p style="color: #00b636;font-weight: 800;
                                font-size: 13px;">Accepted</p>`;
                            ste = 1;
                          } else {
                            status = `<p style="color: #ec3235;font-weight: 800;
                                font-size: 13px;">Denied</p>`;
                            ste = 2;
                          }
                          return (
                            <CCol md="6" style={{ marginTop: "1%" }}>
                              <table className="leavestable">
                                <tr>
                                  <td>
                                    <b>Leave Type :</b>
                                  </td>
                                  <td>
                                    <b>:</b>
                                  </td>
                                  <td>{i.LEAVE_TYPE}</td>
                                </tr>
                                <tr>
                                  <td>
                                    <b>From Date</b>
                                  </td>
                                  <td>
                                    <b>:</b>
                                  </td>
                                  <td>{i.LEAVE_FROM_DATE}</td>
                                </tr>
                                <tr>
                                  <td>
                                    <b>To Date</b>
                                  </td>
                                  <td>
                                    <b>:</b>
                                  </td>
                                  <td>{i.LEAVE_TO_DATE}</td>
                                </tr>
                                <tr>
                                  <td>
                                    <b>Reason</b>
                                  </td>
                                  <td>
                                    <b>:</b>
                                  </td>
                                  <td>{i.LEAVE_REASON}</td>
                                </tr>
                                {ste === 2 ?
                                  <tr>
                                    <td>
                                      <b>Denied Reason</b>
                                    </td>
                                    <td>
                                      <b>:</b>
                                    </td>
                                    <td>{i.LEAVE_REMARKS}</td>
                                  </tr>
                                  : <tr>
                                  <td>
                                    <b>Denied Reason</b>
                                  </td>
                                  <td>
                                    <b>:</b>
                                  </td>
                                  <td>-</td>
                                </tr>}
                                <tr>
                                  <td>
                                    <b>Attachment</b>
                                  </td>
                                  <td>
                                    <b>:</b>
                                  </td>
                                  <td>
                                    <CLink
                                      href={ViewImg + "/" + i.LEAVE_FILE}
                                      target="_blank"
                                    >
                                      {i.LEAVE_FILE}
                                    </CLink>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <b>Status</b>
                                  </td>
                                  <td>
                                    <b>:</b>
                                  </td>
                                  <td>
                                    <div
                                      style={{ marginTop: "6%" }}
                                      dangerouslySetInnerHTML={{
                                        __html: status,
                                      }}
                                    />
                                  </td>
                                </tr>
                              </table>
                            </CCol>
                          );
                        })}
                      </CRow>
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

export default EmployeeAllLeaves;
