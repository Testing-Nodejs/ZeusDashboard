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

const ProductWiseSales = () => {

    const [ResponseData, setResponseData] = useState([]);

    const GetEmployeeOrders = () => {
        document.getElementById("divLoading").className = "show";
        axios({
            method: "GET",
            url: MyApiUrl + "getProductSalesNoCompany/",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((response) => {
                console.log("🚀 ~ file: ProductWiseSales.js ~ line 46 ~ .then ~ response", response)
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
            <h1 id="ccmaster">Product Sales Report</h1>
            <CRow style={{ marginTop: "3%" }}>
                <CCol md="2" />
                <CCol md="12">
                <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
                        <CCardBody>
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
                                                                    <th>Company</th>
                                                                    <th>Product Species</th>
                                                                    <th>Product Name</th>
                                                                    <th>Quantity Count</th>
                                                                    <th>Sale Count</th>
                                                                    <th>Product Code</th>
                                                                    <th>Bar Code</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {ResponseData.map((i, index) => {
                                                                    return (
                                                                        <tr>
                                                                            <td>{index + 1}</td>
                                                                            <td>{i.COMPANY_NAME}</td>
                                                                            <td>{i.prod_species_name}</td>
                                                                            <td>{i.PRODUCT_NAME}</td>
                                                                            <td>{i.qtycnt}</td>
                                                                            <td>
                                                                                <CButton
                                                                                    style={{ float: "none" }}
                                                                                    onClick={() => {
                                                                                        history.push("/ProductSalesOrderItems", {
                                                                                            data: { i },
                                                                                        });
                                                                                    }}
                                                                                >
                                                                                    {i.pcount}
                                                                                </CButton>
                                                                            </td>
                                                                            <td>{i.PRODUCT_CODE}</td>
                                                                            <td>{i.PRODUCT_BAR_CODE}</td>
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

export default ProductWiseSales;
