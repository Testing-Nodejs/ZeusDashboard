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
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CImg,
    CLink,
} from "@coreui/react";
import { MyApiUrl, ViewImg } from "src/services/service";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DateFilter from "../masters/DateFilter";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields2 = [
    { key: "SL No" },
    { key: "Employee Email" },
    { key: "Action" },
];

const EmployeeForgotPassword = () => {
    const [ResponseData, setResponseData] = useState([]);

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

    const ViewEmployeeRequest = () => {
        document.getElementById("divLoading").className = "show";
        axios({
            method: "GET",
            url: MyApiUrl + "GetForgotPasswordRequest",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((response) => {
                const items = response.data.map((item, index) => {
                    return {
                        ...item,
                        "SL No": index + 1,
                        "Employee Email": item.FORGOT_PASSWORD_REQ_EMAIL
                    };
                });
                setResponseData(items);
                document.getElementById("divLoading").className = "hide";
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const AcceptRequest = (email) => {
        document.getElementById("divLoading").className = "show";
        var obj = {
            EMPLOYEE_EMAIL: email
        }
        axios.post(MyApiUrl + "AcceptForgotPasswordRequest", obj).then((response) => {
            if (response.data === true) {
                Swal.fire({
                    title: "Employee Password Reset!",
                    icon: "success",
                    confirmButtonText: "OK",
                });
                ViewEmployeeRequest();
                document.getElementById("divLoading").className = "hide";
            } else {
                Swal.fire({
                    title: "Failed To Reset Employee Password!",
                    icon: "error",
                    confirmButtonText: "OK",
                });
                ViewEmployeeRequest();
                document.getElementById("divLoading").className = "hide";
            }
        });
    };

    React.useEffect(() => {
        ViewEmployeeRequest();
    }, []);

    let history = useHistory();
    return (
        <div id="city">
            <div id="divLoading"> </div>
            <h1 id="ccmaster">Employee Forgot Password Request</h1>
            <CRow style={{ marginTop: "3%" }}>
                <CCol col="12">
                    <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
                        <CCardBody>
                            <CRow>
                                <CCol>
                                    <CCard>
                                        <CCardHeader>Password Reset Request</CCardHeader>
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
                                                    Action: (item) => (
                                                        <td>
                                                            <CButton
                                                                onClick={() => {
                                                                    AcceptRequest(item.FORGOT_PASSWORD_REQ_EMAIL);
                                                                }}
                                                                color="primary"
                                                                size="sm"
                                                            >
                                                                Accept
                                                                {item.status}
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

export default EmployeeForgotPassword;
