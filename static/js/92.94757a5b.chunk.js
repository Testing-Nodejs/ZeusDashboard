(this.webpackJsonpzeus_cms_kimo=this.webpackJsonpzeus_cms_kimo||[]).push([[92],{624:function(e,t,n){"use strict";n.d(t,"a",(function(){return c})),n.d(t,"b",(function(){return r}));var c="https://zeusservices.onrender.com/api/",r="https://zeusservices.onrender.com/"},625:function(e,t,n){},629:function(e,t,n){"use strict";function c(e){var t=e.date,n=new Date(new Date(t).toISOString().split("T")[0]);return"".concat(n.getDate().toString().padStart(2,"0"),"-").concat((n.getMonth()+1).toString().padStart(2,"0"),"-").concat(n.getFullYear())}n.d(t,"a",(function(){return c}))},907:function(e,t,n){"use strict";n.r(t);var c=n(25),r=n(627),i=n(1),d=n.n(i),o=n(628),s=n.n(o),a=n(626),l=n(20),j=n(624),O=n(630),h=n.n(O),u=n(629),b=(n(625),n(12)),m={placeholder:"Search here...",label:"Search:  "},E={label:"Rows:",values:[5,10,25,50,75,100]},x=[{key:"Action"},{key:"Delivery Status"},{key:"Invoice"},{key:"Invoice Number"},{key:"Invoice Date"},{key:"Tentative Dispatched Date"},{key:"Ordered Date"},{key:"Ordered Time"},{key:"Customer Name"},{key:"Order Items"},{key:"Company"},{key:"Order Number"},{key:"Order By"},{key:"Ordered Person"},{key:"Order Type"},{key:"Supply Type"},{key:"Day Till Now"},{key:"Billing Address"},{key:"Shipping Address"},{key:"Logistic"},{key:"Logistic Designation"},{key:"Logistic Payment Mode"},{key:"Delivery Type"},{key:"Cash Discount"},{key:"Grand Total"},{key:"Attachment"},{key:"Remark"},{key:"Process Remark"},{key:"Manager Remark"}];t.default=function(){var e=h.a.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:function(e){e.addEventListener("mouseenter",h.a.stopTimer),e.addEventListener("mouseleave",h.a.resumeTimer)}}),t=Object(i.useState)([]),n=Object(r.a)(t,2),o=n[0],O=n[1],R=Object(i.useState)([]),D=Object(r.a)(R,2),p=D[0],y=D[1],g=Object(i.useState)([]),_=Object(r.a)(g,2),S=_[0],f=_[1],T=Object(i.useState)([]),I=Object(r.a)(T,2),v=I[0],C=I[1],N=Object(i.useState)(),A=Object(r.a)(N,2),B=A[0],M=A[1],k=Object(i.useState)(),L=Object(r.a)(k,2),P=L[0],w=L[1],U=Object(i.useState)(),Y=Object(r.a)(U,2),G=Y[0],F=Y[1],H=Object(i.useState)(),z=Object(r.a)(H,2),V=z[0],K=z[1],J=Object(i.useState)(!1),W=Object(r.a)(J,2),Z=W[0],q=W[1],Q=Object(i.useState)(!1),X=Object(r.a)(Q,2),$=X[0],ee=X[1],te=Object(i.useState)(!1),ne=Object(r.a)(te,2),ce=ne[0],re=ne[1],ie=Object(i.useState)(!1),de=Object(r.a)(ie,2),oe=de[0],se=de[1],ae=Object(i.useState)(!1),le=Object(r.a)(ae,2),je=le[0],Oe=le[1],he=Object(i.useState)([]),ue=Object(r.a)(he,2),be=ue[0],me=ue[1],Ee=Object(i.useState)([]),xe=Object(r.a)(Ee,2),Re=xe[0],De=xe[1],pe=Object(i.useState)(!1),ye=Object(r.a)(pe,2),ge=ye[0],_e=ye[1],Se=Object(i.useState)([]),fe=Object(r.a)(Se,2),Te=fe[0],Ie=fe[1],ve=function(){document.getElementById("divLoading").className="show",s()({method:"GET",url:j.a+"getAllUploadInvoiceOrders",headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e,t){return Object(c.a)(Object(c.a)({},e),{},{"Day Till Now":e.HDays,"Order Number":e.ORDER_NUMBER,"Order By":e.ORDER_BY,"Ordered Person":e.TypeName,"Order Type":e.ORDER_TYPE_NAME,"Supply Type":e.SUPPLY_NAME,Company:e.COMPANY_NAME,"Customer Name":e.CUSTOMER_NAME,Logistic:e.ORDER_LOGISTIC,"Logistic Designation":e.ORDER_LOGISTIC_DESTINATION,"Logistic Payment Mode":e.ORDER_LOGISTIC_PAY_MODE,"Delivery Type":e.ORDER_DELIVERY_TYPE,"Cash Discount":e.ORDER_CASH_DISCOUNT+"%","Grand Total":e.ORDER_ORDER_AMOUNT,"Invoice Number":e.ORDER_INVOICE_NUMBER})}));O(t),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}))};d.a.useEffect((function(){ve(),document.getElementById("divLoading").className="show",s()({method:"GET",url:j.a+"OrderSupplyType",headers:{"content-type":"application/json"},params:{language_code:"en"}}).then((function(e){var t=e.data.map((function(e,t){return Object(b.jsx)("option",{value:e.SUPPLY_TYPE_PKID,children:e.SUPPLY_NAME},t)}));Ie(t),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}))}),[]);var Ce=Object(l.g)();return Object(b.jsxs)("div",{id:"city",children:[Object(b.jsx)("div",{id:"divLoading",children:" "}),Object(b.jsx)("h1",{id:"ccmaster",children:"Invoice Uploaded Orders"}),Object(b.jsx)(a.H,{style:{marginTop:"3%"},children:Object(b.jsx)(a.j,{col:"12",children:Object(b.jsx)(a.e,{style:{boxShadow:"0px 0px 1px 1px #959595"},children:Object(b.jsx)(a.f,{children:Object(b.jsx)(a.H,{children:Object(b.jsx)(a.j,{children:Object(b.jsx)(a.e,{children:Object(b.jsxs)(a.f,{children:[Object(b.jsxs)(a.H,{children:[Object(b.jsxs)(a.j,{md:"2",children:[Object(b.jsx)(a.z,{htmlFor:"nf-email",children:"Select Order Type"}),Object(b.jsxs)(a.I,{custom:!0,name:"merchant",value:P,onChange:function(e){document.getElementById("divLoading").className="show",s()({method:"GET",url:j.a+"/getAllUploadInvoiceOrdersBySupplyType/"+e.target.value,headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e,t){return Object(c.a)(Object(c.a)({},e),{},{"Day Till Now":e.HDays,"Order Number":e.ORDER_NUMBER,"Order By":e.ORDER_BY,"Ordered Person":e.TypeName,"Order Type":e.ORDER_TYPE_NAME,"Supply Type":e.SUPPLY_NAME,Company:e.COMPANY_NAME,"Customer Name":e.CUSTOMER_NAME,Logistic:e.ORDER_LOGISTIC,"Logistic Designation":e.ORDER_LOGISTIC_DESTINATION,"Logistic Payment Mode":e.ORDER_LOGISTIC_PAY_MODE,"Delivery Type":e.ORDER_DELIVERY_TYPE,"Cash Discount":e.ORDER_CASH_DISCOUNT+"%","Grand Total":e.ORDER_ORDER_AMOUNT,"Invoice Number":e.ORDER_INVOICE_NUMBER})}));O(t),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}))},id:"merchant",children:[Object(b.jsx)("option",{value:"0",children:"All"}),Te]})]}),Object(b.jsxs)(a.j,{md:"2",children:[Object(b.jsx)(a.z,{htmlFor:"nf-email",children:"Select Month"}),Object(b.jsxs)(a.I,{custom:!0,name:"Marchant",id:"Marchant",value:G,onChange:function(e){document.getElementById("divLoading").className="show",s()({method:"GET",url:j.a+"/getAllUploadInvoiceOrdersByMonth/"+e.target.value,headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e,t){return Object(c.a)(Object(c.a)({},e),{},{"Day Till Now":e.HDays,"Order Number":e.ORDER_NUMBER,"Order By":e.ORDER_BY,"Ordered Person":e.TypeName,"Order Type":e.ORDER_TYPE_NAME,"Supply Type":e.SUPPLY_NAME,Company:e.COMPANY_NAME,"Customer Name":e.CUSTOMER_NAME,Logistic:e.ORDER_LOGISTIC,"Logistic Designation":e.ORDER_LOGISTIC_DESTINATION,"Logistic Payment Mode":e.ORDER_LOGISTIC_PAY_MODE,"Delivery Type":e.ORDER_DELIVERY_TYPE,"Cash Discount":e.ORDER_CASH_DISCOUNT+"%","Grand Total":e.ORDER_ORDER_AMOUNT,"Invoice Number":e.ORDER_INVOICE_NUMBER})}));O(t),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}))},children:[Object(b.jsx)("option",{value:"0",children:"All"}),Object(b.jsx)("option",{value:"1",children:"Jan"}),Object(b.jsx)("option",{value:"2",children:"Feb"}),Object(b.jsx)("option",{value:"3",children:"March"}),Object(b.jsx)("option",{value:"4",children:"April"}),Object(b.jsx)("option",{value:"5",children:"May"}),Object(b.jsx)("option",{value:"6",children:"Jun"}),Object(b.jsx)("option",{value:"7",children:"Jul"}),Object(b.jsx)("option",{value:"8",children:"Aug"}),Object(b.jsx)("option",{value:"9",children:"Sept"}),Object(b.jsx)("option",{value:"10",children:"Oct"}),Object(b.jsx)("option",{value:"11",children:"Nov"}),Object(b.jsx)("option",{value:"12",children:"Dec"})]})]}),Object(b.jsxs)(a.j,{md:"2",children:[Object(b.jsx)(a.z,{children:"From:"}),Object(b.jsx)(a.y,{type:"date",onChange:function(e){M(e.target.value)},value:B})]}),Object(b.jsxs)(a.j,{md:"2",children:[Object(b.jsx)(a.z,{children:"To:"}),Object(b.jsx)(a.y,{type:"date",onChange:function(e){K(e.target.value)},value:V})]}),Object(b.jsx)(a.j,{md:"2",children:Object(b.jsx)(a.d,{size:"sm",color:"info",style:{marginTop:"28px",width:"100%"},onClick:function(){""===B||null==B?e.fire({icon:"warning",title:"Select From Date!"}):""===V||null==V?e.fire({icon:"warning",title:"Select To Date!"}):(document.getElementById("divLoading").className="show",s()({method:"GET",url:j.a+"getAllUploadInvoiceOrdersByDate/"+B+"/"+V,headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e,t){return Object(c.a)(Object(c.a)({},e),{},{"Day Till Now":e.HDays,"Order Number":e.ORDER_NUMBER,"Order By":e.ORDER_BY,"Ordered Person":e.TypeName,"Order Type":e.ORDER_TYPE_NAME,"Supply Type":e.SUPPLY_NAME,Company:e.COMPANY_NAME,"Customer Name":e.CUSTOMER_NAME,Logistic:e.ORDER_LOGISTIC,"Logistic Designation":e.ORDER_LOGISTIC_DESTINATION,"Logistic Payment Mode":e.ORDER_LOGISTIC_PAY_MODE,"Delivery Type":e.ORDER_DELIVERY_TYPE,"Cash Discount":e.ORDER_CASH_DISCOUNT+"%","Grand Total":e.ORDER_ORDER_AMOUNT,"Invoice Number":e.ORDER_INVOICE_NUMBER})}));O(t),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)})))},children:"Filter"})}),Object(b.jsx)(a.j,{md:"2",children:Object(b.jsx)(a.d,{size:"sm",color:"danger",style:{marginTop:"28px",width:"100%"},onClick:function(){ve(),M(""),K(""),w("0"),F("0")},children:"Reset"})})]}),Object(b.jsx)("hr",{})]})})})})})})})}),Object(b.jsx)(a.H,{style:{marginTop:"3%"},children:Object(b.jsx)(a.j,{col:"12",children:Object(b.jsx)(a.e,{style:{boxShadow:"0px 0px 1px 1px #959595"},children:Object(b.jsx)(a.f,{children:Object(b.jsx)(a.H,{children:Object(b.jsx)(a.j,{children:Object(b.jsxs)(a.e,{children:[Object(b.jsx)(a.i,{children:"Invoice Uploaded Orders"}),Object(b.jsx)(a.f,{children:Object(b.jsx)(a.m,{items:o,fields:x,hover:!0,striped:!0,bordered:!0,sorter:!0,tableFilter:m,itemsPerPageSelect:E,size:"sm",itemsPerPage:10,pagination:!0,scopedSlots:{Invoice:function(e){return Object(b.jsx)(d.a.Fragment,{children:Object(b.jsx)("td",{children:Object(b.jsx)(a.A,{href:j.b+"/"+e.ORDER_INVOICE_DOC,target:"_blank",children:" View"})})})},Action:function(t){return Object(b.jsx)("td",{children:Object(b.jsx)(a.d,{onClick:function(){!function(t){var n=document.getElementById("DelStatus"+t).value;if("-1"===n)e.fire({icon:"warning",title:"Please Select Delivery Status"});else{document.getElementById("divLoading").className="show";var c={ORDER_PKID:t,ORDER_TRANSIT_STATUS:n};s.a.put(j.a+"deliveryConfirmOrder/"+t,c).then((function(e){!0===e.data?(h.a.fire({title:"Order Delivery Confirmed",icon:"success",confirmButtonText:"OK"}),Oe(!je),ve(),document.getElementById("divLoading").className="hide"):(h.a.fire({title:"Failed To Confirm",icon:"error",confirmButtonText:"OK"}),document.getElementById("divLoading").className="hide")}))}}(t.ORDER_PKID)},size:"sm",color:"success",children:"Confirm"})})},"Ordered Date":function(e){return Object(b.jsx)("td",{children:Object(b.jsx)(u.a,{date:e.ORDER_DATE})})},"Tentative Dispatched Date":function(e){return Object(b.jsx)("td",{children:Object(b.jsx)(u.a,{date:e.ORDER_TENTATIVE_DATE})})},"Invoice Date":function(e){return Object(b.jsx)("td",{children:Object(b.jsx)(u.a,{date:e.ORDER_DELIVERY_CONFIRMED_DATE})})},"Ordered Time":function(e){return Object(b.jsx)("td",{children:new Date(e.clock).toISOString().split("T")[1].slice(0,-1)})},"Delivery Status":function(e){return Object(b.jsx)("td",{children:Object(b.jsxs)(a.I,{custom:!0,name:"DelStatus",id:"DelStatus".concat(e.ORDER_PKID),children:[Object(b.jsx)("option",{value:"-1",children:"Select Delivery Type"}),Object(b.jsx)("option",{value:"intransit",children:"Intransit"}),Object(b.jsx)("option",{value:"Delivery",children:"Delivery"})]})})},"Order Items":function(e){return Object(b.jsx)("td",{children:Object(b.jsx)(a.d,{onClick:function(){Ce.push("/OrderItems",{data:e})},children:e.ItemCount})})},"Billing Address":function(e){return Object(b.jsx)("td",{children:Object(b.jsx)(a.H,{children:Object(b.jsx)(a.j,{md:"8",children:Object(b.jsx)(a.d,{color:"primary",size:"sm",id:"AddEmp",onClick:function(){var t;t=e.ORDER_PKID,document.getElementById("divLoading").className="show",s()({method:"GET",url:j.a+"OrderBillingAddress/"+t,headers:{"content-type":"application/json"}}).then((function(e){y(e.data),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)})),q(!Z)},children:"View"})})})})},"Shipping Address":function(e){return Object(b.jsx)("td",{children:Object(b.jsx)(a.H,{children:Object(b.jsx)(a.j,{md:"8",children:Object(b.jsx)(a.d,{color:"primary",size:"sm",id:"AddEmp",onClick:function(){var t;t=e.ORDER_PKID,document.getElementById("divLoading").className="show",s()({method:"GET",url:j.a+"OrderShippingAddress/"+t,headers:{"content-type":"application/json"}}).then((function(e){f(e.data),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)})),ee(!$)},children:"View"})})})})},"Manager Remark":function(e){return Object(b.jsx)("td",{children:Object(b.jsx)(a.H,{children:Object(b.jsx)(a.j,{md:"8",children:Object(b.jsx)(a.d,{color:"primary",size:"sm",id:"AddEmp",onClick:function(){var t;t=e.ORDER_PKID,document.getElementById("divLoading").className="show",s()({method:"GET",url:j.a+"OrderRemarkByManager/"+t,headers:{"content-type":"application/json"}}).then((function(e){De(e.data),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)})),_e(!ce)},children:"View"})})})})},Remark:function(e){return Object(b.jsx)("td",{children:Object(b.jsx)(a.H,{children:Object(b.jsx)(a.j,{md:"8",children:Object(b.jsx)(a.d,{color:"primary",size:"sm",id:"AddEmp",onClick:function(){var t;t=e.ORDER_PKID,document.getElementById("divLoading").className="show",s()({method:"GET",url:j.a+"OrderRemark/"+t,headers:{"content-type":"application/json"}}).then((function(e){C(e.data),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)})),re(!ce)},children:"View"})})})})},"Process Remark":function(e){return Object(b.jsx)("td",{children:Object(b.jsx)(a.H,{children:Object(b.jsx)(a.j,{md:"8",children:Object(b.jsx)(a.d,{color:"primary",size:"sm",id:"AddEmp",onClick:function(){var t;t=e.ORDER_PKID,document.getElementById("divLoading").className="show",s()({method:"GET",url:j.a+"OrderProcessRemark/"+t,headers:{"content-type":"application/json"}}).then((function(e){me(e.data),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)})),se(!oe)},children:"View"})})})})},Attachment:function(e){var t="";return t=""===e.ORD_DOC||null===e.ORD_DOC?"NoImage.png":e.ORD_DOC,Object(b.jsx)(d.a.Fragment,{children:Object(b.jsx)("td",{children:Object(b.jsx)(a.A,{href:j.b+"/"+t,target:"_blank",children:Object(b.jsx)(a.x,{src:j.b+"/"+t,fluid:!0,className:"mb-2",style:{width:"100%"}})})})})}}})})]})})})})})})}),Object(b.jsxs)(a.B,{show:Z,onClose:function(){return q(!Z)},color:"dark",children:[Object(b.jsx)(a.E,{closeButton:!0,children:Object(b.jsx)(a.F,{children:"Customer Billing Address"})}),Object(b.jsx)(a.C,{children:Object(b.jsx)(a.H,{children:p.map((function(e){return Object(b.jsx)(d.a.Fragment,{children:Object(b.jsxs)(a.j,{md:"12",children:[Object(b.jsx)("p",{style:{fontWeight:"700",fontFamily:"sans-serif",textAlign:"center",borderBottom:"1px solid #ebedef",paddingBottom:"5%"},children:"Billing Address"}),Object(b.jsxs)("table",{children:[Object(b.jsx)("tr",{children:Object(b.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS1})}),Object(b.jsx)("tr",{children:Object(b.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS2})}),Object(b.jsx)("tr",{children:Object(b.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS3})}),Object(b.jsx)("tr",{children:Object(b.jsx)("td",{children:e.CUSTOMER_ADDRESS_ZIP_CODE})})]})]})})}))})}),Object(b.jsx)(a.D,{children:Object(b.jsx)(a.d,{color:"secondary",onClick:function(){return q(!Z)},children:"Close"})})]}),Object(b.jsxs)(a.B,{show:$,onClose:function(){return ee(!$)},color:"dark",children:[Object(b.jsx)(a.E,{closeButton:!0,children:Object(b.jsx)(a.F,{children:"Customer Shipping Address"})}),Object(b.jsx)(a.C,{children:Object(b.jsx)(a.H,{children:S.map((function(e){return Object(b.jsx)(d.a.Fragment,{children:Object(b.jsxs)(a.j,{md:"12",children:[Object(b.jsx)("p",{style:{fontWeight:"700",fontFamily:"sans-serif",textAlign:"center",borderBottom:"1px solid #ebedef",paddingBottom:"5%"},children:"Shipping Address"}),Object(b.jsxs)("table",{children:[Object(b.jsx)("tr",{children:Object(b.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS1})}),Object(b.jsx)("tr",{children:Object(b.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS2})}),Object(b.jsx)("tr",{children:Object(b.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS3})}),Object(b.jsx)("tr",{children:Object(b.jsx)("td",{children:e.CUSTOMER_ADDRESS_ZIP_CODE})})]})]})})}))})}),Object(b.jsx)(a.D,{children:Object(b.jsx)(a.d,{color:"secondary",onClick:function(){return ee(!$)},children:"Close"})})]}),Object(b.jsxs)(a.B,{show:ce,onClose:function(){return re(!ce)},color:"dark",children:[Object(b.jsx)(a.E,{closeButton:!0,children:Object(b.jsx)(a.F,{children:"Order Remark"})}),Object(b.jsx)(a.C,{children:Object(b.jsx)(a.H,{children:v.map((function(e){return Object(b.jsx)(d.a.Fragment,{children:Object(b.jsx)(a.j,{md:"12",children:Object(b.jsx)("table",{children:Object(b.jsx)("tr",{children:Object(b.jsx)("td",{children:e.ORDER_REMARK})})})})})}))})}),Object(b.jsx)(a.D,{children:Object(b.jsx)(a.d,{color:"secondary",onClick:function(){return re(!ce)},children:"Close"})})]}),Object(b.jsxs)(a.B,{show:oe,onClose:function(){return se(!oe)},color:"dark",children:[Object(b.jsx)(a.E,{closeButton:!0,children:Object(b.jsx)(a.F,{children:"Process Remark"})}),Object(b.jsx)(a.C,{children:Object(b.jsx)(a.H,{children:be.map((function(e){return Object(b.jsx)(d.a.Fragment,{children:Object(b.jsx)(a.j,{md:"12",children:Object(b.jsx)("table",{children:Object(b.jsx)("tr",{children:Object(b.jsx)("td",{children:e.ORDER_REMARK_BY_PROCESSTEAM})})})})})}))})}),Object(b.jsx)(a.D,{children:Object(b.jsx)(a.d,{color:"secondary",onClick:function(){return se(!oe)},children:"Close"})})]}),Object(b.jsxs)(a.B,{show:ge,onClose:function(){return _e(!ge)},color:"dark",children:[Object(b.jsx)(a.E,{closeButton:!0,children:Object(b.jsx)(a.F,{children:"Order Remark From Manager"})}),Object(b.jsx)(a.C,{children:Object(b.jsx)(a.H,{children:Re.map((function(e){return Object(b.jsx)(d.a.Fragment,{children:Object(b.jsxs)(a.j,{md:"12",children:[Object(b.jsx)("p",{style:{fontWeight:"700",fontFamily:"sans-serif",textAlign:"center",borderBottom:"1px solid #ebedef",paddingBottom:"5%"},children:"Remark"}),Object(b.jsx)("table",{children:Object(b.jsx)("tr",{children:Object(b.jsx)("td",{children:e.ORDER_MANAGER_REMARK})})})]})})}))})}),Object(b.jsx)(a.D,{children:Object(b.jsx)(a.d,{color:"secondary",onClick:function(){return _e(!ge)},children:"Close"})})]})]})}}}]);
//# sourceMappingURL=92.94757a5b.chunk.js.map