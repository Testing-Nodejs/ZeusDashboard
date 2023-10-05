/* eslint-disable react-hooks/exhaustive-deps */
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
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CModal,
    CButton,
    CLabel,
    CSelect,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { MyApiUrl } from "src/services/service";
import DateFilter from "../masters/DateFilter";
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };

const ProductSalesOrderItems = (props) => {
    const CompanyID = props.location.state.data.i.PRODUCT_COMPANY_FKID;
    const COMPANY_NAME = props.location.state.data.i.COMPANY_NAME;
    const PRODUCT_PKID = props.location.state.data.i.PRODUCT_PKID;
    const PRODUCT_NAME = props.location.state.data.i.PRODUCT_NAME;

    const [ResponseData, setResponseData] = useState([]);

    const GetEmployeeOrders = () => {
        document.getElementById("divLoading").className = "show";
        axios({
            method: "GET",
            url:
                MyApiUrl +
                "/OrderItemsByProductAndCompany/" +
                CompanyID +
                "/" +
                PRODUCT_PKID,
            headers: {
                "content-type": "application/json",
            },
        })
            .then((response) => {
                setResponseData(response.data);
                document.getElementById("divLoading").className = "hide";
            })
            .catch((error) => {
                console.log(error);
            });
    };

    React.useEffect(() => {
        GetEmployeeOrders();
    }, []);
    let history = useHistory();
    return (
        <div>
            <div id="divLoading"> </div>
            <h1 id="ccmaster">Product Sales of {COMPANY_NAME}</h1>
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
                                                <CCol col="6">Product wise sales</CCol>
                                                <CCol col="6"></CCol>
                                            </CRow>
                                        </CCardHeader>
                                        <CCardBody>
                                            <CRow>
                                                <CCol md="12">
                                                    <div style={{ overflow: "auto" }}>
                                                        <table id="Attendence">
                                                            <thead>
                                                                <tr>
                                                                    <th>Sl</th>
                                                                    <th>Product Name</th>
                                                                    <th>Order Date</th>
                                                                    <th>Sale Quantity</th>
                                                                    <th>Unit</th>
                                                                    <th>Customer Price</th>
                                                                    <th>Discount</th>
                                                                    <th>Total Amount</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {ResponseData.map((i, index) => {
                                                                    return (
                                                                        <tr>
                                                                            <td>{index + 1}</td>
                                                                            <td>{PRODUCT_NAME}</td>
                                                                            <td>
                                                                                <DateFilter date={i.ORDER_DATE} />
                                                                            </td>
                                                                            <td>{i.ORDER_ITEM_QTY}</td>
                                                                            <td>
                                                                                <b>{i.Punit}</b>
                                                                            </td>
                                                                            <td>{i.ORDER_ITEM_CUSTOMER_PRICE}</td>
                                                                            <td>{i.ORDER_ITEM_DISCOUNT + " %"}</td>
                                                                            <td>{i.ORDER_ITEM_ACTUAL_AMOUNT}</td>
                                                                        </tr>
                                                                    );
                                                                })}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </CCol>
                                            </CRow>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol md="2" />
            </CRow>
        </div>
    );
};

export default ProductSalesOrderItems;
