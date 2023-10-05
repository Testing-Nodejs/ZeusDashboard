/**
 * @author KIMOSABE
 * @email Kimosabe@mail.com
 * @create date 2021-11-29 12:14:40
 * @modify date 2021-12-06 15:20:08
 * @desc [description]
 */

import React, { useState } from "react";
import axios from "axios";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CDataTable,
    CLink,
} from "@coreui/react";
import { MyApiUrl, ViewImg } from "src/services/service";
import { useHistory } from "react-router-dom";
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields2 = [
    { key: "SL No" },
    { key: "Employee Type" },
    { key: "Sub Type" },
    { key: "HQ" },
    { key: "Company" },
    { key: "Employee Name" },
    { key: "Is Manager" },
    { key: "View" },
];

const EmpExpenses = () => {
    const [ResponseData, setResponseData] = useState([]);

    const GetAllEmpLeave = () => {
        document.getElementById("divLoading").className = "show";
        axios({
            method: "GET",
            url: MyApiUrl + "EmpExpenses",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((response) => {
                const items = response.data.map((item, index) => {
                    let manager = "";
                    if (item.EMPOLYEE_IS_MANAGER === 1) {
                        manager = "Manager";
                    } else {
                        manager = "Officer";
                    }
                    return {
                        ...item,
                        "Is Manager": manager,
                        "SL No": index + 1,
                        "Employee Name": item.EMPLOYEE_NAME,
                        "Employee Type": item.EMPLOYEE_TYPE_NAME,
                        "Sub Type": item.EMPLOYEE_SUB_TYPE_NAME,
                        HQ: item.HQ_NAME,
                        Company: item.COMPANY_NAME,
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
        GetAllEmpLeave();
    }, []);

    let history = useHistory();

    return (
        <div id="city">
            <div id="divLoading"> </div>
            <h1 id="ccmaster">Employee Expenses</h1>
            <CRow style={{ marginTop: "3%" }}>
                <CCol col="12">
                    <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
                        <CCardBody>
                            <CRow>
                                <CCol>
                                    <CCard>
                                        <CCardHeader>View All Employee Expenses</CCardHeader>
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
                                                    "View": (i) => (
                                                        <td>
                                                            <CButton
                                                                color="success"
                                                                onClick={() =>
                                                                    history.push("/EmployeeExpensesWithStatus", {
                                                                        data: i,
                                                                    })
                                                                }
                                                            >
                                                                Expenses
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

export default EmpExpenses;
