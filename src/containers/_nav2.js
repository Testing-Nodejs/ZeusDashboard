/**
 * @author KIMOSABE
 * @email Kimosabe@mail.com
 * @create date 2021-11-26 10:09:14
 * @modify date 2021-12-07 19:13:21
 * @desc [description]
 */
import React from "react";
import NavigateNextIcon from "@material-ui/icons/FormatAlignJustify";
import NavigateNextIcon2 from "@material-ui/icons/Minimize";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/ProcessApprovedTeamDashboard",
    icon: <NavigateNextIcon />, 
  },
  {
    _tag: "CSidebarNavItem",
    name: "Admin Approved Orders",
    to: "/AdminApprovedOrders",
    icon: <NavigateNextIcon2 />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Scheduling Orders",
    to: "/ScheduledOrder",
    icon: <NavigateNextIcon2 />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Ready For Invoicing",
    to: "/BatchNoConfirmedOrders_p",
    icon: <NavigateNextIcon2 />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Ready To Dispatch",
    to: "/InvoiceConfirmedOrders_p",
    icon: <NavigateNextIcon2 />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Dispatched Orders",
    to: "/InvoiceUploadedOrders_p",
    icon: <NavigateNextIcon2 />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Consignment Status",
    to: "/DeliveryConfirmation_p",
    icon: <NavigateNextIcon2 />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Logout",
    to: "/ProcessApprovedLogin",
    icon: <NavigateNextIcon2 />,
  },
];

export default _nav;