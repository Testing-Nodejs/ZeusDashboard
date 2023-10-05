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
  CInput,
  CButton,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { MyApiUrl } from "src/services/service";
import "../../style.css";

const ManageBatchNumbers = (props) => {
  const OrderNumber = props.location.state.data.OrderNumber;
  const Company = props.location.state.data.Company;
  const Customer = props.location.state.data.Customer;
  const Logistic = props.location.state.data.Logistic;
  const SupplyType = props.location.state.data.SupplyType;
  const Amount = props.location.state.data.Amount;
  const Orderpkid = props.location.state.data.Orderpkid;

  const productname = props.location.state.data.item.PRODUCT_NAME;
  const Productunit = props.location.state.data.item.Unit;
  const ProductMrp = props.location.state.data.item.PRD_PACKAGE_MRP;
  const ProductID = props.location.state.data.item.ORDER_ITEM_PRODUCT_FKID;
  const OrderItemID = props.location.state.data.item.ORDER_ITEM_PKID;

  const [InputFeilds, setInputFeilds] = useState();
  const [InputFeildsval, setInputFeildsval] = useState();

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

  const GetInputFeilds = (event) => {
    document.getElementById("divLoading").className = "show";
    let batchcnt = event.target.value;
    setInputFeildsval(event.target.value);
    var vals = "";
    for (let i = 0; i < batchcnt; i++) {
      vals = vals + '<div class="col-md-4" style="border-right: 1px solid #ababab;border-bottom: 1px solid #ababab; padding-bottom: 2%"><div class="col-md-12"><label style="margin-top: 5%">Batch Number ' +
        (i + 1) + '</label><input type="text" class="form-control" id="batchNo-' + i + '" placeholder="Batch Number ' + (i + 1) + '"/></div><div class="col-md-12"><label style="margin-top: 5%">Batch ' + (i + 1) + ' Quantity</label><input type="text" class="form-control" id="batchNoqty-' + i + '" placeholder="Batch Quantity ' + (i + 1) + '"/></div></div>';
    }
    setInputFeilds(vals);
    document.getElementById("divLoading").className = "hide";
  };

  const SubmitData = () => {
    document.getElementById("divLoading").className = "show";
    let arr = [];
    for (let i = 0; i < InputFeildsval; i++) {
      let vall = document.getElementById("batchNo-" + i + "").value;
      let qty = document.getElementById("batchNoqty-" + i + "").value;
      let obj = {
        Batch: "Batch-" + (i + 1) + "",
        BatchNumber: vall,
        BatchQuantity: qty,
      };
      arr.push(obj);
    }
    let objFinal = {
      OrderID: Orderpkid,
      OrderItemID: OrderItemID,
      ProductID: ProductID,
      ProductBatches: arr,
    };
    console.log(objFinal);
    axios.post(MyApiUrl + "addProductBatchNumbers/", objFinal).then((response) => {
      if (response.data === true) {
        Swal.fire({
          title: "Batch Numbers Added Successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        document.getElementById("divLoading").className = "hide";
        history.goBack()
      } else {
        Swal.fire({
          title: "Failed To Add Batch Numbers!",
          icon: "error",
          confirmButtonText: "OK",
        });
        document.getElementById("divLoading").className = "hide";
      }
    });
  };

  React.useEffect(() => { }, []);

  let history = useHistory();

  return (
    <div>
      <div id="divLoading"> </div>
      <h1 id="ccmaster">Order Item</h1>
      <br />
      <CRow>
        <CCol md="2" />
        <CCol md="12">
          <CCard>
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
                    <CCardHeader>
                      <CRow>
                        <CCol md="6">Order Details</CCol>
                        <CCol md="1"></CCol>
                        <CCol md="5">Product Details</CCol>
                      </CRow>
                    </CCardHeader>
                    <CCardBody>
                      <CRow>
                        <CCol md="12">
                          <table id="customerDetails" style={{ width: "100%" }}>
                            <tr>
                              <td style={{ borderRight: "1px solid #7e0103" }}>
                                <tr>
                                  <th>
                                    <b>Order Number :</b>
                                  </th>
                                  <td>{OrderNumber}</td>
                                </tr>
                                <tr>
                                  <th>
                                    <b>Company :</b>
                                  </th>
                                  <td>{Company}</td>
                                </tr>
                                <tr>
                                  <th>
                                    <b>Customer Name :</b>
                                  </th>
                                  <td>{Customer}</td>
                                </tr>
                                <tr>
                                  <th>
                                    <b>Logistic :</b>
                                  </th>
                                  <td>{Logistic}</td>
                                </tr>
                                <tr>
                                  <th>
                                    <b>Supply Type :</b>
                                  </th>
                                  <td>{SupplyType}</td>
                                </tr>
                                <tr>
                                  <th>
                                    <b>Order Amount :</b>
                                  </th>
                                  <td>{Amount}</td>
                                </tr>
                              </td>
                              <td>
                                <tr>
                                  <th>
                                    <b>Product Name :</b>
                                  </th>
                                  <td>{productname}</td>
                                </tr>
                                <tr>
                                  <th>
                                    <b>Unit :</b>
                                  </th>
                                  <td>{Productunit}</td>
                                </tr>
                                <tr>
                                  <th>
                                    <b>MRP :</b>
                                  </th>
                                  <td>{ProductMrp}</td>
                                </tr>
                              </td>
                            </tr>
                          </table>
                        </CCol>
                      </CRow>
                      <hr />
                      <CRow>
                        <CCol md="4">
                          <h3 className="p1">
                            <b
                              style={{
                                color: "black",
                                fontWeight: "600",
                                fontSize: "14px",
                              }}
                            >
                              Manage Product Batch Numbers
                            </b>
                          </h3>
                          <CInput
                            type="text"
                            id="exampleInputName2"
                            placeholder="No Of Batch Numbers"
                            onChange={GetInputFeilds}
                          />
                        </CCol>
                      </CRow>
                      <hr />
                      <CRow>
                        <CCol md="12">
                          <CRow
                            dangerouslySetInnerHTML={{ __html: InputFeilds }}
                          />
                        </CCol>
                      </CRow>
                      <br />
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
              <CButton
                color="primary"
                size="sm"
                style={{ float: "right" }}
                onClick={SubmitData}
              >
                Submit
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md="2" />
      </CRow>
    </div>
  );
};

export default ManageBatchNumbers;
