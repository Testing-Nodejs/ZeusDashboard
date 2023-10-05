/**
 * @author KIMOSABE
 * @email Kimosabe@mail.com
 * @create date 2021-11-26 10:09:20
 * @modify date 2021-12-07 19:16:02
 * @desc [description]
 */
import React from "react";
const Charts = React.lazy(() =>
    import("./views/charts/Charts"));
const Dashboard = React.lazy(() =>
    import("./views/dashboard/Dashboard"));
const SalesVSTarget = React.lazy(() =>
    import("./views/dashboard/SalesVSTarget"));
const ExpensesVSSalesGraph = React.lazy(() =>
    import("./views/dashboard/ExpensesVSSalesGraph"));
const SalesVSTargetGraph = React.lazy(() =>
    import("./views/dashboard/SalesVSTargetGraph"));
const CompanySalesReport = React.lazy(() =>
    import("./views/dashboard/CompanySalesReport")
);
const SalesReport = React.lazy(() =>
    import("./views/dashboard/SalesReport"));
const TotalEmployeeByCompany = React.lazy(() =>
    import("./views/dashboard/TotalEmployeeByCompany")
);
const CustomerSalesReport = React.lazy(() =>
    import("./views/dashboard/CustomerSalesReport")
);
const SalesReportCustomerOrders = React.lazy(() =>
    import("./views/dashboard/SalesReportCustomerOrders")
);
const SalesReportByEmployee = React.lazy(() =>
    import("./views/dashboard/SalesReportByEmployee")
);
const SalesReportEmployeeOrders = React.lazy(() =>
    import("./views/dashboard/SalesReportEmployeeOrders")
);
const SalesReportByArea = React.lazy(() =>
    import("./views/dashboard/SalesReportByArea")
);
const TotalOrdersFromCompany = React.lazy(() =>
    import("./views/dashboard/TotalOrdersFromCompany")
);
const SalesReportByProduct = React.lazy(() =>
    import("./views/dashboard/SalesReportByProduct")
);
const SalesReportByProductUnits = React.lazy(() =>
    import("./views/dashboard/SalesReportByProductUnits")
);
const OrderItemByProductsUnit = React.lazy(() =>
    import("./views/dashboard/OrderItemByProductsUnit")
);
const CurrentYearOrders = React.lazy(() =>
    import("./views/dashboard/CurrentYearOrders")
);
const ViewEmployeeTourPlan = React.lazy(() =>
    import("./views/dashboard/ViewEmployeeTourPlan")
);
const OrderItemsByProducts = React.lazy(() =>
    import("./views/dashboard/OrderItemsByProducts")
);
const Widgets = React.lazy(() =>
    import("./views/widgets/Widgets"));

// Masters
const CountryMaster = React.lazy(() =>
    import("./views/masters/CountryMaster"));
const StateMaster = React.lazy(() =>
    import("./views/masters/StateMaster"));
const DistrictMaster = React.lazy(() =>
    import("./views/masters/DistrictMaster"));
const CityMaster = React.lazy(() =>
    import("./views/masters/CityMaster"));
const VillageMaster = React.lazy(() =>
    import("./views/masters/VillageMaster"));
const LocationMaster = React.lazy(() =>
    import("./views/masters/LocationMaster")
);
const ManageAdmin = React.lazy(() =>
    import("./views/masters/ManageAdmin")
);

// Company Master
const HQ = React.lazy(() =>
    import("./views/Company/HQ"));
const Company = React.lazy(() =>
    import("./views/Company/Company"));

// Employee Master
const Employee = React.lazy(() =>
    import("./views/EmployeeMaster/Employee"));
const EmployeeSubType = React.lazy(() =>
    import("./views/EmployeeMaster/EmployeeSubType")
);
const EmployeeType = React.lazy(() =>
    import("./views/EmployeeMaster/EmployeeType")
);
const ViewEmployees = React.lazy(() =>
    import("./views/EmployeeMaster/ViewEmployees")
);
const EmployeeSeparation = React.lazy(() =>
import("./views/EmployeeMaster/EmployeeSeparation")
);

