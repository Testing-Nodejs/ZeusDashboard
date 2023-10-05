/**
 * @author KIMOSABE
 * @email Kimosabe@mail.com
 * @create date 2021-11-25 17:00:15
 * @modify date 2021-12-06 15:32:46
 * @desc [description]
 */

import React, { useState } from "react";
import axios from "axios";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CDataTable,
    CButton,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CModal,
    CInput,
    CLabel,
    CSelect,
    CLink,
    CImg,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { MyApiUrl, ViewImg } from "src/services/service";
import EditIcon from "@material-ui/icons/Edit";
import { Toast } from "src/services/SweetAlerts";
import DateFilter from "../masters/DateFilter";
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields2 = [
    { key: "Status" },
    { key: "Invoice" },
    { key: "Invoice Number" },
    { key: "Invoice Date" },
    { key: "Tentative Dispatched Date" },
    { key: "Ordered Date" },
    { key: "Ordered Time" },
    { key: "Customer Name" },
    { key: "Order Items" },
    { key: "Company" },
    { key: "Order Number" },
    { key: "Order By" },
    { key: "Ordered Person" },
    { key: "Order Type" },
    { key: "Supply Type" },
    { key: "Day Till Now" },
    { key: "Billing Address" },
    { key: "Shipping Address" },
    { key: "Logistic" },
    { key: "Logistic Designation" },
    { key: "Logistic Payment Mode" },
    { key: "Delivery Type" },
    { key: "Cash Discount" },
    { key: "Grand Total" },
    { key: "Attachment" },
    { key: "Remark" },
    { key: "Process Remark" },
    { key: "Manager Remark" },
];

