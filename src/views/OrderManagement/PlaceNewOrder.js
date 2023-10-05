/**
 * @author KIMOSABE
 * @email Kimosabe@mail.com
 * @create date 2021-11-25 17:04:22
 * @modify date 2021-12-07 12:34:51
 * @desc [description]
 */

import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
  CButton,
} from "@coreui/react";
import axios from "axios";
import "../../style.css";
import { useHistory } from "react-router-dom";
import { MyApiUrl } from "src/services/service";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields2 = [
  { key: "Customer Category" },
  { key: "Customer Type" },
  { key: "Customer Sub Type" },
  { key: "Customer Name" },
  // { key: "Firm Name" },
  { key: "Capacity" },
  { key: "Action" },
];
const PlaceNewOrder = () => {
  const [ResponseData, setResponseData] = useState([]);

  const GetAllCustomers = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "customer",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const items = response.data.map((item) => {
          return {
            ...item,
            "Customer Category": item.CUSTOMER_CATEGORY_NAME,
            "Customer Type": item.CUSTOMER_TYPE_NAME,
            "Customer Sub Type": item.CUSTOMER_SUBTYPE_NAME,
            "Customer Name": item.CUSTOMER_NAME,
            "Firm Name": item.CUSTOMER_FIRM_NAME,
            Capacity: item.CUSTOMER_CAPACITY,
          };
        });
        setResponseData(items);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    GetAllCustomers();
  }, []);
  let history = useHistory();
  return (
    <div id="city">
      <div id="divLoading"> </div>
      <h1 id="ccmaster">Place New Order</h1>
      <CRow style={{ marginTop: "3%" }}>
        <CCol col="12">
          <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
            <CCardBody>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>Select Customer</CCardHeader>
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
                          Action: (i) => (
                            <td>
                              <CRow>
                                <CCol md="10">
                                  <CButton
                                    color="primary"
                                    size="sm"
                                    onClick={() => {
                                      history.push(
                                        "/PlaceOrderProductsSelect",
                                        {
                                          data: i,
                                        }
                                      );
                                    }}
                                  >
                                    Select
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
      </CRow>
    </div>
  );
};
export default PlaceNewOrder;
