/**
 * @author KIMOSABE
 * @email Kimosabe@mail.com
 * @create date 2021-11-25 17:00:15
 * @modify date 2021-12-06 15:32:46
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
  CDataTable,
  CButton,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CModal,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { MyApiUrl } from "src/services/service";
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields3 = [
  { key: "Sl No" },
  { key: "Product Name" },
  { key: "Unit" },
  { key: "Batch No" },
];
const fields = [
  { key: "Sl No" },
  { key: "Product Name" },
  { key: "Package" },
  { key: "Unit" },
  { key: "Quantity" },
  { key: "MRP" },
  { key: "Customer Price" },
  { key: "Total Amount" },
  { key: "Discount" },
  { key: "Free Unit/Scheme" },
  { key: "Grand Total" },
  { key: "Batch No" },
];

const fields2 = [{ key: "Sl No" }, { key: "Batch" }, { key: "Batch Number" }, { key: "Batch Quantity" }];

const OrderItems = (props) => {
  const OrderNumber = props.location.state.data.ORDER_NUMBER;
  const Company = props.location.state.data.COMPANY_NAME;
  const Customer = props.location.state.data.CUSTOMER_NAME;
  const Logistic = props.location.state.data.ORDER_LOGISTIC;
  const SupplyType = props.location.state.data.SUPPLY_NAME;
  const Amount = props.location.state.data.ORDER_ORDER_AMOUNT;
  const Orderpkid = props.location.state.data.ORDER_PKID;
  const OrderTypeID = props.location.state.data.ORDER_ORDER_TYPE_FKID;


  const [ResponseData, setResponseData] = useState([]);
  const [BatchNumbers, setBatchNumbers] = useState([]);
  const [block, setblock] = useState(false);

  const GetAllOrderItems = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "GetOrderItemOrderID/" + Orderpkid,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data)
        const items = response.data.map((item, index) => {
          return {
            ...item,
            "Grand Total": item.ORDER_ITEM_ACTUAL_AMOUNT,
            "Sl No": index + 1,
            "Product Name": item.PRODUCT_NAME,
            Package:
              item.PRD_PACKAGE_UNIT + " " + item.UNIT_OF_MEASUREMENT_SHORT_KEY,
              Unit:
              item.ORDER_ITEM_UNIT_QTY,
            Quantity:
              item.ORDER_ITEM_QTY,
            MRP: item.PRD_PACKAGE_MRP,
            "Customer Price": item.ORDER_ITEM_CUSTOMER_PRICE,
            "Total Amount": item.ORDER_ITEM_TOTAL_AMOUNT,
            Discount: item.ORDER_ITEM_DISCOUNT + "%",
            "Free Unit/Scheme": item.ORDER_ITEM_FREE_UNIT_SCHEME,
          };
        });
        setResponseData(items);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ViewBatchNumbers = (itemID, ProductID) => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url:
        MyApiUrl +
        "/getProductBatchNumbers/" +
        Orderpkid +
        "/" +
        itemID +
        "/" +
        ProductID +
        "",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const items = response.data.map((item, index) => {
          return {
            ...item,
            "Sl No": index + 1,
            Batch: item.PRODUCT_BATCH,
            "Batch Number": item.PRODUCT_BATCH_NUMBER,
            "Batch Quantity": item.PRODUCT_BATCH_QUANTITY,
          };
        });
        setBatchNumbers(items);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
    setblock(!block);
  };

  React.useEffect(() => {
    GetAllOrderItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let history = useHistory();
  return (
    <div>
      <div id="divLoading"> </div>
      <h1 id="ccmaster">Order Item</h1>
      <br />
      <CRow>
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
                    <CCardHeader>Order Details</CCardHeader>
                    <CCardBody>
                      <CRow>
                        <CCol md="6">
                          <p className="p1">Order Number :</p>
                          <p className="p1">Company :</p>
                          <p className="p1">Customer Name :</p>
                          <p className="p1">Logistic :</p>
                          <p className="p1">Supply Type :</p>
                          <p className="p1">Order Amount :</p>
                        </CCol>
                        <CCol md="6">
                          <p className="p2">{OrderNumber}</p>
                          <p className="p2">{Company}</p>
                          <p className="p2"> {Customer}</p>
                          <p className="p2">{Logistic}</p>
                          <p className="p2">{SupplyType}</p>
                          <p className="p2">{Amount}</p>
                        </CCol>
                      </CRow>
                      <hr />
                      <CRow>
                        <CCol md="4">
                          <h4 className="p1">Order Items / Products</h4>
                        </CCol>
                      </CRow>
                      <br />
                      {OrderTypeID === 3 || OrderTypeID === 4 || OrderTypeID === 5 ?
                        <CDataTable
                          items={ResponseData}
                          fields={fields3}
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
                            "Batch No": (i) => (
                              <td>
                                <CRow>
                                  <CCol md="8">
                                    <CButton
                                      color="primary"
                                      size="sm"
                                      id="AddEmp"
                                      onClick={() => {
                                        ViewBatchNumbers(
                                          i.ORDER_ITEM_PKID,
                                          i.ORDER_ITEM_PRODUCT_FKID
                                        );
                                      }}
                                    >
                                      View
                                    </CButton>
                                  </CCol>
                                </CRow>
                              </td>
                            ),
                          }}
                        /> : <CDataTable
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
                            "Batch No": (i) => (
                              <td>
                                <CRow>
                                  <CCol md="8">
                                    <CButton
                                      color="primary"
                                      size="sm"
                                      id="AddEmp"
                                      onClick={() => {
                                        ViewBatchNumbers(
                                          i.ORDER_ITEM_PKID,
                                          i.ORDER_ITEM_PRODUCT_FKID
                                        );
                                      }}
                                    >
                                      View
                                    </CButton>
                                  </CCol>
                                </CRow>
                              </td>
                            ),
                          }}
                        />}
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md="2" />
      </CRow>
      <CModal show={block} onClose={() => setblock(!block)} color="dark">
        <CModalHeader closeButton>
          <CModalTitle>Product Batch Numbers</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md="12">
              <CDataTable
                items={BatchNumbers}
                fields={fields2}
                hover
                striped
                bordered
                sorter
                tableFilter={table}
                itemsPerPage={10}
                pagination
                size="sm"
                itemsPerPageSelect={items}
              />
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setblock(!block)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default OrderItems;
