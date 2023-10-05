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
  { key: "Order No" },
  { key: "Order Date" },
  { key: "User Type" },
  { key: "User" },
  { key: "Order Amount" },
  { key: "Final Amount for payment" },
];

const BalanceWithCompany = () => {
  const [responseData, setresponseData] = useState("");
  const [fromDate, setfromDate] = useState("");
  const [toDate, settoDate] = useState("");

  const DashBoardBalanceWithCompany = React.useCallback(() => {
    axios({
      method: "GET",
      url: TAABEDAR_SERVICE + "/DashBoardBalanceWithCompany",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        // console.log("response:" + response.data);
        setresponseData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const FromChange = (event) => {
    setfromDate(event.target.value);
  };
  const ToChange = (event) => {
    settoDate(event.target.value);
  };

  const FilterDates = () => {
    axios({
      method: "GET",
      url:
        TAABEDAR_SERVICE +
        "/DashBoardBalanceWithCompanyByDates/" +
        fromDate +
        "/" +
        toDate +
        "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data);
        setresponseData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const FilterReset = () => {
    setfromDate("");
    settoDate("");
    DashBoardBalanceWithCompany();
  };

  const MerchChange = (event) => {
    if (event.target.value == "0") {
      DashBoardBalanceWithCompany();
    } else {
      axios({
        method: "GET",
        url:
          TAABEDAR_SERVICE +
          "/DashBoardBalanceWithCompanyByType/" +
          event.target.value +
          "",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          console.log(response.data);
          setresponseData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  React.useEffect(() => {
    DashBoardBalanceWithCompany();
  }, []);

  return (
    <>
      <CRow>
        <CCol md="12">
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol md="2">
                  <CLabel htmlFor="nf-email">Select Type</CLabel>
                  <CSelect
                    custom
                    name="Marchant"
                    id="Marchant"
                    onChange={MerchChange}
                  >
                    <option value="0">All</option>
                    <option value="1">Rider</option>
                    <option value="2">Merchant</option>
                  </CSelect>
                </CCol>
                <CCol md="2">
                  <CLabel>From:</CLabel>
                  <CInput
                    type="date"
                    onChange={FromChange}
                    value={fromDate}
                  ></CInput>
                </CCol>

                <CCol md="2">
                  <CLabel>To:</CLabel>
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
                    style={{ "marginTop": "28px", width: "100%" }}
                    onClick={FilterDates}
                  >
                    Filter
                  </CButton>
                </CCol>
                <CCol md="2">
                  <CButton
                    size="sm"
                    color="danger"
                    style={{ "marginTop": "28px", width: "100%" }}
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
          <h1 id="ccmaster">Balance With Company</h1>
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
                    <CCardHeader>List of Merchants</CCardHeader>
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
                          "Order No": (item) => <td>{item.ordNumber}</td>,
                          "Order Date": (item) => {
                            let date = new Date(item.orderDate);
                            let dateMDY = `${date.getDate()}-${
                              date.getMonth() + 1
                            }-${date.getFullYear()}`;
                            return <td>{dateMDY}</td>;
                          },
                          // <td>{item.orderDate}</td>,
                          "Sub Order No": (item) => (
                            <td>{item.subOrderNumber}</td>
                          ),
                          "User Type": (item) => <td>{item.utype}</td>,
                          User: (item) => <td>{item.uname}</td>,
                          "Order Amount": (item) => <td>{item.orderAmount}</td>,

                          "Final Amount for payment": (item) => (
                            <td>{item.finalamt}</td>
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
    </>
  );
};

export default BalanceWithCompany;
