import React from "react";
import { CWidgetDropdown, CRow, CCol, CButton } from "@coreui/react";
import { Link } from "react-router-dom";

const WidgetsDropdown = () => {
  // render
  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header="45"
          text="Total Current Orders"
          footerSlot={
            <CButton size="sm" id="dashb-btn1">
              <Link id="dashb-link" to="/BalanceWithCompany">
                View Details
              </Link>
            </CButton>
          }
        />
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header="400"
          text="Total Sales"
          footerSlot={
            <CButton size="sm" id="dashb-btn">
              <Link id="dashb-link" to="/AmountToRiders">
                View Details
              </Link>
            </CButton>
          }
        />
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header="1000"
          text="Total Orders"
          footerSlot={
            <CButton size="sm" id="dashb-btn">
              <Link id="dashb-link" to="/AmountToVendors">
                View Details
              </Link>
            </CButton>
          }
        />
      </CCol>
    </CRow>
  );
};

export default WidgetsDropdown;
