(this.webpackJsonpzeus_cms_kimo=this.webpackJsonpzeus_cms_kimo||[]).push([[116],{624:function(e,t,a){"use strict";a.d(t,"a",(function(){return n})),a.d(t,"b",(function(){return c}));var n="https://zeusservices.onrender.com/api/",c="https://zeusservices.onrender.com/"},625:function(e,t,a){},853:function(e,t,a){"use strict";a.r(t);var n=a(25),c=a(627),o=a(1),l=a(20),s=a(628),r=a.n(s),i=a(630),d=a.n(i),j=a(624),m=a(626),O=(a(625),a(12));t.default=function(e){console.log(e);var t=e.location.state.data,a=t.CUSTOMER_PKID,s=t.CUSTOMER_CATEGORY_FKID,i=t.CUSTOMER_TYPE_FKID,u=t.CUSTOMER_SUBTYPE_FKID,p=t.CUSTOMER_NAME,h=t.CUSTOMER_NUMBER,C=t.CUSTOMER_GST_NO,b=t.CUSTOMER_EMAIL,x=t.CUSTOMER_EMAIL2,E=t.CUSTOMER_MOBILE_CODE,g=t.CUSTOMER_MOBILE,N=t.CUSTOMER_ALT_MOBILE_CODE,_=t.CUSTOMER_ALT_MOBILE,T=t.CUSTOMER_CAPACITY,f=t.CUSTOMER_UNIT_FKID,P=t.CUSTOMER_REPRESENTATIVE_FKID,S=t.CUSTOMER_AREA_FKID,y=t.CUSTOMER_PRFILE,R=t.CUSTOMER_DOC1,v=t.CUSTOMER_DOC2,M=t.CUSTOMER_DOC3,I=t.CUSTOMER_DOC4,U=t.CUSTOMER_DOC5,A=t.CUSTOMER_DOC6,D=t.CUSTOMER_PASSWORD,L=t.CUSTOMER_CONTACT_PERSON_NAME,F=t.CUSTOMER_CONTACT_PERSON_EMAIL,z=t.CUSTOMER_CONTACT_PERSON_EMAIL2,B=t.CUSTOMER_CONTACT_PERSON_PHO_CODE,w=t.CUSTOMER_CONTACT_PERSON_PHO,H=t.CUSTOMER_CONTACT_PERSON_PHO2_CODE,K=t.CUSTOMER_CONTACT_PERSON_PHO2,Y=t.CUSTOMER_CONTACT_SEC_PERSON_NAME,G=t.CUSTOMER_CONTACT_SEC_PERSON_EMAIL,W=t.CUSTOMER_CONTACT_SEC_PERSON_EMAIL2,$=t.CUSTOMER_CONTACT_SEC_PERSON_PHO_CODE,k=t.CUSTOMER_CONTACT_SEC_PERSON_PHO,V=t.CUSTOMER_CONTACT_SEC_PERSON_PHO2_CODE,J=t.CUSTOMER_CONTACT_SEC_PERSON_PHO2,q=Object(l.g)(),Q=Object(o.useState)([]),X=Object(c.a)(Q,2),Z=X[0],ee=X[1],te=Object(o.useState)([]),ae=Object(c.a)(te,2),ne=ae[0],ce=ae[1],oe=Object(o.useState)([]),le=Object(c.a)(oe,2),se=le[0],re=le[1],ie=Object(o.useState)([]),de=Object(c.a)(ie,2),je=de[0],me=de[1],Oe=Object(o.useState)([]),ue=Object(c.a)(Oe,2),pe=ue[0],he=ue[1],Ce=Object(o.useState)([]),be=Object(c.a)(Ce,2),xe=be[0],Ee=be[1],ge=d.a.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:function(e){e.addEventListener("mouseenter",d.a.stopTimer),e.addEventListener("mouseleave",d.a.resumeTimer)}}),Ne=Object(o.useState)({Category:s,type:i,Subtype:u,Name:p,Email:b,Email2:x,PhoCode:E,PhoneNumber:g,AltPhoCode:N,AlterNateNumber:_,Unit:f,CustNo:h,GstNo:C,Capacity:T,Manager:P,Area:S,Profile:y,password:D,Doc1:R,Doc2:v,Doc3:M,Doc4:I,Doc5:U,Doc6:A,ContactPersonName:L,ContactPersonEmail:F,ContactPersonEmail2:z,ContactPersonPhoCode:B,ContactPersonPho:w,ContactPersonPho2Code:H,ContactPersonPho2:K,ContactPersonName_2:Y,ContactPersonEmail_2:G,ContactPersonEmail2_2:W,ContactPersonPho_Code:$,ContactPersonPho_2:k,ContactPersonPho_2Code:V,ContactPersonPho2_2:J}),_e=Object(c.a)(Ne,2),Te=_e[0],fe=_e[1],Pe=function(){document.getElementById("divLoading").className="show",r()({method:"GET",url:j.a+"custtype",headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e,t){return Object(O.jsx)("option",{value:e.CUSTOMER_TYPE_PKID,children:e.CUSTOMER_TYPE_NAME},t)}));ce(t),Se(i),ye(),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}))},Se=function(e){document.getElementById("divLoading").className="show",r()({method:"GET",url:j.a+"custsubtypebytype/"+e,headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e,t){return Object(O.jsx)("option",{value:e.CUSTOMER_SUBTYPE_PKID,children:e.CUSTOMER_SUBTYPE_NAME},t)}));re(t),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}))},ye=function(){document.getElementById("divLoading").className="show",r()({method:"GET",url:j.a+"getAllManagers",headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e,t){return Object(O.jsx)("option",{value:e.EMPLOYEE_PKID,children:e.EMPLOYEE_NAME},t)}));me(t),ve(),Re(),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}))},Re=function(){document.getElementById("divLoading").className="show",r()({method:"GET",url:j.a+"GetTalukByEmployee/"+Te.Manager,headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e,t){return Object(O.jsx)("option",{value:e.TALUK_PKID,children:e.TALUK_NAME},t)}));Ee(t),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}))},ve=function(){document.getElementById("divLoading").className="show",r()({method:"GET",url:j.a+"custunits",headers:{"content-type":"application/json"},params:{language_code:"en"}}).then((function(e){var t=e.data.map((function(e,t){return Object(O.jsx)("option",{value:e.UNIT_PKID,children:e.UNIT_NAME},t)}));he(t),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}))};return Object(o.useEffect)((function(){document.getElementById("divLoading").className="show",r()({method:"GET",url:j.a+"custcat",headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e,t){return Object(O.jsx)("option",{value:e.CUSTOMER_CATEGORY_PKID,children:e.CUSTOMER_CATEGORY_NAME},t)}));ee(t),Pe(),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}))}),[]),Object(O.jsxs)("div",{children:[Object(O.jsx)("div",{id:"divLoading",children:" "}),Object(O.jsx)("h1",{id:"ccmaster",children:"Update Customer"}),Object(O.jsx)(m.H,{style:{marginTop:"3%"},children:Object(O.jsx)(m.j,{md:"12",children:Object(O.jsx)(m.e,{style:{boxShadow:"0px 0px 1px 1px #959595"},children:Object(O.jsxs)(m.f,{children:[Object(O.jsx)(m.H,{children:Object(O.jsx)(m.j,{md:"1",children:Object(O.jsxs)("div",{children:[Object(O.jsx)(m.A,{to:"/ViewCustomers",children:Object(O.jsx)(m.d,{size:"sm",id:"AddEmp",children:"Back"})}),Object(O.jsx)("br",{})]})})}),Object(O.jsx)(m.H,{children:Object(O.jsx)(m.j,{children:Object(O.jsxs)(m.e,{children:[Object(O.jsx)(m.i,{children:"Edit Customer Details"}),Object(O.jsx)(m.f,{children:Object(O.jsx)(m.t,{method:"post",encType:"multipart/form-data",className:"form-horizontal",children:Object(O.jsxs)(m.u,{className:"pr-1",children:[Object(O.jsxs)("div",{children:[Object(O.jsx)("p",{children:Object(O.jsx)("b",{style:{textTransform:"uppercase"},children:"Customer Information"})}),Object(O.jsxs)(m.H,{id:"firstrow",children:[Object(O.jsxs)(m.j,{md:"3",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Name Of The Customer"}),Object(O.jsx)(m.y,{id:"cname",placeholder:"Customer Name",value:Te.Name,onChange:function(e){fe(Object(n.a)(Object(n.a)({},Te),{},{Name:e.target.value}))}})]}),Object(O.jsxs)(m.j,{md:"3",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Customer Number"}),Object(O.jsx)(m.y,{id:"cname",placeholder:"Customer Number",value:Te.CustNo,onChange:function(e){fe(Object(n.a)(Object(n.a)({},Te),{},{CustNo:e.target.value}))}})]}),Object(O.jsxs)(m.j,{md:"3",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"GST No"}),Object(O.jsx)(m.y,{id:"cname",placeholder:"Customer GST No",value:Te.GstNo,onChange:function(e){fe(Object(n.a)(Object(n.a)({},Te),{},{GstNo:e.target.value}))}})]}),Object(O.jsxs)(m.j,{md:"3",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Customer Category"}),Object(O.jsxs)(m.I,{custom:!0,name:"CustCat",id:"CustCat",value:Te.Category,onChange:function(e){fe(Object(n.a)(Object(n.a)({},Te),{},{Category:e.target.value}))},children:[Object(O.jsx)("option",{value:"-1",children:"Select Customer Category"}),Z]})]}),Object(O.jsxs)(m.j,{md:"3",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Customer Type"}),Object(O.jsxs)(m.I,{custom:!0,name:"CustType",id:"CustType",value:Te.type,onChange:function(e){var t;fe(Object(n.a)(Object(n.a)({},Te),{},{type:e.target.value})),t=e.target.value,document.getElementById("divLoading").className="show",r()({method:"GET",url:j.a+"custsubtypebytype/"+t,headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e,t){return Object(O.jsx)("option",{value:e.CUSTOMER_SUBTYPE_PKID,children:e.CUSTOMER_SUBTYPE_NAME},t)}));re(t),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}))},children:[Object(O.jsx)("option",{value:"-1",children:"Select Customer Type"}),ne]})]}),Object(O.jsxs)(m.j,{md:"3",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Customer Sub Type"}),Object(O.jsxs)(m.I,{custom:!0,name:"CustSubType",id:"CustSubType",value:Te.Subtype,onChange:function(e){fe(Object(n.a)(Object(n.a)({},Te),{},{Subtype:e.target.value}))},children:[Object(O.jsx)("option",{value:"-1",children:"Select Customer Sub Type"}),se]})]}),Object(O.jsxs)(m.j,{md:"3",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Email"}),Object(O.jsx)(m.y,{id:"email",placeholder:"Customer Email",value:Te.Email,onChange:function(e){fe(Object(n.a)(Object(n.a)({},Te),{},{Email:e.target.value}))}})]}),Object(O.jsxs)(m.j,{md:"3",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Alternate Email"}),Object(O.jsx)(m.y,{id:"email2",placeholder:"Customer Alternate Email",value:Te.Email2,onChange:function(e){fe(Object(n.a)(Object(n.a)({},Te),{},{Email2:e.target.value}))}})]}),Object(O.jsxs)(m.j,{md:"3",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Customer Superior"}),Object(O.jsxs)(m.I,{custom:!0,name:"Suprior",id:"Suprior",value:Te.Manager,onChange:function(e){var t;fe(Object(n.a)(Object(n.a)({},Te),{},{Manager:e.target.value})),t=e.target.value,document.getElementById("divLoading").className="show",r()({method:"GET",url:j.a+"GetTalukByEmployee/"+t,headers:{"content-type":"application/json"}}).then((function(e){var t=e.data.map((function(e,t){return Object(O.jsx)("option",{value:e.TALUK_PKID,children:e.TALUK_NAME},t)}));Ee(t),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}))},children:[Object(O.jsx)("option",{value:"-1",children:"Select Customer Superior"}),je]})]}),Object(O.jsxs)(m.j,{md:"3",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Customer Area"}),Object(O.jsxs)(m.I,{custom:!0,name:"Suprior",id:"Suprior",value:Te.Area,onChange:function(e){var t;fe(Object(n.a)(Object(n.a)({},Te),{},{Area:e.target.value})),t=e.target.value,document.getElementById("divLoading").className="show",r()({method:"GET",url:j.a+"CountryCodeByArea/"+t,headers:{"content-type":"application/json"}}).then((function(e){console.log(e.data),fe(Object(n.a)(Object(n.a)({},Te),{},{PhoCode:e.data[0].COUNTRY_CODE,AltPhoCode:e.data[0].COUNTRY_CODE,ContactPersonPhoCode:e.data[0].COUNTRY_CODE,ContactPersonPho2Code:e.data[0].COUNTRY_CODE,ContactPersonPho_Code:e.data[0].COUNTRY_CODE,ContactPersonPho_2Code:e.data[0].COUNTRY_CODE,Area:t})),document.getElementById("divLoading").className="hide"})).catch((function(e){console.log(e)}))},children:[Object(O.jsx)("option",{value:"-1",children:"Select Area"}),xe]})]}),Object(O.jsxs)(m.j,{md:"3",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Contact Number"}),Object(O.jsxs)(m.H,{children:[Object(O.jsx)(m.j,{md:"2",style:{paddingRight:"0%"},children:Object(O.jsx)(m.y,{id:"text-input1",name:"text-input",placeholder:"Code",value:"+",readOnly:!0,style:{fontWeight:"600",padding:"7px",borderRadius:"4px 0px 0px 4px !important"}})}),Object(O.jsx)(m.j,{md:"2",style:{paddingRight:"0%",paddingLeft:"0%"},children:Object(O.jsx)(m.y,{id:"text-input1",name:"text-input",style:{borderRadius:"0px",padding:"7px"},value:Te.PhoCode,maxLength:"3",onChange:function(e){(""===e.target.value||/^[0-9\b]+$/.test(e.target.value))&&fe(Object(n.a)(Object(n.a)({},Te),{},{PhoCode:e.target.value}))}})}),Object(O.jsx)(m.j,{md:"8",style:{paddingLeft:"0%"},children:Object(O.jsx)(m.y,{id:"text-input1",name:"text-input",placeholder:"Contact Number",value:Te.PhoneNumber,maxLength:"10",onChange:function(e){(""===e.target.value||/^[0-9\b]+$/.test(e.target.value))&&fe(Object(n.a)(Object(n.a)({},Te),{},{PhoneNumber:e.target.value}))}})})]})]}),Object(O.jsxs)(m.j,{md:"3",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Landline Number"}),Object(O.jsxs)(m.H,{children:[Object(O.jsx)(m.j,{md:"2",style:{paddingRight:"0%"},children:Object(O.jsx)(m.y,{id:"text-input1",name:"text-input",placeholder:"Code",value:"+",readOnly:!0,style:{fontWeight:"600",padding:"7px",borderRadius:"4px 0px 0px 4px !important"}})}),Object(O.jsx)(m.j,{md:"2",style:{paddingRight:"0%",paddingLeft:"0%"},children:Object(O.jsx)(m.y,{id:"text-input1",name:"text-input",style:{borderRadius:"0px",padding:"7px"},value:Te.AltPhoCode,maxLength:"3",onChange:function(e){(""===e.target.value||/^[0-9\b]+$/.test(e.target.value))&&fe(Object(n.a)(Object(n.a)({},Te),{},{AltPhoCode:e.target.value}))}})}),Object(O.jsx)(m.j,{md:"8",style:{paddingLeft:"0%"},children:Object(O.jsx)(m.y,{id:"text-input1",name:"text-input",placeholder:"Customer Landline Number",value:Te.AlterNateNumber,maxLength:"10",onChange:function(e){(""===e.target.value||/^[0-9\b]+$/.test(e.target.value))&&fe(Object(n.a)(Object(n.a)({},Te),{},{AlterNateNumber:e.target.value}))}})})]})]}),Object(O.jsxs)(m.j,{md:"3",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Customer Capacity"}),Object(O.jsx)(m.y,{id:"Capacity",placeholder:"Customer Capacity",value:Te.Capacity,onChange:function(e){fe(Object(n.a)(Object(n.a)({},Te),{},{Capacity:e.target.value}))}})]}),Object(O.jsxs)(m.j,{md:"3",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Unit"}),Object(O.jsxs)(m.I,{custom:!0,name:"CustCat",id:"CustCat",value:Te.Unit,onChange:function(e){fe(Object(n.a)(Object(n.a)({},Te),{},{Unit:e.target.value}))},children:[Object(O.jsx)("option",{value:"-1",children:"Select Unit"}),pe]})]}),Object(O.jsxs)(m.j,{md:"3",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Profile"}),Object(O.jsx)(m.y,{type:"file",id:"exampleInputName2",placeholder:" ",onChange:function(e){var t=new FormData;t.append("file",e.target.files[0]),r.a.post(j.a+"upload",t).then((function(e){fe(Object(n.a)(Object(n.a)({},Te),{},{Profile:e.data}))}))}})]}),Object(O.jsxs)(m.j,{md:"3",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Password"}),Object(O.jsx)(m.y,{type:"password",id:"exampleInputName2",placeholder:"********",value:Te.password,onChange:function(e){fe(Object(n.a)(Object(n.a)({},Te),{},{password:e.target.value}))}})]}),Object(O.jsxs)(m.j,{md:"3",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Profile Image"}),Object(O.jsx)(m.x,{src:j.b+"/"+Te.Profile,fluid:!0,className:"mb-2",style:{width:"100%"}})]}),Object(O.jsx)(m.j,{md:"3"}),Object(O.jsx)(m.j,{md:"3"}),Object(O.jsx)(m.j,{md:"6",children:Object(O.jsxs)(m.H,{style:{marginTop:"3%",borderTop:"1px solid rgb(211, 211, 211)",borderRight:"1px solid rgb(211, 211, 211)",borderBottom:"1px solid rgb(211, 211, 211)",padding:"2%",paddingBottom:"3%"},children:[Object(O.jsx)(m.j,{md:"12",children:Object(O.jsx)("p",{htmlFor:"nf-email",style:{fontWeight:"700",fontSize:"16px",textAlign:"center",textTransform:"uppercase"},children:"Upload Documents"})}),Object(O.jsxs)(m.j,{md:"6",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Document 1"}),Object(O.jsx)(m.y,{type:"file",id:"Doc1",placeholder:" ",onChange:function(e){var t=new FormData;t.append("file",e.target.files[0]),r.a.post(j.a+"upload",t).then((function(e){fe(Object(n.a)(Object(n.a)({},Te),{},{Doc1:e.data}))}))}})]}),Object(O.jsxs)(m.j,{md:"6",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Document 2"}),Object(O.jsx)(m.y,{type:"file",id:"Doc2",placeholder:" ",onChange:function(e){var t=new FormData;t.append("file",e.target.files[0]),r.a.post(j.a+"upload",t).then((function(e){fe(Object(n.a)(Object(n.a)({},Te),{},{Doc2:e.data}))}))}})]}),Object(O.jsxs)(m.j,{md:"6",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Document 3"}),Object(O.jsx)(m.y,{type:"file",id:"Doc3",placeholder:" ",onChange:function(e){var t=new FormData;t.append("file",e.target.files[0]),r.a.post(j.a+"upload",t).then((function(e){fe(Object(n.a)(Object(n.a)({},Te),{},{Doc3:e.data}))}))}})]}),Object(O.jsxs)(m.j,{md:"6",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Document 4"}),Object(O.jsx)(m.y,{type:"file",id:"Doc4",placeholder:" ",onChange:function(e){var t=new FormData;t.append("file",e.target.files[0]),r.a.post(j.a+"upload",t).then((function(e){fe(Object(n.a)(Object(n.a)({},Te),{},{Doc4:e.data}))}))}})]}),Object(O.jsxs)(m.j,{md:"6",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Document 5"}),Object(O.jsx)(m.y,{type:"file",id:"Doc5",placeholder:" ",onChange:function(e){var t=new FormData;t.append("file",e.target.files[0]),r.a.post(j.a+"upload",t).then((function(e){fe(Object(n.a)(Object(n.a)({},Te),{},{Doc5:e.data}))}))}})]}),Object(O.jsxs)(m.j,{md:"6",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Document 6"}),Object(O.jsx)(m.y,{type:"file",id:"Doc6",placeholder:" ",onChange:function(e){var t=new FormData;t.append("file",e.target.files[0]),r.a.post(j.a+"upload",t).then((function(e){fe(Object(n.a)(Object(n.a)({},Te),{},{Doc6:e.data}))}))}})]})]})}),Object(O.jsx)(m.j,{md:"6",children:Object(O.jsxs)(m.H,{style:{marginTop:"3%",borderTop:"1px solid rgb(211, 211, 211)",borderBottom:"1px solid rgb(211, 211, 211)",padding:"2%",paddingBottom:"3%",minHeight:"251px"},children:[Object(O.jsx)(m.j,{md:"12",children:Object(O.jsx)("p",{htmlFor:"nf-email",style:{fontWeight:"700",fontSize:"16px",textAlign:"center",textTransform:"uppercase"},children:"Uploaded Documents"})}),Object(O.jsxs)(m.j,{md:"6",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Document 1"}),Object(O.jsx)(m.x,{src:j.b+"/"+Te.CUSTOMER_DOC1,fluid:!0,className:"mb-2",style:{width:"100%"}})]}),Object(O.jsxs)(m.j,{md:"6",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Document 2"}),Object(O.jsx)(m.x,{src:j.b+"/"+Te.CUSTOMER_DOC2,fluid:!0,className:"mb-2",style:{width:"100%"}})]}),Object(O.jsxs)(m.j,{md:"6",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Document 3"}),Object(O.jsx)(m.x,{src:j.b+"/"+Te.CUSTOMER_DOC3,fluid:!0,className:"mb-2",style:{width:"100%"}})]}),Object(O.jsxs)(m.j,{md:"6",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Document 4"}),Object(O.jsx)(m.x,{src:j.b+"/"+Te.CUSTOMER_DOC4,fluid:!0,className:"mb-2",style:{width:"100%"}})]}),Object(O.jsxs)(m.j,{md:"6",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Document 5"}),Object(O.jsx)(m.x,{src:j.b+"/"+Te.CUSTOMER_DOC5,fluid:!0,className:"mb-2",style:{width:"100%"}})]}),Object(O.jsxs)(m.j,{md:"6",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Document 6"}),Object(O.jsx)(m.x,{src:j.b+"/"+Te.CUSTOMER_DOC6,fluid:!0,className:"mb-2",style:{width:"100%"}})]})]})}),Object(O.jsx)(m.j,{md:"12",style:{marginTop:"2%"},children:Object(O.jsxs)(m.H,{children:[Object(O.jsx)(m.j,{md:"4",children:Object(O.jsx)("p",{htmlFor:"nf-email",style:{fontSize:"14px",textAlign:"left",textTransform:"uppercase",marginLeft:"7%"},children:Object(O.jsxs)("b",{style:{color:"black",fontSize:"12px"},children:["Customer :  ",Te.Name]})})}),Object(O.jsx)(m.j,{md:"8",children:Object(O.jsx)("p",{htmlFor:"nf-email",style:{fontWeight:"700",fontSize:"16px",textAlign:"left",textTransform:"uppercase",marginLeft:"8%"},children:"Contact People Details"})})]})}),Object(O.jsxs)(m.j,{md:"12",children:[Object(O.jsxs)(m.H,{style:{borderBottom:"1px solid rgb(211, 211, 211)",padding:"2%"},children:[Object(O.jsx)(m.j,{md:"12",children:Object(O.jsx)("p",{htmlFor:"nf-email",style:{fontWeight:"700",fontSize:"14px",textAlign:"left",textDecoration:"underline",textTransform:"uppercase"},children:"Contact Person 1"})}),Object(O.jsxs)(m.j,{md:"3",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Name"}),Object(O.jsx)(m.y,{id:"Person_Name",placeholder:"Name",value:Te.ContactPersonName,onChange:function(e){fe(Object(n.a)(Object(n.a)({},Te),{},{ContactPersonName:e.target.value}))}})]}),Object(O.jsxs)(m.j,{md:"3",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Email"}),Object(O.jsx)(m.y,{id:"Person_Email",placeholder:"Email",value:Te.ContactPersonEmail,onChange:function(e){fe(Object(n.a)(Object(n.a)({},Te),{},{ContactPersonEmail:e.target.value}))}})]}),Object(O.jsxs)(m.j,{md:"3",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Alternate Email"}),Object(O.jsx)(m.y,{id:"Person_Email2",placeholder:"Alternate Email",value:Te.ContactPersonEmail2,onChange:function(e){fe(Object(n.a)(Object(n.a)({},Te),{},{ContactPersonEmail2:e.target.value}))}})]}),Object(O.jsxs)(m.j,{md:"3",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Contact Number"}),Object(O.jsxs)(m.H,{children:[Object(O.jsx)(m.j,{md:"2",style:{paddingRight:"0%"},children:Object(O.jsx)(m.y,{id:"text-input1",name:"text-input",placeholder:"Code",value:"+",readOnly:!0,style:{fontWeight:"600",padding:"7px",borderRadius:"4px 0px 0px 4px !important"}})}),Object(O.jsx)(m.j,{md:"2",style:{paddingRight:"0%",paddingLeft:"0%"},children:Object(O.jsx)(m.y,{id:"text-input1",name:"text-input",style:{borderRadius:"0px",padding:"7px"},value:Te.ContactPersonPhoCode,maxLength:"3",onChange:function(e){(""===e.target.value||/^[0-9\b]+$/.test(e.target.value))&&fe(Object(n.a)(Object(n.a)({},Te),{},{ContactPersonPhoCode:e.target.value}))}})}),Object(O.jsx)(m.j,{md:"8",style:{paddingLeft:"0%"},children:Object(O.jsx)(m.y,{id:"text-input1",name:"text-input",placeholder:"Contact Number",value:Te.ContactPersonPho,maxLength:"10",onChange:function(e){(""===e.target.value||/^[0-9\b]+$/.test(e.target.value))&&fe(Object(n.a)(Object(n.a)({},Te),{},{ContactPersonPho:e.target.value}))}})})]})]}),Object(O.jsxs)(m.j,{md:"3",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Alternate Number"}),Object(O.jsxs)(m.H,{children:[Object(O.jsx)(m.j,{md:"2",style:{paddingRight:"0%"},children:Object(O.jsx)(m.y,{id:"text-input1",name:"text-input",placeholder:"Code",value:"+",readOnly:!0,style:{fontWeight:"600",padding:"7px",borderRadius:"4px 0px 0px 4px !important"}})}),Object(O.jsx)(m.j,{md:"2",style:{paddingRight:"0%",paddingLeft:"0%"},children:Object(O.jsx)(m.y,{id:"text-input1",name:"text-input",style:{borderRadius:"0px",padding:"7px"},value:Te.ContactPersonPho2Code,maxLength:"3",onChange:function(e){(""===e.target.value||/^[0-9\b]+$/.test(e.target.value))&&fe(Object(n.a)(Object(n.a)({},Te),{},{ContactPersonPho2Code:e.target.value}))}})}),Object(O.jsx)(m.j,{md:"8",style:{paddingLeft:"0%"},children:Object(O.jsx)(m.y,{id:"text-input1",name:"text-input",placeholder:"Alternate Number",value:Te.ContactPersonPho2,maxLength:"10",onChange:function(e){(""===e.target.value||/^[0-9\b]+$/.test(e.target.value))&&fe(Object(n.a)(Object(n.a)({},Te),{},{ContactPersonPho2:e.target.value}))}})})]})]})]}),Object(O.jsxs)(m.H,{style:{borderTop:"1px solid rgb(211, 211, 211)",borderBottom:"1px solid rgb(211, 211, 211)",padding:"2%"},children:[Object(O.jsx)(m.j,{md:"12",children:Object(O.jsx)("p",{htmlFor:"nf-email",style:{fontWeight:"700",fontSize:"14px",textAlign:"left",textDecoration:"underline",textTransform:"uppercase"},children:"Contact Person 2"})}),Object(O.jsxs)(m.j,{md:"3",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Name"}),Object(O.jsx)(m.y,{id:"Person_Name",placeholder:"Name",value:Te.ContactPersonName_2,onChange:function(e){fe(Object(n.a)(Object(n.a)({},Te),{},{ContactPersonName_2:e.target.value}))}})]}),Object(O.jsxs)(m.j,{md:"3",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Email"}),Object(O.jsx)(m.y,{id:"Person_Email",placeholder:"Email",value:Te.ContactPersonEmail_2,onChange:function(e){fe(Object(n.a)(Object(n.a)({},Te),{},{ContactPersonEmail_2:e.target.value}))}})]}),Object(O.jsxs)(m.j,{md:"3",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Alternate Email"}),Object(O.jsx)(m.y,{id:"Person_Email2",placeholder:"Alternate Email",value:Te.ContactPersonEmail2_2,onChange:function(e){fe(Object(n.a)(Object(n.a)({},Te),{},{ContactPersonEmail2_2:e.target.value}))}})]}),Object(O.jsxs)(m.j,{md:"3",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Contact Number"}),Object(O.jsxs)(m.H,{children:[Object(O.jsx)(m.j,{md:"2",style:{paddingRight:"0%"},children:Object(O.jsx)(m.y,{id:"text-input1",name:"text-input",placeholder:"Code",value:"+",readOnly:!0,style:{fontWeight:"600",padding:"7px",borderRadius:"4px 0px 0px 4px !important"}})}),Object(O.jsx)(m.j,{md:"2",style:{paddingRight:"0%",paddingLeft:"0%"},children:Object(O.jsx)(m.y,{id:"text-input1",name:"text-input",style:{borderRadius:"0px",padding:"7px"},value:Te.ContactPersonPho_Code,maxLength:"3",onChange:function(e){(""===e.target.value||/^[0-9\b]+$/.test(e.target.value))&&fe(Object(n.a)(Object(n.a)({},Te),{},{ContactPersonPho_Code:e.target.value}))}})}),Object(O.jsx)(m.j,{md:"8",style:{paddingLeft:"0%"},children:Object(O.jsx)(m.y,{id:"text-input1",name:"text-input",placeholder:"Contact Number",value:Te.ContactPersonPho_2,maxLength:"10",onChange:function(e){(""===e.target.value||/^[0-9\b]+$/.test(e.target.value))&&fe(Object(n.a)(Object(n.a)({},Te),{},{ContactPersonPho_2:e.target.value}))}})})]})]}),Object(O.jsxs)(m.j,{md:"3",children:[Object(O.jsx)(m.z,{htmlFor:"exampleInputName2",className:"pr-1",children:"Alternate Number"}),Object(O.jsxs)(m.H,{children:[Object(O.jsx)(m.j,{md:"2",style:{paddingRight:"0%"},children:Object(O.jsx)(m.y,{id:"text-input1",name:"text-input",placeholder:"Code",value:"+",readOnly:!0,style:{fontWeight:"600",padding:"7px",borderRadius:"4px 0px 0px 4px !important"}})}),Object(O.jsx)(m.j,{md:"2",style:{paddingRight:"0%",paddingLeft:"0%"},children:Object(O.jsx)(m.y,{id:"text-input1",name:"text-input",style:{borderRadius:"0px",padding:"7px"},value:Te.ContactPersonPho_2Code,maxLength:"3",onChange:function(e){(""===e.target.value||/^[0-9\b]+$/.test(e.target.value))&&fe(Object(n.a)(Object(n.a)({},Te),{},{ContactPersonPho_2Code:e.target.value}))}})}),Object(O.jsx)(m.j,{md:"8",style:{paddingLeft:"0%"},children:Object(O.jsx)(m.y,{id:"text-input1",name:"text-input",placeholder:"Alternate Number",value:Te.ContactPersonPho2_2,maxLength:"10",onChange:function(e){(""===e.target.value||/^[0-9\b]+$/.test(e.target.value))&&fe(Object(n.a)(Object(n.a)({},Te),{},{ContactPersonPho2_2:e.target.value}))}})})]})]})]})]})]})]}),Object(O.jsxs)(m.H,{children:[Object(O.jsx)(m.j,{md:"4",children:Object(O.jsx)("p",{htmlFor:"nf-email",style:{fontSize:"14px",textAlign:"left",textTransform:"uppercase",marginLeft:"7%"},children:Object(O.jsxs)("b",{style:{color:"black",fontSize:"12px"},children:["Customer :  ",Te.Name]})})}),Object(O.jsx)(m.j,{md:"8",children:Object(O.jsx)("div",{id:"inline-btn",children:Object(O.jsx)(m.d,{type:"button",onClick:function(){Te.Email.lastIndexOf("@"),Te.Email.lastIndexOf("."),Te.Email2.lastIndexOf("@"),Te.Email2.lastIndexOf("."),Te.ContactPersonEmail.lastIndexOf("@"),Te.ContactPersonEmail.lastIndexOf("."),Te.ContactPersonEmail2.lastIndexOf("@"),Te.ContactPersonEmail2.lastIndexOf(".");if(""===Te.Name||null===Te.Name)ge.fire({icon:"warning",title:"Please Enter Customer Name!"});else if("-1"===Te.Category)ge.fire({icon:"warning",title:"Please Select Customer Category!"});else if("-1"===Te.type)ge.fire({icon:"warning",title:"Please Select Customer Type!"});else if("-1"===Te.Subtype)ge.fire({icon:"warning",title:"Please Select Customer Sub Type!"});else if(""===Te.Capacity||null===Te.Capacity)ge.fire({icon:"warning",title:"Please Enter Customer Capacity!"});else if("-1"===Te.Unit)ge.fire({icon:"warning",title:"Please Select Unit!"});else if("-1"===Te.Manager||null===Te.Manager)ge.fire({icon:"warning",title:"Please Select Customer Superior!"});else if("-1"===Te.Area||null===Te.Area)ge.fire({icon:"warning",title:"Please Select Customer Area!"});else if(""===Te.password||null===Te.password)ge.fire({icon:"warning",title:"Please Enter Customer Password!"});else{document.getElementById("divLoading").className="show";var e={CUSTOMER_CATEGORY_FKID:Te.Category,CUSTOMER_TYPE_FKID:Te.type,CUSTOMER_SUBTYPE_FKID:Te.Subtype,CUSTOMER_UNIT_FKID:Te.Unit,CUSTOMER_NAME:Te.Name,CUSTOMER_NUMBER:Te.CustNo,CUSTOMER_GST_NO:Te.GstNo,CUSTOMER_AREA_FKID:Te.Area,CUSTOMER_EMAIL:Te.Email,CUSTOMER_EMAIL2:Te.Email2,CUSTOMER_MOBILE_CODE:Te.PhoCode,CUSTOMER_MOBILE:Te.PhoneNumber,CUSTOMER_ALT_MOBILE_CODE:Te.AltPhoCode,CUSTOMER_ALT_MOBILE:Te.AlterNateNumber,CUSTOMER_CAPACITY:Te.Capacity,CUSTOMER_REPRESENTATIVE_FKID:Te.Manager,CUSTOMER_PRFILE:Te.Profile,CUSTOMER_PASSWORD:Te.password,CUSTOMER_DOC1:Te.Doc1,CUSTOMER_DOC2:Te.Doc2,CUSTOMER_DOC3:Te.Doc3,CUSTOMER_DOC4:Te.Doc4,CUSTOMER_DOC5:Te.Doc5,CUSTOMER_DOC6:Te.Doc6,CUSTOMER_CONTACT_PERSON_NAME:Te.ContactPersonName,CUSTOMER_CONTACT_PERSON_EMAIL:Te.ContactPersonEmail,CUSTOMER_CONTACT_PERSON_EMAIL2:Te.ContactPersonEmail2,CUSTOMER_CONTACT_PERSON_PHO_CODE:Te.ContactPersonPhoCode,CUSTOMER_CONTACT_PERSON_PHO:Te.ContactPersonPho,CUSTOMER_CONTACT_PERSON_PHO2_CODE:Te.ContactPersonPho2Code,CUSTOMER_CONTACT_PERSON_PHO2:Te.ContactPersonPho2,CUSTOMER_CONTACT_SEC_PERSON_NAME:Te.ContactPersonName_2,CUSTOMER_CONTACT_SEC_PERSON_EMAIL:Te.ContactPersonEmail_2,CUSTOMER_CONTACT_SEC_PERSON_EMAIL2:Te.ContactPersonEmail2_2,CUSTOMER_CONTACT_SEC_PERSON_PHO_CODE:Te.ContactPersonPho_Code,CUSTOMER_CONTACT_SEC_PERSON_PHO:Te.ContactPersonPho_2,CUSTOMER_CONTACT_SEC_PERSON_PHO2_CODE:Te.ContactPersonPho_2Code,CUSTOMER_CONTACT_SEC_PERSON_PHO2:Te.ContactPersonPho2_2};console.log(e),r.a.put(j.a+"updatecustomer/"+a,e).then((function(e){console.log(e.data),!0===e.data?(d.a.fire({title:"Customer Details Updated!",icon:"success",confirmButtonText:"OK"}),document.getElementById("divLoading").className="hide",q.push("/ViewCustomers")):(d.a.fire({title:"Failed To Update!",icon:"error",confirmButtonText:"OK"}),document.getElementById("divLoading").className="hide")}))}},color:"primary",style:{float:"right",fontWeight:"600"},children:"UPDATE CUSTOMER"})})})]})]})})})]})})})]})})})})]})}}}]);
//# sourceMappingURL=116.f0dcb6af.chunk.js.map