(this.webpackJsonpzeus_cms_kimo=this.webpackJsonpzeus_cms_kimo||[]).push([[91],{624:function(e,t,n){"use strict";n.d(t,"a",(function(){return c})),n.d(t,"b",(function(){return i}));var c="https://zeusservices.onrender.com/api/",i="https://zeusservices.onrender.com/"},625:function(e,t,n){},629:function(e,t,n){"use strict";function c(e){var t=e.date,n=new Date(new Date(t).toISOString().split("T")[0]);return"".concat(n.getDate().toString().padStart(2,"0"),"-").concat((n.getMonth()+1).toString().padStart(2,"0"),"-").concat(n.getFullYear())}n.d(t,"a",(function(){return c}))},906:function(e,t,n){"use strict";n.r(t);var c=n(25),i=n(627),r=n(1),d=n.n(r),o=n(628),s=n.n(o),a=n(626),l=n(20),j=n(624),O=n(630),h=n.n(O),u=n(629),b=(n(625),n(12)),m={placeholder:"Search here...",label:"Search:  "},E={label:"Rows:",values:[5,10,25,50,75,100]},x=[{key:"Action"},{key:"Invoice Number"},{key:"Invoice Date"},{key:"Tentative Dispatched Date"},{key:"Ordered Date"},{key:"Ordered Time"},{key:"Customer Name"},{key:"Order Items"},{key:"Company"},{key:"Order Number"},{key:"Order By"},{key:"Ordered Person"},{key:"Order Type"},{key:"Supply Type"},{key:"Day Till Now"},{key:"Billing Address"},{key:"Shipping Address"},{key:"Logistic"},{key:"Logistic Designation"},{key:"Logistic Payment Mode"},{key:"Delivery Type"},{key:"Cash Discount"},{key:"Grand Total"},{key:"Attachment"},{key:"Remark"},{key:"Process Remark"},{key:"Manager Remark"}];t.default=function(){var e=h.a.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:function(e){e.addEventListener("mouseenter",h.a.stopTimer),e.addEventListener("mouseleave",h.a.resumeTimer)}}),t=Object(r.useState)([]),n=Object(i.a)(t,2),o=n[0],O=n[1],p=Object(r.useState)([]),R=Object(i.a)(p,2),D=R[0],y=R[1],g=Object(r.useState)([]),_=Object(i.a)(g,2),f=_[0],S=_[1],I=Object(r.useState)([]),T=Object(i.a)(I,2),C=T[0],N=T[1],v=Object(r.useState)(),A=Object(i.a)(v,2),B=A[0],M=A[1],k=Object(r.useState)(),L=Object(i.a)(k,2),P=L[0],w=L[1],U=Object(r.useState)(),Y=Object(i.a)(U,2),F=Y[0],G=Y[1],H=Object(r.useState)(),z=Object(i.a)(H,2),V=z[0],K=z[1],J=Object(r.useState)(!1),W=Object(i.a)(J,2),Z=W[0],q=W[1],Q=Object(r.useState)(!1),X=Object(i.a)(Q,2),$=X[0],ee=X[1],te=Object(r.useState)(!1),ne=Object(i.a)(te,2),ce=ne[0],ie=ne[1],re=Object(r.useState)(!1),de=Object(i.a)(re,2),oe=de[0],se=de[1],ae=Object(r.useState)(!1),le=Object(i.a)(ae,2),je=le[0],Oe=le[1],he=Object(r.useState)([]),ue=Object(i.a)(he,2),be=ue[0],me=ue[1],Ee=Object(r.useState)(),xe=Object(i.a)(Ee,2),pe=xe[0],Re=xe[1],De=Object(r.useState)(),ye=Object(i.a)(De,2),ge=ye[0],_e=ye[1],fe=Object(r.useState)([]),Se=Object(i.a)(fe,2),Ie=Se[0],Te=Se[1],Ce=Object(r.useState)(!1),Ne=Object(i.a)(Ce,2),ve=Ne[0],Ae=Ne[1],Be=Object(r.useState)([]),Me=Object(i.a)(Be,2),ke=Me[0],Le=Me[1],Pe=function(){document.getElementById("divLoading").className="show",s()({method:"GET",url:j.a+"getAllConfirmForInvoiceOrders",headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e,t){return Object(c.a)(Object(c.a)({},e),{},{"Day Till Now":e.HDays,"Order Number":e.ORDER_NUMBER,"Order By":e.ORDER_BY,"Ordered Person":e.TypeName,"Order Type":e.ORDER_TYPE_NAME,"Supply Type":e.SUPPLY_NAME,Company:e.COMPANY_NAME,"Customer Name":e.CUSTOMER_NAME,Logistic:e.ORDER_LOGISTIC,"Logistic Designation":e.ORDER_LOGISTIC_DESTINATION,"Logistic Payment Mode":e.ORDER_LOGISTIC_PAY_MODE,"Delivery Type":e.ORDER_DELIVERY_TYPE,"Cash Discount":e.ORDER_CASH_DISCOUNT+"%","Grand Total":e.ORDER_ORDER_AMOUNT,"Invoice Number":e.ORDER_INVOICE_NUMBER})}));O(t),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}))};d.a.useEffect((function(){Pe(),document.getElementById("divLoading").className="show",s()({method:"GET",url:j.a+"OrderSupplyType",headers:{"content-type":"application/json"},params:{language_code:"en"}}).then((function(e){var t=e.data.map((function(e,t){return Object(b.jsx)("option",{value:e.SUPPLY_TYPE_PKID,children:e.SUPPLY_NAME},t)}));Le(t),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}))}),[]);var we=Object(l.g)();return Object(b.jsxs)("div",{id:"city",children:[Object(b.jsx)("div",{id:"divLoading",children:" "}),Object(b.jsx)("h1",{id:"ccmaster",children:"Invoice Confirmed Orders"}),Object(b.jsx)(a.H,{style:{marginTop:"3%"},children:Object(b.jsx)(a.j,{col:"12",children:Object(b.jsx)(a.e,{style:{boxShadow:"0px 0px 1px 1px #959595"},children:Object(b.jsx)(a.f,{children:Object(b.jsx)(a.H,{children:Object(b.jsx)(a.j,{children:Object(b.jsx)(a.e,{children:Object(b.jsxs)(a.f,{children:[Object(b.jsxs)(a.H,{children:[Object(b.jsxs)(a.j,{md:"2",children:[Object(b.jsx)(a.z,{htmlFor:"nf-email",children:"Select Order Type"}),Object(b.jsxs)(a.I,{custom:!0,name:"merchant",value:P,onChange:function(e){document.getElementById("divLoading").className="show",s()({method:"GET",url:j.a+"/getAllConfirmForInvoiceOrdersBySupplyType/"+e.target.value,headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e,t){return Object(c.a)(Object(c.a)({},e),{},{"Day Till Now":e.HDays,"Order Number":e.ORDER_NUMBER,"Order By":e.ORDER_BY,"Ordered Person":e.TypeName,"Order Type":e.ORDER_TYPE_NAME,"Supply Type":e.SUPPLY_NAME,Company:e.COMPANY_NAME,"Customer Name":e.CUSTOMER_NAME,Logistic:e.ORDER_LOGISTIC,"Logistic Designation":e.ORDER_LOGISTIC_DESTINATION,"Logistic Payment Mode":e.ORDER_LOGISTIC_PAY_MODE,"Delivery Type":e.ORDER_DELIVERY_TYPE,"Cash Discount":e.ORDER_CASH_DISCOUNT+"%","Grand Total":e.ORDER_ORDER_AMOUNT,"Invoice Number":e.ORDER_INVOICE_NUMBER})}));O(t),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}))},id:"merchant",children:[Object(b.jsx)("option",{value:"0",children:"All"}),ke]})]}),Object(b.jsxs)(a.j,{md:"2",children:[Object(b.jsx)(a.z,{htmlFor:"nf-email",children:"Select Month"}),Object(b.jsxs)(a.I,{custom:!0,name:"Marchant",id:"Marchant",value:F,onChange:function(e){document.getElementById("divLoading").className="show",s()({method:"GET",url:j.a+"/getAllConfirmForInvoiceOrdersByMonth/"+e.target.value,headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e,t){return Object(c.a)(Object(c.a)({},e),{},{"Day Till Now":e.HDays,"Order Number":e.ORDER_NUMBER,"Order By":e.ORDER_BY,"Ordered Person":e.TypeName,"Order Type":e.ORDER_TYPE_NAME,"Supply Type":e.SUPPLY_NAME,Company:e.COMPANY_NAME,"Customer Name":e.CUSTOMER_NAME,Logistic:e.ORDER_LOGISTIC,"Logistic Designation":e.ORDER_LOGISTIC_DESTINATION,"Logistic Payment Mode":e.ORDER_LOGISTIC_PAY_MODE,"Delivery Type":e.ORDER_DELIVERY_TYPE,"Cash Discount":e.ORDER_CASH_DISCOUNT+"%","Grand Total":e.ORDER_ORDER_AMOUNT,"Invoice Number":e.ORDER_INVOICE_NUMBER})}));O(t),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}))},children:[Object(b.jsx)("option",{value:"0",children:"All"}),Object(b.jsx)("option",{value:"1",children:"Jan"}),Object(b.jsx)("option",{value:"2",children:"Feb"}),Object(b.jsx)("option",{value:"3",children:"March"}),Object(b.jsx)("option",{value:"4",children:"April"}),Object(b.jsx)("option",{value:"5",children:"May"}),Object(b.jsx)("option",{value:"6",children:"Jun"}),Object(b.jsx)("option",{value:"7",children:"Jul"}),Object(b.jsx)("option",{value:"8",children:"Aug"}),Object(b.jsx)("option",{value:"9",children:"Sept"}),Object(b.jsx)("option",{value:"10",children:"Oct"}),Object(b.jsx)("option",{value:"11",children:"Nov"}),Object(b.jsx)("option",{value:"12",children:"Dec"})]})]}),Object(b.jsxs)(a.j,{md:"2",children:[Object(b.jsx)(a.z,{children:"From:"}),Object(b.jsx)(a.y,{type:"date",onChange:function(e){M(e.target.value)},value:B})]}),Object(b.jsxs)(a.j,{md:"2",children:[Object(b.jsx)(a.z,{children:"To:"}),Object(b.jsx)(a.y,{type:"date",onChange:function(e){K(e.target.value)},value:V})]}),Object(b.jsx)(a.j,{md:"2",children:Object(b.jsx)(a.d,{size:"sm",color:"info",style:{marginTop:"28px",width:"100%"},onClick:function(){""===B||null==B?e.fire({icon:"warning",title:"Select From Date!"}):""===V||null==V?e.fire({icon:"warning",title:"Select To Date!"}):(document.getElementById("divLoading").className="show",s()({method:"GET",url:j.a+"getAllConfirmForInvoiceOrdersByDate/"+B+"/"+V,headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e,t){return Object(c.a)(Object(c.a)({},e),{},{"Day Till Now":e.HDays,"Order Number":e.ORDER_NUMBER,"Order By":e.ORDER_BY,"Ordered Person":e.TypeName,"Order Type":e.ORDER_TYPE_NAME,"Supply Type":e.SUPPLY_NAME,Company:e.COMPANY_NAME,"Customer Name":e.CUSTOMER_NAME,Logistic:e.ORDER_LOGISTIC,"Logistic Designation":e.ORDER_LOGISTIC_DESTINATION,"Logistic Payment Mode":e.ORDER_LOGISTIC_PAY_MODE,"Delivery Type":e.ORDER_DELIVERY_TYPE,"Cash Discount":e.ORDER_CASH_DISCOUNT+"%","Grand Total":e.ORDER_ORDER_AMOUNT,"Invoice Number":e.ORDER_INVOICE_NUMBER})}));O(t),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)})))},children:"Filter"})}),Object(b.jsx)(a.j,{md:"2",children:Object(b.jsx)(a.d,{size:"sm",color:"danger",style:{marginTop:"28px",width:"100%"},onClick:function(){Pe(),M(""),K(""),w("0"),G("0")},children:"Reset"})})]}),Object(b.jsx)("hr",{})]})})})})})})})}),Object(b.jsx)(a.H,{style:{marginTop:"3%"},children:Object(b.jsx)(a.j,{col:"12",children:Object(b.jsx)(a.e,{style:{boxShadow:"0px 0px 1px 1px #959595"},children:Object(b.jsx)(a.f,{children:Object(b.jsx)(a.H,{children:Object(b.jsx)(a.j,{children:Object(b.jsxs)(a.e,{children:[Object(b.jsx)(a.i,{children:"Invoice Confirmed Orders"}),Object(b.jsx)(a.f,{children:Object(b.jsx)(a.m,{items:o,fields:x,hover:!0,striped:!0,bordered:!0,sorter:!0,tableFilter:m,itemsPerPageSelect:E,size:"sm",itemsPerPage:10,pagination:!0,scopedSlots:{Action:function(e){return Object(b.jsx)("td",{children:Object(b.jsx)(a.d,{onClick:function(){var t;t=e.ORDER_PKID,Oe(!je),Re(t)},size:"sm",color:"success",children:"Invoice Upload"})})},"Ordered Date":function(e){return Object(b.jsx)("td",{children:Object(b.jsx)(u.a,{date:e.ORDER_DATE})})},"Tentative Dispatched Date":function(e){return Object(b.jsx)("td",{children:Object(b.jsx)(u.a,{date:e.ORDER_TENTATIVE_DATE})})},"Invoice Date":function(e){return Object(b.jsx)("td",{children:Object(b.jsx)(u.a,{date:e.ORDER_DELIVERY_CONFIRMED_DATE})})},"Ordered Time":function(e){return Object(b.jsx)("td",{children:new Date(e.clock).toISOString().split("T")[1].slice(0,-1)})},"Order Items":function(e){return Object(b.jsx)("td",{children:Object(b.jsx)(a.d,{onClick:function(){we.push("/OrderItems",{data:e})},children:e.ItemCount})})},"Billing Address":function(e){return Object(b.jsx)("td",{children:Object(b.jsx)(a.H,{children:Object(b.jsx)(a.j,{md:"8",children:Object(b.jsx)(a.d,{color:"primary",size:"sm",id:"AddEmp",onClick:function(){var t;t=e.ORDER_PKID,document.getElementById("divLoading").className="show",s()({method:"GET",url:j.a+"OrderBillingAddress/"+t,headers:{"content-type":"application/json"}}).then((function(e){y(e.data),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)})),q(!Z)},children:"View"})})})})},"Shipping Address":function(e){return Object(b.jsx)("td",{children:Object(b.jsx)(a.H,{children:Object(b.jsx)(a.j,{md:"8",children:Object(b.jsx)(a.d,{color:"primary",size:"sm",id:"AddEmp",onClick:function(){var t;t=e.ORDER_PKID,document.getElementById("divLoading").className="show",s()({method:"GET",url:j.a+"OrderShippingAddress/"+t,headers:{"content-type":"application/json"}}).then((function(e){S(e.data),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)})),ee(!$)},children:"View"})})})})},Remark:function(e){return Object(b.jsx)("td",{children:Object(b.jsx)(a.H,{children:Object(b.jsx)(a.j,{md:"8",children:Object(b.jsx)(a.d,{color:"primary",size:"sm",id:"AddEmp",onClick:function(){var t;t=e.ORDER_PKID,document.getElementById("divLoading").className="show",s()({method:"GET",url:j.a+"OrderRemark/"+t,headers:{"content-type":"application/json"}}).then((function(e){N(e.data),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)})),ie(!ce)},children:"View"})})})})},"Process Remark":function(e){return Object(b.jsx)("td",{children:Object(b.jsx)(a.H,{children:Object(b.jsx)(a.j,{md:"8",children:Object(b.jsx)(a.d,{color:"primary",size:"sm",id:"AddEmp",onClick:function(){var t;t=e.ORDER_PKID,document.getElementById("divLoading").className="show",s()({method:"GET",url:j.a+"OrderProcessRemark/"+t,headers:{"content-type":"application/json"}}).then((function(e){me(e.data),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)})),se(!oe)},children:"View"})})})})},"Manager Remark":function(e){return Object(b.jsx)("td",{children:Object(b.jsx)(a.H,{children:Object(b.jsx)(a.j,{md:"8",children:Object(b.jsx)(a.d,{color:"primary",size:"sm",id:"AddEmp",onClick:function(){var t;t=e.ORDER_PKID,document.getElementById("divLoading").className="show",s()({method:"GET",url:j.a+"OrderRemarkByManager/"+t,headers:{"content-type":"application/json"}}).then((function(e){Te(e.data),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)})),Ae(!ce)},children:"View"})})})})},Attachment:function(e){var t="";return t=""===e.ORD_DOC||null===e.ORD_DOC?"NoImage.png":e.ORD_DOC,Object(b.jsx)(d.a.Fragment,{children:Object(b.jsx)("td",{children:Object(b.jsx)(a.A,{href:j.b+"/"+t,target:"_blank",children:Object(b.jsx)(a.x,{src:j.b+"/"+t,fluid:!0,className:"mb-2",style:{width:"100%"}})})})})}}})})]})})})})})})}),Object(b.jsxs)(a.B,{show:Z,onClose:function(){return q(!Z)},color:"dark",children:[Object(b.jsx)(a.E,{closeButton:!0,children:Object(b.jsx)(a.F,{children:"Customer Billing Address"})}),Object(b.jsx)(a.C,{children:Object(b.jsx)(a.H,{children:D.map((function(e){return Object(b.jsx)(d.a.Fragment,{children:Object(b.jsxs)(a.j,{md:"12",children:[Object(b.jsx)("p",{style:{fontWeight:"700",fontFamily:"sans-serif",textAlign:"center",borderBottom:"1px solid #ebedef",paddingBottom:"5%"},children:"Billing Address"}),Object(b.jsxs)("table",{children:[Object(b.jsx)("tr",{children:Object(b.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS1})}),Object(b.jsx)("tr",{children:Object(b.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS2})}),Object(b.jsx)("tr",{children:Object(b.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS3})}),Object(b.jsx)("tr",{children:Object(b.jsx)("td",{children:e.CUSTOMER_ADDRESS_ZIP_CODE})})]})]})})}))})}),Object(b.jsx)(a.D,{children:Object(b.jsx)(a.d,{color:"secondary",onClick:function(){return q(!Z)},children:"Close"})})]}),Object(b.jsxs)(a.B,{show:$,onClose:function(){return ee(!$)},color:"dark",children:[Object(b.jsx)(a.E,{closeButton:!0,children:Object(b.jsx)(a.F,{children:"Customer Shipping Address"})}),Object(b.jsx)(a.C,{children:Object(b.jsx)(a.H,{children:f.map((function(e){return Object(b.jsx)(d.a.Fragment,{children:Object(b.jsxs)(a.j,{md:"12",children:[Object(b.jsx)("p",{style:{fontWeight:"700",fontFamily:"sans-serif",textAlign:"center",borderBottom:"1px solid #ebedef",paddingBottom:"5%"},children:"Shipping Address"}),Object(b.jsxs)("table",{children:[Object(b.jsx)("tr",{children:Object(b.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS1})}),Object(b.jsx)("tr",{children:Object(b.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS2})}),Object(b.jsx)("tr",{children:Object(b.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS3})}),Object(b.jsx)("tr",{children:Object(b.jsx)("td",{children:e.CUSTOMER_ADDRESS_ZIP_CODE})})]})]})})}))})}),Object(b.jsx)(a.D,{children:Object(b.jsx)(a.d,{color:"secondary",onClick:function(){return ee(!$)},children:"Close"})})]}),Object(b.jsxs)(a.B,{show:ce,onClose:function(){return ie(!ce)},color:"dark",children:[Object(b.jsx)(a.E,{closeButton:!0,children:Object(b.jsx)(a.F,{children:"Order Remark"})}),Object(b.jsx)(a.C,{children:Object(b.jsx)(a.H,{children:C.map((function(e){return Object(b.jsx)(d.a.Fragment,{children:Object(b.jsx)(a.j,{md:"12",children:Object(b.jsx)("table",{children:Object(b.jsx)("tr",{children:Object(b.jsx)("td",{children:e.ORDER_REMARK})})})})})}))})}),Object(b.jsx)(a.D,{children:Object(b.jsx)(a.d,{color:"secondary",onClick:function(){return ie(!ce)},children:"Close"})})]}),Object(b.jsxs)(a.B,{show:oe,onClose:function(){return se(!oe)},color:"dark",children:[Object(b.jsx)(a.E,{closeButton:!0,children:Object(b.jsx)(a.F,{children:"Process Remark"})}),Object(b.jsx)(a.C,{children:Object(b.jsx)(a.H,{children:be.map((function(e){return Object(b.jsx)(d.a.Fragment,{children:Object(b.jsx)(a.j,{md:"12",children:Object(b.jsx)("table",{children:Object(b.jsx)("tr",{children:Object(b.jsx)("td",{children:e.ORDER_REMARK_BY_PROCESSTEAM})})})})})}))})}),Object(b.jsx)(a.D,{children:Object(b.jsx)(a.d,{color:"secondary",onClick:function(){return se(!oe)},children:"Close"})})]}),Object(b.jsxs)(a.B,{show:je,onClose:function(){return Oe(!je)},color:"dark",children:[Object(b.jsx)(a.E,{closeButton:!0,children:Object(b.jsx)(a.F,{children:"Upload Invoice"})}),Object(b.jsx)(a.C,{children:Object(b.jsx)(a.H,{style:{padding:"0% 5% 0% 5% !important"},children:Object(b.jsxs)(a.j,{xs:"12",md:"12",children:[Object(b.jsx)(a.z,{children:" Invoice Upload"}),Object(b.jsx)(a.y,{type:"file",id:"exampleInputName2",placeholder:" ",onChange:function(e){document.getElementById("divLoading").className="show";var t=new FormData;t.append("file",e.target.files[0]),s.a.post(j.a+"upload",t).then((function(e){_e(e.data),document.getElementById("divLoading").className="hide"}))}})]})})}),Object(b.jsxs)(a.D,{children:[Object(b.jsx)(a.d,{color:"secondary",onClick:function(){return Oe(!je)},children:"Close"}),Object(b.jsx)(a.d,{color:"secondary",onClick:function(){document.getElementById("divLoading").className="show";var e={ORDER_PKID:pe,ORDER_INVOICE_DOC:ge};s.a.put(j.a+"UploadInvoice/"+pe,e).then((function(e){!0===e.data?(h.a.fire({title:"Invoice Uploaded Successfully",icon:"success",confirmButtonText:"OK"}),Oe(!je),Pe(),document.getElementById("divLoading").className="hide"):(h.a.fire({title:"Failed To Upload",icon:"error",confirmButtonText:"OK"}),document.getElementById("divLoading").className="hide")}))},children:"Submit"})]})]}),Object(b.jsxs)(a.B,{show:ve,onClose:function(){return Ae(!ve)},color:"dark",children:[Object(b.jsx)(a.E,{closeButton:!0,children:Object(b.jsx)(a.F,{children:"Order Remark From Manager"})}),Object(b.jsx)(a.C,{children:Object(b.jsx)(a.H,{children:Ie.map((function(e){return Object(b.jsx)(d.a.Fragment,{children:Object(b.jsxs)(a.j,{md:"12",children:[Object(b.jsx)("p",{style:{fontWeight:"700",fontFamily:"sans-serif",textAlign:"center",borderBottom:"1px solid #ebedef",paddingBottom:"5%"},children:"Remark"}),Object(b.jsx)("table",{children:Object(b.jsx)("tr",{children:Object(b.jsx)("td",{children:e.ORDER_MANAGER_REMARK})})})]})})}))})}),Object(b.jsx)(a.D,{children:Object(b.jsx)(a.d,{color:"secondary",onClick:function(){return Ae(!ve)},children:"Close"})})]})]})}}}]);
//# sourceMappingURL=91.a574f63d.chunk.js.map