const EditEmployee = React.lazy(() =>
    import("./views/EmployeeMaster/EditEmployee")
);

const Headquarters = React.lazy(() =>
    import("./views/EmployeeMaster/Headquarters")
);

const EmployeeTarget = React.lazy(() =>
    import("./views/EmployeeMaster/EmployeeTarget")
);
const ImportEmployees = React.lazy(() =>
    import("./views/EmployeeMaster/ImportEmployees")
);
const AddEmployeeIncentive = React.lazy(() =>
    import("./views/EmployeeMaster/AddEmployeeIncentive")
);

const EmployeeExpenses = React.lazy(() =>
    import("./views/EmployeeMaster/EmployeeExpenses")
);

const ExpensesDocuments = React.lazy(() =>
    import("./views/EmployeeMaster/ExpensesDocuments")
);

const EmployeeForgotPassword = React.lazy(() =>
    import("./views/EmployeeMaster/EmployeeForgotPassword")
);

// Leave Management

const LeaveRequest = React.lazy(() =>
    import("./views/LeaveManagement/LeaveRequest")
);
const ViewAllLeaves = React.lazy(() =>
    import("./views/LeaveManagement/ViewAllLeaves")
);

const EmployeeAllLeaves = React.lazy(() =>
    import("./views/LeaveManagement/EmployeeAllLeaves")
);

const demo = React.lazy(() =>
    import("./views/EmployeeMaster/demo"));

//CustomerMaster
const Customer = React.lazy(() =>
    import("./views/CustomerMaster/Customer"));
const CustomerCategory = React.lazy(() =>
    import("./views/CustomerMaster/CustomerCategory")
);
const CustomerSubType = React.lazy(() =>
    import("./views/CustomerMaster/CustomerSubType")
);
const CustomerType = React.lazy(() =>
    import("./views/CustomerMaster/CustomerType")
);
const UnitMaster = React.lazy(() =>
    import("./views/CustomerMaster/UnitMaster")
);
const ViewCustomers = React.lazy(() =>
    import("./views/CustomerMaster/ViewCustomers")
);
const EditCustomer = React.lazy(() =>
    import("./views/CustomerMaster/EditCustomer")
);
const AddCustomerAddress = React.lazy(() =>
    import("./views/CustomerMaster/AddCustomerAddress")
);

const DeleteRequest = React.lazy(() =>
    import("./views/CustomerMaster/DeleteRequest")
);

const ImportCustomers = React.lazy(() =>
    import("./views/CustomerMaster/ImportCustomers")
);

const ViewCustomersRequest = React.lazy(() =>
    import("./views/CustomerMaster/ViewCustomersRequest")
);

const ViewRejectedCustomer = React.lazy(() =>
    import("./views/CustomerMaster/ViewRejectedCustomer")
);

//OrderManagement
const OrderType = React.lazy(() =>
    import("./views/OrderManagement/OrderType"));

const OrderTypeNew = React.lazy(() =>
    import("./views/OrderManagement/OrderTypeNew"));

const PlaceNewOrder = React.lazy(() =>
    import("./views/OrderManagement/PlaceNewOrder")
);

const OrderReplace = React.lazy(() =>
    import("./views/OrderManagement/OrderReplace")
);

const PlaceOrderProductsSelect_Replace = React.lazy(() =>
    import("./views/OrderManagement/PlaceOrderProductsSelect_Replace")
);

const PlaceOrderProductsSelect = React.lazy(() =>
    import("./views/OrderManagement/PlaceOrderProductsSelect")
);

const MyOrders = React.lazy(() =>
    import("./views/OrderManagement/MyOrders"));

const NewOrders = React.lazy(() =>
    import("./views/OrderManagement/NewOrders"));

const ApprovedOrders = React.lazy(() =>
    import("./views/OrderManagement/ApprovedOrders")
);

const SchedulingOrders = React.lazy(() =>
    import("./views/OrderManagement/SchedulingOrders")
);

