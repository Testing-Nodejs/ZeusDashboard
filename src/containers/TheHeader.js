import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CHeader, CToggler, CHeaderBrand, CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";

const TheHeader = () => {
  const [count, setcount] = useState();
  const [Time, setTime] = useState();
  const [CDate, setCDate] = useState();

  const GetDates = () => {
    var showdate = new Date();
    const mon = (showdate.getMonth() + 1).toString().padStart(2, "0");
    setCDate(
      showdate.getDate().toString().padStart(2, "0") +
        "/" +
        mon +
        "/" +
        showdate.getUTCFullYear()
    );
    setTime(showdate.toLocaleTimeString());
  };

  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  React.useEffect(() => {
    GetDates();
  });

  return (
    <CHeader withSubheader>
      <CRow style={{ marginTop: "1%" }}>
        <CCol md="1">
          <CToggler
            inHeader
            className="ml-md-3 d-lg-none"
            onClick={toggleSidebarMobile}
          />
          <CToggler
            inHeader
            className="ml-3 d-md-down-none"
            onClick={toggleSidebar}
          />
          <CHeaderBrand className="mx-auto d-lg-none" to="/">
            {/* <CIcon name="logo" height="100" alt="Logo" /> */}
          </CHeaderBrand>
        </CCol>
        <CCol md="9">
          <h5 className="MainHeader">ZEUS CONTENT MANAGEMENT SYSTEM</h5>
        </CCol>
        <CCol md="2">
          <p id="TimeAndDate">
            Date:&nbsp;&nbsp;{CDate}
            {/* Time:{time} */}
          </p>
          <p
            id="TimeAndDate"
            style={{
              lineHeight: "13px",
            }}
          >
            Time:&nbsp;&nbsp;{Time}
          </p>
        </CCol>
      </CRow>
    </CHeader>
  );
};

export default TheHeader;
