(this.webpackJsonpzeus_cms_kimo=this.webpackJsonpzeus_cms_kimo||[]).push([[94],{624:function(e,t,c){"use strict";c.d(t,"a",(function(){return n})),c.d(t,"b",(function(){return d}));var n="https://zeusservices.onrender.com/api/",d="https://zeusservices.onrender.com/"},625:function(e,t,c){},629:function(e,t,c){"use strict";function n(e){var t=e.date,c=new Date(new Date(t).toISOString().split("T")[0]);return"".concat(c.getDate().toString().padStart(2,"0"),"-").concat((c.getMonth()+1).toString().padStart(2,"0"),"-").concat(c.getFullYear())}c.d(t,"a",(function(){return n}))},892:function(e,t,c){"use strict";c.r(t);var n=c(627),d=c(1),r=c.n(d),i=c(628),s=c.n(i),l=c(626),j=c(20),o=c(624),a=c(629),h=(c(625),c(12));t.default=function(){var e=Object(d.useState)([]),t=Object(n.a)(e,2),c=t[0],i=t[1],O=Object(d.useState)([]),b=Object(n.a)(O,2),x=b[0],m=b[1],u=Object(d.useState)(!1),E=Object(n.a)(u,2),p=E[0],D=E[1],S=Object(d.useState)(!1),g=Object(n.a)(S,2),R=g[0],y=g[1],f=Object(d.useState)(!1),A=Object(n.a)(f,2),_=A[0],C=A[1],T=Object(d.useState)([]),v=Object(n.a)(T,2),I=v[0],N=v[1],L=Object(d.useState)([]),B=Object(n.a)(L,2),M=B[0],w=B[1],k=Object(d.useState)([]),G=Object(n.a)(k,2),P=G[0],U=G[1],F=function(){document.getElementById("divLoading").className="show",s()({method:"GET",url:o.a+"GetAreaWiseSaleWithoutCom",headers:{"content-type":"application/json"}}).then((function(e){i(e.data),Y(),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}))},Y=function(){document.getElementById("divLoading").className="show",s()({method:"GET",url:o.a+"GetAllOrdAreaWithoutCompany",headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e,t){return Object(h.jsx)("option",{value:e.VILLAGE_PKID,children:e.VILLAGE_NAME+"( "+e.ordcnt+" )"},t)}));m(t),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}))};r.a.useEffect((function(){F()}),[]);var H=Object(j.g)();return Object(h.jsxs)("div",{children:[Object(h.jsx)("div",{id:"divLoading",children:" "}),Object(h.jsx)("h1",{id:"ccmaster",children:"Area Wise Sales Report"}),Object(h.jsxs)(l.H,{style:{marginTop:"3%"},children:[Object(h.jsx)(l.j,{md:"2"}),Object(h.jsx)(l.j,{md:"12",children:Object(h.jsx)(l.e,{style:{boxShadow:"0px 0px 1px 1px #959595"},children:Object(h.jsx)(l.f,{children:Object(h.jsx)(l.H,{children:Object(h.jsxs)(l.j,{children:[Object(h.jsx)(l.e,{children:Object(h.jsx)(l.f,{children:Object(h.jsx)(l.H,{children:Object(h.jsxs)(l.j,{md:"3",children:[Object(h.jsx)(l.z,{htmlFor:"nf-email",children:"Select Area"}),Object(h.jsxs)(l.I,{custom:!0,name:"merchant",onChange:function(e){"0"===e.target.value?F():(document.getElementById("divLoading").className="show",s()({method:"GET",url:o.a+"/GetOrderSalesByArea/"+e.target.value,headers:{"content-type":"application/json"}}).then((function(e){i(e.data),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)})))},id:"merchant",children:[Object(h.jsxs)("option",{value:"0",children:["All (",c.length," )"]}),x]})]})})})}),Object(h.jsxs)(l.e,{children:[Object(h.jsx)(l.i,{children:Object(h.jsxs)(l.H,{children:[Object(h.jsx)(l.j,{col:"6",children:"Order Details"}),Object(h.jsx)(l.j,{col:"6",children:Object(h.jsx)(l.d,{onClick:function(){document.getElementById("divLoading").className="show";var e=0,t=new Array;t.push('"Sl No","Area","Status","Order Date","Order Time","Time Till Now","Order Number","Order By","Order Placed By","Order Items","Supply Type","Company","Customer Name","Logistic","Logistic Designation","Logistic Payment Mode","Delivery Type","Cash Discount","Grand Total"');var n="";c.map((function(c){n="Delivery Confirmed";var d=new Date(new Date(c.ORDER_DATE).toISOString().split("T")[0]),r="".concat(d.getDate().toString().padStart(2,"0"),"-").concat((d.getMonth()+1).toString().padStart(2,"0"),"-").concat(d.getFullYear()),i=new Date(c.clock).toISOString().split("T")[1].slice(0,-1);return e++,t.push('"'+e+'","'+c.VILLAGE_NAME+'","'+n+'","'+r+'","'+i+'","'+c.hrs+' hrs","'+c.ORDER_NUMBER+'","'+c.ORDER_BY+'","'+c.TypeName+'","'+c.ItemCount+'","'+c.SUPPLY_NAME+'","'+c.COMPANY_NAME+'","'+c.CUSTOMER_NAME+'","'+c.ORDER_LOGISTIC+'","'+c.ORDER_LOGISTIC_DESTINATION+'","'+c.ORDER_LOGISTIC_PAY_MODE+'","'+c.ORDER_DELIVERY_TYPE+'","'+c.ORDER_CASH_DISCOUNT+'","'+c.ORDER_ORDER_AMOUNT+'"')}));var d="Orders List.csv",r=t.join("\n"),i=new Blob([r],{type:"text/csv;charset=utf8;"}),s=document.createElement("a");void 0!==s.download?(s.setAttribute("href",window.URL.createObjectURL(i)),s.setAttribute("download",d),s.style="visibility:hidden",document.body.appendChild(s),s.click(),document.body.removeChild(s)):navigator.msSaveBlob&&navigator.msSaveBlob(i,d),document.getElementById("divLoading").className="hide"},color:"primary",style:{marginTop:"0%"},size:"sm",id:"AddEmp",children:"Export To Excel"})})]})}),Object(h.jsx)(l.f,{children:Object(h.jsx)(l.H,{children:Object(h.jsx)(l.j,{md:"12",children:Object(h.jsx)("div",{style:{overflow:"auto"},children:Object(h.jsxs)("table",{id:"Attendence",children:[Object(h.jsx)("thead",{children:Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:"Sl"}),Object(h.jsx)("th",{children:"Area"}),Object(h.jsx)("th",{className:"AreaStatus",children:"Status"}),Object(h.jsx)("th",{children:"Order Date"}),Object(h.jsx)("th",{children:"Order Time"}),Object(h.jsx)("th",{children:"Time Till Now"}),Object(h.jsx)("th",{children:"Days Till Now"}),Object(h.jsx)("th",{children:"Order Number"}),Object(h.jsx)("th",{children:"Order By"}),Object(h.jsx)("th",{children:"Order Placed By"}),Object(h.jsx)("th",{children:"Order Items"}),Object(h.jsx)("th",{children:"Supply Type"}),Object(h.jsx)("th",{children:"Company"}),Object(h.jsx)("th",{children:"Customer Name"}),Object(h.jsx)("th",{children:"Billing Address"}),Object(h.jsx)("th",{children:"Shipping Address"}),Object(h.jsx)("th",{children:"Logistic"}),Object(h.jsx)("th",{children:"Logistic Designation"}),Object(h.jsx)("th",{children:"Logistic Payment Mode"}),Object(h.jsx)("th",{children:"Delivery Type"}),Object(h.jsx)("th",{children:"Cash Discount"}),Object(h.jsx)("th",{children:"Grand Total"}),Object(h.jsx)("th",{children:"Remark"})]})}),Object(h.jsx)("tbody",{children:c.map((function(e,t){return'<td><span class="ReadyForDelivery">Delivery Confirmed </span></td>',Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{children:t+1}),Object(h.jsx)("td",{children:e.VILLAGE_NAME}),Object(h.jsx)("td",{children:Object(h.jsx)("div",{dangerouslySetInnerHTML:{__html:'<td><span class="ReadyForDelivery">Delivery Confirmed </span></td>'}})}),Object(h.jsx)("td",{children:Object(h.jsx)(a.a,{date:e.ORDER_DATE})}),Object(h.jsx)("td",{children:new Date(e.clock).toISOString().split("T")[1].slice(0,-1)}),Object(h.jsxs)("td",{children:[e.hrs,"hrs"]}),Object(h.jsx)("td",{children:e.HDays}),Object(h.jsx)("td",{children:e.ORDER_NUMBER}),Object(h.jsx)("td",{children:e.ORDER_BY}),Object(h.jsx)("td",{children:e.TypeName}),Object(h.jsx)("td",{children:Object(h.jsx)(l.d,{style:{float:"none"},onClick:function(){H.push("/OrderItems",{data:e})},children:e.ItemCount})}),Object(h.jsx)("td",{children:e.SUPPLY_NAME}),Object(h.jsx)("td",{children:e.COMPANY_NAME}),Object(h.jsx)("td",{children:e.CUSTOMER_NAME}),Object(h.jsx)("td",{children:Object(h.jsx)(l.d,{style:{float:"none"},color:"primary",size:"sm",id:"AddEmp",onClick:function(){var t;t=e.ORDER_PKID,document.getElementById("divLoading").className="show",s()({method:"GET",url:o.a+"OrderBillingAddress/"+t,headers:{"content-type":"application/json"}}).then((function(e){N(e.data),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)})),D(!p)},children:"View"})}),Object(h.jsx)("td",{children:Object(h.jsx)(l.d,{color:"primary",size:"sm",id:"AddEmp",style:{float:"none"},onClick:function(){var t;t=e.ORDER_PKID,document.getElementById("divLoading").className="show",s()({method:"GET",url:o.a+"OrderShippingAddress/"+t,headers:{"content-type":"application/json"}}).then((function(e){w(e.data),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)})),y(!R)},children:"View"})}),Object(h.jsx)("td",{children:e.ORDER_LOGISTIC}),Object(h.jsx)("td",{children:e.ORDER_LOGISTIC_DESTINATION}),Object(h.jsx)("td",{children:e.ORDER_LOGISTIC_PAY_MODE}),Object(h.jsx)("td",{children:e.ORDER_DELIVERY_TYPE}),Object(h.jsx)("td",{children:e.ORDER_CASH_DISCOUNT}),Object(h.jsx)("td",{children:e.ORDER_ORDER_AMOUNT}),Object(h.jsx)("td",{children:Object(h.jsx)(l.d,{color:"primary",size:"sm",id:"AddEmp",style:{float:"none"},onClick:function(){var t;t=e.ORDER_PKID,document.getElementById("divLoading").className="show",s()({method:"GET",url:o.a+"OrderRemark/"+t,headers:{"content-type":"application/json"}}).then((function(e){U(e.data),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)})),C(!_)},children:"View"})})]})}))})]})})})})})]})]})})})})}),Object(h.jsx)(l.j,{md:"2"})]}),Object(h.jsxs)(l.B,{show:p,onClose:function(){return D(!p)},color:"dark",children:[Object(h.jsx)(l.E,{closeButton:!0,children:Object(h.jsx)(l.F,{children:"Customer Billing Address"})}),Object(h.jsx)(l.C,{children:Object(h.jsx)(l.H,{children:I.map((function(e){return Object(h.jsx)(r.a.Fragment,{children:Object(h.jsxs)(l.j,{md:"12",children:[Object(h.jsx)("p",{style:{fontWeight:"700",fontFamily:"sans-serif",textAlign:"center",borderBottom:"1px solid #ebedef",paddingBottom:"5%"},children:"Billing Address"}),Object(h.jsxs)("table",{children:[Object(h.jsx)("tr",{children:Object(h.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS1})}),Object(h.jsx)("tr",{children:Object(h.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS2})}),Object(h.jsx)("tr",{children:Object(h.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS3})}),Object(h.jsx)("tr",{children:Object(h.jsx)("td",{children:e.CUSTOMER_ADDRESS_ZIP_CODE})})]})]})})}))})}),Object(h.jsx)(l.D,{children:Object(h.jsx)(l.d,{color:"secondary",onClick:function(){return D(!p)},children:"Close"})})]}),Object(h.jsxs)(l.B,{show:R,onClose:function(){return y(!R)},color:"dark",children:[Object(h.jsx)(l.E,{closeButton:!0,children:Object(h.jsx)(l.F,{children:"Customer Shipping Address"})}),Object(h.jsx)(l.C,{children:Object(h.jsx)(l.H,{children:M.map((function(e){return Object(h.jsx)(r.a.Fragment,{children:Object(h.jsxs)(l.j,{md:"12",children:[Object(h.jsx)("p",{style:{fontWeight:"700",fontFamily:"sans-serif",textAlign:"center",borderBottom:"1px solid #ebedef",paddingBottom:"5%"},children:"Shipping Address"}),Object(h.jsxs)("table",{children:[Object(h.jsx)("tr",{children:Object(h.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS1})}),Object(h.jsx)("tr",{children:Object(h.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS2})}),Object(h.jsx)("tr",{children:Object(h.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS3})}),Object(h.jsx)("tr",{children:Object(h.jsx)("td",{children:e.CUSTOMER_ADDRESS_ZIP_CODE})})]})]})})}))})}),Object(h.jsx)(l.D,{children:Object(h.jsx)(l.d,{color:"secondary",onClick:function(){return y(!R)},children:"Close"})})]}),Object(h.jsxs)(l.B,{show:_,onClose:function(){return C(!_)},color:"dark",children:[Object(h.jsx)(l.E,{closeButton:!0,children:Object(h.jsx)(l.F,{children:"Order Remark"})}),Object(h.jsx)(l.C,{children:Object(h.jsx)(l.H,{children:P.map((function(e){return Object(h.jsx)(r.a.Fragment,{children:Object(h.jsxs)(l.j,{md:"12",children:[Object(h.jsx)("p",{style:{fontWeight:"700",fontFamily:"sans-serif",textAlign:"center",borderBottom:"1px solid #ebedef",paddingBottom:"5%"},children:"Remark"}),Object(h.jsx)("table",{children:Object(h.jsx)("tr",{children:Object(h.jsx)("td",{children:e.ORDER_REMARK})})})]})})}))})}),Object(h.jsx)(l.D,{children:Object(h.jsx)(l.d,{color:"secondary",onClick:function(){return C(!_)},children:"Close"})})]})]})}}}]);
//# sourceMappingURL=94.46253308.chunk.js.map