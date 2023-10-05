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
  { key: "Sub Order No" },

  { key: "Merchant Type" },
  { key: "Merchant" },

  { key: "Order_Amount" },

  { key: "Tax Amount" },
  { key: "Final Amount for payment" },
];

const AmountToVendors = () => {
  const [responseData, setresponseData] = useState("");
  const [fromDate, setfromDate] = useState("");
  const [toDate, settoDate] = useState("");
  const [MerchantType, setMerchantType] = useState("");

  const DashBoardAmountTobeVendors = React.useCallback(() => {
    axios({
      method: "GET",
      url: TAABEDAR_SERVICE + "/DashBoardAmountTobeVendors",
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

  const GetMerchantType = () => {
    axios({
      method: "GET",
      url: TAABEDAR_SERVICE + "/GetMerchantType",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data);
        const Merch = response.data.map((item) => (
          <option value={item.pkid}>{item.Categories}</option>
        ));
        setMerchantType(Merch);
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

  const FilterDates = () => {
    axios({
      method: "GET",
      url:
        TAABEDAR_SERVICE +
        "/DashBoardAmountTobeVendorsByDates/" +
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
    DashBoardAmountTobeVendors();
  };

  const MerchChange = (event) => {
    if (event.target.value == "0") {
      DashBoardAmountTobeVendors();
    } else {
      axios({
        method: "GET",
        url:
          TAABEDAR_SERVICE +
          "/DashBoardAmountTobeVendorsBytype/" +
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
    DashBoardAmountTobeVendors();
    GetMerchantType();
  }, []);

  return (
    <>
      <CRow>
        <CCol md="12">
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol md="2">
                  <CLabel htmlFor="nf-email">Merchant Type</CLabel>
                  <CSelect
                    custom
                    name="Marchant"
                    id="Marchant"
                    onChange={MerchChange}
                  >
                    <option value="0">All</option>
                    {MerchantType}
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
          <h1 id="ccmaster">Amount To be Given to Vendors</h1>
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
                          "Sub Order No": (item) => (
                            <td>{item.subOrderNumber}</td>
                          ),
                          "Merchant Type": (item) => (
                            <td>{item.merchantType}</td>
                          ),
                          Merchant: (item) => <td>{item.merchant}</td>,
                          Order_Amount: (item) => (
                            <td>{item.subOrderTotalAmount}</td>
                          ),
                          "Tax Amount": (item) => <td>{item.taxAmount}</td>,
                          "Final Amount for payment": (item) => (
                            <td>{item.finalAmount}</td>
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

export default AmountToVendors;