const TentativeOrders_a = React.lazy(() =>
    import("./views/OrderManagement/TentativeOrders_a")
);

const BatchNoConfirmed_a = React.lazy(() =>
    import("./views/OrderManagement/BatchNoConfirmed_a")
);

const InvoiceConfirmed_a = React.lazy(() =>
    import("./views/OrderManagement/InvoiceConfirmed_a")
);

const InvoiceUploaded_a = React.lazy(() =>
    import("./views/OrderManagement/InvoiceUploaded_a")
);

const DeliveryConfirmation_a = React.lazy(() =>
    import("./views/OrderManagement/DeliveryConfirmation_a")
);

const RejectedOrders = React.lazy(() =>
    import("./views/OrderManagement/RejectedOrders")
);

const EditOrder = React.lazy(() =>
    import("./views/OrderManagement/EditOrder"));

const OrderItems = React.lazy(() =>
    import("./views/OrderManagement/OrderItems")
);

const ModifiedOrders = React.lazy(() =>
    import("./views/OrderManagement/ModifiedOrders")
);

//Reports
const EmpExpenses = React.lazy(() =>
import("./views/Reports/EmpExpenses")
);
const EmployeeExpensesWithStatus = React.lazy(() =>
    import("./views/Reports/EmployeeExpensesWithStatus")
);
const EmployeePlan = React.lazy(() =>
    import("./views/Reports/EmployeePlan"));
const TourPlaces = React.lazy(() =>
    import("./views/Reports/TourPlaces"));
const CurrentDayReport = React.lazy(() =>
    import("./views/Reports/CurrentDayReport")
);
const EmployeeAttendance = React.lazy(() =>
    import("./views/Reports/EmployeeAttendance")
);
const ViewEmployeeAttendance = React.lazy(() =>
    import("./views/Reports/ViewEmployeeAttendance")
);
const GoogleMap = React.lazy(() =>
    import("./views/Reports/GoogleMap")
);
const TrackEmployee = React.lazy(() =>
import("./views/Reports/TrackEmployee")
);
const EmployeeOrders = React.lazy(() =>
    import("./views/Reports/EmployeeOrders")
);
const VisitedCustomers = React.lazy(() =>
    import("./views/Reports/VisitedCustomers")
);
const Reports_EmpLeaves = React.lazy(() =>
    import("./views/Reports/Reports_EmpLeaves")
);
const ProductWiseSales = React.lazy(() =>
    import("./views/Reports/ProductWiseSales")
);
const ProductSalesOrderItems = React.lazy(() =>
    import("./views/Reports/ProductSalesOrderItems")
);

const AreaWiseSalesReports = React.lazy(() =>
    import("./views/Reports/AreaWiseSalesReports")
);

const AllOrders = React.lazy(() =>
    import("./views/Reports/AllOrders"));

//CatalogueMaster
const Products = React.lazy(() =>
    import("./views/CatalogueMaster/Products"));
const AddProductPackageSize = React.lazy(() =>
    import("./views/CatalogueMaster/AddProductPackageSize")
);
const ProductCategory = React.lazy(() =>
    import("./views/CatalogueMaster/ProductCategory")
);
const ProductSpeices = React.lazy(() =>
    import("./views/CatalogueMaster/ProductSpeices")
);
const UOM = React.lazy(() =>
    import("./views/CatalogueMaster/UOM"));
const ViewProducts = React.lazy(() =>
    import("./views/CatalogueMaster/ViewProducts")
);
const EditProduct = React.lazy(() =>
    import("./views/CatalogueMaster/EditProduct")
);

const ImportFromExcel = React.lazy(() =>
    import("./views/CatalogueMaster/ImportFromExcel")
);

// Order Management Admin (Process)

const ProcessApprovedTeamDashboard = React.lazy(() =>
    import("./views/ProcessApprovedTeam/ProcessApprovedTeamDashboard")
);

