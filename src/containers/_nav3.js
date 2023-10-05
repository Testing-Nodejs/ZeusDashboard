/**
 * @author KIMOSABE
 * @email Kimosabe@mail.com
 * @create date 2021-11-26 10:09:14
 * @modify date 2021-12-07 19:13:21
 * @desc [description]
 */
import React from "react";
import NavigateNextIcon from "@material-ui/icons/FormatAlignJustify";
// import NavigateNextIcon2 from "@material-ui/icons/Minimize";
import NavigateNextIcon2 from "@material-ui/icons/NavigateNext";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/SchedlingAdminDashboard",
    icon: <NavigateNextIcon />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Scheduling Orders",
    to: "/AllScheduledOrders",
    icon: <NavigateNextIcon2 />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Tentative Orders",
    to: "/TentativeOrders",
    icon: <NavigateNextIcon2 />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Ready For Invoicing",
    to: "/BatchNoConfirmedOrders",
    icon: <NavigateNextIcon2 />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Ready To Dispatch",
    to: "/InvoiceConfirmedOrders",
    icon: <NavigateNextIcon2 />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Dispatched Orders",
    to: "/InvoiceUploadedOrders",
    icon: <NavigateNextIcon2 />,
  }, 
  {
    _tag: "CSidebarNavItem",
    name: "Consignment Status",
    to: "/DeliveryConfirmOrders",
    icon: <NavigateNextIcon2 />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Logout",
    to: "/ScheduleLogin",
    icon: <NavigateNextIcon2 />,
  },
];

export default _nav;
