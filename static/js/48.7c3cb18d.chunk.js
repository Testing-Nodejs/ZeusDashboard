(this.webpackJsonpzeus_cms_kimo=this.webpackJsonpzeus_cms_kimo||[]).push([[48],{624:function(e,t,c){"use strict";c.d(t,"a",(function(){return n})),c.d(t,"b",(function(){return r}));var n="https://zeusservices.onrender.com/api/",r="https://zeusservices.onrender.com/"},625:function(e,t,c){},629:function(e,t,c){"use strict";function n(e){var t=e.date,c=new Date(new Date(t).toISOString().split("T")[0]);return"".concat(c.getDate().toString().padStart(2,"0"),"-").concat((c.getMonth()+1).toString().padStart(2,"0"),"-").concat(c.getFullYear())}c.d(t,"a",(function(){return n}))},637:function(e,t,c){"use strict";c.d(t,"a",(function(){return s}));var n=c(630),r=c.n(n),s=r.a.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:function(e){e.addEventListener("mouseenter",r.a.stopTimer),e.addEventListener("mouseleave",r.a.resumeTimer)}})},813:function(e,t,c){"use strict";c.r(t);var n=c(627),r=c(1),s=c.n(r),i=c(628),d=c.n(i),j=c(626),l=c(20),o=c(624),O=c(629),a=c(637),h=(c(625),c(12));t.default=function(e){console.log(e);var t=e.location.state.data.EMPLOYEE_TYPE_NAME,c=e.location.state.data.EMPLOYEE_SUB_TYPE_NAME,i=e.location.state.data.HQ_NAME,b=e.location.state.data.COMPANY_NAME,x=e.location.state.data.EMPLOYEE_NAME,E=e.location.state.data.EMPLOYEE_EMAIL,u=e.location.state.data.EMPLOYEE_CONTACT,m=e.location.state.data.EMPLOYEE_DOJ,p=e.location.state.data.EMPLOYEE_PKID,D=Object(r.useState)([]),S=Object(n.a)(D,2),R=S[0],y=S[1],_=Object(r.useState)(!1),f=Object(n.a)(_,2),g=f[0],C=f[1],T=Object(r.useState)(!1),A=Object(n.a)(T,2),M=A[0],v=A[1],N=Object(r.useState)(!1),I=Object(n.a)(N,2),B=I[0],P=I[1],L=Object(r.useState)([]),w=Object(n.a)(L,2),k=w[0],Y=w[1],U=Object(r.useState)([]),F=Object(n.a)(U,2),H=F[0],z=F[1],G=Object(r.useState)([]),K=Object(n.a)(G,2),V=K[0],J=K[1],Q=Object(r.useState)(),W=Object(n.a)(Q,2),Z=W[0],q=W[1],X=Object(r.useState)(),$=Object(n.a)(X,2),ee=$[0],te=$[1],ce=function(){d()({method:"GET",url:o.a+"getOrdersDetailsFromByEmp/"+p,headers:{"content-type":"application/json"}}).then((function(e){y(e.data)})).catch((function(e){console.log(e)}))};s.a.useEffect((function(){ce()}),[]);var ne=Object(l.g)();return Object(h.jsxs)("div",{children:[Object(h.jsx)("h1",{id:"ccmaster",children:"Employee Sales"}),Object(h.jsx)("br",{}),Object(h.jsxs)(j.H,{children:[Object(h.jsx)(j.j,{md:"2"}),Object(h.jsx)(j.j,{md:"12",children:Object(h.jsx)(j.e,{children:Object(h.jsxs)(j.f,{children:[Object(h.jsx)(j.H,{children:Object(h.jsx)(j.j,{md:"1",children:Object(h.jsx)(j.d,{color:"danger",size:"sm",onClick:function(){return ne.goBack()},children:"Back"})})}),Object(h.jsx)("br",{}),Object(h.jsx)(j.H,{children:Object(h.jsxs)(j.j,{children:[Object(h.jsxs)(j.e,{children:[Object(h.jsx)(j.i,{children:Object(h.jsxs)(j.H,{children:[Object(h.jsx)(j.j,{col:"6",children:"Employee Details"}),Object(h.jsx)(j.j,{col:"6",children:Object(h.jsx)(j.d,{onClick:function(){var e=0,n=new Array;n.push('"Sl No","Employee Type","Employee Sub Type","HQ","Company","Employee Name","Employee Email","Contact Number","Status","Order Date","Order Time","Time Till Now","Order Number","Order By","Order Placed By","Order Items","Supply Type","Company","Customer Name","Logistic","Logistic Designation","Logistic Payment Mode","Delivery Type","Cash Discount","Grand Total"');var r="";R.map((function(s){r="Delivery Confirmed";var d=new Date(new Date(s.ORDER_DATE).toISOString().split("T")[0]),j="".concat(d.getDate().toString().padStart(2,"0"),"-").concat((d.getMonth()+1).toString().padStart(2,"0"),"-").concat(d.getFullYear()),l=new Date(s.clock).toISOString().split("T")[1].slice(0,-1);return e++,n.push('"'+e+'","'+t+'","'+c+'","'+i+'","'+b+'","'+x+'","'+E+'","'+u+'","'+r+'","'+j+'","'+l+'","'+s.hrs+' hrs","'+s.ORDER_NUMBER+'","'+s.ORDER_BY+'","'+s.TypeName+'","'+s.ItemCount+'","'+s.SUPPLY_NAME+'","'+s.COMPANY_NAME+'","'+s.CUSTOMER_NAME+'","'+s.ORDER_LOGISTIC+'","'+s.ORDER_LOGISTIC_DESTINATION+'","'+s.ORDER_LOGISTIC_PAY_MODE+'","'+s.ORDER_DELIVERY_TYPE+'","'+s.ORDER_CASH_DISCOUNT+'","'+s.ORDER_ORDER_AMOUNT+'"')}));var s="Employee Orders List.csv",d=n.join("\n"),j=new Blob([d],{type:"text/csv;charset=utf8;"}),l=document.createElement("a");void 0!==l.download?(l.setAttribute("href",window.URL.createObjectURL(j)),l.setAttribute("download",s),l.style="visibility:hidden",document.body.appendChild(l),l.click(),document.body.removeChild(l)):navigator.msSaveBlob&&navigator.msSaveBlob(j,s)},color:"primary",style:{marginTop:"0%"},size:"sm",id:"AddEmp",children:"Export To Excel"})})]})}),Object(h.jsx)(j.f,{children:Object(h.jsx)(j.H,{children:Object(h.jsx)(j.j,{md:"12",children:Object(h.jsx)("table",{id:"customerDetails",style:{width:"100%"},children:Object(h.jsxs)("tr",{children:[Object(h.jsxs)("td",{style:{borderRight:"1px solid #7e0103"},children:[Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:Object(h.jsx)("b",{children:"Employee Type :"})}),Object(h.jsx)("td",{children:t})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:Object(h.jsx)("b",{children:"Employee Sub Type :"})}),Object(h.jsx)("td",{children:c})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:Object(h.jsx)("b",{children:"HQ :"})}),Object(h.jsx)("td",{children:i})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:Object(h.jsx)("b",{children:"Company :"})}),Object(h.jsx)("td",{children:b})]})]}),Object(h.jsxs)("td",{style:{borderRight:"1px solid #7e0103"},children:[Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:Object(h.jsx)("b",{children:"Employee Name :"})}),Object(h.jsx)("td",{children:x})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:Object(h.jsx)("b",{children:"Email Address :"})}),Object(h.jsx)("td",{children:E})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:Object(h.jsx)("b",{children:"Contact Number :"})}),Object(h.jsx)("td",{children:u})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:Object(h.jsx)("b",{children:"Joining Date :"})}),Object(h.jsx)("td",{children:m})]})]})]})})})})})]}),Object(h.jsxs)(j.e,{children:[Object(h.jsx)(j.i,{children:Object(h.jsxs)(j.H,{children:[Object(h.jsx)(j.j,{col:"4",children:"Order Details"}),Object(h.jsxs)(j.j,{md:"2",children:[Object(h.jsx)(j.z,{children:"From:"}),Object(h.jsx)(j.y,{type:"date",onChange:function(e){q(e.target.value)},value:Z})]}),Object(h.jsxs)(j.j,{md:"2",children:[Object(h.jsx)(j.z,{children:"To:"}),Object(h.jsx)(j.y,{type:"date",onChange:function(e){te(e.target.value)},value:ee})]}),Object(h.jsx)(j.j,{md:"2",children:Object(h.jsx)(j.d,{size:"sm",color:"info",style:{marginTop:"28px",width:"100%"},onClick:function(){""===Z||null==Z?a.a.fire({icon:"warning",title:"Select From Date!"}):""===ee||null==ee?a.a.fire({icon:"warning",title:"Select To Date!"}):d()({method:"GET",url:o.a+"getOrdersDetailsFromByEmpByDate/"+p+"/"+Z+"/"+ee,headers:{"content-type":"application/json"}}).then((function(e){y(e.data)})).catch((function(e){console.log(e)}))},children:"Filter"})}),Object(h.jsx)(j.j,{md:"2",children:Object(h.jsx)(j.d,{size:"sm",color:"danger",style:{marginTop:"28px",width:"100%"},onClick:function(){ce(),q(""),te("")},children:"Reset"})})]})}),Object(h.jsx)(j.f,{children:Object(h.jsx)(j.H,{children:Object(h.jsx)(j.j,{md:"12",children:Object(h.jsx)("div",{style:{overflow:"auto"},children:Object(h.jsxs)("table",{id:"Attendence",children:[Object(h.jsx)("thead",{children:Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:"Sl"}),Object(h.jsx)("th",{children:"Status"}),Object(h.jsx)("th",{children:"Order Date"}),Object(h.jsx)("th",{children:"Order Time"}),Object(h.jsx)("th",{children:"Customer Name"}),Object(h.jsx)("th",{children:"Order Items"}),Object(h.jsx)("th",{children:"Company"}),Object(h.jsx)("th",{children:"Order Number"}),Object(h.jsx)("th",{children:"Order By"}),Object(h.jsx)("th",{children:"Ordered Person"}),Object(h.jsx)("th",{children:"Order Type"}),Object(h.jsx)("th",{children:"Supply Type"}),Object(h.jsx)("th",{children:"Days Till Now"}),Object(h.jsx)("th",{children:"Billing Address"}),Object(h.jsx)("th",{children:"Shipping Address"}),Object(h.jsx)("th",{children:"Logistic"}),Object(h.jsx)("th",{children:"Logistic Designation"}),Object(h.jsx)("th",{children:"Logistic Payment Mode"}),Object(h.jsx)("th",{children:"Delivery Type"}),Object(h.jsx)("th",{children:"Cash Discount"}),Object(h.jsx)("th",{children:"Grand Total"}),Object(h.jsx)("th",{children:"Remark"})]})}),Object(h.jsx)("tbody",{children:R.map((function(e,t){return'<td><span class="ReadyForDelivery">Delivery Confirmed </span></td>',Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{children:t+1}),Object(h.jsx)("td",{children:Object(h.jsx)("div",{dangerouslySetInnerHTML:{__html:'<td><span class="ReadyForDelivery">Delivery Confirmed </span></td>'}})}),Object(h.jsx)("td",{children:Object(h.jsx)(O.a,{date:e.ORDER_DATE})}),Object(h.jsx)("td",{children:new Date(e.clock).toISOString().split("T")[1].slice(0,-1)}),Object(h.jsx)("td",{children:e.CUSTOMER_NAME}),Object(h.jsx)("td",{children:Object(h.jsx)(j.d,{style:{float:"none"},onClick:function(){ne.push("/OrderItems",{data:e})},children:e.ItemCount})}),Object(h.jsx)("td",{children:e.COMPANY_NAME}),Object(h.jsx)("td",{children:e.ORDER_NUMBER}),Object(h.jsx)("td",{children:e.ORDER_BY}),Object(h.jsx)("td",{children:e.TypeName}),Object(h.jsx)("td",{children:e.ORDER_TYPE_NAME}),Object(h.jsx)("td",{children:e.SUPPLY_NAME}),Object(h.jsx)("td",{children:e.HDays}),Object(h.jsx)("td",{children:Object(h.jsx)(j.d,{style:{float:"none"},color:"primary",size:"sm",id:"AddEmp",onClick:function(){var t;t=e.ORDER_PKID,d()({method:"GET",url:o.a+"OrderBillingAddress/"+t,headers:{"content-type":"application/json"}}).then((function(e){Y(e.data)})).catch((function(e){console.log(e)})),C(!g)},children:"View"})}),Object(h.jsx)("td",{children:Object(h.jsx)(j.d,{color:"primary",size:"sm",id:"AddEmp",style:{float:"none"},onClick:function(){var t;t=e.ORDER_PKID,d()({method:"GET",url:o.a+"OrderShippingAddress/"+t,headers:{"content-type":"application/json"}}).then((function(e){z(e.data)})).catch((function(e){console.log(e)})),v(!M)},children:"View"})}),Object(h.jsx)("td",{children:e.ORDER_LOGISTIC}),Object(h.jsx)("td",{children:e.ORDER_LOGISTIC_DESTINATION}),Object(h.jsx)("td",{children:e.ORDER_LOGISTIC_PAY_MODE}),Object(h.jsx)("td",{children:e.ORDER_DELIVERY_TYPE}),Object(h.jsx)("td",{children:e.ORDER_CASH_DISCOUNT}),Object(h.jsx)("td",{children:e.ORDER_ORDER_AMOUNT}),Object(h.jsx)("td",{children:Object(h.jsx)(j.d,{color:"primary",size:"sm",id:"AddEmp",style:{float:"none"},onClick:function(){var t;t=e.ORDER_PKID,d()({method:"GET",url:o.a+"OrderRemark/"+t,headers:{"content-type":"application/json"}}).then((function(e){J(e.data)})).catch((function(e){console.log(e)})),P(!B)},children:"View"})})]})}))})]})})})})})]})]})})]})})}),Object(h.jsx)(j.j,{md:"2"})]}),Object(h.jsxs)(j.B,{show:g,onClose:function(){return C(!g)},color:"dark",children:[Object(h.jsx)(j.E,{closeButton:!0,children:Object(h.jsx)(j.F,{children:"Customer Billing Address"})}),Object(h.jsx)(j.C,{children:Object(h.jsx)(j.H,{children:k.map((function(e){return Object(h.jsx)(s.a.Fragment,{children:Object(h.jsxs)(j.j,{md:"12",children:[Object(h.jsx)("p",{style:{fontWeight:"700",fontFamily:"sans-serif",textAlign:"center",borderBottom:"1px solid #ebedef",paddingBottom:"5%"},children:"Billing Address"}),Object(h.jsxs)("table",{children:[Object(h.jsx)("tr",{children:Object(h.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS1})}),Object(h.jsx)("tr",{children:Object(h.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS2})}),Object(h.jsx)("tr",{children:Object(h.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS3})}),Object(h.jsx)("tr",{children:Object(h.jsx)("td",{children:e.CUSTOMER_ADDRESS_ZIP_CODE})})]})]})})}))})}),Object(h.jsx)(j.D,{children:Object(h.jsx)(j.d,{color:"secondary",onClick:function(){return C(!g)},children:"Close"})})]}),Object(h.jsxs)(j.B,{show:M,onClose:function(){return v(!M)},color:"dark",children:[Object(h.jsx)(j.E,{closeButton:!0,children:Object(h.jsx)(j.F,{children:"Customer Shipping Address"})}),Object(h.jsx)(j.C,{children:Object(h.jsx)(j.H,{children:H.map((function(e){return Object(h.jsx)(s.a.Fragment,{children:Object(h.jsxs)(j.j,{md:"12",children:[Object(h.jsx)("p",{style:{fontWeight:"700",fontFamily:"sans-serif",textAlign:"center",borderBottom:"1px solid #ebedef",paddingBottom:"5%"},children:"Shipping Address"}),Object(h.jsxs)("table",{children:[Object(h.jsx)("tr",{children:Object(h.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS1})}),Object(h.jsx)("tr",{children:Object(h.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS2})}),Object(h.jsx)("tr",{children:Object(h.jsx)("td",{children:e.CUSTOMER_ADDRESS_ADDRESS3})}),Object(h.jsx)("tr",{children:Object(h.jsx)("td",{children:e.CUSTOMER_ADDRESS_ZIP_CODE})})]})]})})}))})}),Object(h.jsx)(j.D,{children:Object(h.jsx)(j.d,{color:"secondary",onClick:function(){return v(!M)},children:"Close"})})]}),Object(h.jsxs)(j.B,{show:B,onClose:function(){return P(!B)},color:"dark",children:[Object(h.jsx)(j.E,{closeButton:!0,children:Object(h.jsx)(j.F,{children:"Order Remark"})}),Object(h.jsx)(j.C,{children:Object(h.jsx)(j.H,{children:V.map((function(e){return Object(h.jsx)(s.a.Fragment,{children:Object(h.jsxs)(j.j,{md:"12",children:[Object(h.jsx)("p",{style:{fontWeight:"700",fontFamily:"sans-serif",textAlign:"center",borderBottom:"1px solid #ebedef",paddingBottom:"5%"},children:"Remark"}),Object(h.jsx)("table",{children:Object(h.jsx)("tr",{children:Object(h.jsx)("td",{children:e.ORDER_REMARK})})})]})})}))})}),Object(h.jsx)(j.D,{children:Object(h.jsx)(j.d,{color:"secondary",onClick:function(){return P(!B)},children:"Close"})})]})]})}}}]);
//# sourceMappingURL=48.7c3cb18d.chunk.js.map