(this.webpackJsonpzeus_cms_kimo=this.webpackJsonpzeus_cms_kimo||[]).push([[42],{624:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return c}));var r="https://zeusservices.onrender.com/api/",c="https://zeusservices.onrender.com/"},625:function(e,t,n){},629:function(e,t,n){"use strict";function r(e){var t=e.date,n=new Date(new Date(t).toISOString().split("T")[0]);return"".concat(n.getDate().toString().padStart(2,"0"),"-").concat((n.getMonth()+1).toString().padStart(2,"0"),"-").concat(n.getFullYear())}n.d(t,"a",(function(){return r}))},637:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n(630),c=n.n(r),i=c.a.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:function(e){e.addEventListener("mouseenter",c.a.stopTimer),e.addEventListener("mouseleave",c.a.resumeTimer)}})},819:function(e,t,n){"use strict";n.r(t);var r=n(25),c=n(627),i=n(1),s=n.n(i),o=n(628),d=n.n(o),a=n(626),l=n(20),O=n(624),j=n(637),h=n(629),u=(n(625),n(12)),b={placeholder:"Search here...",label:"Search:  "},E={label:"Rows:",values:[5,10,25,50,75,100]},R=[{key:"Order Date"},{key:"Order Time"},{key:"Customer Name"},{key:"Order Items"},{key:"Company"},{key:"Order Number"},{key:"Order By"},{key:"Ordered Person"},{key:"Order Type"},{key:"Supply Type"},{key:"Day Till Now"},{key:"Billing Address"},{key:"Shipping Address"},{key:"Logistic"},{key:"Logistic Designation"},{key:"Logistic Payment Mode"},{key:"Delivery Type"},{key:"Cash Discount"},{key:"Grand Total"}];t.default=function(e){var t=e.location.state.data.CompanyID,n=e.location.state.data.COMPANY_NAME,o=Object(i.useState)([]),D=Object(c.a)(o,2),m=D[0],p=D[1],x=Object(i.useState)([]),y=Object(c.a)(x,2),S=y[0],_=y[1],T=Object(i.useState)([]),C=Object(c.a)(T,2),f=C[0],g=C[1],A=Object(i.useState)([]),N=Object(c.a)(A,2),I=N[0],M=N[1],P=Object(i.useState)(),k=Object(c.a)(P,2),B=k[0],L=k[1],Y=Object(i.useState)(!1),v=Object(c.a)(Y,2),U=v[0],G=v[1],w=Object(i.useState)(!1),F=Object(c.a)(w,2),H=F[0],z=F[1],V=Object(i.useState)(!1),K=Object(c.a)(V,2),W=K[0],J=K[1],Z=Object(i.useState)(),q=Object(c.a)(Z,2),Q=q[0],X=q[1],$=Object(i.useState)(),ee=Object(c.a)($,2),te=ee[0],ne=ee[1],re=function(){d()({method:"GET",url:O.a+"getAllOrdersByCompIdForCurrentYear/"+t,headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e,t){return Object(r.a)(Object(r.a)({},e),{},{"Day Till Now":e.HDays,"Order Number":e.ORDER_NUMBER,"Order By":e.ORDER_BY,"Ordered Person":e.TypeName,"Order Type":e.ORDER_TYPE_NAME,"Supply Type":e.SUPPLY_NAME,Company:e.COMPANY_NAME,"Customer Name":e.CUSTOMER_NAME,Logistic:e.ORDER_LOGISTIC,"Logistic Designation":e.ORDER_LOGISTIC_DESTINATION,"Logistic Payment Mode":e.ORDER_LOGISTIC_PAY_MODE,"Delivery Type":e.ORDER_DELIVERY_TYPE,"Cash Discount":e.ORDER_CASH_DISCOUNT+"%","Grand Total":e.ORDER_ORDER_AMOUNT})}));p(t)})).catch((function(e){console.log(e)})),d()({method:"GET",url:O.a+"GetYearsList",headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e,t){return Object(u.jsx)("option",{value:e.year,children:e.year},t)}));L(t)})).catch((function(e){console.log(e)}))};s.a.useEffect((function(){re()}),[]);var ce=Object(l.g)();return Object(u.jsxs)("div",{id:"city",children:[Object(u.jsxs)("h1",{id:"ccmaster",children:["Sales Report for Year From ",n]}),Object(u.jsx)("br",{}),Object(u.jsx)(a.H,{children:Object(u.jsx)(a.j,{col:"12",children:Object(u.jsx)(a.e,{id:"city-table",children:Object(u.jsxs)(a.f,{children:[Object(u.jsx)(a.H,{children:Object(u.jsx)(a.j,{md:"1",children:Object(u.jsx)(a.d,{color:"danger",size:"sm",onClick:function(){return ce.goBack()},children:"Back"})})}),Object(u.jsx)("br",{}),Object(u.jsx)(a.H,{children:Object(u.jsx)(a.j,{children:Object(u.jsxs)(a.e,{children:[Object(u.jsx)(a.i,{children:Object(u.jsxs)(a.H,{children:[Object(u.jsx)(a.j,{md:"2",children:"Sales Report"}),Object(u.jsx)(a.j,{md:"2",children:Object(u.jsxs)(a.I,{custom:!0,name:"merchant",style:{width:"100%",marginTop:"28px"},onChange:function(e){"0"===e.target.value?d()({method:"GET",url:O.a+"/getAllOrdersByCompIdForCurrentYear/"+t,headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e,t){return Object(r.a)(Object(r.a)({},e),{},{"Day Till Now":e.HDays,"Order Number":e.ORDER_NUMBER,"Order By":e.ORDER_BY,"Ordered Person":e.TypeName,"Order Type":e.ORDER_TYPE_NAME,"Supply Type":e.SUPPLY_NAME,Company:e.COMPANY_NAME,"Customer Name":e.CUSTOMER_NAME,Logistic:e.ORDER_LOGISTIC,"Logistic Designation":e.ORDER_LOGISTIC_DESTINATION,"Logistic Payment Mode":e.ORDER_LOGISTIC_PAY_MODE,"Delivery Type":e.ORDER_DELIVERY_TYPE,"Cash Discount":e.ORDER_CASH_DISCOUNT+"%","Grand Total":e.ORDER_ORDER_AMOUNT})}));p(t)})).catch((function(e){console.log(e)})):d()({method:"GET",url:O.a+"/getAllOrdersByCompIdByYear/"+t+"/"+e.target.value,headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e,t){return Object(r.a)(Object(r.a)({},e),{},{"Day Till Now":e.HDays,"Order Number":e.ORDER_NUMBER,"Order By":e.ORDER_BY,"Ordered Person":e.TypeName,"Order Type":e.ORDER_TYPE_NAME,"Supply Type":e.SUPPLY_NAME,Company:e.COMPANY_NAME,"Customer Name":e.CUSTOMER_NAME,Logistic:e.ORDER_LOGISTIC,"Logistic Designation":e.ORDER_LOGISTIC_DESTINATION,"Logistic Payment Mode":e.ORDER_LOGISTIC_PAY_MODE,"Delivery Type":e.ORDER_DELIVERY_TYPE,"Cash Discount":e.ORDER_CASH_DISCOUNT+"%","Grand Total":e.ORDER_ORDER_AMOUNT})}));p(t)})).catch((function(e){console.log(e)}))},id:"merchant",children:[Object(u.jsx)("option",{value:"0",children:"Current Year"}),B]})}),Object(u.jsxs)(a.j,{md:"2",children:[Object(u.jsx)(a.z,{children:"From:"}),Object(u.jsx)(a.y,{type:"date",onChange:function(e){X(e.target.value)},value:Q})]}),Object(u.jsxs)(a.j,{md:"2",children:[Object(u.jsx)(a.z,{children:"To:"}),Object(u.jsx)(a.y,{type:"date",onChange:function(e){ne(e.target.value)},value:te})]}),Object(u.jsx)(a.j,{md:"2",children:Object(u.jsx)(a.d,{size:"sm",color:"info",style:{marginTop:"28px",width:"100%"},onClick:function(){""===Q||null==Q?j.a.fire({icon:"warning",title:"Select From Date!"}):""===te||null==te?j.a.fire({icon:"warning",title:"Select To Date!"}):d()({method:"GET",url:O.a+"getAllOrdersByCompIdForCurrentYearByDate/"+t+"/"+Q+"/"+te,headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e,t){return Object(r.a)(Object(r.a)({},e),{},{"Day Till Now":e.HDays,"Order Number":e.ORDER_NUMBER,"Order By":e.ORDER_BY,"Ordered Person":e.TypeName,"Order Type":e.ORDER_TYPE_NAME,"Supply Type":e.SUPPLY_NAME,Company:e.COMPANY_NAME,"Customer Name":e.CUSTOMER_NAME,Logistic:e.ORDER_LOGISTIC,"Logistic Designation":e.ORDER_LOGISTIC_DESTINATION,"Logistic Payment Mode":e.ORDER_LOGISTIC_PAY_MODE,"Delivery Type":e.ORDER_DELIVERY_TYPE,"Cash Discount":e.ORDER_CASH_DISCOUNT+"%","Grand Total":e.ORDER_ORDER_AMOUNT})}));p(t)})).catch((function(e){console.log(e)}))},children:"Filter"})}),Object(u.jsx)(a.j,{md:"2",children:Object(u.jsx)(a.d,{size:"sm",color:"danger",style:{marginTop:"28px",width:"100%"},onClick:function(){re(),X(""),ne("")},children:"Reset"})})]})}),Object(u.jsx)(a.f,{children:Object(u.jsx)(a.m,{items:m,fields:R,hover:!0,striped:!0,bordered:!0,sorter:!0,tableFilter:b,itemsPerPageSelect:E,size:"sm",itemsPerPage:10,pagination:!0,scopedSlots:{"Order Date":function(e){return Object(u.jsx)("td",{children:Object(u.jsx)(h.a,{date:e.ORDER_DATE})})},"Order Time":function(e){return Object(u.jsx)("td",{children:new Date(e.clock).toISOString().split("T")[1].slice(0,-1)})},"Order Items":function(e){return Object(u.jsx)("td",{children:Object(u.jsx)(a.d,{onClick:function(){ce.push("/OrderItems",{data:e})},children:e.ItemCount})})},"Billing Address":function(e){return Object(u.jsx)("td",{children:Object(u.jsx)(a.H,{children:Object(u.jsx)(a.j,{md:"10",children:Object(u.jsx)(a.d,{color:"primary",size:"sm",id:"AddEmp",onClick:function(){var t;t=e.ORDER_PKID,d()({method:"GET",url:O.a+"OrderBillingAddress/"+t,headers:{"content-type":"application/json"}}).then((function(e){_(e.data)})).catch((function(e){console.log(e)})),G(!U)},children:"View"})})})})},"Shipping Address":function(e){return Object(u.jsx)("td",{children:Object(u.jsx)(a.H,{children:Object(u.jsx)(a.j,{md:"10",children:Object(u.jsx)(a.d,{color:"primary",size:"sm",id:"AddEmp",onClick:function(){var t;t=e.ORDER_PKID,d()({method:"GET",url:O.a+"OrderShippingAddress/"+t,headers:{"content-type":"application/json"}}).then((function(e){g(e.data)})).catch((function(e){console.log(e)})),z(!H)},children:"View"})})})})},Remark:function(e){return Object(u.jsx)("td",{children:Object(u.jsx)(a.H,{children:Object(u.jsx)(a.j,{md:"10",children:Object(u.jsx)(a.d,{color:"primary",size:"sm",id:"AddEmp",onClick:function(){var t;t=e.ORDER_PKID,d()({method:"GET",url:O.a+"OrderRemark/"+t,headers:{"content-type":"application/json"}}).then((function(e){M(e.data)})).catch((function(e){console.log(e)})),J(!W)},children:"View"})})})})}}})})]})})})]})})})}),Object(u.jsxs)(a.B,{show:U,onClose:function(){return G(!U)},color:"dark",children:[Object(u.jsx)(a.E,{closeButton:!0,children:Object(u.jsx)(a.F,{children:"Customer Billing Address"})}),Object(u.jsx)(a.C,{children:Object(u.jsx)(a.H,{children:S.map((function(e){return Object(u.jsx)(s.a.Fragment,{children:Object(u.jsxs)(a.j,{md:"12",children:[Object(u.jsx)("p",{style:{fontWeight:"700",fontFamily:"sans-serif",textAlign:"center",borderBottom:"1px solid #ebedef",paddingBottom:"5%"},children:"Billing Address"}),Object(u.jsxs)("table",{children:[Object(u.jsx)("tr",{children:Object(u.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS1})}),Object(u.jsx)("tr",{children:Object(u.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS2})}),Object(u.jsx)("tr",{children:Object(u.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS3})}),Object(u.jsx)("tr",{children:Object(u.jsx)("td",{children:e.CUSTOMER_ADDRESS_ZIP_CODE})})]})]})})}))})}),Object(u.jsx)(a.D,{children:Object(u.jsx)(a.d,{color:"secondary",onClick:function(){return G(!U)},children:"Close"})})]}),Object(u.jsxs)(a.B,{show:H,onClose:function(){return z(!H)},color:"dark",children:[Object(u.jsx)(a.E,{closeButton:!0,children:Object(u.jsx)(a.F,{children:"Customer Shipping Address"})}),Object(u.jsx)(a.C,{children:Object(u.jsx)(a.H,{children:f.map((function(e){return Object(u.jsx)(s.a.Fragment,{children:Object(u.jsxs)(a.j,{md:"12",children:[Object(u.jsx)("p",{style:{fontWeight:"700",fontFamily:"sans-serif",textAlign:"center",borderBottom:"1px solid #ebedef",paddingBottom:"5%"},children:"Shipping Address"}),Object(u.jsxs)("table",{children:[Object(u.jsx)("tr",{children:Object(u.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS1})}),Object(u.jsx)("tr",{children:Object(u.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS2})}),Object(u.jsx)("tr",{children:Object(u.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS3})}),Object(u.jsx)("tr",{children:Object(u.jsx)("td",{children:e.CUSTOMER_ADDRESS_ZIP_CODE})})]})]})})}))})}),Object(u.jsx)(a.D,{children:Object(u.jsx)(a.d,{color:"secondary",onClick:function(){return z(!H)},children:"Close"})})]}),Object(u.jsxs)(a.B,{show:W,onClose:function(){return J(!W)},color:"dark",children:[Object(u.jsx)(a.E,{closeButton:!0,children:Object(u.jsx)(a.F,{children:"Order Remark"})}),Object(u.jsx)(a.C,{children:Object(u.jsx)(a.H,{children:I.map((function(e){return Object(u.jsx)(s.a.Fragment,{children:Object(u.jsxs)(a.j,{md:"12",children:[Object(u.jsx)("p",{style:{fontWeight:"700",fontFamily:"sans-serif",textAlign:"center",borderBottom:"1px solid #ebedef",paddingBottom:"5%"},children:"Remark"}),Object(u.jsx)("table",{children:Object(u.jsx)("tr",{children:Object(u.jsx)("td",{children:e.ORDER_REMARK})})})]})})}))})}),Object(u.jsx)(a.D,{children:Object(u.jsx)(a.d,{color:"secondary",onClick:function(){return J(!W)},children:"Close"})})]})]})}}}]);
//# sourceMappingURL=42.3d9a8dc9.chunk.js.map