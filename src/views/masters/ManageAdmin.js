/* eslint-disable react-hooks/exhaustive-deps */
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CForm,
    CFormGroup,
    CInput,
    CLabel,
    CRow,
} from "@coreui/react";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import React, { useState } from "react";
import { MyApiUrl } from "src/services/service";
import Swal from "sweetalert2";
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields = [{ key: "Action" }, { key: "Admin Name" }, { key: "Admin Email" }, { key: "Admin Password"}];

const ManageAdmin = () => {
    const [AdminID, setAdminID] = useState("");
    const [AddButton, setAddButton] = useState(true);
    const [UpdateButton, setUpdateButton] = useState(false);

    const [AdminName, setAdminName] = useState();
    const [AdminEmail, setAdminEmail] = useState("");
    const [AdminPassword, setAdminPassword] = useState("");
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

    const AddAdmin = () => {
        if (AdminName === "" || AdminName == null) {
            Toast.fire({
                icon: "warning",
                title: "Please Enter Admin Name!",
            });
        } else if (AdminEmail === "" || AdminEmail == null) {
            Toast.fire({
                icon: "warning",
                title: "Please Enter Admin Email!",
            });
        } else if (AdminPassword === "" || AdminPassword == null) {
            Toast.fire({
                icon: "warning",
                title: "Please Enter Admin Password!",
            });
        } else {
            document.getElementById("divLoading").className = "show";
            const obj = {
                AdminName: AdminName,
                AdminEmail: AdminEmail,
                AdminPassword: AdminPassword
            };

            axios.post(MyApiUrl + "ManageAdmin/", obj).then((response) => {
                if (response.data === "0") {
                    Swal.fire({
                        title: "Admin Already Existed!",
                        icon: "info",
                        confirmButtonText: "OK",
                    });
                    document.getElementById("divLoading").className = "hide";
                } else if (response.data === "1") {
                    Swal.fire({
                        title: "Admin Added Successfully!",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                    fetchData();
                    setAdminName("");
                    setAdminEmail("");
                    setAdminPassword("");
                    document.getElementById("divLoading").className = "hide";
                } else if (response.data === "2") {
                    Swal.fire({
                        title: "Admin Failed To Add!",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                    document.getElementById("divLoading").className = "hide";
                }
            });
        }
    };

    const UpdateAdmin = () => {
        if (AdminName === "" || AdminName == null) {
            Toast.fire({
                icon: "warning",
                title: "Please Enter Admin Name!",
            });
        } else if (AdminEmail === "" || AdminEmail == null) {
            Toast.fire({
                icon: "warning",
                title: "Please Enter Admin Email!",
            });
        } else if (AdminPassword === "" || AdminPassword == null) {
            Toast.fire({
                icon: "warning",
                title: "Please Enter Admin Password!",
            });
        } else {
            document.getElementById("divLoading").className = "show";
            const obj = {
                AdminName: AdminName,
                AdminEmail: AdminEmail,
                AdminPassword: AdminPassword
            };

            axios.put(MyApiUrl + "ManageAdmin/" + AdminID, obj).then((response) => {
                if (response.data === false) {
                    Swal.fire({
                        title: "Admin Already Existed!",
                        icon: "info",
                        confirmButtonText: "OK",
                    });
                    document.getElementById("divLoading").className = "hide";
                } else if (response.data === true) {
                    Swal.fire({
                        title: "Admin Updated Successfully!",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                    fetchData();
                    setAdminID("");
                    setAdminName("");
                    setAdminEmail("");
                    setAdminPassword("");
                    setAddButton(true);
                    setUpdateButton(false);
                    document.getElementById("divLoading").className = "hide";
                }
            });
        }
    };

    const EditAdmin = (id, name, email, pass) => {
        setAdminID(id);
        setAdminName(name);
        setAdminEmail(email);
        setAdminPassword(pass);
        setAddButton(false);
        setUpdateButton(true);
    };

    const DeleteAdmin = (id) => {
        // eslint-disable-next-line no-restricted-globals
        var res = confirm("Are you sure you want to delete");
        if (res) {
            document.getElementById("divLoading").className = "show";
            axios({
                method: "DELETE",
                url: MyApiUrl + "ManageAdmin/" + id + "",
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
                            title: "Successfully Deleted!",
                            icon: "success",
                            confirmButtonText: "OK",
                        });
                        fetchData();
                        document.getElementById("divLoading").className = "hide";
                    } else {
                        Swal.fire({
                            title: "Failed To Deleted!",
                            icon: "success",
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

    let [responseData, setResponseData] = React.useState("");

    const fetchData = React.useCallback(() => {
        document.getElementById("divLoading").className = "show";
        axios({
            method: "GET",
            url: MyApiUrl + "ManageAdmin",
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
                        "Admin Name": item.SUPER_ADMIN_NAME,
                        "Admin Email": item.SUPER_ADMIN_EMAIL,
                        "Admin Password": item.SUPER_ADMIN_PASSWORD
                    };
                });
                setResponseData(items);
                document.getElementById("divLoading").className = "hide";
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    React.useEffect(() => {
        fetchData();
    }, []);

    const Updatebtn = () => (
        <CButton type="button" onClick={UpdateAdmin} size="md" id="Add-btn">
            Update
        </CButton>
    );

    const Addbtn = () => (
        <CButton type="button" onClick={AddAdmin} size="md" id="Add-btn">
            Add
        </CButton>
    );

    return (
        <div>
            <div id="divLoading"> </div>
            <h1 id="ccmaster">Manage Admin</h1>
            <CRow style={{ marginTop: "3%" }}>
                <CCol xs="12" sm="12" md="4" lg="4" xl="4" className="mb-3 mb-xl-0">
                    <div id="country-master">
                        <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
                            <CCardBody>
                                <CRow>
                                    <CCol>
                                        <CCard>
                                            <CCardHeader>Add Admin</CCardHeader>
                                            <CCardBody>
                                                <CForm
                                                    action=""
                                                    method="post"
                                                    encType="multipart/form-data"
                                                    className="form-horizontal"
                                                >

                                                    <CFormGroup row>
                                                        <CCol xs="12" md="12">
                                                            <CLabel>Admin Name</CLabel>
                                                            <CInput
                                                                id="text-input"
                                                                name="text-input"
                                                                placeholder="Name"
                                                                value={AdminName}
                                                                onChange={(e) => {
                                                                    setAdminName(e.target.value);
                                                                }}
                                                            />
                                                        </CCol>
                                                    </CFormGroup>
                                                    <CFormGroup row>
                                                        <CCol xs="12" md="12">
                                                            <CLabel>Admin Email</CLabel>
                                                            <CInput
                                                                id="text-input"
                                                                name="text-input"
                                                                placeholder="Email"
                                                                value={AdminEmail}
                                                                onChange={(e) => {
                                                                    setAdminEmail(e.target.value);
                                                                }}
                                                            />
                                                        </CCol>
                                                    </CFormGroup>
                                                    <CFormGroup row>
                                                        <CCol xs="12" md="12">
                                                            <CLabel>Admin Password</CLabel>
                                                            <CInput
                                                            type="password"
                                                                id="text-input"
                                                                name="text-input"
                                                                placeholder="Email"
                                                                value={AdminPassword}
                                                                onChange={(e) => {
                                                                    setAdminPassword(e.target.value);
                                                                }}
                                                            />
                                                        </CCol>
                                                    </CFormGroup>
                                                    {UpdateButton && <Updatebtn />}
                                                    {AddButton && <Addbtn />}
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
                        <CCard id="Loccard" style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
                            <CCardBody>
                                <CRow>
                                    <CCol>
                                        <CCard>
                                            <CCardHeader>All Admins</CCardHeader>
                                            <CCardBody>
                                                <CDataTable
                                                    items={responseData}
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
                                                                        EditAdmin(
                                                                            item.SUPER_ADMIN_PKID,
                                                                            item.SUPER_ADMIN_NAME,
                                                                            item.SUPER_ADMIN_EMAIL,
                                                                            item.SUPER_ADMIN_PASSWORD
                                                                        );
                                                                    }}
                                                                    size="sm"
                                                                    id="war-btn"
                                                                >
                                                                    <EditIcon />
                                                                    {item.COUNTRY_ACTIVE}
                                                                </CButton>
                                                                <CButton
                                                                    size="sm"
                                                                    onClick={() => {
                                                                        DeleteAdmin(item.SUPER_ADMIN_PKID);
                                                                    }}
                                                                    id="war-btn1"
                                                                >
                                                                    <DeleteSharpIcon />
                                                                    {item.COUNTRY_ACTIVE}
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

export default ManageAdmin;
