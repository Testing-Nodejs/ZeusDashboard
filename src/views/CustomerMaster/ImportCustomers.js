/**
 * @author KIMOSABE
 * @email Kimosabe@mail.com
 * @create date 2021-12-07 11:58:06
 * @modify date 2021-12-07 16:26:19
 * @desc [description]
 */

import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { MyApiUrl } from "src/services/service";
import { useHistory } from "react-router-dom";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormGroup,
    CRow,
    CDataTable,
    CInput,
    CLabel,
} from "@coreui/react";
import "../../style.css";
import * as XLSX from "xlsx";
//import ExcelPage from "../../ForExcel/components/excelPage";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };

const fieldsDemo = [
    { key: "CustomerName" },
    { key: "CustomerNumber" },
    { key: "GSTNumber" },
    { key: "Email" },
    { key: "AlternateEmail" },
    { key: "ContactNumber" },
    { key: "AlternateNumber" },
    { key: "CustomerCapacity" },
    { key: "Password" },
    { key: "ContactFirstPeopleName" },
    { key: "ContactFirstPeopleEmail" },
    { key: "ContactFirstPeopleAltEmail" },
    { key: "ContactFirstPeopleNumber" },
    { key: "ContactFirstPeopleAltNumber" },
    { key: "ContactSecondPeopleName" },
    { key: "ContactSecondPeopleEmail" },
    { key: "ContactSecondPeopleAltEmail" },
    { key: "ContactSecondPeopleNumber" },
    { key: "ContactSecondPeopleAltNumber" },
    { key: "AddressType" },
    { key: "Address1" },
    { key: "Address2" },
    { key: "Address3" },
    { key: "Zipcode" },
];

const ImportCustomers = () => {

    let history = useHistory();
    const [ResponseData, setResponseData] = useState([]);

    const GetFiles = (even) => {
        document.getElementById("divLoading").className = "show";
        let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(even.target.files[0].name.toLowerCase())) {
            if (typeof FileReader != "undefined") {
                let reader = new FileReader();
                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        ProcessExcel(e.target.result);
                    };
                    reader.readAsBinaryString(even.target.files[0]);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        let data = "";
                        let bytes = new Uint8Array(e.target.result);
                        for (let i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        ProcessExcel(data);
                    };
                    reader.readAsArrayBuffer(even.target.files[0]);
                }
            } else {
                Swal.fire({
                    title: "This browser does not support HTML5.!",
                    icon: "info",
                    confirmButtonText: "OK",
                });
                document.getElementById("divLoading").className = "hide";
            }
        } else {
            Swal.fire({
                title: "Please upload a valid Excel file.!",
                icon: "info",
                confirmButtonText: "OK",
            });
            document.getElementById("divLoading").className = "hide";
        }
    };

    const ProcessExcel = (data) => {
        let excelRows = "";
        let workbook = XLSX.read(data, {
            type: "binary",
        });
        let firstSheet = workbook.SheetNames[0];
        excelRows = XLSX.utils.sheet_to_row_object_array(
            workbook.Sheets[firstSheet], { defval: "-" }
        );
        console.log(excelRows);
        setResponseData(excelRows);
        document.getElementById("divLoading").className = "hide";
    };

    const AddEmp = () => {
        document.getElementById("divLoading").className = "show";
        const obj = {
            "Customers": ResponseData
        }
        console.log(obj);
        axios
            .post(MyApiUrl + "importCustomers", obj)
            .then(function (response) {
                console.log(response.data);
                if (response.data === true) {
                    Swal.fire({
                        title: "Customer Added Successfully!",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                    history.push("/ViewCustomers");
                    document.getElementById("divLoading").className = "hide";
                } else if (response.data === false) {
                    Swal.fire({
                        title: "Customer Failed To Add!",
                        icon: "warning",
                        confirmButtonText: "OK",
                    });
                    document.getElementById("divLoading").className = "hide";
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    React.useEffect(() => { }, []);

    return (
        <div>
            <div id="divLoading"> </div>
            <h1 id="ccmaster">Import Customer From Excel</h1>
            <CRow style={{ marginTop: "3%" }}>
                <CCol xs="12" sm="12" md="4" lg="4" xl="4" className="mb-3 mb-xl-0">
                    <div id="country-master">
                        <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
                            <CCardBody>
                                <CRow>
                                    <CCol>
                                        <CCard>
                                            <CCardHeader style={{ fontSize: "13px" }}>Import Customer From Excel</CCardHeader>
                                            <CCardBody>
                                                <CForm
                                                    action=""
                                                    method="post"
                                                    encType="multipart/form-data"
                                                    className="form-horizontal"
                                                >
                                                    <CFormGroup row>
                                                        <CCol md="12">
                                                            <CLabel
                                                                htmlFor="exampleInputName2"
                                                                className="pr-1"
                                                            >
                                                                <h6>Select Excel</h6>
                                                            </CLabel>
                                                            <CInput
                                                                type="file"
                                                                id="Question"
                                                                name="Question"
                                                                placeholder="Enter Title"
                                                                onChange={GetFiles}
                                                            />
                                                        </CCol>
                                                    </CFormGroup>
                                                </CForm>
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </div>
                </CCol>

                <CCol xs="12" sm="12" md="12" lg="12" xl="12" className="mb-3 mb-xl-0">
                    <div id="country-table">
                        <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
                            <CCardBody>
                                <CRow>
                                    <CCol md="12">
                                        <div>
                                            <CButton size="sm" id="AddEmp" onClick={AddEmp}>
                                                Upload Excel
                                            </CButton>
                                            <br />
                                        </div>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol>
                                        <CCard>
                                            <CCardHeader>Loaded Excel</CCardHeader>

                                            <CCardBody>
                                                {/* <ExcelPage /> */}
                                                <CDataTable
                                                    items={ResponseData}
                                                    fields={fieldsDemo}
                                                    hover
                                                    striped
                                                    bordered
                                                    tableFilter={table}
                                                    itemsPerPageSelect={items}
                                                    sorter
                                                    size="sm"
                                                    itemsPerPage={10}
                                                    pagination
                                                    scopedSlots={{}}
                                                />
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </div>
                </CCol>
            </CRow>
        </div>
    );
};

export default ImportCustomers;
