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
const fields = [{ key: "Action" }, { key: "Country Code" }, { key: "Country" }];

const CountryMaster = () => {
    const [countryPkid, setCountryPkid] = useState("");
    const [AddButton, setAddButton] = useState(true);
    const [UpdateButton, setUpdateButton] = useState(false);

    const [country, setCountry] = useState();
    const [countryCode, setCountryCode] = useState("");

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

    const countryChange = (event) => {
        setCountry(event.target.value);
    };

    const countryCodeChange = (event) => {
        setCountryCode(event.target.value);
    };

    const AddCountry = () => {
        if (country === "" || country == null) {
            Toast.fire({
                icon: "warning",
                title: "Please Enter Country Name!",
            });
        } else if (countryCode === "" || countryCode == null) {
            Toast.fire({
                icon: "warning",
                title: "Please Enter Country Code!",
            });
        } else {
            document.getElementById("divLoading").className = "show";
            const obj = {
                CountryCode: countryCode,
                CountryName: country,
            };

            axios.post(MyApiUrl + "countries/", obj).then((response) => {
                if (response.data === "0") {
                    Swal.fire({
                        title: "Country Already Existed!",
                        icon: "info",
                        confirmButtonText: "OK",
                    });
                    document.getElementById("divLoading").className = "hide";
                } else if (response.data === "1") {
                    Swal.fire({
                        title: "Country Added Successfully!",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                    fetchData();
                    setCountry("");
                    setCountryCode("");
                    document.getElementById("divLoading").className = "hide";
                } else if (response.data === "2") {
                    Swal.fire({
                        title: "Country Failed To Add!",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                    document.getElementById("divLoading").className = "hide";
                }
            });
        }
    };

    const UpdateCountry = () => {
        if (country === "" || country == null) {
            Toast.fire({
                icon: "warning",
                title: "Please Enter Country Name!",
            });
        } else if (countryCode === "" || countryCode == null) {
            Toast.fire({
                icon: "warning",
                title: "Please Enter Country Code!",
            });
        } else {
            document.getElementById("divLoading").className = "show";
            const obj = {
                countryId: countryPkid,
                CountryCode: countryCode,
                CountryName: country,
            };

            axios.put(MyApiUrl + "countries/" + countryPkid, obj).then((response) => {
                if (response.data === false) {
                    Swal.fire({
                        title: "Country Already Existed!",
                        icon: "info",
                        confirmButtonText: "OK",
                    });
                    document.getElementById("divLoading").className = "hide";
                } else if (response.data === true) {
                    Swal.fire({
                        title: "Country Updated Successfully!",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                    fetchData();
                    setCountryPkid("");
                    setCountry("");
                    setCountryCode("");
                    setAddButton(true);
                    setUpdateButton(false);
                    document.getElementById("divLoading").className = "hide";
                }
            });
        }
    };

    const EditContry = (id, country, code) => {
        setCountryPkid(id);
        setCountry(country);
        setCountryCode(code);
        setAddButton(false);
        setUpdateButton(true);
    };

    const DeleteCountry = (id) => {
        // eslint-disable-next-line no-restricted-globals
        var res = confirm("Are you sure you want to delete");
        if (res) {
            document.getElementById("divLoading").className = "show";
            axios({
                method: "DELETE",
                url: MyApiUrl + "countries/" + id + "",
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
            url: MyApiUrl + "countries",
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
                        "Country Code": item.COUNTRY_CODE,
                        Country: item.COUNTRY_NAME
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
        <CButton type="button" onClick={UpdateCountry} size="md" id="Add-btn">
            Update
        </CButton>
    );

    const Addbtn = () => (
        <CButton type="button" onClick={AddCountry} size="md" id="Add-btn">
            Add
        </CButton>
    );

    return (
        <div className = "123">
            <div id="divLoading"> </div>
            <h1 id="ccmaster">Country Master</h1>
            <CRow style={{ color: "red", marginTop: "5%", }}>
                <CCol xs="12" sm="12" md="4" lg="4" xl="4" className="mb-3 mb-xl-0">
                    <div id="country-master">
                        <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
                            <CCardBody>
                                <CRow>
                                    <CCol>
                                        <CCard>
                                            <CCardHeader>Add Country</CCardHeader>
                                            <CCardBody>
                                                <CForm
                                                    action=""
                                                    method="post"
                                                    encType="multipart/form-data"
                                                    className="form-horizontal"
                                                >

                                                    <CFormGroup row>
                                                        <CCol xs="12" md="12">
                                                            <CLabel>Country</CLabel>
                                                            <CInput
                                                                id="text-input"
                                                                name="text-input"
                                                                placeholder="Country"
                                                                value={country}
                                                                onChange={countryChange}
                                                            />
                                                        </CCol>
                                                    </CFormGroup>
                                                    <CFormGroup row>
                                                        <CCol xs="12" md="12">
                                                            <CLabel>Country Code</CLabel>
                                                            <CInput
                                                                id="text-input"
                                                                name="text-input"
                                                                placeholder="Country Code"
                                                                value={countryCode}
                                                                onChange={countryCodeChange}
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
                                            <CCardHeader>Added Country</CCardHeader>
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
                                                                        EditContry(
                                                                            item.COUNTRY_PKID,
                                                                            item.COUNTRY_NAME,
                                                                            item.COUNTRY_CODE
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
                                                                        DeleteCountry(item.COUNTRY_PKID);
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

export default CountryMaster;
