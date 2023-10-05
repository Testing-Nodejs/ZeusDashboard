import React from "react";
import "../views/Portal/assets/css/animate.min.css";
import "../views/Portal/assets/css/bootstrap.min.css";
import "../views/Portal/assets/css/magnific.min.css";
// import "../views/Portal/assets/css/jquery-ui.min.css";
import "../views/Portal/assets/css/nice-select.min.css";
// import "../views/Portal/assets/css/owl.min.css";
import "../views/Portal/assets/css/slick-slide.min.css";
import "../views/Portal/assets/css/remixicon/remixicon.css";
import "../views/Portal/assets/css/style.css";
import "../views/Portal/assets/css/responsive.css";
import Image from "src/views/Portal/assets/img/super-DNA.jpg";
import logo from "src/views/Portal/assets/img/logo.png";
// import "https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700;800&amp;family=Bebas+Neue&amp;family=Satisfy&amp;family=Quattrocento:wght@400;700&amp;display=swap";


const Login = () => {

  return (
    <div>
      <header className="navbar-area">
        <nav className="navbar navbar-expand-lg">
          <div className="container nav-container">
            <div className="responsive-mobile-menu">
              <button className="menu toggle-btn d-block d-lg-none" data-target="#themefie_main_menu"
                aria-expanded="false" aria-label="Toggle navigation" style={{ backgroundColor: "#ed3237" }}>
                <span className="icon-left"></span>
                <span className="icon-right"></span>
              </button>
            </div>
            <div className="logo">
              <a className="main-logo" href="/"><img src={(logo)} alt="img" /></a>
            </div>
            <div className="collapse navbar-collapse" style={{width: "71%"}} id="themefie_main_menu">
              <ul className="navbar-nav menu-open">
                {/* <li className="current-menu-item">
                  <a href="/">HOME</a>
                </li> */}
                <li><a className="search" href="/AdminLogin">Admin Login</a></li>
                <li><a className="search" href="/ProcessApprovedLogin">Process Approved</a></li>
                <li><a className="search" href="/ScheduleLogin">Sceduling</a></li>
                <li><a className="search" href="/DistributerLogin">Distributors Login</a></li>
                <li><a className="search" href="/CustomerLogin">Customers Login</a></li>
              </ul>
            </div>

            <div className="nav-right-part nav-right-part-mobile">
              <ul>

              </ul>
            </div>
            <div className="nav-right-part nav-right-part-desktop">
              <ul>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <section className="banner-area" style={{backgroundImage:"url("+Image+")",backgroundSize: "cover",backgroundPosition: "center"}}>
        
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 align-self-center">
                    <div className="banner-inner text-center">
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className="offer-area pd-top-120 pd-bottom-90">
        <div className="container">
            <h2 className="text-center">Our Companies</h2><br />
            <div className="row justify-content-center" id="company-main">
                <div className="col-md-3 align-self-center d-contents" id="company-001">
                    <div className="single-offer-wrap" style={{backgroundColor: "#f1eff0"}}>
                        <img className="bg-img" src={(logo)} alt="img"/>
                    </div>
                </div>
                <div className="col-md-3 align-self-center d-contents" id="company-001">
                    <div className="single-offer-wrap" style={{backgroundColor: "#f1eff0"}}>
                        <img className="bg-img" src="https://zeusbiotech.com/wp-content/uploads/2020/08/ZFS.png" alt="img"/>
                    </div>
                </div>
                <div className="col-md-3 align-self-center d-contents" id="company-001">
                    <div className="single-offer-wrap" style={{backgroundColor: "#f1eff0"}}>
                        <img className="bg-img" src="https://zeusbiotech.com/wp-content/uploads/2020/08/Jaysons.png" alt="img"/>
                    </div>
                </div>
                <div className="col-md-3 align-self-center d-contents" id="company-001">
                    <div className="single-offer-wrap" style={{backgroundColor: "#f1eff0"}}>
                        <img className="bg-img" src="https://zeusbiotech.com/wp-content/uploads/2020/08/Zymo.png" alt="img"/>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                
            </div>
        </div>
    </section>
    <section className="populer-area pd-bottom-90">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12">
                    <div className="section-title text-center">
                        <h3 className="sub-title">Our signature</h3>
                        <h2 className="title">Most Popular Product</h2>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6">
                    <div className="single-item-wrap">
                        <div className="thumb">
                            <a href="https://zeusbiotech.com/zeus-product/breedon/"><img src={require("../views/Portal/assets/img/product/speies/Breedon.png").default} alt="img"/></a>
                            {/* <a className="fav-btn" href="/"></a> */}
                        </div>                        
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="single-item-wrap">
                        <div className="thumb">
                            <a href="https://zeusbiotech.com/zeus-product/brozyme-xpr/"><img src={require("../views/Portal/assets/img/product/speies/Brozyme.png").default} alt="img"/></a>
                            {/* <a className="fav-btn" href="/"></a> */}
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="single-item-wrap">
                        <div className="thumb">
                            <a href="https://zeusbiotech.com/zeus-product/chromisac-c-vit-liquid/"><img src={require("../views/Portal/assets/img/product/speies/Chromisa-Cv.png").default} alt="img"/></a>
                            {/* <a className="fav-btn" href="/"></a> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className="blog-area pd-bottom-90">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-5 col-lg-7">
                    <div className="section-title text-center">
                        <h3 className="sub-title">Gallery</h3>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6">
                    <div className="single-blog-wrap">
                        <div className="thumb">
                            <img src="https://zeusbiotech.com/wp-content/uploads/2020/06/Unit-2.jpg" alt="img"/>
                        </div>
                       
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="single-blog-wrap">
                        <div className="thumb">
                            <img src="https://zeusbiotech.com/wp-content/uploads/2020/06/Unit-3.jpg" alt="img"/>
                        </div>
                        
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="single-blog-wrap">
                        <div className="thumb">
                            <img src="https://zeusbiotech.com/wp-content/uploads/2020/06/Unit-1.1.jpg" alt="img"/>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>
    <footer className="footer-area pd-top-100">
        <div className="footer-inner padding-top-100 padding-bottom-65">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-sm-6">
                        <div className="footer-widget widget">
                            <div className="logo">
                                <img src={require("../views/Portal/assets/img/logo.png").default} alt="img"/>
                            </div>
                            <ul className="contact_info_list">
                                <li className="single-info-item">
                                    <img src={require("../views/Portal/assets/img/icon/location.png").default} alt="icon"/>
                                    <div className="details">
                                        Unit-1 : A-115, Industrial Estate, Hebbal, Mysore-570 016 Karnataka, India
                                    </div>
                                </li>
                                <li className="single-info-item">
                                    <img src={require("../views/Portal/assets/img/icon/envelope.png").default} alt="icon"/>
                                    <div className="details">
                                        info@zeusbiotech.com
                                    </div>
                                </li>
                                <li className="single-info-item">
                                    <img src={require("../views/Portal/assets/img/icon/phone.png").default} alt="icon"/>
                                    <div className="details">
                                        +91 8088886488
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-6">
                        <div className="footer-widget widget widget_link">
                            <h4 className="widget-title">Logins</h4>
                            <ul>
                                <li><a className="search" href="/AdminLogin">Admin Login</a></li>
                                <li><a className="search" href="/ProcessApprovedLogin">Process Approved</a></li>
                                <li><a className="search" href="/ScheduleLogin">Sceduling</a></li>
                                <li><a className="search" href="/DistributerLogin">Distributors Login</a></li>
                                <li><a className="search" href="/CustomerLogin">Customers Login</a></li>
                                
                            </ul>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div className="footer-bottom">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6 text-md-start text-center">
                        <div className="copyright-area">
                            <p>© 2022 Zeus Biotech</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <ul className="social-area text-md-end text-center mt-md-0 mt-2">
                            <li><a href="www.google.com"><i className="fab fa-facebook-f"></i></a></li> 
                            <li><a href="www.google.com"><i className="fab fa-twitter"></i></a></li> 
                            <li><a href="www.google.com"><i className="fab fa-behance"></i></a></li> 
                            <li><a href="www.google.com"><i className="fab fa-google-plus-g"></i></a></li> 
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <div className="back-to-top">
        <span className="back-top"><i className="fas fa-angle-double-up"></i></span>
    </div>
    </div>
  );
};

export default Login;
