(this.webpackJsonpzeus_cms_kimo=this.webpackJsonpzeus_cms_kimo||[]).push([[29],{624:function(e,t,n){"use strict";n.d(t,"a",(function(){return c})),n.d(t,"b",(function(){return r}));var c="https://zeusservices.onrender.com/api/",r="https://zeusservices.onrender.com/"},625:function(e,t,n){},629:function(e,t,n){"use strict";function c(e){var t=e.date,n=new Date(new Date(t).toISOString().split("T")[0]);return"".concat(n.getDate().toString().padStart(2,"0"),"-").concat((n.getMonth()+1).toString().padStart(2,"0"),"-").concat(n.getFullYear())}n.d(t,"a",(function(){return c}))},637:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var c=n(630),r=n.n(c),i=r.a.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:function(e){e.addEventListener("mouseenter",r.a.stopTimer),e.addEventListener("mouseleave",r.a.resumeTimer)}})},871:function(e,t,n){"use strict";n.r(t);var c=n(25),r=n(627),i=n(1),d=n.n(i),s=n(628),o=n.n(s),a=n(626),l=n(20),j=n(624),O=n(637),h=n(629),u=(n(625),n(12)),b={placeholder:"Search here...",label:"Search:  "},m={label:"Rows:",values:[5,10,25,50,75,100]},E=[{key:"Status"},{key:"Invoice Number"},{key:"Invoice Date"},{key:"Tentative Dispatched Date"},{key:"Ordered Date"},{key:"Ordered Time"},{key:"Customer Name"},{key:"Order Items"},{key:"Company"},{key:"Order Number"},{key:"Order By"},{key:"Ordered Person"},{key:"Order Type"},{key:"Supply Type"},{key:"Day Till Now"},{key:"Billing Address"},{key:"Shipping Address"},{key:"Logistic"},{key:"Logistic Designation"},{key:"Logistic Payment Mode"},{key:"Delivery Type"},{key:"Cash Discount"},{key:"Grand Total"},{key:"Attachment"},{key:"Remark"},{key:"Process Remark"},{key:"Manager Remark"}];t.default=function(){var e=Object(i.useState)([]),t=Object(r.a)(e,2),n=t[0],s=t[1],x=Object(i.useState)([]),R=Object(r.a)(x,2),p=R[0],D=R[1],y=Object(i.useState)([]),g=Object(r.a)(y,2),_=g[0],S=g[1],f=Object(i.useState)([]),T=Object(r.a)(f,2),C=T[0],I=T[1],N=Object(i.useState)(),v=Object(r.a)(N,2),A=v[0],M=v[1],B=Object(i.useState)(),k=Object(r.a)(B,2),L=k[0],P=k[1],w=Object(i.useState)(),U=Object(r.a)(w,2),Y=U[0],F=U[1],G=Object(i.useState)(),H=Object(r.a)(G,2),z=H[0],V=H[1],K=Object(i.useState)(!1),J=Object(r.a)(K,2),W=J[0],Z=J[1],q=Object(i.useState)(!1),Q=Object(r.a)(q,2),X=Q[0],$=Q[1],ee=Object(i.useState)(!1),te=Object(r.a)(ee,2),ne=te[0],ce=te[1],re=Object(i.useState)(!1),ie=Object(r.a)(re,2),de=ie[0],se=ie[1],oe=Object(i.useState)(!1),ae=Object(r.a)(oe,2),le=(ae[0],ae[1],Object(i.useState)([])),je=Object(r.a)(le,2),Oe=je[0],he=je[1],ue=Object(i.useState)(),be=Object(r.a)(ue,2),me=(be[0],be[1],Object(i.useState)()),Ee=Object(r.a)(me,2),xe=(Ee[0],Ee[1],Object(i.useState)([])),Re=Object(r.a)(xe,2),pe=Re[0],De=Re[1],ye=Object(i.useState)(!1),ge=Object(r.a)(ye,2),_e=ge[0],Se=ge[1],fe=Object(i.useState)([]),Te=Object(r.a)(fe,2),Ce=Te[0],Ie=Te[1],Ne=function(){document.getElementById("divLoading").className="show",o()({method:"GET",url:j.a+"getAllConfirmForInvoiceOrders",headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e,t){return Object(c.a)(Object(c.a)({},e),{},{"Day Till Now":e.HDays,"Order Number":e.ORDER_NUMBER,"Order By":e.ORDER_BY,"Ordered Person":e.TypeName,"Order Type":e.ORDER_TYPE_NAME,"Supply Type":e.SUPPLY_NAME,Company:e.COMPANY_NAME,"Customer Name":e.CUSTOMER_NAME,Logistic:e.ORDER_LOGISTIC,"Logistic Designation":e.ORDER_LOGISTIC_DESTINATION,"Logistic Payment Mode":e.ORDER_LOGISTIC_PAY_MODE,"Delivery Type":e.ORDER_DELIVERY_TYPE,"Cash Discount":e.ORDER_CASH_DISCOUNT+"%","Grand Total":e.ORDER_ORDER_AMOUNT,"Invoice Number":e.ORDER_INVOICE_NUMBER})}));s(t),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}))};d.a.useEffect((function(){Ne(),document.getElementById("divLoading").className="show",o()({method:"GET",url:j.a+"OrderSupplyType",headers:{"content-type":"application/json"},params:{language_code:"en"}}).then((function(e){var t=e.data.map((function(e,t){return Object(u.jsx)("option",{value:e.SUPPLY_TYPE_PKID,children:e.SUPPLY_NAME},t)}));Ie(t),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}))}),[]);var ve=Object(l.g)();return Object(u.jsxs)("div",{id:"city",children:[Object(u.jsx)("div",{id:"divLoading",children:" "}),Object(u.jsx)("h1",{id:"ccmaster",children:"Invoice Confirmed Orders"}),Object(u.jsx)(a.H,{style:{marginTop:"3%"},children:Object(u.jsx)(a.j,{col:"12",children:Object(u.jsx)(a.e,{style:{boxShadow:"0px 0px 1px 1px #959595"},children:Object(u.jsx)(a.f,{children:Object(u.jsx)(a.H,{children:Object(u.jsx)(a.j,{children:Object(u.jsx)(a.e,{children:Object(u.jsxs)(a.f,{children:[Object(u.jsxs)(a.H,{children:[Object(u.jsxs)(a.j,{md:"2",children:[Object(u.jsx)(a.z,{htmlFor:"nf-email",children:"Select Order Type"}),Object(u.jsxs)(a.I,{custom:!0,name:"merchant",value:L,onChange:function(e){document.getElementById("divLoading").className="show",o()({method:"GET",url:j.a+"/getAllConfirmForInvoiceOrdersBySupplyType/"+e.target.value,headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e,t){return Object(c.a)(Object(c.a)({},e),{},{"Day Till Now":e.HDays,"Order Number":e.ORDER_NUMBER,"Order By":e.ORDER_BY,"Ordered Person":e.TypeName,"Order Type":e.ORDER_TYPE_NAME,"Supply Type":e.SUPPLY_NAME,Company:e.COMPANY_NAME,"Customer Name":e.CUSTOMER_NAME,Logistic:e.ORDER_LOGISTIC,"Logistic Designation":e.ORDER_LOGISTIC_DESTINATION,"Logistic Payment Mode":e.ORDER_LOGISTIC_PAY_MODE,"Delivery Type":e.ORDER_DELIVERY_TYPE,"Cash Discount":e.ORDER_CASH_DISCOUNT+"%","Grand Total":e.ORDER_ORDER_AMOUNT,"Invoice Number":e.ORDER_INVOICE_NUMBER})}));s(t),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}))},id:"merchant",children:[Object(u.jsx)("option",{value:"0",children:"All"}),Ce]})]}),Object(u.jsxs)(a.j,{md:"2",children:[Object(u.jsx)(a.z,{htmlFor:"nf-email",children:"Select Month"}),Object(u.jsxs)(a.I,{custom:!0,name:"Marchant",id:"Marchant",value:Y,onChange:function(e){document.getElementById("divLoading").className="show",o()({method:"GET",url:j.a+"/getAllConfirmForInvoiceOrdersByMonth/"+e.target.value,headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e,t){return Object(c.a)(Object(c.a)({},e),{},{"Day Till Now":e.HDays,"Order Number":e.ORDER_NUMBER,"Order By":e.ORDER_BY,"Ordered Person":e.TypeName,"Order Type":e.ORDER_TYPE_NAME,"Supply Type":e.SUPPLY_NAME,Company:e.COMPANY_NAME,"Customer Name":e.CUSTOMER_NAME,Logistic:e.ORDER_LOGISTIC,"Logistic Designation":e.ORDER_LOGISTIC_DESTINATION,"Logistic Payment Mode":e.ORDER_LOGISTIC_PAY_MODE,"Delivery Type":e.ORDER_DELIVERY_TYPE,"Cash Discount":e.ORDER_CASH_DISCOUNT+"%","Grand Total":e.ORDER_ORDER_AMOUNT,"Invoice Number":e.ORDER_INVOICE_NUMBER})}));s(t),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}))},children:[Object(u.jsx)("option",{value:"0",children:"All"}),Object(u.jsx)("option",{value:"1",children:"Jan"}),Object(u.jsx)("option",{value:"2",children:"Feb"}),Object(u.jsx)("option",{value:"3",children:"March"}),Object(u.jsx)("option",{value:"4",children:"April"}),Object(u.jsx)("option",{value:"5",children:"May"}),Object(u.jsx)("option",{value:"6",children:"Jun"}),Object(u.jsx)("option",{value:"7",children:"Jul"}),Object(u.jsx)("option",{value:"8",children:"Aug"}),Object(u.jsx)("option",{value:"9",children:"Sept"}),Object(u.jsx)("option",{value:"10",children:"Oct"}),Object(u.jsx)("option",{value:"11",children:"Nov"}),Object(u.jsx)("option",{value:"12",children:"Dec"})]})]}),Object(u.jsxs)(a.j,{md:"2",children:[Object(u.jsx)(a.z,{children:"From:"}),Object(u.jsx)(a.y,{type:"date",onChange:function(e){M(e.target.value)},value:A})]}),Object(u.jsxs)(a.j,{md:"2",children:[Object(u.jsx)(a.z,{children:"To:"}),Object(u.jsx)(a.y,{type:"date",onChange:function(e){V(e.target.value)},value:z})]}),Object(u.jsx)(a.j,{md:"2",children:Object(u.jsx)(a.d,{size:"sm",color:"info",style:{marginTop:"28px",width:"100%"},onClick:function(){""===A||null==A?O.a.fire({icon:"warning",title:"Select From Date!"}):""===z||null==z?O.a.fire({icon:"warning",title:"Select To Date!"}):(document.getElementById("divLoading").className="show",o()({method:"GET",url:j.a+"getAllConfirmForInvoiceOrdersByDate/"+A+"/"+z,headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e,t){return Object(c.a)(Object(c.a)({},e),{},{"Day Till Now":e.HDays,"Order Number":e.ORDER_NUMBER,"Order By":e.ORDER_BY,"Ordered Person":e.TypeName,"Order Type":e.ORDER_TYPE_NAME,"Supply Type":e.SUPPLY_NAME,Company:e.COMPANY_NAME,"Customer Name":e.CUSTOMER_NAME,Logistic:e.ORDER_LOGISTIC,"Logistic Designation":e.ORDER_LOGISTIC_DESTINATION,"Logistic Payment Mode":e.ORDER_LOGISTIC_PAY_MODE,"Delivery Type":e.ORDER_DELIVERY_TYPE,"Cash Discount":e.ORDER_CASH_DISCOUNT+"%","Grand Total":e.ORDER_ORDER_AMOUNT,"Invoice Number":e.ORDER_INVOICE_NUMBER})}));s(t),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)})))},children:"Filter"})}),Object(u.jsx)(a.j,{md:"2",children:Object(u.jsx)(a.d,{size:"sm",color:"danger",style:{marginTop:"28px",width:"100%"},onClick:function(){Ne(),M(""),V(""),P("0"),F("0")},children:"Reset"})})]}),Object(u.jsx)("hr",{})]})})})})})})})}),Object(u.jsx)(a.H,{children:Object(u.jsx)(a.j,{col:"12",children:Object(u.jsx)(a.e,{style:{boxShadow:"0px 0px 1px 1px #959595"},children:Object(u.jsx)(a.f,{children:Object(u.jsx)(a.H,{children:Object(u.jsx)(a.j,{children:Object(u.jsxs)(a.e,{children:[Object(u.jsx)(a.i,{children:"Invoice Confirmed Orders"}),Object(u.jsx)(a.f,{children:Object(u.jsx)(a.m,{items:n,fields:E,hover:!0,striped:!0,bordered:!0,sorter:!0,tableFilter:b,itemsPerPageSelect:m,size:"sm",itemsPerPage:10,pagination:!0,scopedSlots:{"Manager Remark":function(e){return Object(u.jsx)("td",{children:Object(u.jsx)(a.H,{children:Object(u.jsx)(a.j,{md:"8",children:Object(u.jsx)(a.d,{color:"primary",size:"sm",id:"AddEmp",onClick:function(){var t;t=e.ORDER_PKID,document.getElementById("divLoading").className="show",o()({method:"GET",url:j.a+"OrderRemarkByManager/"+t,headers:{"content-type":"application/json"}}).then((function(e){De(e.data),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)})),Se(!ne)},children:"View"})})})})},Status:function(e){return Object(u.jsx)("td",{children:Object(u.jsx)("span",{className:"ScheduledOrders",children:"Invoice Confirmed"})})},"Ordered Date":function(e){return Object(u.jsx)("td",{children:Object(u.jsx)(h.a,{date:e.ORDER_DATE})})},"Tentative Dispatched Date":function(e){return Object(u.jsx)("td",{children:Object(u.jsx)(h.a,{date:e.ORDER_TENTATIVE_DATE})})},"Invoice Date":function(e){return Object(u.jsx)("td",{children:Object(u.jsx)(h.a,{date:e.ORDER_DELIVERY_CONFIRMED_DATE})})},"Ordered Time":function(e){return Object(u.jsx)("td",{children:new Date(e.clock).toISOString().split("T")[1].slice(0,-1)})},"Order Items":function(e){return Object(u.jsx)("td",{children:Object(u.jsx)(a.d,{onClick:function(){ve.push("/OrderItems",{data:e})},children:e.ItemCount})})},"Billing Address":function(e){return Object(u.jsx)("td",{children:Object(u.jsx)(a.H,{children:Object(u.jsx)(a.j,{md:"8",children:Object(u.jsx)(a.d,{color:"primary",size:"sm",id:"AddEmp",onClick:function(){var t;t=e.ORDER_PKID,document.getElementById("divLoading").className="show",o()({method:"GET",url:j.a+"OrderBillingAddress/"+t,headers:{"content-type":"application/json"}}).then((function(e){D(e.data),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)})),Z(!W)},children:"View"})})})})},"Shipping Address":function(e){return Object(u.jsx)("td",{children:Object(u.jsx)(a.H,{children:Object(u.jsx)(a.j,{md:"8",children:Object(u.jsx)(a.d,{color:"primary",size:"sm",id:"AddEmp",onClick:function(){var t;t=e.ORDER_PKID,document.getElementById("divLoading").className="show",o()({method:"GET",url:j.a+"OrderShippingAddress/"+t,headers:{"content-type":"application/json"}}).then((function(e){S(e.data),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)})),$(!X)},children:"View"})})})})},Remark:function(e){return Object(u.jsx)("td",{children:Object(u.jsx)(a.H,{children:Object(u.jsx)(a.j,{md:"8",children:Object(u.jsx)(a.d,{color:"primary",size:"sm",id:"AddEmp",onClick:function(){var t;t=e.ORDER_PKID,document.getElementById("divLoading").className="show",o()({method:"GET",url:j.a+"OrderRemark/"+t,headers:{"content-type":"application/json"}}).then((function(e){I(e.data),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)})),ce(!ne)},children:"View"})})})})},"Process Remark":function(e){return Object(u.jsx)("td",{children:Object(u.jsx)(a.H,{children:Object(u.jsx)(a.j,{md:"8",children:Object(u.jsx)(a.d,{color:"primary",size:"sm",id:"AddEmp",onClick:function(){var t;t=e.ORDER_PKID,document.getElementById("divLoading").className="show",o()({method:"GET",url:j.a+"OrderProcessRemark/"+t,headers:{"content-type":"application/json"}}).then((function(e){he(e.data),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)})),se(!de)},children:"View"})})})})},Attachment:function(e){var t="";return t=""===e.ORD_DOC||null===e.ORD_DOC?"NoImage.png":e.ORD_DOC,Object(u.jsx)(d.a.Fragment,{children:Object(u.jsx)("td",{children:Object(u.jsx)(a.A,{href:j.b+"/"+t,target:"_blank",children:Object(u.jsx)(a.x,{src:j.b+"/"+t,fluid:!0,className:"mb-2",style:{width:"100%"}})})})})}}})})]})})})})})})}),Object(u.jsxs)(a.B,{show:W,onClose:function(){return Z(!W)},color:"dark",children:[Object(u.jsx)(a.E,{closeButton:!0,children:Object(u.jsx)(a.F,{children:"Customer Billing Address"})}),Object(u.jsx)(a.C,{children:Object(u.jsx)(a.H,{children:p.map((function(e){return Object(u.jsx)(d.a.Fragment,{children:Object(u.jsxs)(a.j,{md:"12",children:[Object(u.jsx)("p",{style:{fontWeight:"700",fontFamily:"sans-serif",textAlign:"center",borderBottom:"1px solid #ebedef",paddingBottom:"5%"},children:"Billing Address"}),Object(u.jsxs)("table",{children:[Object(u.jsx)("tr",{children:Object(u.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS1})}),Object(u.jsx)("tr",{children:Object(u.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS2})}),Object(u.jsx)("tr",{children:Object(u.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS3})}),Object(u.jsx)("tr",{children:Object(u.jsx)("td",{children:e.CUSTOMER_ADDRESS_ZIP_CODE})})]})]})})}))})}),Object(u.jsx)(a.D,{children:Object(u.jsx)(a.d,{color:"secondary",onClick:function(){return Z(!W)},children:"Close"})})]}),Object(u.jsxs)(a.B,{show:X,onClose:function(){return $(!X)},color:"dark",children:[Object(u.jsx)(a.E,{closeButton:!0,children:Object(u.jsx)(a.F,{children:"Customer Shipping Address"})}),Object(u.jsx)(a.C,{children:Object(u.jsx)(a.H,{children:_.map((function(e){return Object(u.jsx)(d.a.Fragment,{children:Object(u.jsxs)(a.j,{md:"12",children:[Object(u.jsx)("p",{style:{fontWeight:"700",fontFamily:"sans-serif",textAlign:"center",borderBottom:"1px solid #ebedef",paddingBottom:"5%"},children:"Shipping Address"}),Object(u.jsxs)("table",{children:[Object(u.jsx)("tr",{children:Object(u.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS1})}),Object(u.jsx)("tr",{children:Object(u.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS2})}),Object(u.jsx)("tr",{children:Object(u.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS3})}),Object(u.jsx)("tr",{children:Object(u.jsx)("td",{children:e.CUSTOMER_ADDRESS_ZIP_CODE})})]})]})})}))})}),Object(u.jsx)(a.D,{children:Object(u.jsx)(a.d,{color:"secondary",onClick:function(){return $(!X)},children:"Close"})})]}),Object(u.jsxs)(a.B,{show:ne,onClose:function(){return ce(!ne)},color:"dark",children:[Object(u.jsx)(a.E,{closeButton:!0,children:Object(u.jsx)(a.F,{children:"Order Remark"})}),Object(u.jsx)(a.C,{children:Object(u.jsx)(a.H,{children:C.map((function(e){return Object(u.jsx)(d.a.Fragment,{children:Object(u.jsx)(a.j,{md:"12",children:Object(u.jsx)("table",{children:Object(u.jsx)("tr",{children:Object(u.jsx)("td",{children:e.ORDER_REMARK})})})})})}))})}),Object(u.jsx)(a.D,{children:Object(u.jsx)(a.d,{color:"secondary",onClick:function(){return ce(!ne)},children:"Close"})})]}),Object(u.jsxs)(a.B,{show:de,onClose:function(){return se(!de)},color:"dark",children:[Object(u.jsx)(a.E,{closeButton:!0,children:Object(u.jsx)(a.F,{children:"Process Remark"})}),Object(u.jsx)(a.C,{children:Object(u.jsx)(a.H,{children:Oe.map((function(e){return Object(u.jsx)(d.a.Fragment,{children:Object(u.jsx)(a.j,{md:"12",children:Object(u.jsx)("table",{children:Object(u.jsx)("tr",{children:Object(u.jsx)("td",{children:e.ORDER_REMARK_BY_PROCESSTEAM})})})})})}))})}),Object(u.jsx)(a.D,{children:Object(u.jsx)(a.d,{color:"secondary",onClick:function(){return se(!de)},children:"Close"})})]}),Object(u.jsxs)(a.B,{show:_e,onClose:function(){return Se(!_e)},color:"dark",children:[Object(u.jsx)(a.E,{closeButton:!0,children:Object(u.jsx)(a.F,{children:"Order Remark From Manager"})}),Object(u.jsx)(a.C,{children:Object(u.jsx)(a.H,{children:pe.map((function(e){return Object(u.jsx)(d.a.Fragment,{children:Object(u.jsxs)(a.j,{md:"12",children:[Object(u.jsx)("p",{style:{fontWeight:"700",fontFamily:"sans-serif",textAlign:"center",borderBottom:"1px solid #ebedef",paddingBottom:"5%"},children:"Remark"}),Object(u.jsx)("table",{children:Object(u.jsx)("tr",{children:Object(u.jsx)("td",{children:e.ORDER_MANAGER_REMARK})})})]})})}))})}),Object(u.jsx)(a.D,{children:Object(u.jsx)(a.d,{color:"secondary",onClick:function(){return Se(!_e)},children:"Close"})})]})]})}}}]);
//# sourceMappingURL=29.0379cc2a.chunk.js.map