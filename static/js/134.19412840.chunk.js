(this.webpackJsonpzeus_cms_kimo=this.webpackJsonpzeus_cms_kimo||[]).push([[134],{624:function(e,t,c){"use strict";c.d(t,"a",(function(){return s})),c.d(t,"b",(function(){return d}));var s="https://zeusservices.onrender.com/api/",d="https://zeusservices.onrender.com/"},625:function(e,t,c){},916:function(e,t,c){"use strict";c.r(t);var s=c(627),d=c(1),r=c.n(d),i=c(628),n=c.n(i),a=c(630),j=c.n(a),l=c(626),o=c(20),b=c(624),h=(c(625),c(12));t.default=function(e){var t=e.location.state.data.OrderNumber,c=e.location.state.data.Company,i=e.location.state.data.Customer,a=e.location.state.data.Logistic,O=e.location.state.data.SupplyType,m=e.location.state.data.Amount,x=e.location.state.data.Orderpkid,u=e.location.state.data.item.PRODUCT_NAME,p=e.location.state.data.item.Unit,g=e.location.state.data.item.PRD_PACKAGE_MRP,v=e.location.state.data.item.ORDER_ITEM_PRODUCT_FKID,y=e.location.state.data.item.ORDER_ITEM_PKID,f=Object(d.useState)(),B=Object(s.a)(f,2),N=B[0],I=B[1],E=Object(d.useState)(),P=Object(s.a)(E,2),_=P[0],D=P[1];j.a.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:function(e){e.addEventListener("mouseenter",j.a.stopTimer),e.addEventListener("mouseleave",j.a.resumeTimer)}});r.a.useEffect((function(){}),[]);var T=Object(o.g)();return Object(h.jsxs)("div",{children:[Object(h.jsx)("div",{id:"divLoading",children:" "}),Object(h.jsx)("h1",{id:"ccmaster",children:"Order Item"}),Object(h.jsx)("br",{}),Object(h.jsxs)(l.H,{children:[Object(h.jsx)(l.j,{md:"2"}),Object(h.jsx)(l.j,{md:"12",children:Object(h.jsx)(l.e,{children:Object(h.jsxs)(l.f,{children:[Object(h.jsx)(l.H,{children:Object(h.jsx)(l.j,{md:"1",children:Object(h.jsx)(l.d,{color:"danger",size:"sm",onClick:function(){return T.goBack()},children:"Back"})})}),Object(h.jsx)("br",{}),Object(h.jsx)(l.H,{children:Object(h.jsx)(l.j,{children:Object(h.jsxs)(l.e,{children:[Object(h.jsx)(l.i,{children:Object(h.jsxs)(l.H,{children:[Object(h.jsx)(l.j,{md:"6",children:"Order Details"}),Object(h.jsx)(l.j,{md:"1"}),Object(h.jsx)(l.j,{md:"5",children:"Product Details"})]})}),Object(h.jsxs)(l.f,{children:[Object(h.jsx)(l.H,{children:Object(h.jsx)(l.j,{md:"12",children:Object(h.jsx)("table",{id:"customerDetails",style:{width:"100%"},children:Object(h.jsxs)("tr",{children:[Object(h.jsxs)("td",{style:{borderRight:"1px solid #7e0103"},children:[Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:Object(h.jsx)("b",{children:"Order Number :"})}),Object(h.jsx)("td",{children:t})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:Object(h.jsx)("b",{children:"Company :"})}),Object(h.jsx)("td",{children:c})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:Object(h.jsx)("b",{children:"Customer Name :"})}),Object(h.jsx)("td",{children:i})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:Object(h.jsx)("b",{children:"Logistic :"})}),Object(h.jsx)("td",{children:a})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:Object(h.jsx)("b",{children:"Supply Type :"})}),Object(h.jsx)("td",{children:O})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:Object(h.jsx)("b",{children:"Order Amount :"})}),Object(h.jsx)("td",{children:m})]})]}),Object(h.jsxs)("td",{children:[Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:Object(h.jsx)("b",{children:"Product Name :"})}),Object(h.jsx)("td",{children:u})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:Object(h.jsx)("b",{children:"Unit :"})}),Object(h.jsx)("td",{children:p})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:Object(h.jsx)("b",{children:"MRP :"})}),Object(h.jsx)("td",{children:g})]})]})]})})})}),Object(h.jsx)("hr",{}),Object(h.jsx)(l.H,{children:Object(h.jsxs)(l.j,{md:"4",children:[Object(h.jsx)("h3",{className:"p1",children:Object(h.jsx)("b",{style:{color:"black",fontWeight:"600",fontSize:"14px"},children:"Manage Product Batch Numbers"})}),Object(h.jsx)(l.y,{type:"text",id:"exampleInputName2",placeholder:"No Of Batch Numbers",onChange:function(e){document.getElementById("divLoading").className="show";var t=e.target.value;D(e.target.value);for(var c="",s=0;s<t;s++)c=c+'<div class="col-md-4" style="border-right: 1px solid #ababab;border-bottom: 1px solid #ababab; padding-bottom: 2%"><div class="col-md-12"><label style="margin-top: 5%">Batch Number '+(s+1)+'</label><input type="text" class="form-control" id="batchNo-'+s+'" placeholder="Batch Number '+(s+1)+'"/></div><div class="col-md-12"><label style="margin-top: 5%">Batch '+(s+1)+' Quantity</label><input type="text" class="form-control" id="batchNoqty-'+s+'" placeholder="Batch Quantity '+(s+1)+'"/></div></div>';I(c),document.getElementById("divLoading").className="hide"}})]})}),Object(h.jsx)("hr",{}),Object(h.jsx)(l.H,{children:Object(h.jsx)(l.j,{md:"12",children:Object(h.jsx)(l.H,{dangerouslySetInnerHTML:{__html:N}})})}),Object(h.jsx)("br",{})]})]})})}),Object(h.jsx)(l.d,{color:"primary",size:"sm",style:{float:"right"},onClick:function(){document.getElementById("divLoading").className="show";for(var e=[],t=0;t<_;t++){var c={Batch:"Batch-"+(t+1),BatchNumber:document.getElementById("batchNo-"+t).value,BatchQuantity:document.getElementById("batchNoqty-"+t).value};e.push(c)}var s={OrderID:x,OrderItemID:y,ProductID:v,ProductBatches:e};console.log(s),n.a.post(b.a+"addProductBatchNumbers/",s).then((function(e){!0===e.data?(j.a.fire({title:"Batch Numbers Added Successfully!",icon:"success",confirmButtonText:"OK"}),document.getElementById("divLoading").className="hide",T.goBack()):(j.a.fire({title:"Failed To Add Batch Numbers!",icon:"error",confirmButtonText:"OK"}),document.getElementById("divLoading").className="hide")}))},children:"Submit"})]})})}),Object(h.jsx)(l.j,{md:"2"})]})]})}}}]);
//# sourceMappingURL=134.19412840.chunk.js.map