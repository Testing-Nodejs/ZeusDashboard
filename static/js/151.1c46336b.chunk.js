(this.webpackJsonpzeus_cms_kimo=this.webpackJsonpzeus_cms_kimo||[]).push([[151],{927:function(e,t,c){"use strict";c.r(t);var i=c(25),l=c(627),a=c(1),s=c.n(a),o=c(628),d=c.n(o),n=c(626),r=c(20),j=c(624),b=(c(625),c(714),c(12));t.default=function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),c=(t[0],t[1],localStorage.getItem("CustomerID")),o=Object(a.useState)({profile:"",name:"",email:"",pho:"",firm:"",type:"",Subtype:""}),h=Object(l.a)(o,2),O=h[0],m=h[1];s.a.useEffect((function(){document.getElementById("divLoading").className="show",d()({method:"GET",url:j.a+"getDistributerProfile/"+c,headers:{"content-type":"application/json"}}).then((function(e){m(Object(i.a)(Object(i.a)({},O),{},{profile:e.data[0].CUSTOMER_PRFILE,name:e.data[0].CUSTOMER_NAME,email:e.data[0].CUSTOMER_EMAIL,pho:e.data[0].CUSTOMER_MOBILE,firm:e.data[0].CUSTOMER_FIRM_NAME,type:e.data[0].CUSTOMER_TYPE_NAME,Subtype:e.data[0].CUSTOMER_SUBTYPE_NAME})),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}))}),[]);Object(r.g)();return Object(b.jsxs)("div",{id:"city",children:[Object(b.jsx)("div",{id:"divLoading",children:" "}),Object(b.jsx)("h1",{id:"ccmaster",style:{color:"#fff"},children:"Profile"}),Object(b.jsx)(n.H,{style:{marginTop:"3%"},children:Object(b.jsx)(n.j,{col:"12",children:Object(b.jsxs)("div",{id:"main",children:[Object(b.jsx)("div",{id:"photo",children:Object(b.jsx)(n.x,{src:j.b+"/"+O.profile==""?"NoImage.png":O.profile,fluid:!0,className:"mb-2",style:{width:"100%"}})}),Object(b.jsx)("div",{id:"info",children:Object(b.jsxs)("div",{id:"name",children:[Object(b.jsx)("h2",{style:{color:"black"},children:O.name}),Object(b.jsx)("p",{style:{color:"black"},children:O.email}),Object(b.jsx)("p",{style:{color:"black"},children:O.pho}),Object(b.jsx)("p",{style:{color:"black"},children:O.firm}),Object(b.jsx)("p",{style:{color:"black"},children:O.type}),Object(b.jsx)("p",{style:{color:"black"},children:O.Subtype})]})})]})})})]})}}}]);
//# sourceMappingURL=151.1c46336b.chunk.js.map