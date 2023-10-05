/**
 * @author KimoSABE
 * @email Kimosabe@mail.com
 * @create date 2021-11-25 18:21:31
 * @modify date 2021-12-07 12:26:04
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
    CForm,
    CFormGroup,
    CInput,
    CRow,
    CDataTable,
    CLabel,
} from "@coreui/react";

import { MyApiUrl } from "src/services/service";
import EditIcon from "@material-ui/icons/Edit";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields = [{ key: "Action" }, { key: "Order Type" }];

const OrderTypeNew = () => {
    const [Kimo, setKimo] = useState({
        typePkid: "",
        CustomerType: "",
        ResponseData: [],
        AddButton: true,
        UpdateButton: false,
    });

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

    const AddOrderType = () => {
        if (Kimo.CustomerType == "" || Kimo.CustomerType == null) {
            Toast.fire({
                icon: "warning",
                title: "Enter Order Type!",
            });
        } else {
            document.getElementById("divLoading").className = "show";
            const obj = {
                ORDER_TYPE_NAME: Kimo.CustomerType,
            };

            axios.post(MyApiUrl + "OrderTypes", obj).then((response) => {
                if (response.data == "Already Existed!") {
                    Swal.fire({
                        title: "Order Type Already Exist!",
                        icon: "info",
                        confirmButtonText: "OK",
                    });
                    fetchData();
                    setKimo({
                        ...Kimo,
                        typePkid: "",
                        CustomerType: "",
                        AddButton: true,
                        UpdateButton: false,
                    });
                    document.getElementById("divLoading").className = "hide";
                } else if (response.data == true) {
                    Swal.fire({
                        title: "Order Type Added Successfully!",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                    fetchData();
                    setKimo({
                        ...Kimo,
                        typePkid: "",
                        CustomerType: "",
                        AddButton: true,
                        UpdateButton: false,
                    });
                    document.getElementById("divLoading").className = "hide";
                } else if (response.data == false) {
                    Swal.fire({
                        title: "Order Type Failed To Add!",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                    document.getElementById("divLoading").className = "hide";
                }
            });
        }
    };

    const UpdateOrderType = () => {
        if (Kimo.CustomerType == "" || Kimo.CustomerType == null) {
            Toast.fire({
                icon: "warning",
                title: "Enter Order Type!",
            });
        } else {
            document.getElementById("divLoading").className = "show";
            const obj = {
                ORDER_TYPE_NAME: Kimo.CustomerType,
            };
            axios
                .put(MyApiUrl + "OrderTypes/" + Kimo.typePkid, obj)
                .then((response) => {
                    if (response.data === false) {
                        Swal.fire({
                            title: "Order Type Not Updated!",
                            icon: "warning",
                            confirmButtonText: "OK",
                        });

                        fetchData();
                        setKimo({
                            ...Kimo,
                            typePkid: "",
                            CustomerType: "",
                            AddButton: true,
                            UpdateButton: false,
                        });
                        document.getElementById("divLoading").className = "hide";
                    } else {
                        Swal.fire({
                            title: "Order Type Updated!",
                            icon: "success",
                            confirmButtonText: "OK",
                        });
                        setKimo({
                            ...Kimo,
                            typePkid: "",
                            CustomerType: "",
                            AddButton: true,
                            UpdateButton: false,
                        });
                        fetchData();
                        document.getElementById("divLoading").className = "hide";
                    }
                });
        }
    };

    const EditOrderType = (id, Emptype) => {
        setKimo({
            ...Kimo,
            typePkid: id,
            CustomerType: Emptype,
            AddButton: false,
            UpdateButton: true,
        });
    };

    const DeleteOrderType = (id) => {
        // eslint-disable-next-line no-restricted-globals
        var res = confirm("Are you sure you want to delete");
        if (res) {
            document.getElementById("divLoading").className = "show";
            axios({
                method: "DELETE",
                url: MyApiUrl + "OrderTypes/" + id + "",
                headers: {
                    "content-type": "application/json",
                },
                params: {
                    language_code: "en",
                },
            })
                .then((response) => {
                    if (response.data === true) {
                        Swal.fire({
                            title: "Order Type Type Deleted!",
                            icon: "success",
                            confirmButtonText: "OK",
                        });

                        fetchData();
                        document.getElementById("divLoading").className = "hide";
                    } else {
                        Swal.fire({
                            title: "Order Type Failed To Deleted!",
                            icon: "error",
                            confirmButtonText: "OK",
                        });
                        document.getElementById("divLoading").className = "hide";
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const fetchData = () => {
        document.getElementById("divLoading").className = "show";
        axios({
            method: "GET",
            url: MyApiUrl + "OrderTypes",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((response) => {
                const items = response.data.map((item) => {
                    return {
                        ...item,
                        "Order Type": item.ORDER_TYPE_NAME,
                    };
                });
                setKimo({
                    ...Kimo,
                    ResponseData: items,
                    typePkid: "",
                    CustomerType: "",
                    AddButton: true,
                    UpdateButton: false,
                });
                document.getElementById("divLoading").className = "hide";
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const Updatebtn = () => (
        <CButton
            type="button"
            onClick={UpdateOrderType}
            size="md"
            id="Add-btn"
        >
            Update
        </CButton>
    );

    const Addbtn = () => (
        <CButton type="button" onClick={AddOrderType} size="md" id="Add-btn">
            Add
        </CButton>
    );

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div id="divLoading"> </div>
            <h1 id="ccmaster">Order Type</h1>
            <CRow style={{ marginTop: "3%" }}>
                <CCol xs="12" sm="12" md="4" lg="4" xl="4" className="mb-3 mb-xl-0">
                    <div id="country-master">
                        <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
                            <CCardBody>
                                <CRow>
                                    <CCol>
                                        <CCard>
                                            <CCardHeader>Add Order Type</CCardHeader>
                                            <CCardBody>
                                                <CForm
                                                    action=""
                                                    method="post"
                                                    encType="multipart/form-data"
                                                    className="form-horizontal"
                                                >
                                                    <CFormGroup row>
                                                        <CCol xs="12" md="12">
                                                            <CLabel>Order Type</CLabel>
                                                            <CInput
                                                                id="text-input1"
                                                                name="text-input"
                                                                placeholder="Order Type"
                                                                type="text"
                                                                value={Kimo.CustomerType}
                                                                onChange={(e) => {
                                                                    setKimo({
                                                                        ...Kimo,
                                                                        CustomerType: e.target.value,
                                                                    });
                                                                }}
                                                            />
                                                        </CCol>
                                                    </CFormGroup>

                                                    {Kimo.UpdateButton && <Updatebtn />}
                                                    {Kimo.AddButton && <Addbtn />}
                                                </CForm>
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </div>
                </CCol>

                <CCol xs="12" sm="12" md="8" lg="8" xl="8" className="mb-3 mb-xl-0">
                    <div id="country-table">
                        <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
                            <CCardBody>
                                <CRow>
                                    <CCol>
                                        <CCard>
                                            <CCardHeader>Added Order Type</CCardHeader>
                                            <CCardBody>
                                                <CDataTable
                                                    items={Kimo.ResponseData}
                                                    fields={fields}
                                                    hover
                                                    striped
                                                    bordered
                                                    tableFilter={table}
                                                    itemsPerPageSelect={items}
                                                    sorter
                                                    size="sm"
                                                    itemsPerPage={10}
                                                    pagination
                                                    scopedSlots={{

                                                        Action: (item) => (
                                                            <td>
                                                                <CButton
                                                                    onClick={() => {
                                                                        EditOrderType(
                                                                            item.ORDER_TYPE_PKID,
                                                                            item.ORDER_TYPE_NAME
                                                                        );
                                                                    }}
                                                                    size="sm"
                                                                    id="war-btn"
                                                                >
                                                                    <EditIcon />
                                                                    {item.status}
                                                                </CButton>
                                                                <CButton
                                                                    size="sm"
                                                                    onClick={() => {
                                                                        DeleteOrderType(
                                                                            item.ORDER_TYPE_PKID
                                                                        );
                                                                    }}
                                                                    id="war-btn1"
                                                                >
                                                                    <DeleteSharpIcon />
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
                    </div>
                </CCol>
            </CRow>
        </div>
    );
};

export default OrderTypeNew;
