import React, { useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CSelect,
  CInput,
  CLabel,
} from "@coreui/react";

import "../../../src/style.css";
import TAABEDAR_SERVICE from "src/services/service";
const table = { placeholder: "Search here...", label: "Search" };
const Rows = { label: "Rows" };

const fields = [
  { key: "Sl No." },
  { key: "Order no" },
  { key: "Order Date" },
  { key: "Delivery Address" },
  { key: "Rider" },
  { key: "Rider Email" },
  { key: "Rider Phone" },

  { key: "Order Amount" },
  { key: "Rider amount" },
];

const AmountToRiders = () => {
  const [responseData, setresponseData] = useState("");
  const [fromDate, setfromDate] = useState("");
  const [toDate, settoDate] = useState("");

  const DashBoardAmountTobeRiders = React.useCallback(() => {
    axios({
      method: "GET",
      url: TAABEDAR_SERVICE + "/DashBoardAmountTobeRiders",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        console.log("response:" + response.data);
        setresponseData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const FilterDates = () => {
    axios({
      method: "GET",
      url:
        TAABEDAR_SERVICE +
        "/DashBoardRiderByDates/" +
        fromDate +
        "/" +
        toDate +
        "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        setresponseData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const FromChange = (event) => {
    setfromDate(event.target.value);
  };
  const ToChange = (event) => {
    settoDate(event.target.value);
  };

  const FilterReset = () => {
    setfromDate("");
    settoDate("");
    DashBoardAmountTobeRiders();
  };

  React.useEffect(() => {
    DashBoardAmountTobeRiders();
  }, []);

  return (
    <>
      <CRow>
        <CCol md="12">
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol md="2">
                  <CLabel htmlFor="nf-email">From</CLabel>
                  <CInput
                    type="date"
                    onChange={FromChange}
                    value={fromDate}
                  ></CInput>
                </CCol>
                <CCol md="2">
                  <CLabel htmlFor="nf-email">To</CLabel>
                  <CInput
                    type="date"
                    onChange={ToChange}
                    value={toDate}
                  ></CInput>
                </CCol>

                <CCol md="2">
                  <CButton
                    size="sm"
                    color="info"
                    style={{ "margin-top": "28px", width: "100%" }}
                    onClick={FilterDates}
                  >
                    Filter
                  </CButton>
                </CCol>
                <CCol md="2">
                  <CButton
                    size="sm"
                    color="danger"
                    style={{ "margin-top": "28px", width: "100%" }}
                    onClick={FilterReset}
                  >
                    Reset
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
          </CCard>
        </CCol>
        <CCol md="3"></CCol>
        <CCol md="6">
          <h1 id="ccmaster">Amount To be Given to Riders</h1>
        </CCol>
        <CCol md="3"></CCol>
      </CRow>
      <br></br>
      <CRow>
        <CCol md="12">
          <CCard>
            <CCardBody>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>List of Riders</CCardHeader>
                    <CCardBody>
                      <CDataTable
                        items={responseData}
                        fields={fields}
                        striped
                        itemsPerPage={10}
                        pagination
                        sorter
                        tableFilter={table}
                        itemsPerPageSelect={Rows}
                        scopedSlots={{
                          "Sl No.": (item) => <td>{item.id}</td>,
                          "Order no": (item) => <td>{item.ordNumber}</td>,
                          "Order Date": (item) => {
                            let date = new Date(item.orderDate);
                            let dateMDY = `${date.getDate()}-${
                              date.getMonth() + 1
                            }-${date.getFullYear()}`;
                            return <td>{dateMDY}</td>;
                          },
                          "Delivery Address": (item) => (
                            <td>{item.deliveryAddress}</td>
                          ),
                          "Order Amount": (item) => <td>{item.orderAmount}</td>,
                          Rider: (item) => <td>{item.riderName}</td>,
                          "Rider Email": (item) => <td>{item.riderEmail}</td>,
                          "Rider Phone": (item) => <td>{item.riderPhone}</td>,

                          "Rider amount": (item) => <td>{item.riderAmount}</td>,
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
    </>
  );
};

export default AmountToRiders;
