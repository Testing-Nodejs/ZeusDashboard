/**
 * @author KIMOSABE
 * @email Kimosabe@mail.com
 * @create date 2021-11-26 10:09:14
 * @modify date 2021-12-07 19:13:21
 * @desc [description]
 */
import React from "react";
import CIcon from "@coreui/icons-react";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const _nav = [{
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: < CIcon name="cil-speedometer"
        customClasses="c-sidebar-nav-icon" />,
},
{
    _tag: "CSidebarNavItem",
    name: "Manage Admin",
    to: "/ManageAdmin",
    icon: < NavigateNextIcon />
},
{
    _tag: "CSidebarNavDropdown",
    name: "Location Master",
    route: "/master",
    icon: "cil-cursor",
    _children: [{
        _tag: "CSidebarNavItem",
        name: "Country Master",
        to: "/CountryMaster",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "State Master",
        to: "/StateMaster",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "District Master",
        to: "/DistrictMaster",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "City / Taluk Master",
        to: "/CityMaster",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "Village Master",
        to: "/VillageMaster",
        icon: < NavigateNextIcon />,
    },
    ],
},
{
    _tag: "CSidebarNavDropdown",
    name: "Company Master",
    route: "/master",
    icon: "cil-cursor",
    _children: [{
        _tag: "CSidebarNavItem",
        name: "Head Office",
        to: "/HQ",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "Company Master",
        to: "/Company",
        icon: < NavigateNextIcon />,
    },
    ],
},
{
    _tag: "CSidebarNavDropdown",
    name: "Product Master",
    route: "",
    icon: "cil-cursor",
    _children: [{
        _tag: "CSidebarNavItem",
        name: "Speices",
        to: "/ProductSpeices",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "UOM",
        to: "/UOM",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "View Products",
        to: "/ViewProducts",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "Import Product",
        to: "/ImportFromExcel",
        icon: < NavigateNextIcon />,
    },
    ],
},
{
    _tag: "CSidebarNavDropdown",
    name: "Employee Master",
    route: "",
    icon: "cil-cursor",
    _children: [{
        _tag: "CSidebarNavItem",
        name: "Employee Type",
        to: "/EmployeeType",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "Employee Sub-Type",
        to: "/EmployeeSubType",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "View Employees",
        to: "/ViewEmployees",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "Headquarter",
        to: "/Headquarters",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "Import From Excel",
        to: "/ImportEmployees",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "Target Master",
        to: "/EmployeeTarget",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "Expenses Request",
        to: "/EmployeeExpenses",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "Forgot Password Request",
        to: "/EmployeeForgotPassword",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "Employee Separation",
        to: "/EmployeeSeparation",
        icon: < NavigateNextIcon />,
    },
    ],
},
{
    _tag: "CSidebarNavDropdown",
    name: "Customer Master",
    route: "",
    icon: "cil-cursor",
    _children: [{
        _tag: "CSidebarNavItem",
        name: "Customer Category",
        to: "/CustomerCategory",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "Customer Type",
        to: "/CustomerType",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "Customer Sub Type",
        to: "/CustomerSubType",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "Customer Capacity & Unit",
        to: "/UnitMaster",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "View Customers",
        to: "/ViewCustomers",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "Import From Excel",
        to: "/ImportCustomers",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "New Customer Request",
        to: "/ViewCustomersRequest",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "Denied Customers",
        to: "/ViewRejectedCustomer",
        icon: < NavigateNextIcon />,
    },

    ],
},
{
    _tag: "CSidebarNavDropdown",
    name: "Order Management",
    route: "",
    icon: "cil-cursor",
    _children: [{
        _tag: "CSidebarNavItem",
        name: "Order Type",
        to: "/OrderTypeNew",
        icon: < NavigateNextIcon />,
    }, {
        _tag: "CSidebarNavItem",
        name: "Supply Type",
        to: "/OrderType",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "Place Order",
        to: "/PlaceNewOrder",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "Replacement Order",
        to: "/OrderReplace",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "Admin Orders",
        to: "/MyOrders",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "New / Pending Orders",
        to: "/NewOrders",
        icon: < NavigateNextIcon />,
    },

    {
        _tag: "CSidebarNavItem",
        name: "Approved Orders",
        to: "/ApprovedOrders",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "Scheduling Orders",
        to: "/SchedulingOrders",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "Tentative Orders",
        to: "/TentativeOrders_a",
        icon: < NavigateNextIcon />,
    },

    {
        _tag: "CSidebarNavItem",
        name: "Ready For Invoicing",
        to: "/BatchNoConfirmed_a",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "Ready To Dispatch",
        to: "/InvoiceConfirmed_a",
        icon: < NavigateNextIcon />,
    },

    {
        _tag: "CSidebarNavItem",
        name: "Dispatched Orders",
        to: "/InvoiceUploaded_a",
        icon: < NavigateNextIcon />,
    },

    {
        _tag: "CSidebarNavItem",
        name: "Consignment Status",
        to: "/DeliveryConfirmation_a",
        icon: < NavigateNextIcon />,
    },

    {
        _tag: "CSidebarNavItem",
        name: "Denied Orders",
        to: "/RejectedOrders",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "Modified Orders",
        to: "/ModifiedOrders",
        icon: < NavigateNextIcon />,
    },
    ],
},
{
    _tag: "CSidebarNavDropdown",
    name: "Leave Management",
    route: "",
    icon: "cil-cursor",
    _children: [{
        _tag: "CSidebarNavItem",
        name: "Pending Requests",
        to: "/LeaveRequest",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "All Leave Request",
        to: "/ViewAllLeaves",
        icon: < NavigateNextIcon />,
    },
    ],
},


{
    _tag: "CSidebarNavDropdown",
    name: "Reports",
    route: "",
    icon: "cil-cursor",
    _children: [{
        _tag: "CSidebarNavItem",
        name: "Employee Expenses",
        to: "/EmpExpenses",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "Tour Plan",
        to: "/EmployeePlan",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "Employee Graph",
        to: "/SalesVSTarget",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "Employee Attendence",
        to: "/EmployeeAttendance",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "Employee Leaves",
        to: "/Reports_EmpLeaves",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "All Orders",
        to: "/AllOrders",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "Product Sales",
        to: "/ProductWiseSales",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "Area Wise Sales",
        to: "/AreaWiseSalesReports",
        icon: < NavigateNextIcon />,
    },
    {
        _tag: "CSidebarNavItem",
        name: "Current Day Report",
        to: "/CurrentDayReport",
        icon: < NavigateNextIcon />,
    },
    ],
},

{
    _tag: "CSidebarNavItem",
    name: "Logout",
    to: "/",
    icon: (<
        CIcon name="cil-cloud-download"
        customClasses="c-sidebar-nav-icon" />
    ),
},
];

export default _nav;