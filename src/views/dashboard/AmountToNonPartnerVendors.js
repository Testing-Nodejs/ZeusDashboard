import React from "react";

import { Link } from 'react-router-dom';

import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CButton,
    CSelect, CInput,
    CLabel,
} from '@coreui/react'

import '../../../src/style.css';
import TAABEDAR_SERVICE from "src/services/service";
import { useHistory } from 'react-router-dom';
import promoData from 'src/views/users/Payment'
const table = { placeholder: "Search here...", label: "Search" };
const Rows = { label: "Rows" }

const fields = [
    { key: 'SLNO' },
    { key: 'Rider' },
    { key: 'City' },
    { key: 'Total Orders' },
    { key: 'Order_Amount' },
    { key: 'Total Deliveries' },
    { key: 'Delivery Charge' },
    { key: 'Service Charge' },
    { key: 'Final Amount for payment' },

];

const Pendings = () => {

    let history = useHistory();

    const redirect = () => {
        history.push("/AmountToRiders");
    }

    return (

        <>

            <CRow>
                <CCol md="12">
                    <CCard>
                        <CCardHeader>
                            <CRow>

                                <CCol md="4">
                                    <CLabel htmlFor="nf-email">Month</CLabel>
                                    <CSelect custom name="Store" id="Store">
                                        <option value="0">Jan</option>
                                        <option value="1">Feb</option>
                                        <option value="2">March</option>
                                        <option value="3">April</option>
                                    </CSelect>
                                </CCol>


                                <CCol md="4">
                                    <CLabel htmlFor="nf-email">Vendor</CLabel>
                                    <CSelect custom name="Store" id="Store">
                                        <option value="0">Vendor1</option>
                                        <option value="1">Vendor2</option>
                                        <option value="2">Vendor3</option>
                                        <option value="3">Vendor4</option>
                                    </CSelect>
                                </CCol>

                                <CCol md="4">
                                    <CLabel htmlFor="nf-email">Category</CLabel>
                                    <CSelect custom name="Store" id="Store">
                                        <option value="0">Restraunts</option>
                                        <option value="1">Grocery</option>
                                        <option value="2">Pharmacy</option>
                                    </CSelect>
                                </CCol>

                                <CCol md="4">
                                    <CLabel htmlFor="nf-email">From</CLabel>
                                    <CInput type="date"></CInput>
                                </CCol>
                                <CCol md="4">
                                    <CLabel htmlFor="nf-email">To</CLabel>
                                    <CInput type="date"></CInput>
                                </CCol>
                                <CCol md="4">

                                </CCol>

                                <CCol md="2">
                                    <CButton size="sm" id="dashb-btn">
                                        <Link id="dashb-link" to="/BalanceWithCompany" >Search</Link>
                                    </CButton>
                                </CCol>
                            </CRow>

                        </CCardHeader>
                    </CCard>
                </CCol>
                <CCol md="3">
                </CCol>
                <CCol md="6">
                    <h1 id="ccmaster">Amount To be Given to Riders(For Non-Register Vendors Online Payments)</h1>
                </CCol>
                <CCol md="3">
                </CCol>
            </CRow>
            <CRow>
                <CCol md="12">
                    <CCard>
                        <CCardHeader>
                            List of Riders
            </CCardHeader>
                        <br></br>
                        <CCardBody>

                            <CDataTable
                                items={promoData}
                                fields={fields}
                                striped
                                itemsPerPage={10}
                                pagination
                                sorter
                                tableFilter={table}
                                itemsPerPageSelect={Rows}
                                scopedSlots={{


                                    "OrderNo": (item) => (
                                        <td>
                                            <CButton
                                                id="order-list"
                                                onClick={redirect}
                                            >
                                                <Link to="#" >20123</Link>
                                            </CButton>

                                        </td>
                                    ),
                                }}
                            />



                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CRow>
                <CCol md="12">
                    <CCard>
                        <CCardHeader>
                            Final Summary
            </CCardHeader>
                        <br></br>
                        <CCardBody>
                            <p style={{ fontSize: '12px' }}><span>Total Riders  : </span>3</p>
                            <p style={{ fontSize: '12px' }}><span>Total Orders : </span> 15</p>
                            <p style={{ fontSize: '12px' }}><span>Total Orders Amount  : </span>5000</p>
                            <p style={{ fontSize: '12px' }}><span>Total Delivery charge Amount : </span> 2000 </p>
                            <p style={{ fontSize: '12px' }}><span>Total Service charge Amount : </span> 2000 </p>
                            <p style={{ fontSize: '14px', fontWeight: '600', color: 'green' }}><span>Final Amount To be Paid  : </span><span style={{ fontSize: '16px', fontWeight: '700', color: 'green' }}>1800</span></p>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )

};

export default Pendings
