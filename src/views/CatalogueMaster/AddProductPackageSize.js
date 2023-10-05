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
  CSelect,
} from "@coreui/react";

import { MyApiUrl } from "src/services/service";
import EditIcon from "@material-ui/icons/Edit";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import "../../style.css";
const table = { placeholder: "Search here...", label: "Search:  " };
const items = { label: "Rows:", values: [5, 10, 25, 50, 75, 100] };
const fields = [
  { key: "Action" },
  { key: "UoM" },
  { key: "Wholesale Price" },
  { key: "Dealer Price" },
  { key: "Product MRP" },
  { key: "Unit" },
];

const AddProductPackageSize = (props) => {
  const ProdID = props.location.state.data.PRODUCT_PKID;
  const [ProductPackages, setProductPackages] = useState({
    PRD_PACKAGE_WHOLESALE_PRICE: "",
    PRD_PACKAGE_DEALER_PRICE: "",
    PRD_PACKAGE_MRP: "",
    PRD_PACKAGE_UNIT: "",
    PRD_PACKAGE_UOM_FKID: "-1",
    pkid: "",
    ResponseData: [],
    AddButton: true,
    UpdateButton: false,
  });

  const [ProductUoM, setProductUoM] = useState([]);

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

  const AddProductPackage = () => {
    if (
      ProductPackages.PRD_PACKAGE_UOM_FKID === "-1" ||
      ProductPackages.PRD_PACKAGE_UOM_FKID === null ||
      ProductPackages.PRD_PACKAGE_UOM_FKID === ""
    ) {
      Toast.fire({
        icon: "warning",
        title: "Please Select Package UoM",
      });
    } else if (
      ProductPackages.PRD_PACKAGE_WHOLESALE_PRICE === "-1" ||
      ProductPackages.PRD_PACKAGE_WHOLESALE_PRICE === null ||
      ProductPackages.PRD_PACKAGE_WHOLESALE_PRICE === ""
    ) {
      Toast.fire({
        icon: "warning",
        title: "Enter Wholesale Price",
      });
    } else if (
      ProductPackages.PRD_PACKAGE_DEALER_PRICE === "" ||
      ProductPackages.PRD_PACKAGE_DEALER_PRICE === null
    ) {
      Toast.fire({
        icon: "warning",
        title: "Enter Dealer Price",
      });
    } else if (
      ProductPackages.PRD_PACKAGE_MRP === "" ||
      ProductPackages.PRD_PACKAGE_MRP === null
    ) {
      Toast.fire({
        icon: "warning",
        title: "Enter Product MRP",
      });
    } else if (
      ProductPackages.PRD_PACKAGE_UNIT === "" ||
      ProductPackages.PRD_PACKAGE_UNIT === null
    ) {
      Toast.fire({
        icon: "warning",
        title: "Enter Product Unit",
      });
    } else {
      document.getElementById("divLoading").className = "show";
      const obj = {
        PRD_PACKAGE_DEALER_PRICE: ProductPackages.PRD_PACKAGE_DEALER_PRICE,
        PRD_PACKAGE_MRP: ProductPackages.PRD_PACKAGE_MRP,
        PRD_PACKAGE_UNIT: ProductPackages.PRD_PACKAGE_UNIT,
        PRD_PACKAGE_UOM_FKID: ProductPackages.PRD_PACKAGE_UOM_FKID,
        PRD_PACKAGE_WHOLESALE_PRICE:
          ProductPackages.PRD_PACKAGE_WHOLESALE_PRICE,
        PRD_PACKAGE_PRODUCT_FKID: ProdID,
      };

      axios.post(MyApiUrl + "ProductPackages", obj).then((response) => {
        if (response.data === true) {
          Swal.fire({
            title: "Product Package Added Successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
          fetchData();
          setProductPackages({
            ...ProductPackages,
            PRD_PACKAGE_WHOLESALE_PRICE: "-1",
            PRD_PACKAGE_DEALER_PRICE: "",
            PRD_PACKAGE_MRP: "",
            PRD_PACKAGE_UNIT: "",
            AddButton: true,
            UpdateButton: false,
          });
          document.getElementById("divLoading").className = "hide";
        } else if (response.data == false) {
          Swal.fire({
            title: "Failed To Add!",
            icon: "error",
            confirmButtonText: "OK",
          });
          document.getElementById("divLoading").className = "hide";
        }
      });
    }
  };

  const UpdateProductPackage = () => {
    if (
      ProductPackages.PRD_PACKAGE_UNIT === "-1" ||
      ProductPackages.PRD_PACKAGE_UNIT === null ||
      ProductPackages.PRD_PACKAGE_UNIT === ""
    ) {
      Toast.fire({
        icon: "warning",
        title: "Please Select Package UoM",
      });
    } else if (
      ProductPackages.PRD_PACKAGE_WHOLESALE_PRICE === "-1" ||
      ProductPackages.PRD_PACKAGE_WHOLESALE_PRICE === null ||
      ProductPackages.PRD_PACKAGE_WHOLESALE_PRICE === ""
    ) {
      Toast.fire({
        icon: "warning",
        title: "Enter Wholesale Price",
      });
    } else if (
      ProductPackages.PRD_PACKAGE_DEALER_PRICE === "" ||
      ProductPackages.PRD_PACKAGE_DEALER_PRICE === null
    ) {
      Toast.fire({
        icon: "warning",
        title: "Enter Dealer Price",
      });
    } else if (
      ProductPackages.PRD_PACKAGE_MRP === "" ||
      ProductPackages.PRD_PACKAGE_MRP === null
    ) {
      Toast.fire({
        icon: "warning",
        title: "Enter Product MRP",
      });
    } else if (
      ProductPackages.PRD_PACKAGE_UNIT === "" ||
      ProductPackages.PRD_PACKAGE_UNIT === null
    ) {
      Toast.fire({
        icon: "warning",
        title: "Enter Product Unit",
      });
    } else {
      document.getElementById("divLoading").className = "show";
      const obj = {
        PRD_PACKAGE_DEALER_PRICE: ProductPackages.PRD_PACKAGE_DEALER_PRICE,
        PRD_PACKAGE_MRP: ProductPackages.PRD_PACKAGE_MRP,
        PRD_PACKAGE_UNIT: ProductPackages.PRD_PACKAGE_UNIT,
        PRD_PACKAGE_UOM_FKID: ProductPackages.PRD_PACKAGE_UOM_FKID,
        PRD_PACKAGE_WHOLESALE_PRICE:
          ProductPackages.PRD_PACKAGE_WHOLESALE_PRICE,
        PRD_PACKAGE_PRODUCT_FKID: ProdID,
      };

      axios
        .put(MyApiUrl + "ProductPackages/" + ProductPackages.pkid, obj)
        .then((response) => {
          if (response.data === true) {
            Swal.fire({
              title: "Product Package Updated Successfully!",
              icon: "success",
              confirmButtonText: "OK",
            });
            fetchData();
            setProductPackages({
              ...ProductPackages,
              PRD_PACKAGE_WHOLESALE_PRICE: "-1",
              PRD_PACKAGE_DEALER_PRICE: "",
              PRD_PACKAGE_MRP: "",
              PRD_PACKAGE_UNIT: "",
              pkid: "",
              AddButton: true,
              UpdateButton: false,
            });
            document.getElementById("divLoading").className = "hide";
          } else if (response.data == false) {
            Swal.fire({
              title: "Failed To Update!",
              icon: "error",
              confirmButtonText: "OK",
            });
            document.getElementById("divLoading").className = "hide";
          }
        });
    }
  };

  const EditProductPackage = (
    id,
    PRD_PACKAGE_WHOLESALE_PRICE,
    PRD_PACKAGE_DEALER_PRICE,
    PRD_PACKAGE_MRP,
    PRD_PACKAGE_UNIT,
    UoM
  ) => {
    setProductPackages({
      ...ProductPackages,
      PRD_PACKAGE_WHOLESALE_PRICE: PRD_PACKAGE_WHOLESALE_PRICE,
      PRD_PACKAGE_DEALER_PRICE: PRD_PACKAGE_DEALER_PRICE,
      PRD_PACKAGE_MRP: PRD_PACKAGE_MRP,
      PRD_PACKAGE_UNIT: PRD_PACKAGE_UNIT,
      PRD_PACKAGE_UOM_FKID: UoM,
      pkid: id,
      AddButton: false,
      UpdateButton: true,
    });
  };

  const DeleteProductPackage = (id) => {
    // eslint-disable-next-line no-restricted-globals
    var res = confirm("Are you sure you want to delete");
    if (res) {
      document.getElementById("divLoading").className = "show";
      axios({
        method: "DELETE",
        url: MyApiUrl + "ProductPackages/" + id + "",
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
              title: "Product Package Deleted!",
              icon: "success",
              confirmButtonText: "OK",
            });

            fetchData();
            document.getElementById("divLoading").className = "hide";
          } else {
            Swal.fire({
              title: "Product Package Failed To Deleted!",
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

  const GetAllUoM = () => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "uom",
      headers: {
        "content-type": "application/json",
      },
      params: {
        language_code: "en",
      },
    })
      .then((response) => {
        const Option = response.data.map((item, i) => (
          <option key={i} value={item.UNIT_OF_MEASUREMENT_PKID}>
            {item.UNIT_OF_MEASUREMENT_SHORT_KEY}
          </option>
        ));
        setProductUoM(Option);
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchData = React.useCallback(() => {
    document.getElementById("divLoading").className = "show";
    axios({
      method: "GET",
      url: MyApiUrl + "ProductPackages/" + ProdID,
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
            "Wholesale Price": item.PRD_PACKAGE_WHOLESALE_PRICE,
            "Dealer Price": item.PRD_PACKAGE_DEALER_PRICE,
            "Product MRP": item.PRD_PACKAGE_MRP,
            Unit: item.PRD_PACKAGE_UNIT,
            UoM: item.UNIT_OF_MEASUREMENT_SHORT_KEY,
          };
        });
        setProductPackages({
          ...ProductPackages,
          ResponseData: items,
        });
        GetAllUoM();
        document.getElementById("divLoading").className = "hide";
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const Updatebtn = () => (
    <CButton
      type="button"
      onClick={UpdateProductPackage}
      size="md"
      id="Add-btn"
    >
      Update
    </CButton>
  );

  const Addbtn = () => (
    <CButton type="button" onClick={AddProductPackage} size="md" id="Add-btn">
      Add
    </CButton>
  );

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div id="divLoading"> </div>
      <h1 id="ccmaster">Product Package</h1>
      <CRow style={{ marginTop: "3%" }}>
        <CCol xs="12" sm="12" md="4" lg="4" xl="4" className="mb-3 mb-xl-0">
          <div id="country-master">
            <CCard style={{ boxShadow: "0px 0px 1px 1px #959595" }}>
              <CCardBody>
                <CRow>
                  <CCol>
                    <CCard>
                      <CCardHeader>Add Product Package</CCardHeader>
                      <CCardBody>
                        <CForm
                          action=""
                          method="post"
                          encType="multipart/form-data"
                          className="form-horizontal"
                        >
                          <CFormGroup row>
                            <CCol xs="12" md="12">
                              <CLabel
                                htmlFor="exampleInputName2"
                                className="pr-1"
                              >
                                Product UoM
                              </CLabel>
                              <CSelect
                                custom
                                name="Species"
                                id="Species"
                                value={ProductPackages.PRD_PACKAGE_UOM_FKID}
                                onChange={(event) => {
                                  setProductPackages({
                                    ...ProductPackages,
                                    PRD_PACKAGE_UOM_FKID: event.target.value,
                                  });
                                }}
                              >
                                <option value="-1">Select UoM</option>
                                {ProductUoM}
                              </CSelect>
                            </CCol>
                            <CCol xs="12" md="12">
                              <CLabel
                                htmlFor="exampleInputName2"
                                className="pr-1"
                              >
                                Packaging Size
                              </CLabel>
                              <CInput
                                type="text"
                                id="Unit"
                                placeholder="Product Packaging Size"
                                required
                                value={ProductPackages.PRD_PACKAGE_UNIT}
                                onChange={(event) => {
                                  setProductPackages({
                                    ...ProductPackages,
                                    PRD_PACKAGE_UNIT: event.target.value,
                                  });
                                }}
                              />
                            </CCol>
                            <CCol xs="12" md="12">
                              <CLabel
                                htmlFor="exampleInputName2"
                                className="pr-1"
                              >
                                Wholesale Price
                              </CLabel>
                              <CInput
                                type="text"
                                id="WholesalePrice"
                                placeholder="Wholesale Price"
                                required
                                value={
                                  ProductPackages.PRD_PACKAGE_WHOLESALE_PRICE
                                }
                                onChange={(event) => {
                                  setProductPackages({
                                    ...ProductPackages,
                                    PRD_PACKAGE_WHOLESALE_PRICE:
                                      event.target.value,
                                  });
                                }}
                              />
                            </CCol>
                            <CCol xs="12" md="12">
                              <CLabel
                                htmlFor="exampleInputName2"
                                className="pr-1"
                              >
                                Dealer Price
                              </CLabel>
                              <CInput
                                type="text"
                                id="DealerPrice"
                                placeholder="Dealer Price"
                                required
                                value={ProductPackages.PRD_PACKAGE_DEALER_PRICE}
                                onChange={(event) => {
                                  setProductPackages({
                                    ...ProductPackages,
                                    PRD_PACKAGE_DEALER_PRICE:
                                      event.target.value,
                                  });
                                }}
                              />
                            </CCol>
                            <CCol xs="12" md="12">
                              <CLabel
                                htmlFor="exampleInputName2"
                                className="pr-1"
                              >
                                MRP
                              </CLabel>
                              <CInput
                                type="text"
                                id="MRP"
                                placeholder="Product MRP"
                                required
                                value={ProductPackages.PRD_PACKAGE_MRP}
                                onChange={(event) => {
                                  setProductPackages({
                                    ...ProductPackages,
                                    PRD_PACKAGE_MRP: event.target.value,
                                  });
                                }}
                              />
                            </CCol>
                          </CFormGroup>

                          {ProductPackages.UpdateButton && <Updatebtn />}
                          {ProductPackages.AddButton && <Addbtn />}
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
                      <CCardHeader>Added Product Packages</CCardHeader>
                      <CCardBody>
                        <CDataTable
                          items={ProductPackages.ResponseData}
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
                                    EditProductPackage(
                                      item.PRD_PACKAG_PKID,
                                      item.PRD_PACKAGE_WHOLESALE_PRICE,
                                      item.PRD_PACKAGE_DEALER_PRICE,
                                      item.PRD_PACKAGE_MRP,
                                      item.PRD_PACKAGE_UNIT,
                                      item.PRD_PACKAGE_UOM_FKID
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
                                    DeleteProductPackage(item.PRD_PACKAG_PKID);
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

export default AddProductPackageSize;