const AdminApprovedOrders = React.lazy(() =>
    import("./views/ProcessApprovedTeam/AdminApprovedOrders")
);

const ScheduledOrder = React.lazy(() =>
    import("./views/ProcessApprovedTeam/ScheduledOrder")
);

const BatchNoConfirmedOrders_p = React.lazy(() =>
    import("./views/ProcessApprovedTeam/BatchNoConfirmedOrders_p")
);
const InvoiceConfirmedOrders_p = React.lazy(() =>
    import("./views/ProcessApprovedTeam/InvoiceConfirmedOrders_p")
);
const InvoiceUploadedOrders_p = React.lazy(() =>
    import("./views/ProcessApprovedTeam/InvoiceUploadedOrders_p")
);
const DeliveryConfirmation_p = React.lazy(() =>
    import("./views/ProcessApprovedTeam/DeliveryConfirmation_p")
);

// Order Management Admin (Scheduling)

const SchedlingAdminDashboard = React.lazy(() =>
    import("./views/OrderSchedulingTeam/SchedlingAdminDashboard")
);

const AllScheduledOrders = React.lazy(() =>
    import("./views/OrderSchedulingTeam/AllScheduledOrders")
);

const TentativeOrders = React.lazy(() =>
    import("./views/OrderSchedulingTeam/TentativeOrders")
);

const BatchNoConfirmedOrders = React.lazy(() =>
    import("./views/OrderSchedulingTeam/BatchNoConfirmedOrders")
);

const InvoiceConfirmedOrders = React.lazy(() =>
    import("./views/OrderSchedulingTeam/InvoiceConfirmedOrders")
);

const InvoiceUploadedOrders = React.lazy(() =>
    import("./views/OrderSchedulingTeam/InvoiceUploadedOrders")
);

const DeliveryConfirmOrders = React.lazy(() =>
    import("./views/OrderSchedulingTeam/DeliveryConfirmOrders")
);

const ManageBatchNumbers = React.lazy(() =>
    import("./views/OrderSchedulingTeam/ManageBatchNumbers")
);

const OrderItemsSchedule = React.lazy(() =>
    import("./views/OrderSchedulingTeam/OrderItemsSchedule")
);

// Distributor Module

const Distributor_Dashboard = React.lazy(() =>
    import("./views/Distributor/Distributor_Dashboard")
);

const Distributor_Profile = React.lazy(() =>
    import("./views/Distributor/Distributor_Profile")
);

const Distributor_ViewProducts = React.lazy(() =>
    import("./views/Distributor/Distributor_ViewProducts")
);

const Distributor_PlaceOrder = React.lazy(() =>
    import("./views/Distributor/Distributor_PlaceOrder")
);

const Distributor_FinalOrderConfirm = React.lazy(() =>
    import("./views/Distributor/Distributor_FinalOrderConfirm")
);

const FinalOrderConfirm = React.lazy(() =>
    import("./views/OrderManagement/FinalOrderConfirm")
);

const Distributor_MyOrders = React.lazy(() =>
    import("./views/Distributor/Distributor_MyOrders")
);

const Distributor_AllOrders = React.lazy(() =>
    import("./views/Distributor/Distributor_AllOrders")
);

// Customer Module

const CustomerDashboard = React.lazy(() =>
    import("./views/Customer/CustomerDashboard")
);

const CustomerProfile = React.lazy(() =>
    import("./views/Customer/CustomerProfile")
);

const CustomerViewProducts = React.lazy(() =>
    import("./views/Customer/CustomerViewProducts")
);

const CustomerPlaceOrder = React.lazy(() =>
    import("./views/Customer/CustomerPlaceOrder")
);

const ViewCustomerOrders = React.lazy(() =>
    import("./views/Customer/ViewCustomerOrders")
);

const CustomerFinalOrderConfirm = React.lazy(() =>
    import("./views/Customer/CustomerFinalOrderConfirm")
);

