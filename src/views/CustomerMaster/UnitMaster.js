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
const fields = [{ key: "Action" }, { key: "Units" }];

const UnitMaster = () => {
    const [Kimo, setKimo] = useState({
        typePkid: "",
        CustomerUnit: "",
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

    const AddCustomerUnit = () => {
        if (Kimo.CustomerUnit == "" || Kimo.CustomerUnit == null) {
            Toast.fire({
                icon: "warning",
                title: "Enter Customer Unit!",
            });
        } else {
            document.getElementById("divLoading").className = "show";
            const obj = {
                UNIT_NAME: Kimo.CustomerUnit,
            };

            axios.post(MyApiUrl + "custunits", obj).then((response) => {
                if (response.data == "Already Existed!") {
                    Swal.fire({
                        title: "Customer Unit Already Exist!",
                        icon: "info",
                        confirmButtonText: "OK",
                    });
                    fetchData();
                    setKimo({
                        ...Kimo,
                        typePkid: "",
                        CustomerUnit: "",
                        AddButton: true,
                        UpdateButton: false,
                    });
                    document.getElementById("divLoading").className = "hide";
                } else if (response.data == true) {
                    Swal.fire({
                        title: "Customer Unit Added Successfully!",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                    fetchData();
                    setKimo({
                        ...Kimo,
                        typePkid: "",
                        CustomerUnit: "",
                        AddButton: true,
                        UpdateButton: false,
                    });
                    document.getElementById("divLoading").className = "hide";
                } else if (response.data == false) {
                    Swal.fire({
                        title: "Customer Unit Failed To Add!",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                    document.getElementById("divLoading").className = "hide";
                }
            });
        }
    };

    const UpdateCustomerUnit = () => {
        if (Kimo.CustomerUnit == "" || Kimo.CustomerUnit == null) {
            Toast.fire({
                icon: "warning",
                title: "Enter Customer Unit!",
            });
        } else {
            document.getElementById("divLoading").className = "show";
            const obj = {
                UNIT_NAME: Kimo.CustomerUnit,
            };
            axios
                .put(MyApiUrl + "custunits/" + Kimo.typePkid, obj)
                .then((response) => {
                    if (response.data == false) {
                        Swal.fire({
                            title: "Customer Unit Not Updated!",
                            icon: "warning",
                            confirmButtonText: "OK",
                        });

                        fetchData();
                        setKimo({
                            ...Kimo,
                            typePkid: "",
                            CustomerUnit: "",
                            AddButton: true,
                            UpdateButton: false,
                        });
                        document.getElementById("divLoading").className = "hide";
                    } else if (response.data == "1") {
                        Swal.fire({
                            title: "Customer Unit Updated!",
                            icon: "success",
                            confirmButtonText: "OK",
                        });

                        fetchData();
                        setKimo({
                            ...Kimo,
                            typePkid: "",
                            CustomerUnit: "",
                            AddButton: true,
                            UpdateButton: false,
                        });
                        document.getElementById("divLoading").className = "hide";
                    } else {
                        Swal.fire({
                            title: "Customer Unit Already Existed!",
                            icon: "info",
                            confirmButtonText: "OK",
                        });
                        document.getElementById("divLoading").className = "hide";
                    }
                });
        }
    };

    const EditCustomerUnit = (id, Emptype) => {
        setKimo({
            ...Kimo,
            typePkid: id,
            CustomerUnit: Emptype,
            AddButton: false,
            UpdateButton: true,
        });
    };

    const DeleteCustomerUnit = (id) => {
        // eslint-disable-next-line no-restricted-globals
        var res = confirm("Are you sure you want to delete");
        if (res) {
            document.getElementById("divLoading").className = "show";
            axios({
                method: "DELETE",
                url: MyApiUrl + "custunits/" + id + "",
                headers: {
                    "content-type": "application/json",
                },
                params: {
                    language_code: "en",
                },
            })
                .then((response) => {
                    if (response.data == true) {
                        Swal.fire({
                            title: "Customer Unit Deleted!",
                            icon: "success",
                            confirmButtonText: "OK",
                        });

                        fetchData();
                        document.getElementById("divLoading").className = "hide";
                    } else {
                        Swal.fire({
                            title: "Customer Unit Failed To Deleted!",
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

    const fetchData = React.useCallback(() => {
        document.getElementById("divLoading").className = "show";
        axios({
            method: "GET",
            url: MyApiUrl + "custunits",
            headers: {
                "content-type": "application/json",
            },
            params: {
                language_code: "en",
            },
        })
            .then((response) => {
                const items = response.data.map((item) => {
                    return {
                        ...item,
                        Units: item.UNIT_NAME,
                    };
                });
                setKimo({
                    ...Kimo,
                    ResponseData: items,
                });
                document.getElementById("divLoading").className = "hide";
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const Updatebtn = () => (
        <CButton type="button" onClick={UpdateCustomerUnit} size="md" id="Add-btn">
            Update
        </CButton>
    );

    const Addbtn = () => (
        <CButton type="button" onClick={AddCustomerUnit} size="md" id="Add-btn">
            Add
        </CButton>
    );

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div id="divLoading"> </div>
            <h1 id="ccmaster">Customer Unit Master</h1>
            <CRow style={{ marginTop: "3%" }}>
                <CCol xs="12" sm="12" md="4" lg="4" xl="4" className="mb-3 mb-xl-0">
                    <div id="country-master">
                        <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
                            <CCardBody>
                                <CRow>
                                    <CCol>
                                        <CCard>
                                            <CCardHeader>Add Customer Unit</CCardHeader>
                                            <CCardBody>
                                                <CForm
                                                    action=""
                                                    method="post"
                                                    encType="multipart/form-data"
                                                    className="form-horizontal"
                                                >
                                                    <CFormGroup row>
                                                        <CCol xs="12" md="12">
                                                            <CLabel>Customer Unit</CLabel>
                                                            <CInput
                                                                id="text-input1"
                                                                name="text-input"
                                                                placeholder="Customer Unit"
                                                                type="text"
                                                                value={Kimo.CustomerUnit}
                                                                onChange={(e) => {
                                                                    setKimo({
                                                                        ...Kimo,
                                                                        CustomerUnit: e.target.value,
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
                                            <CCardHeader>Added Customer Units</CCardHeader>
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
                                                                        EditCustomerUnit(
                                                                            item.UNIT_PKID,
                                                                            item.UNIT_NAME
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
                                                                        DeleteCustomerUnit(item.UNIT_PKID);
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

export default UnitMaster;
