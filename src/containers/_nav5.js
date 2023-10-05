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
    to: "/CustomerDashboard",
    icon: <NavigateNextIcon />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "My Profile",
    to: "/CustomerProfile",
    icon: <NavigateNextIcon2 />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Products",
    to: "/CustomerViewProducts",
    icon: <NavigateNextIcon2 />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Place Order",
    to: "/CustomerPlaceOrder",
    icon: <NavigateNextIcon2 />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "All Orders",
    to: "/ViewCustomerOrders",
    icon: <NavigateNextIcon2 />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Logout",
    to: "/CustomerLogin",
    icon: <NavigateNextIcon2 />,
  },
];

export default _nav;