const routes = [
    // Super Admin

    { path: "/", exact: true, name: "Login" },
    { path: "/dashboard", name: "Dashboard", component: Dashboard },
    { path: "/SalesVSTarget", name: "SalesVSTarget", component: SalesVSTarget },
    { path: "/ExpensesVSSalesGraph", name: "ExpensesVSSalesGraph", component: ExpensesVSSalesGraph },
    { path: "/SalesVSTargetGraph", name: "SalesVSTargetGraph", component: SalesVSTargetGraph },
    {
        path: "/CompanySalesReport",
        name: "CompanySalesReport",
        component: CompanySalesReport,
    },
    {
        path: "/SalesReport",
        name: "SalesReport",
        component: SalesReport,
    },
    {
        path: "/TotalEmployeeByCompany",
        name: "TotalEmployeeByCompany",
        component: TotalEmployeeByCompany,
    },
    {
        path: "/CustomerSalesReport",
        name: "CustomerSalesReport",
        component: CustomerSalesReport,
    },
    {
        path: "/SalesReportCustomerOrders",
        name: "SalesReportCustomerOrders",
        component: SalesReportCustomerOrders,
    },
    {
        path: "/SalesReportByEmployee",
        name: "SalesReportByEmployee",
        component: SalesReportByEmployee,
    },
    {
        path: "/SalesReportEmployeeOrders",
        name: "SalesReportEmployeeOrders",
        component: SalesReportEmployeeOrders,
    },
    {
        path: "/SalesReportByArea",
        name: "SalesReportByArea",
        component: SalesReportByArea,
    },
    {
        path: "/TotalOrdersFromCompany",
        name: "TotalOrdersFromCompany",
        component: TotalOrdersFromCompany,
    },
    {
        path: "/SalesReportByProduct",
        name: "SalesReportByProduct",
        component: SalesReportByProduct,
    },
    {
        path: "/SalesReportByProductUnits",
        name: "SalesReportByProductUnits",
        component: SalesReportByProductUnits,
    },
    {
        path: "/OrderItemByProductsUnit",
        name: "OrderItemByProductsUnit",
        component: OrderItemByProductsUnit,
    },
    {
        path: "/OrderItemsByProducts",
        name: "OrderItemsByProducts",
        component: OrderItemsByProducts,
    },
    {
        path: "/CurrentYearOrders",
        name: "CurrentYearOrders",
        component: CurrentYearOrders,
    },
    {
        path: "/ViewEmployeeTourPlan",
        name: "ViewEmployeeTourPlan",
        component: ViewEmployeeTourPlan,
    },
    { path: "/charts", name: "Charts", component: Charts },
    { path: "/widgets", name: "Widgets", component: Widgets },
    { path: "/demo", name: "demo", component: demo },

    // Company Master

    { path: "/HQ", name: "HQ", component: HQ },
    { path: "/Company", name: "Company", component: Company },

    // Masters
    { path: "/CountryMaster", name: "CountryMaster", component: CountryMaster },
    { path: "/StateMaster", name: "StateMaster", component: StateMaster },
    { path: "/DistrictMaster", name: "DistrictMaster", component: DistrictMaster },
    { path: "/CityMaster", name: "CityMaster", component: CityMaster },
    { path: "/VillageMaster", name: "VillageMaster", component: VillageMaster },

    {
        path: "/LocationMaster",
        name: "LocationMaster",
        component: LocationMaster,
    },

    {
        path: "/ManageAdmin",
        name: "ManageAdmin",
        component: ManageAdmin,
    },

    //Employee
    { path: "/Employee", name: "Employee", component: Employee },
    { path: "/EmployeeType", name: "EmployeeType", component: EmployeeType },
    {
        path: "/EmployeeSubType",
        name: "EmployeeSubType",
        component: EmployeeSubType,
    },
    { path: "/ViewEmployees", name: "ViewEmployees", component: ViewEmployees },
    {path: "/EmployeeSeparation", name: "EmployeeSeparation", component: EmployeeSeparation },
    { path: "/EditEmployee", name: "EditEmployee", component: EditEmployee },
    { path: "/Headquarters", name: "Headquarters", component: Headquarters },
    { path: "/EmployeeTarget", name: "EmployeeTarget", component: EmployeeTarget },
    {
        path: "/ImportEmployees",
        name: "ImportEmployees",
        component: ImportEmployees,
    },
    {
        path: "/AddEmployeeIncentive",
        name: "AddEmployeeIncentive",
        component: AddEmployeeIncentive,
    },
    {
        path: "/EmployeeExpenses",
        name: "EmployeeExpenses",
        component: EmployeeExpenses,
    },
    {
        path: "/ExpensesDocuments",
        name: "ExpensesDocuments",
        component: ExpensesDocuments,
    },
    {
        path: "/EmployeeForgotPassword",
        name: "EmployeeForgotPassword",
        component: EmployeeForgotPassword,
    },

    // Leave Management

    {
        path: "/LeaveRequest",
        name: "LeaveRequest",
        component: LeaveRequest,
    },
    {
        path: "/ViewAllLeaves",
        name: "ViewAllLeaves",
        component: ViewAllLeaves,
    },
    {
        path: "/EmployeeAllLeaves",
        name: "EmployeeAllLeaves",
        component: EmployeeAllLeaves,
    },

    //Customer
    { path: "/Customer", name: "Customer", component: Customer },
    {
        path: "/CustomerCategory",
        name: "CustomerCategory",
        component: CustomerCategory,
    },
    {
        path: "/CustomerSubType",
        name: "CustomerSubType",
        component: CustomerSubType,
    },
    { path: "/CustomerType", name: "CustomerType", component: CustomerType },
    { path: "/UnitMaster", name: "UnitMaster", component: UnitMaster },
    { path: "/ViewCustomers", name: "ViewCustomers", component: ViewCustomers },
    { path: "/EditCustomer", name: "EditCustomer", component: EditCustomer },
    {
        path: "/AddCustomerAddress",
        name: "AddCustomerAddress",
        component: AddCustomerAddress,
    },
    {
        path: "/DeleteRequest",
        name: "DeleteRequest",
        component: DeleteRequest,
    },
    {
        path: "/ImportCustomers",
        name: "ImportCustomers",
        component: ImportCustomers,
    },
    {
        path: "/ViewCustomersRequest",
        name: "ViewCustomersRequest",
        component: ViewCustomersRequest,
    },
    {
        path: "/ViewRejectedCustomer",
        name: "ViewRejectedCustomer",
        component: ViewRejectedCustomer,
    },

    //CatalogueMaster
    { path: "/Products", name: "Products", component: Products },
    {
        path: "/AddProductPackageSize",
        name: "AddProductPackageSize",
        component: AddProductPackageSize,
    },
    {
        path: "/ProductCategory",
        name: "ProductCategory",
        component: ProductCategory,
    },
    {
        path: "/ProductSpeices",
        name: "ProductSpeices",
        component: ProductSpeices,
    },
    { path: "/UOM", name: "UOM", component: UOM },
    { path: "/ViewProducts", name: "ViewProducts", component: ViewProducts },
    { path: "/EditProduct", name: "EditProduct", component: EditProduct },
    {
        path: "/ImportFromExcel",
        name: "ImportFromExcel",
        component: ImportFromExcel,
    },
    //OrderManagement

    { path: "/OrderType", name: "OrderType", component: OrderType },
    { path: "/OrderTypeNew", name: "OrderTypeNew", component: OrderTypeNew },
    { path: "/PlaceNewOrder", name: "PlaceNewOrder", component: PlaceNewOrder },
    { path: "/OrderReplace", name: "OrderReplace", component: OrderReplace },
    {
        path: "/PlaceOrderProductsSelect",
        name: "PlaceOrderProductsSelect",
        component: PlaceOrderProductsSelect,
    },
    {
        path: "/PlaceOrderProductsSelect_Replace",
        name: "PlaceOrderProductsSelect_Replace",
        component: PlaceOrderProductsSelect_Replace,
    },
    { path: "/MyOrders", name: "MyOrders", component: MyOrders },
    { path: "/NewOrders", name: "NewOrders", component: NewOrders },
    {
        path: "/ApprovedOrders",
        name: "ApprovedOrders",
        component: ApprovedOrders,
    },
    {
        path: "/SchedulingOrders",
        name: "SchedulingOrders",
        component: SchedulingOrders,
    },
    {
        path: "/TentativeOrders_a",
        name: "TentativeOrders_a",
        component: TentativeOrders_a,
    },
    {
        path: "/BatchNoConfirmed_a",
        name: "BatchNoConfirmed_a",
        component: BatchNoConfirmed_a,
    },
    {
        path: "/InvoiceConfirmed_a",
        name: "InvoiceConfirmed_a",
        component: InvoiceConfirmed_a,
    },
    {
        path: "/InvoiceUploaded_a",
        name: "InvoiceUploaded_a",
        component: InvoiceUploaded_a,
    },
    {
        path: "/DeliveryConfirmation_a",
        name: "DeliveryConfirmation_a",
        component: DeliveryConfirmation_a,
    },
    {
        path: "/RejectedOrders",
        name: "RejectedOrders",
        component: RejectedOrders,
    },
    {
        path: "/ModifiedOrders",
        name: "ModifiedOrders",
        component: ModifiedOrders,
    },
    {
        path: "/EditOrder",
        name: "EditOrder",
        component: EditOrder,
    },
    { path: "/OrderItems", name: "OrderItems", component: OrderItems },

    //Reports
    {
        path: "/EmployeeExpensesWithStatus",
        name: "EmployeeExpensesWithStatus",
        component: EmployeeExpensesWithStatus,
    },
    {
        path: "/EmpExpenses",
        name: "EmpExpenses",
        component: EmpExpenses,
    },
    {
        path: "/EmployeePlan",
        name: "EmployeePlan",
        component: EmployeePlan,
    },
    {
        path: "/TourPlaces",
        name: "TourPlaces",
        component: TourPlaces,
    },
    {
        path: "/EmployeeAttendance",
        name: "EmployeeAttendance",
        component: EmployeeAttendance,
    },
    {
        path: "/ViewEmployeeAttendance",
        name: "ViewEmployeeAttendance",
        component: ViewEmployeeAttendance,
    },
    {
        path: "/GoogleMap",
        name: "GoogleMap",
        component: GoogleMap,
    },
    {
        path: "/TrackEmployee",
        name: "TrackEmployee",
        component: TrackEmployee,
    },
    {
        path: "/EmployeeOrders",
        name: "EmployeeOrders",
        component: EmployeeOrders,
    },
    {
        path: "/VisitedCustomers",
        name: "VisitedCustomers",
        component: VisitedCustomers,
    },
    {
        path: "/Reports_EmpLeaves",
        name: "Reports_EmpLeaves",
        component: Reports_EmpLeaves,
    },
    {
        path: "/ProductWiseSales",
        name: "ProductWiseSales",
        component: ProductWiseSales,
    },
    {
        path: "/ProductSalesOrderItems",
        name: "ProductSalesOrderItems",
        component: ProductSalesOrderItems,
    },
    {
        path: "/AreaWiseSalesReports",
        name: "AreaWiseSalesReports",
        component: AreaWiseSalesReports,
    },
    {
        path: "/AllOrders",
        name: "AllOrders",
        component: AllOrders,
    },
    {
        path: "/CurrentDayReport",
        name: "CurrentDayReport",
        component: CurrentDayReport,
    },

    // Order Management Admin (Process)

    {
        path: "/ProcessApprovedTeamDashboard",
        name: "ProcessApprovedTeamDashboard",
        component: ProcessApprovedTeamDashboard,
    },

    {
        path: "/AdminApprovedOrders",
        name: "AdminApprovedOrders",
        component: AdminApprovedOrders,
    },

    {
        path: "/ScheduledOrder",
        name: "ScheduledOrder",
        component: ScheduledOrder,
    },
    {
        path: "/BatchNoConfirmedOrders_p",
        name: "BatchNoConfirmedOrders_p",
        component: BatchNoConfirmedOrders_p,
    },
    {
        path: "/InvoiceConfirmedOrders_p",
        name: "InvoiceConfirmedOrders_p",
        component: InvoiceConfirmedOrders_p,
    },
    {
        path: "/InvoiceUploadedOrders_p",
        name: "InvoiceUploadedOrders_p",
        component: InvoiceUploadedOrders_p,
    },
    {
        path: "/DeliveryConfirmation_p",
        name: "DeliveryConfirmation_p",
        component: DeliveryConfirmation_p,
    },

    // Order Management Admin (Scheduling)

    {
        path: "/SchedlingAdminDashboard",
        name: "SchedlingAdminDashboard",
        component: SchedlingAdminDashboard,
    },
    {
        path: "/AllScheduledOrders",
        name: "AllScheduledOrders",
        component: AllScheduledOrders,
    },
    {
        path: "/TentativeOrders",
        name: "TentativeOrders",
        component: TentativeOrders,
    },
    {
        path: "/BatchNoConfirmedOrders",
        name: "BatchNoConfirmedOrders",
        component: BatchNoConfirmedOrders,
    },
    {
        path: "/InvoiceConfirmedOrders",
        name: "InvoiceConfirmedOrders",
        component: InvoiceConfirmedOrders,
    },
    {
        path: "/InvoiceUploadedOrders",
        name: "InvoiceUploadedOrders",
        component: InvoiceUploadedOrders,
    },
    {
        path: "/DeliveryConfirmOrders",
        name: "DeliveryConfirmOrders",
        component: DeliveryConfirmOrders,
    },
    {
        path: "/ManageBatchNumbers",
        name: "ManageBatchNumbers",
        component: ManageBatchNumbers,
    },
    {
        path: "/OrderItemsSchedule",
        name: "OrderItemsSchedule",
        component: OrderItemsSchedule,
    },

    // Distributors

    {
        path: "/Distributor_Dashboard",
        name: "Distributor_Dashboard",
        component: Distributor_Dashboard,
    },
    {
        path: "/Distributor_Profile",
        name: "Distributor_Profile",
        component: Distributor_Profile,
    },
    {
        path: "/Distributor_ViewProducts",
        name: "Distributor_ViewProducts",
        component: Distributor_ViewProducts,
    },
    {
        path: "/Distributor_PlaceOrder",
        name: "Distributor_PlaceOrder",
        component: Distributor_PlaceOrder,
    },
    {
        path: "/Distributor_FinalOrderConfirm",
        name: "Distributor_FinalOrderConfirm",
        component: Distributor_FinalOrderConfirm,
    },
    {
        path: "/FinalOrderConfirm",
        name: "FinalOrderConfirm",
        component: FinalOrderConfirm,
    },
    {
        path: "/Distributor_MyOrders",
        name: "Distributor_MyOrders",
        component: Distributor_MyOrders,
    },
    {
        path: "/Distributor_AllOrders",
        name: "Distributor_AllOrders",
        component: Distributor_AllOrders,
    },

    // Customer Module

    {
        path: "/CustomerDashboard",
        name: "CustomerDashboard",
        component: CustomerDashboard,
    },
    {
        path: "/CustomerProfile",
        name: "CustomerProfile",
        component: CustomerProfile,
    },
    {
        path: "/CustomerViewProducts",
        name: "CustomerViewProducts",
        component: CustomerViewProducts,
    },
    {
        path: "/CustomerPlaceOrder",
        name: "CustomerPlaceOrder",
        component: CustomerPlaceOrder,
    },
    {
        path: "/ViewCustomerOrders",
        name: "ViewCustomerOrders",
        component: ViewCustomerOrders,
    },
    {
        path: "/CustomerFinalOrderConfirm",
        name: "CustomerFinalOrderConfirm",
        component: CustomerFinalOrderConfirm,
    },
];
export default routes;