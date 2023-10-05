/**
 * @author KIMOSABE
 * @email Kimosabe@mail.com
 * @create date 2021-11-25 16:54:16
 * @modify date 2021-12-06 15:17:06
 * @desc [description]
 */

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CSelect,
  CLink,
} from "@coreui/react";
import "../../../src/style.css";
import { MyApiUrl } from "src/services/service";
import "../../style.css";

const Products = () => {
  const history = useHistory();
  const [CompanyData, setCompanyData] = useState([]);
  const [ProductSpecies, setProductSpecies] = useState([]);
  const [ProductsFeilds, setProductsFeilds] = useState({
    Company: "-1",
    Species: "-1",
    Name: "",
    Code: "",
    BarCode: "",
    HSMCode: "",
    ProductImage: "",
    Catalogue: "",
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
        GetAllSpecies();
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetAllSpecies = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "prodspecies",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        const Option = response.data.map((item, i) => (
          <option key={i} value={item.PRODUCT_SPECIES_PKID}>
            {item.PRODUCT_SPECIES_NAME}
          </option>
        ));
        setProductSpecies(Option);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const AddProduct = () => {
    if (ProductsFeilds.Name === "" || ProductsFeilds.Name === null) {
      Toast.fire({
        icon: "warning",
        title: "Please Enter Product Name",
      });
    } else if (
      ProductsFeilds.Species === "-1" ||
      ProductsFeilds.Species === ""
    ) {
      Toast.fire({
        icon: "warning",
        title: "Please Select Product Species",
      });
    } else if (ProductsFeilds.Company === "-1" || ProductsFeilds.Company === "") {
      Toast.fire({
        icon: "warning",
        title: "Please Select Company",
      });
    } else {
      document.getElementById("divLoading").className = "show";
      var obj = {
        PRODUCT_COMPANY_FKID: ProductsFeilds.Company,
        PRODUCT_SPECIES_FKID: ProductsFeilds.Species,
        PRODUCT_NAME: ProductsFeilds.Name,
        PRODUCT_CODE: ProductsFeilds.Code,
        PRODUCT_BAR_CODE: ProductsFeilds.BarCode,
        PRODUCT_HSM: ProductsFeilds.HSMCode,
        PRODUCT_IMAGE: ProductsFeilds.ProductImage,
        PRODUCT_CATALOGUE: ProductsFeilds.Catalogue,
      };
      axios.post(MyApiUrl + "prod/", obj).then((response) => {
        console.log(response);
        if (response.data === true) {
          Swal.fire({
            title: "Product Added!",
            icon: "success",
            confirmButtonText: "OK",
          });
          document.getElementById("divLoading").className = "hide";
          history.push("/ViewProducts");
        }
        else if (response.data === false) {
          Swal.fire({
            title: "Product Already Exist!",
            icon: "error",
            confirmButtonText: "OK",
          });
          document.getElementById("divLoading").className = "hide";
        } else {
          Swal.fire({
            title: "Already Existed!",
            icon: "error",
            confirmButtonText: "OK",
          });
          document.getElementById("divLoading").className = "hide";
        }
      });
    }
  };

  React.useEffect(() => {
    GetAllCompanies();
  }, []);

  return (
    <div>
      <div id="divLoading"> </div>
      <h1 id="ccmaster">ADD Products</h1>
      <CRow style={{ marginTop: "3%" }}>
        <CCol md="12">
          <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
            <CCardBody>
              <CRow>
                <CCol md="1">
                  <div>
                    <CLink to="/ViewProducts">
                      <CButton size="sm" id="AddEmp">
                        Back
                      </CButton>
                    </CLink>
                    <br />
                  </div>
                </CCol>
              </CRow>
              <CRow id="firstrow">
                <CCol>
                  <CCard>
                    <CCardHeader>Add Product</CCardHeader>
                    <CCardBody>
                      <CForm
                        method="post"
                        encType="multipart/form-data"
                        className="form-horizontal"
                      >
                        <CFormGroup className="pr-1">
                          <div>
                            <p>
                              <b>Product Information</b>
                            </p>
                            <CRow id="firstrow">
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Product Name
                                </CLabel>
                                <CInput
                                  type="text"
                                  id="Name"
                                  placeholder="Product Name"
                                  required
                                  value={ProductsFeilds.Name}
                                  onChange={(event) => {
                                    setProductsFeilds({
                                      ...ProductsFeilds,
                                      Name: event.target.value,
                                    });
                                  }}
                                />
                              </CCol>
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Select Product Species
                                </CLabel>
                                <CSelect
                                  custom
                                  name="Species"
                                  id="Species"
                                  value={ProductsFeilds.Species}
                                  onChange={(event) => {
                                    setProductsFeilds({
                                      ...ProductsFeilds,
                                      Species: event.target.value,
                                    });
                                  }}
                                >
                                  <option value="-1">Select Species</option>
                                  {ProductSpecies}
                                </CSelect>
                              </CCol>
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Select Company
                                </CLabel>
                                <CSelect
                                  custom
                                  name="Company"
                                  id="Company"
                                  value={ProductsFeilds.Company}
                                  onChange={(event) => {
                                    setProductsFeilds({
                                      ...ProductsFeilds,
                                      Company: event.target.value,
                                    });
                                  }}
                                >
                                  <option value="-1">Select Company</option>
                                  {CompanyData}
                                </CSelect>
                              </CCol>


                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Product Code
                                </CLabel>
                                <CInput
                                  type="text"
                                  id="Code"
                                  placeholder="Product Code"
                                  required
                                  value={ProductsFeilds.Code}
                                  onChange={(event) => {
                                    setProductsFeilds({
                                      ...ProductsFeilds,
                                      Code: event.target.value,
                                    });
                                  }}
                                />
                              </CCol>
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Bar Code
                                </CLabel>
                                <CInput
                                  type="text"
                                  id="BarCode"
                                  placeholder="Product Bar Code"
                                  required
                                  value={ProductsFeilds.BarCode}
                                  onChange={(event) => {
                                    setProductsFeilds({
                                      ...ProductsFeilds,
                                      BarCode: event.target.value,
                                    });
                                  }}
                                />
                              </CCol>
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  HSN Code
                                </CLabel>
                                <CInput
                                  type="text"
                                  id="BSMCode"
                                  placeholder="Product HSN Code"
                                  required
                                  value={ProductsFeilds.HSMCode}
                                  onChange={(event) => {
                                    setProductsFeilds({
                                      ...ProductsFeilds,
                                      HSMCode: event.target.value,
                                    });
                                  }}
                                />
                              </CCol>

                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Product Image
                                </CLabel>
                                <CInput
                                  type="file"
                                  id="file"
                                  placeholder=" "
                                  onChange={(event) => {
                                    var formData = new FormData();
                                    formData.append(
                                      "file",
                                      event.target.files[0]
                                    );
                                    axios
                                      .post(MyApiUrl + "upload", formData)
                                      .then((response) => {
                                        setProductsFeilds({
                                          ...ProductsFeilds,
                                          ProductImage: response.data,
                                        });
                                      });
                                  }}
                                />
                              </CCol>
                              <CCol md="3">
                                <CLabel
                                  htmlFor="exampleInputName2"
                                  className="pr-1"
                                >
                                  Product Catalogue
                                </CLabel>
                                <CInput
                                  type="file"
                                  id="Catalogue"
                                  placeholder=" "
                                  onChange={(event) => {
                                    var formData = new FormData();
                                    formData.append(
                                      "file",
                                      event.target.files[0]
                                    );
                                    axios
                                      .post(MyApiUrl + "upload", formData)
                                      .then((response) => {
                                        setProductsFeilds({
                                          ...ProductsFeilds,
                                          Catalogue: response.data,
                                        });
                                      });
                                  }}
                                />
                              </CCol>
                            </CRow>
                          </div>

                          <CRow id="firstrow">
                            <CCol md="4">
                              <div id="inline-btn">
                                <CButton
                                  type="button"
                                  onClick={AddProduct}
                                  size="md"
                                  id="Add-btn"
                                >
                                  Add
                                </CButton>
                              </div>
                            </CCol>
                          </CRow>
                        </CFormGroup>
                      </CForm>
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

export default Products;
