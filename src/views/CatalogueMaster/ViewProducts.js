/**
 * @author KIMOSABE
 * @email Kimosabe@mail.com
 * @create date 2021-12-01 13:48:09
 * @modify date 2021-12-02 13:49:39
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
  CImg,
  CLink,
  CRow,
  CSelect,
  CDataTable,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { MyApiUrl, ViewImg } from "src/services/service";
import EditIcon from "@material-ui/icons/Edit";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields2 = [
  { key: "Action" },
  { key: "Product Name" },
  { key: "Species" },
  { key: "Company" },
  { key: "Code" },
  { key: "Bar Code" },
  { key: "HSN Code" },
  { key: "Product Image" },
  { key: "Packages" },
  { key: "Catalogue" },
];

const ViewProducts = () => {
  let history = useHistory();

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
  const [AllCompanies, setAllCompanies] = useState([]);

  const GetAllProducts = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "prod",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const items = response.data.map((item) => {
          return {
            ...item,
            Company: item.COMPANY_NAME,
            Species: item.PRODUCT_SPECIES_NAME,
            "Product Name": item.PRODUCT_NAME,
            Code: item.PRODUCT_CODE,
            "Bar Code": item.PRODUCT_BAR_CODE,
            "HSN Code": item.PRODUCT_HSM,
          };
        });
        setResponseData(items);
        document.getElementById("divLoading").className = "hide";
        document.getElementById("divLoading").className = "show";
        axios({
          method: "GET",
          url: MyApiUrl + "companies",
          headers: {
            "content-type": "application/json",
          },
          params: {
            language_code: "en",
          },
        })
          .then((response) => {
            const Option = response.data.map((item, i) => (
              <option key={i} value={item.COMPANY_PKID}>
                {item.COMPANY_NAME}
              </option>
            ));
            setAllCompanies(Option);
            document.getElementById("divLoading").className = "hide";
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const DeleteProduct = (pkid) => {
    // eslint-disable-next-line no-restricted-globals
    var res = confirm("Are you sure you want to delete");
    if (res) {
      document.getElementById("divLoading").className = "show";
      axios.put(MyApiUrl + "deleteprod/" + pkid).then((response) => {
        if (response.data === true) {
          Swal.fire({
            title: "Product Deleted Successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
          GetAllProducts();
          document.getElementById("divLoading").className = "hide";
        } else {
          Swal.fire({
            title: "Failed To Delete Product!",
            icon: "error",
            confirmButtonText: "OK",
          });
          document.getElementById("divLoading").className = "hide";
        }
      });
    }
  };

  const ToExcel = () => {
    document.getElementById("divLoading").className = "show";
    var cnt = 0;
    // eslint-disable-next-line no-array-constructor
    var csvData = new Array();
    csvData.push(
      '"Sl No","Product Name","Species","Company","Code","Bar Code","HSN Code"'
    );
    let Status = "";
    ResponseData.map((item) => {
      return (
        cnt++,
        csvData.push(
          '"' +
          cnt +
          '","' +
          item.PRODUCT_NAME +
          '","' +
          item.PRODUCT_SPECIES_NAME +
          '","' +
          item.COMPANY_NAME +
          '","' +
          item.PRODUCT_CODE +
          '","' +
          item.PRODUCT_BAR_CODE +
          '","' +
          item.PRODUCT_HSM +
          '"'
        )
      );
    });

    const fileName = "All Products.csv";
    const buffer = csvData.join("\n");
    const blob = new Blob([buffer], {
      type: "text/csv;charset=utf8;",
    });

    //IN IE
    const link = document.createElement("a");
    if (link.download !== undefined) {
      link.setAttribute("href", window.URL.createObjectURL(blob));
      link.setAttribute("download", fileName);
      link.style = "visibility:hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, fileName);
    } else {
    }
    document.getElementById("divLoading").className = "hide";
  }

  React.useEffect(() => {
    GetAllProducts();
  }, []);

  return (
    <div id="city">
      <div id="divLoading"> </div>
      <h1 id="ccmaster">View Products</h1>
      <CRow style={{ marginTop: "3%" }}>
        <CCol col="12">
          <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
            <CCardBody>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>
                      <CRow>
                        <CCol md="8">
                          <CRow>
                            <CCol md="4">
                              View Products
                            </CCol>
                            <CCol md="8">
                              <CSelect
                                custom
                                name="merchant"
                                style={{ width: "50%", marginTop: "-0.5em", marginLeft: "-5em" }}
                                onChange={(event) => {
                                  document.getElementById("divLoading").className = "show";
                                  axios({
                                    method: "GET",
                                    url: MyApiUrl + "prodByComID/" + event.target.value + "",
                                    headers: {
                                      "content-type": "application/json",
                                    },
                                  })
                                    .then((response) => {
                                      const items = response.data.map((item) => {
                                        return {
                                          ...item,
                                          Company: item.COMPANY_NAME,
                                          Species: item.PRODUCT_SPECIES_NAME,
                                          "Product Name": item.PRODUCT_NAME,
                                          Code: item.PRODUCT_CODE,
                                          "Bar Code": item.PRODUCT_BAR_CODE,
                                          "HSN Code": item.PRODUCT_HSM,
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
                                {AllCompanies}
                              </CSelect>
                            </CCol>
                          </CRow>
                        </CCol>
                        <CCol md="2">
                          <CButton
                            size="sm"
                            color="primary"
                            onClick={ToExcel}
                            style={{ float: "right" }}
                          >
                            Export To Excel
                          </CButton>
                        </CCol>
                        <CCol md="2">
                          <CButton
                            size="sm"
                            id="AddEmp"
                            style={{ marginTop: "0px" }}
                            onClick={() => {
                              history.push("/Products");
                            }}
                          >
                            Add Product
                          </CButton>
                        </CCol>
                      </CRow>
                    </CCardHeader>
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
                          Packages: (item) => (
                            <td>
                              <CRow>
                                <CCol md="10">
                                  <CButton
                                    color="primary"
                                    size="sm"
                                    onClick={() =>
                                      history.push("/AddProductPackageSize", {
                                        data: item,
                                      })
                                    }
                                  >
                                    Manage
                                  </CButton>
                                </CCol>
                              </CRow>
                            </td>
                          ),
                          "Product Image": (i) => {
                            let profile = "";
                            if (
                              i.PRODUCT_IMAGE === "" ||
                              i.PRODUCT_IMAGE === null
                            ) {
                              profile = "NoImage.png";
                            } else {
                              profile = i.PRODUCT_IMAGE;
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
                                      className="mb-3"
                                      style={{ width: "30%" }}
                                    />
                                  </CLink>
                                </td>
                              </React.Fragment>
                            );
                          },
                          Catalogue: (i) => (
                            <React.Fragment>
                              <td>
                                <CLink
                                  href={ViewImg + "/" + i.PRODUCT_CATALOGUE}
                                  target="_blank"
                                >
                                  <CButton
                                    color="primary"
                                    size="sm"
                                    id="AddEmp"
                                  >
                                    View
                                  </CButton>
                                </CLink>
                              </td>
                            </React.Fragment>
                          ),
                          Action: (item) => (
                            <td>
                              <CButton
                                onClick={() =>
                                  history.push("/EditProduct", {
                                    data: item,
                                  })
                                }
                                size="sm"
                                id="war-btn"
                              >
                                <EditIcon />
                              </CButton>
                              <CButton
                                onClick={() => {
                                  DeleteProduct(item.PRODUCT_PKID);
                                }}
                                size="sm"
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
        </CCol>
      </CRow>
    </div>
  );
};

export default ViewProducts;
