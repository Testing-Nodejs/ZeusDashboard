/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/**
 * @author KIMOSABE
 * @email Kimosabe@mail.com
 * @create date 2021-11-25 17:00:15
 * @modify date 2021-12-06 15:32:46
 * @desc [description]
 */

import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CDataTable,
    CButton,
    CSelect,
    CInput,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { MyApiUrl } from "src/services/service";
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fieldsHal = [
    { key: "Company" },
    { key: "Species" },
    { key: "Product Name" },
    { key: "Package Size" },
];
const fields = [
    { key: "Company" },
    { key: "Species" },
    { key: "Product Name" },
    { key: "Package Size" },
    { key: "Quantity", _style: { width: "50% !important" } },
    { key: "Package Amount" },
    { key: "Product Amount" },
    { key: "Discount(%)" },
    { key: "Free Unit Scheme(%)" },
    { key: "Total Amount" },
];

const PlaceOrderProductsSelect_Replace = (props) => {
    const Cname = props.location.state.data.CUSTOMER_NAME;
    const Cemail = props.location.state.data.CUSTOMER_EMAIL;
    const Cpho = props.location.state.data.CUSTOMER_MOBILE;
    const category = props.location.state.data.CUSTOMER_CATEGORY_NAME;
    const type = props.location.state.data.CUSTOMER_TYPE_NAME;
    const SubType = props.location.state.data.CUSTOMER_SUBTYPE_NAME;
    const CustomerID = props.location.state.data.CUSTOMER_PKID;
    const FirmName = props.location.state.data.CUSTOMER_FIRM_NAME;
    const Capacity = props.location.state.data.CUSTOMER_CAPACITY;
    const Superior = props.location.state.data.EMPLOYEE_NAME;
    const Cemail2 = props.location.state.data.CUSTOMER_EMAIL2;
    const Cpho2 = props.location.state.data.CUSTOMER_ALT_MOBILE;

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

    const [ResponseData, setResponseData] = useState([]);
    const [CompanyData, setCompanyData] = useState([]);
    const [CompanyID, setCompanyID] = useState();
    const [OrderTypeID, setOrderTypeID] = useState("5");
    const [ProductAmount, setProductAmount] = useState();
    const [PackageSelect, setPackageSelect] = useState();
    const [PackageAmtval, setPackageAmtval] = useState();
    const [Discount, setDiscount] = useState();
    const [FreeUnit, setFreeUnit] = useState();
    const [FinalAMount, setFinalAMount] = useState([]);
    const [OrderTypeArr, setOrderTypeArr] = useState([]);

    const [FinalResult, setFinalResult] = useState();
    const [FinalResultNew, setFinalResultNew] = useState([]);

    const [Fulltab, setFulltab] = useState(false);
    const [Halfab, setHalfab] = useState(false);

    let firstarr = [];

    const SetCompany = (event) => {
        setCompanyID(event.target.value);
        GetAllProducts(event.target.value);
    }
    const GetAllProducts = (ComID) => {
        document.getElementById("divLoading").className = "show";
        if (CompanyID === "-1") {
            Swal.fire({
                title: "Please Select Company!",
                icon: "info",
                confirmButtonText: "OK",
            });
            setResponseData([]);
            setFulltab(false);
            setHalfab(false);
            document.getElementById("divLoading").className = "hide";
        } else {
            axios({
                method: "GET",
                url: MyApiUrl + "prodByCompany/" + ComID,
                headers: {
                    "content-type": "application/json",
                },
            })
                .then((response) => {
                    console.log(response.data);
                    const items = response.data.map((item, index) => {
                        return {
                            ...item,
                            "Sl No": index + 1,
                            Company: item.COMPANY_NAME,
                            Species: item.PRODUCT_SPECIES_NAME,
                            "Product Name": item.PRODUCT_NAME,
                            "Value": "0",
                        };
                    });
                    setResponseData(items);
                    setFulltab(true);
                    setHalfab(false);
                    updatedefaultvalues(items);
                    document.getElementById("divLoading").className = "hide";
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const updatedefaultvalues = (arr) => {
        const items = arr.map((item, index) => {
            document.getElementById("requiredqth" + item.PRODUCT_PKID + "").value = "0";
            document.getElementById("amount-" + item.PRODUCT_PKID + "").value = "0";
            document.getElementById("Discount-" + item.PRODUCT_PKID + "").value = "0";
            document.getElementById("FreeUnit-" + item.PRODUCT_PKID + "").value = "0";
            document.getElementById("producttotalam" + item.PRODUCT_PKID + "")
                .innerHTML = "00.00";
            document.getElementById("producttotalam1" + item.PRODUCT_PKID + "")
                .innerHTML = "00.00";
        });
    }

    const GetAllCompanies = () => {
        document.getElementById("divLoading").className = "show";
        axios({
            method: "GET",
            url: MyApiUrl + "companies",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((response) => {
                const Option = response.data.map((item, i) => (
                    <option key={i} value={item.COMPANY_PKID}>
                        {item.COMPANY_NAME}
                    </option>
                ));
                setCompanyData(Option);
                GetOrderType();
                document.getElementById("divLoading").className = "hide";
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const SelectPackage = (event) => {
        let splt = event.target.value;
        let splt2 = splt.split("/");
        firstarr.push(splt2[0]);
        console.log(firstarr);
        //  setPackageSelect(event.target.value);
        // let splt = event.target.value;
        // let splt2 = splt.split("/");
        // FinalResult.map((i) => {

        // });
        // let x = [...FinalResult, splt2[0]];
        // console.log(x)
        // setFinalResult(firstarr);
    };

    const PackageAmt = (event) => {
        // setPackageAmtval(event.target.value);

        let productID = event.target.id.split("-");

        let packagesize = document
            .getElementById("packagesel" + productID[1] + "")
            .value.split("/");

        let requiredqty = document.getElementById(
            "requiredqth" + productID[1] + ""
        ).value;

        let finalamt = (requiredqty / packagesize[2]) * event.target.value;
        document.getElementById("producttotalam1" + productID[1] + "").innerHTML =
            finalamt.toFixed(2);
        document.getElementById("producttotalam" + productID[1] + "").innerHTML =
            finalamt.toFixed(2);
        // setFinalAMount(finalamt);
        // setProductAmount(finalamt);
    };

    const DiscountCalculate = (event) => {
        // setDiscount(event.target.value);
        if (
            event.target.value === "" ||
            event.target.value == null ||
            event.target.value === "0"
        ) {
        } else {
            let productID = event.target.id.split("-");
            let actialamt = document.getElementById(
                "producttotalam1" + productID[1] + ""
            ).innerHTML;
            let finalamt = actialamt - (event.target.value / 100) * actialamt;
            document.getElementById("producttotalam" + productID[1] + "").innerHTML =
                finalamt.toFixed(2);
            // setFinalAMount(actialamt - (event.target.value / 100) * actialamt);
        }
    };

    const FinalSubmit = () => {
        document.getElementById("divLoading").className = "show";
        var arr = [];
        // FinalResult.map((i) => {
        firstarr.map((i) => {
            let packageSize = document
                .getElementById("packagesel" + i + "")
                .value.split("/");
            if (OrderTypeID === "3" || OrderTypeID === "4" || OrderTypeID === "5") {
                var obj = {
                    ProductID: i,
                    PackageID: packageSize[1],
                    Quantity: "",
                    PackageAmt: "",
                    Discount: "",
                    FreeUnitScheme: "",
                    FinalAmount: "",
                    ProductAmount: "",
                };
                arr.push(obj);
            } else {
                var obj = {
                    ProductID: i,
                    PackageID: packageSize[1],
                    Quantity: document.getElementById("requiredqth" + i + "").value,
                    PackageAmt: document.getElementById("amount-" + i + "").value,
                    Discount: document.getElementById("Discount-" + i + "").value,
                    FreeUnitScheme: document.getElementById("FreeUnit-" + i + "").value,
                    FinalAmount: document.getElementById("producttotalam" + i + "")
                        .innerHTML,
                    ProductAmount: document.getElementById("producttotalam1" + i + "")
                        .innerHTML,
                };
                arr.push(obj);
            }

        });
        setFinalResultNew(arr);
        if (arr.length === 0) {
            Toast.fire({
                icon: "warning",
                title: "Please select atleast one product!",
            });
            document.getElementById("divLoading").className = "hide";
        } else {
            document.getElementById("divLoading").className = "hide";
            history.push({
                pathname: "/FinalOrderConfirm",
                state: { arr, CustomerID, CompanyID, OrderTypeID },
            });
        }
    };

    const GetOrderType = () => {
        document.getElementById("divLoading").className = "show";
        axios({
            method: "GET",
            url: MyApiUrl + "OrderTypeReplace",
            headers: {
                "content-type": "application/json",
            },
            params: {
                language_code: "en",
            },
        })
            .then((response) => {
                console.log(response.data);
                const Option = response.data.map((item, i) => (
                    <option key={i} value={item.ORDER_TYPE_PKID}>
                        {item.ORDER_TYPE_NAME}
                    </option>
                ));
                setOrderTypeArr(Option);
                document.getElementById("divLoading").className = "hide";
            })
            .catch((error) => {
                console.log(error);
            });
    };

    React.useEffect(() => {
        GetAllCompanies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const FullTable = () => (
        <CDataTable
            items={ResponseData}
            fields={fields}
            hover
            striped
            bordered
            sorter
            tableFilter={table}
            itemsPerPage={10}
            pagination
            size="sm"
            itemsPerPageSelect={items}
            scopedSlots={{
                "Discount(%)": (i) => {
                    return (
                        <td>
                            <CInput
                                type="text"
                                id={"Discount-" + i.PRODUCT_PKID}
                                placeholder="Amount"
                                required
                                onChange={DiscountCalculate}
                            />
                        </td>
                    );
                },
                "Free Unit Scheme(%)": (i) => {
                    return (
                        <td>
                            <CInput
                                type="text"
                                id={"FreeUnit-" + i.PRODUCT_PKID}
                                placeholder="Free Unit Scheme"
                                required
                            />
                        </td>
                    );
                },
                "Package Amount": (i) => {
                    return (
                        <td>
                            <CInput
                                type="text"
                                id={"amount-" + i.PRODUCT_PKID}
                                placeholder="Amount"
                                required
                                onChange={PackageAmt}
                            />
                        </td>
                    );
                },
                "Product Amount": (i) => (
                    <td>
                        <p id={"producttotalam1" + i.PRODUCT_PKID}></p>
                    </td>
                ),
                "Total Amount": (i) => (
                    <td>
                        <p id={"producttotalam" + i.PRODUCT_PKID}></p>
                    </td>
                ),
                Quantity: (i) => {
                    return (
                        <td
                            className="TDClass"
                            style={{ width: "20% !important" }}
                        >
                            <CRow>
                                <CCol md="6" style={{ paddingRight: "0%" }}>
                                    <CInput
                                        type="text"
                                        id={"requiredqth" + i.PRODUCT_PKID}
                                        placeholder="Required"
                                        required
                                        style={{ width: "100%", float: "left" }}
                                    />
                                </CCol>
                                <CCol md="6" style={{ paddingLeft: "0%" }}>
                                    <CInput
                                        type="text"
                                        id="Unit"
                                        placeholder="Required"
                                        readOnly
                                        style={{
                                            width: "100%",
                                            textAlign: "center",
                                            fontWeight: "700",
                                        }}
                                        value={i.UNIT_OF_MEASUREMENT_SHORT_KEY}
                                    />
                                </CCol>
                            </CRow>
                        </td>
                    );
                },
                "Package Size": (i) => {
                    const Option = i.packagesArr.map((item, j) => (
                        <option
                            key={j}
                            value={
                                i.PRODUCT_PKID +
                                "/" +
                                item.PRD_PACKAG_PKID +
                                "/" +
                                item.PRD_PACKAGE_UNIT
                            }
                        >
                            {item.PRD_PACKAGE_UNIT +
                                " " +
                                item.UNIT_OF_MEASUREMENT_SHORT_KEY}
                        </option>
                    ));
                    return (
                        <td>
                            <CSelect
                                custom
                                name="addtype"
                                id={"packagesel" + i.PRODUCT_PKID}
                                onChange={SelectPackage}
                            >
                                <option value="-1">Select Package</option>
                                {Option}
                            </CSelect>
                        </td>
                    );
                },
            }}
        />
    );

    let history = useHistory();
    return (
        <div>
            <div id="divLoading"> </div>
            <h1 id="ccmaster">Order Item</h1>
            <CRow style={{ marginTop: "3%" }}>
                <CCol md="2" />
                <CCol md="12">
                    <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
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
                                        <CCardHeader>Customer Details Details</CCardHeader>
                                        <CCardBody>
                                            <CRow>
                                                <CCol md="12">
                                                    <table id="customerDetails" style={{ width: "100%" }}>
                                                        <tr>
                                                            <td>
                                                                <tr>
                                                                    <th>
                                                                        <b>Customer Name :</b>
                                                                    </th>
                                                                    <td>{Cname}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        <b>Email :</b>
                                                                    </th>
                                                                    <td>{Cemail}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        <b>Contact Number :</b>
                                                                    </th>
                                                                    <td>{Cpho}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        <b>Category :</b>
                                                                    </th>
                                                                    <td>{category}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        <b>Type :</b>
                                                                    </th>
                                                                    <td>{type}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        <b>Sub Type :</b>
                                                                    </th>
                                                                    <td>{SubType}</td>
                                                                </tr>
                                                            </td>
                                                            <td>
                                                                <tr>
                                                                    <th>
                                                                        <b>Firm Name :</b>
                                                                    </th>
                                                                    <td>{FirmName}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        <b>Capacity :</b>
                                                                    </th>
                                                                    <td>{Capacity}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        <b>Superior :</b>
                                                                    </th>
                                                                    <td>{Superior}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        <b>Alternate Email :</b>
                                                                    </th>
                                                                    <td>{Cemail2}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        <b>Alternate Number :</b>
                                                                    </th>
                                                                    <td>{Cpho2}</td>
                                                                </tr>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </CCol>
                                            </CRow>
                                            <hr />
                                            <CRow>
                                                <CCol md="6">
                                                    <h4 className="p1">Select Products</h4>
                                                </CCol>
                                                <CCol md="3">
                                                    <CSelect
                                                        custom
                                                        name="addtype"
                                                        id="addtype"
                                                        value={CompanyID}
                                                        onChange={SetCompany}
                                                    >
                                                        <option value="-1">Select Company</option>
                                                        {CompanyData}
                                                    </CSelect>
                                                </CCol>
                                                <CCol md="3">
                                                    <CSelect
                                                        custom
                                                        name="addtype"
                                                        id="addtype"
                                                        value={OrderTypeID}
                                                    >
                                                        <option value="-1">Order Type</option>
                                                        {OrderTypeArr}
                                                    </CSelect>
                                                </CCol>
                                            </CRow>
                                            <br />
                                            {Fulltab && <FullTable />}
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol md="12">
                                    <CButton
                                        color="primary"
                                        size="sm"
                                        style={{ float: "right" }}
                                        onClick={FinalSubmit}
                                    >
                                        Next
                                    </CButton>
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

export default PlaceOrderProductsSelect_Replace;
