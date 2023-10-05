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
    to: "/Distributor_Dashboard",
    icon: <NavigateNextIcon />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "My Profile",
    to: "/Distributor_Profile",
    icon: <NavigateNextIcon2 />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Products",
    to: "/Distributor_ViewProducts",
    icon: <NavigateNextIcon2 />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Place Order",
    to: "/Distributor_PlaceOrder",
    icon: <NavigateNextIcon2 />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "All Orders",
    to: "/Distributor_MyOrders",
    icon: <NavigateNextIcon2 />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Logout",
    to: "/DistributerLogin",
    icon: <NavigateNextIcon2 />,
  },
];

export default _nav;