const DeliveryConfirmation_p = () => {
    const [ResponseData, setResponseData] = useState([]);
    const [BillingAddress, setBillingAddress] = useState([]);
    const [ShippingAddress, setShippingAddress] = useState([]);
    const [OrderRemark, setOrderRemark] = useState([]);
    const [fromDate, setfromDate] = useState();
    const [Otype, setOtype] = useState();
    const [Omonth, setOmonth] = useState();
    const [toDate, settoDate] = useState();
    const [block, setblock] = useState(false);
    const [block1, setblock1] = useState(false);
    const [block2, setblock2] = useState(false);
    const [block3, setblock3] = useState(false);
    const [block4, setblock4] = useState(false);
    const [OrderProcessRemark, setOrderProcessRemark] = useState([]);
    const [ManagerRemark, setManagerRemark] = useState([]);
    const [ManagerRemarkBloack, setManagerRemarkBloack] = useState(false);

    // Filters

    const [OderSupplyType, setOderSupplyType] = useState([]);

    const ViewSalesPersonRemark = (pkid) => {
        document.getElementById("divLoading").className = "show";
        axios({
            method: "GET",
            url: MyApiUrl + "OrderRemarkByManager/" + pkid + "",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((response) => {
                setManagerRemark(response.data);
                document.getElementById("divLoading").className = "hide";
            })
            .catch((error) => {
                console.log(error);
            });
        setManagerRemarkBloack(!block2);
    };

    const GetAllScheduledOrder = () => {
        document.getElementById("divLoading").className = "show";
        axios({
            method: "GET",
            url: MyApiUrl + "getAlldeliveryConfirmOrder",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((response) => {
                const items = response.data.map((item, index) => {
                    return {
                        ...item,
                        "Day Till Now": item.HDays,
                        "Order Number": item.ORDER_NUMBER,
                        "Order By": item.ORDER_BY,
                        "Ordered Person": item.TypeName,
                        "Order Type": item.ORDER_TYPE_NAME,
                        "Supply Type": item.SUPPLY_NAME,
                        Company: item.COMPANY_NAME,
                        "Customer Name": item.CUSTOMER_NAME,
                        Logistic: item.ORDER_LOGISTIC,
                        "Logistic Designation": item.ORDER_LOGISTIC_DESTINATION,
                        "Logistic Payment Mode": item.ORDER_LOGISTIC_PAY_MODE,
                        "Delivery Type": item.ORDER_DELIVERY_TYPE,
                        "Cash Discount": item.ORDER_CASH_DISCOUNT + "%",
                        "Grand Total": item.ORDER_ORDER_AMOUNT,
                        "Invoice Number": item.ORDER_INVOICE_NUMBER,
                    };
                });
                setResponseData(items);
                document.getElementById("divLoading").className = "hide";
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const GetOrderSupplyType = () => {
        document.getElementById("divLoading").className = "show";
        axios({
            method: "GET",
            url: MyApiUrl + "OrderSupplyType",
            headers: {
                "content-type": "application/json",
            },
            params: {
                language_code: "en",
            },
        })
            .then((response) => {
                const Option = response.data.map((item, i) => (
                    <option key={i} value={item.SUPPLY_TYPE_PKID}>
                        {item.SUPPLY_NAME}
                    </option>
                ));
                setOderSupplyType(Option);
                document.getElementById("divLoading").className = "hide";
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const ViewBillingAddress = (pkid) => {
        document.getElementById("divLoading").className = "show";
        axios({
            method: "GET",
            url: MyApiUrl + "OrderBillingAddress/" + pkid + "",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((response) => {
                setBillingAddress(response.data);
                document.getElementById("divLoading").className = "hide";
            })
            .catch((error) => {
                console.log(error);
            });
        setblock(!block);
    };

    const ViewShippingAddress = (pkid) => {
        document.getElementById("divLoading").className = "show";
        axios({
            method: "GET",
            url: MyApiUrl + "OrderShippingAddress/" + pkid + "",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((response) => {
                setShippingAddress(response.data);
                document.getElementById("divLoading").className = "hide";
            })
            .catch((error) => {
                console.log(error);
            });
        setblock1(!block1);
    };

    const ViewOderRemark = (pkid) => {
        document.getElementById("divLoading").className = "show";
        axios({
            method: "GET",
            url: MyApiUrl + "OrderRemark/" + pkid + "",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((response) => {
                setOrderRemark(response.data);
                document.getElementById("divLoading").className = "hide";
            })
            .catch((error) => {
                console.log(error);
            });
        setblock2(!block2);
    };

    const ViewOderProcessRemark = (pkid) => {
        document.getElementById("divLoading").className = "show";
        axios({
            method: "GET",
            url: MyApiUrl + "OrderProcessRemark/" + pkid + "",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((response) => {
                setOrderProcessRemark(response.data);
                document.getElementById("divLoading").className = "hide";
            })
            .catch((error) => {
                console.log(error);
            });
        setblock3(!block3);
    };

    const FilterDates = () => {
        if (fromDate === "" || fromDate == null) {
            Toast.fire({
                icon: "warning",
                title: "Select From Date!",
            });
        } else if (toDate === "" || toDate == null) {
            Toast.fire({
                icon: "warning",
                title: "Select To Date!",
            });
        } else {
            document.getElementById("divLoading").className = "show";
            axios({
                method: "GET",
                url: MyApiUrl + "getAlldeliveryConfirmOrderByDate/" + fromDate + "/" + toDate,
                headers: {
                    "content-type": "application/json",
                },
            })
                .then((response) => {
                    const items = response.data.map((item, index) => {
                        return {
                            ...item,
                            "Day Till Now": item.HDays,
                            "Order Number": item.ORDER_NUMBER,
                            "Order By": item.ORDER_BY,
                            "Ordered Person": item.TypeName,
                            "Order Type": item.ORDER_TYPE_NAME,
                            "Supply Type": item.SUPPLY_NAME,
                            Company: item.COMPANY_NAME,
                            "Customer Name": item.CUSTOMER_NAME,
                            Logistic: item.ORDER_LOGISTIC,
                            "Logistic Designation": item.ORDER_LOGISTIC_DESTINATION,
                            "Logistic Payment Mode": item.ORDER_LOGISTIC_PAY_MODE,
                            "Delivery Type": item.ORDER_DELIVERY_TYPE,
                            "Cash Discount": item.ORDER_CASH_DISCOUNT + "%",
                            "Grand Total": item.ORDER_ORDER_AMOUNT,
                            "Invoice Number": item.ORDER_INVOICE_NUMBER,
                        };
                    });
                    setResponseData(items);
                    document.getElementById("divLoading").className = "hide";
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const FilterReset = () => {
        GetAllScheduledOrder();
        setfromDate("");
        settoDate("");
        setOtype("0");
        setOmonth("0");
    };

    React.useEffect(() => {
        GetAllScheduledOrder();
        GetOrderSupplyType();
    }, []);

    let history = useHistory();
    return (
        <div id="city">
            <div id="divLoading"> </div>
            <h1 id="ccmaster">Delivery Confirmation</h1>
            <CRow style={{ marginTop: "3%" }}>
                <CCol col="12">
                <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
                        <CCardBody>
                            <CRow>
                                <CCol>
                                    <CCard>
                                        <CCardBody>
                                            <CRow>
                                                <CCol md="2">
                                                    <CLabel htmlFor="nf-email">Select Order Type</CLabel>
                                                    <CSelect
                                                        custom
                                                        name="merchant"
                                                        value={Otype}
                                                        onChange={(event) => {
                                                            document.getElementById("divLoading").className = "show";
                                                            axios({
                                                                method: "GET",
                                                                url:
                                                                    MyApiUrl +
                                                                    "/getAlldeliveryConfirmOrderBySupplyType/" +
                                                                    event.target.value,
                                                                headers: {
                                                                    "content-type": "application/json",
                                                                },
                                                            })
                                                                .then((response) => {
                                                                    const items = response.data.map((item, index) => {
                                                                        return {
                                                                            ...item,
                                                                            "Day Till Now": item.HDays,
                                                                            "Order Number": item.ORDER_NUMBER,
                                                                            "Order By": item.ORDER_BY,
                                                                            "Ordered Person": item.TypeName,
                                                                            "Order Type": item.ORDER_TYPE_NAME,
                                                                            "Supply Type": item.SUPPLY_NAME,
                                                                            Company: item.COMPANY_NAME,
                                                                            "Customer Name": item.CUSTOMER_NAME,
                                                                            Logistic: item.ORDER_LOGISTIC,
                                                                            "Logistic Designation": item.ORDER_LOGISTIC_DESTINATION,
                                                                            "Logistic Payment Mode": item.ORDER_LOGISTIC_PAY_MODE,
                                                                            "Delivery Type": item.ORDER_DELIVERY_TYPE,
                                                                            "Cash Discount": item.ORDER_CASH_DISCOUNT + "%",
                                                                            "Grand Total": item.ORDER_ORDER_AMOUNT,
                                                                            "Invoice Number": item.ORDER_INVOICE_NUMBER,
                                                                        };
                                                                    });
                                                                    setResponseData(items);
                                                                    document.getElementById("divLoading").className = "hide";
                                                                })
                                                                .catch((error) => {
                                                                    console.log(error);
                                                                });
                                                        }}
                                                        id="merchant"
                                                    >
                                                        <option value="0">All</option>
                                                        {OderSupplyType}
                                                    </CSelect>
                                                </CCol>
                                                <CCol md="2">
                                                    <CLabel htmlFor="nf-email">Select Month</CLabel>
                                                    <CSelect
                                                        custom
                                                        name="Marchant"
                                                        id="Marchant"
                                                        value={Omonth}
                                                        onChange={(event) => {
                                                            document.getElementById("divLoading").className = "show";
                                                            axios({
                                                                method: "GET",
                                                                url:
                                                                    MyApiUrl +
                                                                    "/getAlldeliveryConfirmOrderByMonth/" +
                                                                    event.target.value,
                                                                headers: {
                                                                    "content-type": "application/json",
                                                                },
                                                            })
                                                                .then((response) => {
                                                                    const items = response.data.map((item, index) => {
                                                                        return {
                                                                            ...item,
                                                                            "Day Till Now": item.HDays,
                                                                            "Order Number": item.ORDER_NUMBER,
                                                                            "Order By": item.ORDER_BY,
                                                                            "Ordered Person": item.TypeName,
                                                                            "Order Type": item.ORDER_TYPE_NAME,
                                                                            "Supply Type": item.SUPPLY_NAME,
                                                                            Company: item.COMPANY_NAME,
                                                                            "Customer Name": item.CUSTOMER_NAME,
                                                                            Logistic: item.ORDER_LOGISTIC,
                                                                            "Logistic Designation": item.ORDER_LOGISTIC_DESTINATION,
                                                                            "Logistic Payment Mode": item.ORDER_LOGISTIC_PAY_MODE,
                                                                            "Delivery Type": item.ORDER_DELIVERY_TYPE,
                                                                            "Cash Discount": item.ORDER_CASH_DISCOUNT + "%",
                                                                            "Grand Total": item.ORDER_ORDER_AMOUNT,
                                                                            "Invoice Number": item.ORDER_INVOICE_NUMBER,
                                                                        };
                                                                    });
                                                                    setResponseData(items);
                                                                    document.getElementById("divLoading").className = "hide";
                                                                })
                                                                .catch((error) => {
                                                                    console.log(error);
                                                                });
                                                        }}
                                                    >
                                                        <option value="0">All</option>
                                                        <option value="1">Jan</option>
                                                        <option value="2">Feb</option>
                                                        <option value="3">March</option>
                                                        <option value="4">April</option>
                                                        <option value="5">May</option>
                                                        <option value="6">Jun</option>
                                                        <option value="7">Jul</option>
                                                        <option value="8">Aug</option>
                                                        <option value="9">Sept</option>
                                                        <option value="10">Oct</option>
                                                        <option value="11">Nov</option>
                                                        <option value="12">Dec</option>
                                                    </CSelect>
                                                </CCol>
                                                <CCol md="2">
                                                    <CLabel>From:</CLabel>
                                                    <CInput
                                                        type="date"
                                                        onChange={(event) => {
                                                            setfromDate(event.target.value);
                                                        }}
                                                        value={fromDate}
                                                    />
                                                </CCol>

                                                <CCol md="2">
                                                    <CLabel>To:</CLabel>
                                                    <CInput
                                                        type="date"
                                                        onChange={(event) => {
                                                            settoDate(event.target.value);
                                                        }}
                                                        value={toDate}
                                                    />
                                                </CCol>
                                                <CCol md="2">
                                                    <CButton
                                                        size="sm"
                                                        color="info"
                                                        style={{ marginTop: "28px", width: "100%" }}
                                                        onClick={FilterDates}
                                                    >
                                                        Filter
                                                    </CButton>
                                                </CCol>
                                                <CCol md="2">
                                                    <CButton
                                                        size="sm"
                                                        color="danger"
                                                        style={{ marginTop: "28px", width: "100%" }}
                                                        onClick={FilterReset}
                                                    >
                                                        Reset
                                                    </CButton>
                                                </CCol>
                                            </CRow>
                                            <hr />
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow style={{ marginTop: "3%" }}>
                <CCol col="12">
                <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
                        <CCardBody>
                            <CRow>
                                <CCol>
                                    <CCard>
                                        <CCardHeader>Delivery Confirmation Orders</CCardHeader>
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
                                                size="sm"
                                                itemsPerPage={10}
                                                pagination
                                                scopedSlots={{
                                                    Invoice: (i) => {
                                                        return (
                                                            <React.Fragment>
                                                                <td>
                                                                    <CLink
                                                                        href={ViewImg + "/" + i.ORDER_INVOICE_DOC}
                                                                        target="_blank"
                                                                    > View
                                                                    </CLink>
                                                                </td>
                                                            </React.Fragment>
                                                        );
                                                    },
                                                    "Ordered Date": (i) => (
                                                        <td>{<DateFilter date={i.ORDER_DATE} />}</td>
                                                    ),
                                                    "Tentative Dispatched Date": (i) => (
                                                        <td>{<DateFilter date={i.ORDER_TENTATIVE_DATE} />}</td>
                                                    ),
                                                    "Invoice Date": (i) => (
                                                        <td>{<DateFilter date={i.ORDER_DELIVERY_CONFIRMED_DATE} />}</td>
                                                    ),
                                                    "Ordered Time": (i) => {
                                                        return (
                                                            <td>
                                                                {new Date(i.clock)
                                                                    .toISOString()
                                                                    .split("T")[1]
                                                                    .slice(0, -1)}
                                                            </td>
                                                        );
                                                    },
                                                    "Manager Remark": (i) => (
                                                        <td>
                                                            <CRow>
                                                                <CCol md="8">
                                                                    <CButton
                                                                        color="primary"
                                                                        size="sm"
                                                                        id="AddEmp"
                                                                        onClick={() => {
                                                                            ViewSalesPersonRemark(i.ORDER_PKID);
                                                                        }}
                                                                    >
                                                                        View
                                                                    </CButton>
                                                                </CCol>
                                                            </CRow>
                                                        </td>
                                                    ),
                                                    Status: (i) => (
                                                        <td>
                                                            <span className="ScheduledOrders">{i.ORDER_TRANSIT_STATUS}</span>
                                                        </td>
                                                    ),
                                                    "Order Items": (i) => (
                                                        <td>
                                                            <CButton
                                                                onClick={() => {
                                                                    history.push("/OrderItems", {
                                                                        data: i,
                                                                    });
                                                                }}
                                                            >
                                                                {i.ItemCount}
                                                            </CButton>
                                                        </td>
                                                    ),
                                                    "Billing Address": (i) => (
                                                        <td>
                                                            <CRow>
                                                                <CCol md="8">
                                                                    <CButton
                                                                        color="primary"
                                                                        size="sm"
                                                                        id="AddEmp"
                                                                        onClick={() => {
                                                                            ViewBillingAddress(i.ORDER_PKID);
                                                                        }}
                                                                    >
                                                                        View
                                                                    </CButton>
                                                                </CCol>
                                                            </CRow>
                                                        </td>
                                                    ),
                                                    "Shipping Address": (i) => (
                                                        <td>
                                                            <CRow>
                                                                <CCol md="8">
                                                                    <CButton
                                                                        color="primary"
                                                                        size="sm"
                                                                        id="AddEmp"
                                                                        onClick={() => {
                                                                            ViewShippingAddress(i.ORDER_PKID);
                                                                        }}
                                                                    >
                                                                        View
                                                                    </CButton>
                                                                </CCol>
                                                            </CRow>
                                                        </td>
                                                    ),
                                                    Remark: (i) => (
                                                        <td>
                                                            <CRow>
                                                                <CCol md="8">
                                                                    <CButton
                                                                        color="primary"
                                                                        size="sm"
                                                                        id="AddEmp"
                                                                        onClick={() => {
                                                                            ViewOderRemark(i.ORDER_PKID);
                                                                        }}
                                                                    >
                                                                        View
                                                                    </CButton>
                                                                </CCol>
                                                            </CRow>
                                                        </td>
                                                    ),
                                                    "Process Remark": (i) => (
                                                        <td>
                                                            <CRow>
                                                                <CCol md="8">
                                                                    <CButton
                                                                        color="primary"
                                                                        size="sm"
                                                                        id="AddEmp"
                                                                        onClick={() => {
                                                                            ViewOderProcessRemark(i.ORDER_PKID);
                                                                        }}
                                                                    >
                                                                        View
                                                                    </CButton>
                                                                </CCol>
                                                            </CRow>
                                                        </td>
                                                    ),
                                                    Attachment: (i) => {
                                                        let profile = "";
                                                        if (
                                                            i.ORD_DOC === "" ||
                                                            i.ORD_DOC === null
                                                        ) {
                                                            profile = "NoImage.png";
                                                        } else {
                                                            profile = i.ORD_DOC;
                                                        }
                                                        return (
                                                            <React.Fragment>
                                                                <td>
                                                                    <CLink
                                                                        href={ViewImg + "/" + profile}
                                                                        target="_blank"
                                                                    >
                                                                        <CImg
                                                                            src={ViewImg + "/" + profile}
                                                                            fluid
                                                                            className="mb-2"
                                                                            style={{ width: "100%" }}
                                                                        />
                                                                    </CLink>
                                                                </td>
                                                            </React.Fragment>
                                                        );
                                                    },
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
            <CModal show={block} onClose={() => setblock(!block)} color="dark">
                <CModalHeader closeButton>
                    <CModalTitle>Customer Billing Address</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        {BillingAddress.map((i) => (
                            <React.Fragment>
                                <CCol md="12">
                                    <p
                                        style={{
                                            fontWeight: "700",
                                            fontFamily: "sans-serif",
                                            textAlign: "center",
                                            borderBottom: "1px solid #ebedef",
                                            paddingBottom: "5%",
                                        }}
                                    >
                                        Billing Address
                                    </p>
                                    <table>
                                        <tr>
                                            <td>{i.CUSTOMER_ADDRESS_ADDRESS1}</td>
                                        </tr>
                                        <tr>
                                            <td>{i.CUSTOMER_ADDRESS_ADDRESS2}</td>
                                        </tr>
                                        <tr>
                                            <td>{i.CUSTOMER_ADDRESS_ADDRESS3}</td>
                                        </tr>
                                        <tr>
                                            <td>{i.CUSTOMER_ADDRESS_ZIP_CODE}</td>
                                        </tr>
                                    </table>
                                </CCol>
                            </React.Fragment>
                        ))}
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setblock(!block)}>
                        Close
                    </CButton>
                </CModalFooter>
            </CModal>
            <CModal show={block1} onClose={() => setblock1(!block1)} color="dark">
                <CModalHeader closeButton>
                    <CModalTitle>Customer Shipping Address</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        {ShippingAddress.map((i) => (
                            <React.Fragment>
                                <CCol md="12">
                                    <p
                                        style={{
                                            fontWeight: "700",
                                            fontFamily: "sans-serif",
                                            textAlign: "center",
                                            borderBottom: "1px solid #ebedef",
                                            paddingBottom: "5%",
                                        }}
                                    >
                                        Shipping Address
                                    </p>
                                    <table>
                                        <tr>
                                            <td>{i.CUSTOMER_ADDRESS_ADDRESS1}</td>
                                        </tr>
                                        <tr>
                                            <td>{i.CUSTOMER_ADDRESS_ADDRESS2}</td>
                                        </tr>
                                        <tr>
                                            <td>{i.CUSTOMER_ADDRESS_ADDRESS3}</td>
                                        </tr>
                                        <tr>
                                            <td>{i.CUSTOMER_ADDRESS_ZIP_CODE}</td>
                                        </tr>
                                    </table>
                                </CCol>
                            </React.Fragment>
                        ))}
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setblock1(!block1)}>
                        Close
                    </CButton>
                </CModalFooter>
            </CModal>
            <CModal show={block2} onClose={() => setblock2(!block2)} color="dark">
                <CModalHeader closeButton>
                    <CModalTitle>Order Remark</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        {OrderRemark.map((i) => (
                            <React.Fragment>
                                <CCol md="12">
                                    <table>
                                        <tr>
                                            <td>{i.ORDER_REMARK}</td>
                                        </tr>
                                    </table>
                                </CCol>
                            </React.Fragment>
                        ))}
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setblock2(!block2)}>
                        Close
                    </CButton>
                </CModalFooter>
            </CModal>
            <CModal show={block3} onClose={() => setblock3(!block3)} color="dark">
                <CModalHeader closeButton>
                    <CModalTitle>Process Remark</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        {OrderProcessRemark.map((i) => (
                            <React.Fragment>
                                <CCol md="12">
                                    <table>
                                        <tr>
                                            <td>{i.ORDER_REMARK_BY_PROCESSTEAM}</td>
                                        </tr>
                                    </table>
                                </CCol>
                            </React.Fragment>
                        ))}
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setblock3(!block3)}>
                        Close
                    </CButton>
                </CModalFooter>
            </CModal>
            <CModal show={ManagerRemarkBloack} onClose={() => setManagerRemarkBloack(!ManagerRemarkBloack)} color="dark">
                <CModalHeader closeButton>
                    <CModalTitle>Order Remark From Manager</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        {ManagerRemark.map((i) => (
                            <React.Fragment>
                                <CCol md="12">
                                    <p
                                        style={{
                                            fontWeight: "700",
                                            fontFamily: "sans-serif",
                                            textAlign: "center",
                                            borderBottom: "1px solid #ebedef",
                                            paddingBottom: "5%",
                                        }}
                                    >
                                        Remark
                                    </p>
                                    <table>
                                        <tr>
                                            <td>{i.ORDER_MANAGER_REMARK}</td>
                                        </tr>
                                    </table>
                                </CCol>
                            </React.Fragment>
                        ))}
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setManagerRemarkBloack(!ManagerRemarkBloack)}>
                        Close
                    </CButton>
                </CModalFooter>
            </CModal>
        </div>
    );
};

export default DeliveryConfirmation_p;
