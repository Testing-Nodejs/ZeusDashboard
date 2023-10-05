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

const SalesReportByProductUnits = (props) => {
  const CompanyID = props.location.state.data.CompanyID;
  const COMPANY_NAME = props.location.state.data.COMPANY_NAME;

  const [ResponseData, setResponseData] = useState([]);

  const GetEmployeeOrders = () => {
    axios({
      method: "GET",
      url: MyApiUrl + "ProductUnitSales/" + CompanyID,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        setResponseData(response.data);
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
      <h1 id="ccmaster">Product Unit Sales, from {COMPANY_NAME}</h1>
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
                        <CCol col="6">Product unit wise sales</CCol>
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
                                  <th>Product Species</th>
                                  <th>Product Name</th>
                                  <th>Product Code</th>
                                  <th>Product Bar Code</th>
                                  <th>Product Unit</th>
                                  <th>Quantity Count</th>
                                  <th>Sale Count</th>
                                </tr>
                              </thead>
                              <tbody>
                                {ResponseData.map((i, index) => {
                                  return (
                                    <tr>
                                      <td>{index + 1}</td>
                                      <td>{i.PRODUCT_SPECIES_NAME}</td>
                                      <td>{i.PRODUCT_NAME}</td>
                                      <td>{i.PRODUCT_CODE}</td>
                                      <td>{i.PRODUCT_BAR_CODE}</td>
                                      <td><b>{i.unit}</b></td>
                                      <td>{i.unitQtycnt}</td>
                                      <td>
                                        <CButton
                                          style={{ float: "none" }}
                                          onClick={() => {
                                            history.push(
                                              "/OrderItemByProductsUnit",
                                              {
                                                data: {
                                                  i,
                                                  CompanyID,
                                                  COMPANY_NAME,
                                                },
                                              }
                                            );
                                          }}
                                        >
                                          {i.unitcnt}
                                        </CButton>
                                      </td>
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

export default SalesReportByProductUnits;
