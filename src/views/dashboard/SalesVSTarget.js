/**
 * @author KIMOSABE
 * @email Kimosabe@mail.com
 * @create date 2021-11-29 13:04:12
 * @modify date 2021-12-07 12:25:56
 * @desc [description]
 */
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CDataTable,
} from "@coreui/react";
import { MyApiUrl } from "src/services/service";
import { useHistory } from "react-router-dom";
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields2 = [
    { key: "Target v/s sales" },
    { key: "Expenses - to sales" },
    { key: "Company" },
    { key: "Name" },
    { key: "Designation" },
    { key: "Qualification" },
    { key: "Email" },
    { key: "Contact Number" },
];

const SalesVSTarget = () => {

    const [ResponseData, setResponseData] = useState([]);

    const GetAllEmployees = () => {
        axios({
            method: "GET",
            url: MyApiUrl + "emps",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((response) => {
                const items = response.data.map((item) => {
                    return {
                        ...item,
                        Company: item.COMPANY_NAME,
                        Name: item.EMPLOYEE_NAME,
                        Email: item.EMPLOYEE_EMAIL,
                        "Contact Number": item.EMPLOYEE_CONTACT,
                        Designation: item.EMPLOYEE_DESIGNATION,
                        Qualification: item.EMPLOYEE_QUALIFICATION,
                    };
                });
                setResponseData(items);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    React.useEffect(() => {
        GetAllEmployees();
    }, []);

    let history = useHistory();
    return (
        <div id="city">
            <h1 id="ccmaster">View Employees</h1>
            <CRow>
                <CCol col="12">
                    <CCard id="city-table">
                        <CCardBody>
                            <CRow>
                                <CCol>
                                    <CCard>
                                        <CCardHeader>All Employees</CCardHeader>
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
                                                    "Target v/s sales": (item) => (
                                                        <td>
                                                            <CButton
                                                                onClick={() =>
                                                                    history.push("/SalesVSTargetGraph", {
                                                                        data: item
                                                                    })
                                                                }
                                                                size="sm"
                                                                color="success"
                                                            >
                                                                View
                                                            </CButton>
                                                        </td>
                                                    ),
                                                    "Expenses - to sales": (item) => (
                                                        <td>
                                                            <CButton
                                                                onClick={() =>
                                                                    history.push("/ExpensesVSSalesGraph", {
                                                                        data: item
                                                                    })
                                                                }
                                                                size="sm"
                                                                color="success"
                                                            >
                                                                View
                                                            </CButton>
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

export default SalesVSTarget;
