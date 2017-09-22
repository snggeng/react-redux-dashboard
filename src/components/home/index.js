import React, { Component } from 'react'
import { Route, NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from '../../styles/admin.css'

import Furniture from '../furniture'
// import Logout from '../logout'
import { fetchAndHandleFurnitures } from '../../actions/furnitureActions'

const Topic = ({ match }) => (
  <div>
    {match.params.topicId === 'product-details' ? <Product />:<h3>{match.params.topicId}</h3>}
  </div>
)

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {open: true};
  }

  componentDidMount() {
    this.props.fetchAndHandleFurnitures()
  }

  render() {
    return (
      <div>
        <div class="wrapper home">
      <header class="header">
          <div class="header-top">
              <div class="container">
                  <div class="row">
                      <div class="col-md-4 col-sm-4 col-xs-12">
                          <div class="search-area">
                              <div class="search-bar">
                                  <form action="#">
                                      <input type="text" placeholder="Search anything" />
                                      <button type="submit"><i class="zmdi zmdi-search"></i></button>
                                  </form>
                              </div>
                          </div>
                      </div>
                      <div class="col-md-3 col-sm-5  col-xs-12">
                          <div class="logo text-center">
                              <a href="index.html">
                                  <img src="img/logo/logo.png" alt=""/>
                              </a>
                          </div>
                      </div>
                      <div class="col-md-5 col-sm-2 hidden-xs">
                          <div class="header-right-bar f-right">
                              <ul>
                                  <li class="account"><a href="#"  data-toggle="modal" data-target="#loginModal"><i class="zmdi zmdi-account-o"></i></a></li>
                                  <li class="cart"><a href="#" data-toggle="dropdown"><i class="zmdi zmdi-shopping-cart"></i>
                                      <span class="cart-count">2</span>
                                  </a>

                                {/* {<!-- Mini Cart Brief -->} */}
                                  <div class="mini-cart-brief dropdown-menu text-left">
                                      {/* <!-- Cart Products --> */}
                                      <div class="all-cart-product clearfix">
                                          <div class="single-cart clearfix">
                                              <div class="cart-image">
                                                  <a href="product-details.html"><img src="img/product/cart-1.jpg" alt=""/></a>
                                              </div>
                                              <div class="cart-info">
                                                  <h5><a href="product-details.html">Le Parc Minotti Chair</a></h5>
                                                  <p>1 x £9.00</p>
                                                  <a href="#" class="cart-delete" title="Remove this item"><i class="zmdi zmdi-delete"></i></a>
                                              </div>
                                          </div>
                                          <div class="single-cart clearfix">
                                              <div class="cart-image">
                                                  <a href="product-details.html"><img src="img/product/cart-2.jpg" alt=""/></a>
                                              </div>
                                              <div class="cart-info">
                                                  <h5><a href="product-details.html">DSR Eiffel chair</a></h5>
                                                  <p>1 x £9.00</p>
                                                  <a href="#" class="cart-delete" title="Remove this item"><i class="zmdi zmdi-delete"></i></a>
                                              </div>
                                          </div>
                                      </div>
                                      {/* <!-- Cart Total --> */}
                                      <div class="cart-totals">
                                          <h5>Total <span>£12.00</span></h5>
                                      </div>
                                      {/* <!-- Cart Button --> */}
                                      <div class="cart-bottom  clearfix">
                                          <a href="checkout.html">Check out</a>
                                      </div>
                                  </div>

                                  </li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="header-bottom">
              <div class="container">
                  <div class="row">
                      <div class="col-md-12 hidden-xs">
                          <div class="menu text-center">
                              <nav>
                                  <ul>
                                      <li><a href="index.html">Home</a>
                                          <ul class="dropdown_menu">
                                              <li><a href="index.html">Home One</a></li>
                                              <li><a href="index-2.html">Home Two</a></li>
                                              <li><a href="portfolio-index.html">Portfolio Home One</a></li>
                                              <li><a href="portfolio-index-2.html">Portfolio Home two</a></li>
                                              <li><a href="index-slider.html">Home Slider</a></li>
                                          </ul>
                                      </li>
                                      <li><a href="portfolio-index.html">portfolio</a>
                                          <ul class="dropdown_menu">
                                              <li><a href="portfolio-details.html">Portfolio Details</a></li>
                                              <li><a href="portfolio-details-2.html">Portfolio Details 2</a></li>
                                          </ul>
                                      </li>
                                      <li><a href="blog.html">blog</a>
                                          <ul class="dropdown_menu">
                                              <li><a href="blog.html">Blog page</a></li>
                                              <li><a href="blog-styel-2.html">Blog style 2</a></li>
                                              <li><a href="blog-details.html">Blog Details</a></li>
                                          </ul>
                                      </li>
                                      <li><a href="#">pages</a>
                                          <ul class="dropdown_menu">
                                              <li><a href="about.html">about us</a></li>
                                              <li><a href="contact.html">contact us</a></li>
                                              <li><a href="404.html">404</a></li>
                                              <li><a href="services.html">service page</a></li>
                                              <li><a href="wishlist.html">wishlist</a></li>
                                              <li><a href="cart.html">Cart</a></li>
                                              <li><a href="checkout.html">checkout</a></li>
                                              <li><a href="login.html">Login</a></li>
                                              <li><a href="register.html">Register</a></li>
                                          </ul>
                                      </li>
                                      <li><a href="shop.html">shop</a>
                                          <ul class="dropdown_menu">
                                              <li><a href="shop.html">Shop</a></li>
                                              <li><a href="shop-grid.html">shop grid sidebar</a></li>
                                              <li><a href="shop-list.html">shop list sidebar</a></li>
                                              <li><a href="shop-right-sidebar.html">shop Right sidebar</a></li>
                                              <li><a href="product-details.html">Product details</a></li>
                                          </ul>
                                      </li>
                                      <li><a target="_blank" href="https://themeforest.net/item/sa-minimalist-ecommerce-template/20281459?ref=AslamHasib">Buy Now</a></li>
                                  </ul>
                              </nav>
                          </div>
                      </div>
                  </div>
              </div>
              {/* <!-- Mobile menu start --> */}
              <div class="mobile-menu-area hidden-lg hidden-md hidden-sm">
                  <div class="container">
                      <div class="col-md-12">
                          <nav id="dropdown">
                              <ul>
                                  <li><a href="index.html">Home</a>
                                      <ul class="dropdown_menu">
                                          <li><a href="index.html">Home One</a></li>
                                          <li><a href="index-2.html">Home Two</a></li>
                                          <li><a href="portfolio-index.html">Portfolio Home One</a></li>
                                          <li><a href="portfolio-index-2.html">Portfolio Home two</a></li>
                                          <li><a href="index-slider.html">Home Slider</a></li>
                                      </ul>
                                  </li>
                                  <li><a href="portfolio-index.html">portfolio</a>
                                      <ul class="dropdown_menu">
                                          <li><a href="portfolio-details.html">Portfolio Details</a></li>
                                          <li><a href="portfolio-details-2.html">Portfolio Details 2</a></li>
                                      </ul>
                                  </li>
                                  <li><a href="blog.html">blog</a>
                                      <ul class="dropdown_menu">
                                          <li><a href="blog.html">Blog page</a></li>
                                          <li><a href="blog-styel-2.html">Blog style 2</a></li>
                                          <li><a href="blog-details.html">Blog Details</a></li>
                                      </ul>
                                  </li>
                                  <li><a href="#">pages</a>
                                      <ul class="dropdown_menu">
                                          <li><a href="about.html">about us</a></li>
                                          <li><a href="contact.html">contact us</a></li>
                                          <li><a href="404.html">404</a></li>
                                          <li><a href="services.html">service page</a></li>
                                          <li><a href="wishlist.html">wishlist</a></li>
                                          <li><a href="cart.html">Cart</a></li>
                                          <li><a href="checkout.html">checkout</a></li>
                                          <li><a href="login.html">Login</a></li>
                                          <li><a href="register.html">Register</a></li>
                                      </ul>
                                  </li>
                                  <li><a href="shop.html">shop</a>
                                      <ul class="dropdown_menu">
                                          <li><a href="shop.html">Shop</a></li>
                                          <li><a href="shop-grid.html">shop grid sidebar</a></li>
                                          <li><a href="shop-list.html">shop list sidebar</a></li>
                                          <li><a href="shop-right-sidebar.html">shop Right sidebar</a></li>
                                          <li><a href="product-details.html">Product details</a></li>
                                      </ul>
                                  </li>
                                  <li><a target="_blank" href="https://themeforest.net/item/sa-minimalist-ecommerce-template/20281459?ref=AslamHasib">Buy Now</a></li>
                              </ul>
                          </nav>
                      </div>
                  </div>
              </div>
          {/* <!-- Mobile menu end --> */}
          </div>
      </header>
      {/* <!--Header area end--> */}


      {/* <!-- START SLIDER SECTION --> */}
      <div class="home-slider overlay ">
          {/* <!-- Home Slider --> */}
          <div id="home-slider" class="slides">
              <img src="img/banner/portfolio-bg-2.jpg" alt="" title="#slider-caption-1"  />
              <img src="img/banner/home-bg.jpg" alt="" title="#slider-caption-2"  />
          </div>
          {/* <!-- Caption 1 --> */}
          <div id="slider-caption-1" class="nivo-html-caption">
              <div class="container">
                  <div class="row">
                      <div class="col-md-12 col-sm-12 col-xs-12">
                          <div class="slider-content">
                              <h1 class="wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.5s">simple productsp</h1>
                              <h2 class="wow fadeInUp" data-wow-duration="1s" data-wow-delay="1s">best choose for 2017</h2>
                              <a href="shop.html" class="wow fadeInUp" data-wow-duration="1s" data-wow-delay="1.5s">read more</a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          {/* <!-- Caption 2 --> */}
          <div id="slider-caption-2" class="nivo-html-caption">
              <div class="container">
                  <div class="row">
                      <div class="col-md-12 col-sm-12 col-xs-12">
                          <div class="slider-content">
                              <h1 class="wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.5s">simple productsp</h1>
                              <h2 class="wow fadeInUp" data-wow-duration="1s" data-wow-delay="1s">best choose for 2017</h2>
                              <a href="shop.html" class="wow fadeInUp" data-wow-duration="1s" data-wow-delay="1.5s">read more</a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      {/* <!-- END SLIDER SECTION -->   */}


      {/* <!--Home banner area end-->

      <!--shop area start--> */}
      <div class="shop-area">
          <div class="container-fluid">
              <div class="row">
                  <div class="col-md-12">
                      <div class="product-filter-menu text-center">
                          <ul>
                              <li data-filter="*" class="active">all</li>
                              <li data-filter=".arrivels"> new arrivels </li>
                              <li data-filter=".accessories">accessories</li>
                              <li data-filter=".furniture">furniture</li>
                              <li data-filter=".lighting">lighting</li>
                          </ul>
                      </div>
                  </div>
              </div>
              <div class="row product-filter">
                  <div class="col-md-4 col-sm-6 col-xs-12 lighting accessories filter-item">
                      <div class="single-product">
                          <div class="product-img">
                               <a href="#"><img src="img/product/1.jpg" alt=""/></a>
                              <div class="product-top-action">
                                  <div class="product-sale">
                                      <span>sale</span>
                                  </div>
                                  <div class="product-review">
                                      <a href="#"><i class="zmdi zmdi-star"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star-half"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star-outline"></i></a>
                                  </div>
                              </div>
                              <div class="product-cart">
                                  <a href="#"><i class="zmdi zmdi-shopping-cart"></i> <span>add to cart</span></a>
                              </div>
                          </div>
                          <div class="product-desc text-center">
                              <h6><a href="product-details.html">best Lorem Ipsum Dolor</a></h6>
                              <p>$75.00</p>
                          </div>
                      </div>
                  </div>
                  <div class="col-md-4 col-sm-6 col-xs-12 furniture arrivels filter-item">
                      <div class="single-product">
                          <div class="product-img">
                              <a href="#"><img src="img/product/2.jpg" alt=""/></a>
                              <div class="product-top-action">
                                  <div class="product-sale">
                                      <span>sale</span>
                                  </div>
                                  <div class="product-review">
                                      <a href="#"><i class="zmdi zmdi-star"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star-half"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star-outline"></i></a>
                                  </div>
                              </div>
                              <div class="product-cart">
                                  <a href="#"><i class="zmdi zmdi-shopping-cart"></i> <span>add to cart</span></a>
                              </div>
                          </div>
                          <div class="product-desc text-center">
                              <h6><a href="product-details.html">best Lorem Ipsum Dolor</a></h6>
                              <p>$75.00</p>
                          </div>
                      </div>
                  </div>
                  <div class="col-md-4 col-sm-6 col-xs-12 lighting accessories filter-item">
                      <div class="single-product">
                          <div class="product-img">
                               <a href="#"><img src="img/product/3.jpg" alt=""/></a>
                              <div class="product-top-action">
                                  <div class="product-sale">
                                      <span>sale</span>
                                  </div>
                                  <div class="product-review">
                                      <a href="#"><i class="zmdi zmdi-star"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star-half"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star-outline"></i></a>
                                  </div>
                              </div>
                              <div class="product-cart">
                                  <a href="#"><i class="zmdi zmdi-shopping-cart"></i> <span>add to cart</span></a>
                              </div>
                          </div>
                          <div class="product-desc text-center">
                              <h6><a href="product-details.html">best Lorem Ipsum Dolor</a></h6>
                              <p>$75.00</p>
                          </div>
                      </div>
                  </div>
                  <div class="col-md-4 col-sm-6 col-xs-12 furniture arrivels filter-item">
                      <div class="single-product">
                          <div class="product-img">
                               <a href="#"><img src="img/product/4.jpg" alt=""/></a>
                              <div class="product-top-action">
                                  <div class="product-sale">
                                      <span>sale</span>
                                  </div>
                                  <div class="product-review">
                                      <a href="#"><i class="zmdi zmdi-star"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star-half"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star-outline"></i></a>
                                  </div>
                              </div>
                              <div class="product-cart">
                                  <a href="#"><i class="zmdi zmdi-shopping-cart"></i> <span>add to cart</span></a>
                              </div>
                          </div>
                          <div class="product-desc text-center">
                              <h6><a href="product-details.html">best Lorem Ipsum Dolor</a></h6>
                              <p>$75.00</p>
                          </div>
                      </div>
                  </div>
                  <div class="col-md-4 col-sm-6 col-xs-12 furniture accessories filter-item">
                      <div class="single-product">
                          <div class="product-img">
                               <a href="#"><img src="img/product/5.jpg" alt=""/></a>
                              <div class="product-top-action">
                                  <div class="product-sale">
                                      <span>sale</span>
                                  </div>
                                  <div class="product-review">
                                      <a href="#"><i class="zmdi zmdi-star"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star-half"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star-outline"></i></a>
                                  </div>
                              </div>
                              <div class="product-cart">
                                  <a href="#"><i class="zmdi zmdi-shopping-cart"></i> <span>add to cart</span></a>
                              </div>
                          </div>
                          <div class="product-desc text-center">
                              <h6><a href="product-details.html">best Lorem Ipsum Dolor</a></h6>
                              <p>$75.00</p>
                          </div>
                      </div>
                  </div>
                  <div class="col-md-4 col-sm-6 col-xs-12 lighting arrivels filter-item">
                      <div class="single-product">
                          <div class="product-img">
                               <a href="#"><img src="img/product/6.jpg" alt=""/></a>
                              <div class="product-top-action">
                                  <div class="product-sale">
                                      <span>sale</span>
                                  </div>
                                  <div class="product-review">
                                      <a href="#"><i class="zmdi zmdi-star"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star-half"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star-outline"></i></a>
                                  </div>
                              </div>
                              <div class="product-cart">
                                  <a href="#"><i class="zmdi zmdi-shopping-cart"></i> <span>add to cart</span></a>
                              </div>
                          </div>
                          <div class="product-desc text-center">
                              <h6><a href="product-details.html">best Lorem Ipsum Dolor</a></h6>
                              <p>$75.00</p>
                          </div>
                      </div>
                  </div>
                  <div class="col-md-4 col-sm-6 col-xs-12 accessories filter-item">
                      <div class="single-product">
                          <div class="product-img">
                               <a href="#"><img src="img/product/7.jpg" alt=""/></a>
                              <div class="product-top-action">
                                  <div class="product-sale">
                                      <span>sale</span>
                                  </div>
                                  <div class="product-review">
                                      <a href="#"><i class="zmdi zmdi-star"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star-half"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star-outline"></i></a>
                                  </div>
                              </div>
                              <div class="product-cart">
                                  <a href="#"><i class="zmdi zmdi-shopping-cart"></i> <span>add to cart</span></a>
                              </div>
                          </div>
                          <div class="product-desc text-center">
                              <h6><a href="product-details.html">best Lorem Ipsum Dolor</a></h6>
                              <p>$75.00</p>
                          </div>
                      </div>
                  </div>
                  <div class="col-md-4 col-sm-6 col-xs-12 furniture arrivels filter-item">
                      <div class="single-product">
                          <div class="product-img">
                               <a href="#"><img src="img/product/8.jpg" alt=""/></a>
                              <div class="product-top-action">
                                  <div class="product-sale">
                                      <span>sale</span>
                                  </div>
                                  <div class="product-review">
                                      <a href="#"><i class="zmdi zmdi-star"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star-half"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star-outline"></i></a>
                                  </div>
                              </div>
                              <div class="product-cart">
                                  <a href="#"><i class="zmdi zmdi-shopping-cart"></i> <span>add to cart</span></a>
                              </div>
                          </div>
                          <div class="product-desc text-center">
                              <h6><a href="product-details.html">best Lorem Ipsum Dolor</a></h6>
                              <p>$75.00</p>
                          </div>
                      </div>
                  </div>
                  <div class="col-md-4 hidden-sm col-xs-12 lighting accessories filter-item">
                      <div class="single-product">
                          <div class="product-img">
                               <a href="#"><img src="img/product/4.jpg" alt=""/></a>
                              <div class="product-top-action">
                                  <div class="product-sale">
                                      <span>sale</span>
                                  </div>
                                  <div class="product-review">
                                      <a href="#"><i class="zmdi zmdi-star"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star-half"></i></a>
                                      <a href="#"><i class="zmdi zmdi-star-outline"></i></a>
                                  </div>
                              </div>
                              <div class="product-cart">
                                  <a href="#"><i class="zmdi zmdi-shopping-cart"></i> <span>add to cart</span></a>
                              </div>
                          </div>
                          <div class="product-desc text-center">
                              <h6><a href="product-details.html">best Lorem Ipsum Dolor</a></h6>
                              <p>$75.00</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      {/* <!--shop area end-->
      <!--banner area start--> */}
      <div class="banner-area">
          <div class="container">
              <div class="row">
                  <div class="col-md-4 col-sm-4 col-xs-12">
                      <div class="single-banner mb-30">
                          <a href="shop.html">
                              <div class="banner-img">
                                  <img src="img/banner/1.jpg" alt=""/>
                              </div>
                              <div class="banner-text">
                                  <h3>Best Hat Collection</h3>
                                  <p>Sell Up To 40 Off</p>
                              </div>
                          </a>
                      </div>
                  </div>
                  <div class="col-md-8 col-sm-8 col-xs-12">
                      <div class="single-banner mb-30">
                          <a href="shop.html">
                              <div class="banner-img">
                              <img src="img/banner/2.jpg" alt=""/>
                              </div>
                              <div class="banner-text">
                                  <h3>Latested Sungluss</h3>
                                  <p>Sell Up To 25 Off</p>
                              </div>
                          </a>
                      </div>
                  </div>
                  <div class="col-md-8 col-sm-8 col-xs-12">
                      <div class="single-banner">
                          <a href="shop.html">
                              <div class="banner-img">
                                  <img src="img/banner/3.jpg" alt=""/>
                              </div>
                              <div class="banner-text">
                                  <h3>Top Sofa Collection</h3>
                                  <p>Sell Up To 40 Off</p>
                              </div>
                          </a>
                      </div>
                  </div>
                  <div class="col-md-4 col-sm-4 col-xs-12">
                      <div class="single-banner">
                          <a href="shop.html">
                              <div class="banner-img">
                                  <img src="img/banner/4.jpg" alt=""/>
                              </div>
                              <div class="banner-text">
                                  <h3>Bags & Backpacks</h3>
                                  <p>Sell Up To 35 Off</p>
                              </div>
                          </a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      {/* <!--banner area end-->

      <!--Newsletter area start--> */}
      <div class="newsletter-area ptb-130">
          <div class="container">
              <div class="col-md-6 col-md-offset-3">
                  <div class="newsletter-inner text-center">
                      <div class="newsletter-title">
                          <h5>join to the newsletter</h5>
                          <p>Consectetur adipisicing elit, sed do eiusmod tempor incididunt labore</p>
                      </div>
                      <div class="newsletter-form">
                          <div id="mc_embed_signup">
                              <form action="//devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                                  <div id="mc_embed_signup_scroll">
                                      <input type="email"  class="email" id="mce-EMAIL" placeholder="Enter your e-mail" required/>
                                      {/* <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups--> */}
                                      <div style="position: absolute; left: -5000px;" aria-hidden="true">
                                          <input type="text" name="b_6bbb9b6f5827bd842d9640c82_05d85f18ef" tabindex="-1" value=""/>
                                      </div>
                                      <div class="clear">
                                          <button type="submit" id="mc-embedded-subscribe" class="button">Subscribe</button>
                                      </div>
                                  </div>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      {/* <!--Newsletter area end-->

       <!--Footer area start--> */}
      <footer class="footer">
          <div class="container">
              <div class="row">
                  <div class="col-md-3 col-sm-6 col-xs-12">
                      <div class="single-footer widget-1">
                          <div class="widget-title">
                              <h5>store Information</h5>
                          </div>
                          <div class="widget-description short-desc">
                              <div class="single-short-desc">
                                  <div class="desc-icon">
                                      <i class="zmdi zmdi-pin"></i>
                                  </div>
                                  <div class="desc-text">
                                      <p>House 08, Road No 08,<br/> Dhaka, Bangladesh</p>
                                  </div>
                              </div>
                              <div class="single-short-desc">
                                  <div class="desc-icon">
                                      <i class="zmdi zmdi-email"></i>
                                  </div>
                                  <div class="desc-text">
                                      <p>Username@gmail.com <br/> Damo@gmail.com</p>
                                  </div>
                              </div>
                              <div class="single-short-desc">
                                  <div class="desc-icon">
                                      <i class="zmdi zmdi-phone"></i>
                                  </div>
                                  <div class="desc-text">
                                      <p>+660 256 24857 <br/> +660 256 24857</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="col-md-3 col-sm-6 col-xs-12">
                      <div class="single-footer widget-2">
                          <div class="widget-title">
                              <h5>information</h5>
                          </div>
                          <div class="widget-description">
                              <div class="custom-menu">
                                  <ul>
                                      <li><a href="#"><i class="zmdi zmdi-chevron-right"></i>Hot Sale</a></li>
                                      <li><a href="#"><i class="zmdi zmdi-chevron-right"></i>best Seller</a></li>
                                      <li><a href="#"><i class="zmdi zmdi-chevron-right"></i> Suppliers</a></li>
                                      <li><a href="#"><i class="zmdi zmdi-chevron-right"></i> Our store</a></li>
                                      <li><a href="#"><i class="zmdi zmdi-chevron-right"></i> Deal of The Day</a></li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="col-md-3 col-sm-6 col-xs-12">
                      <div class="single-footer widget-3">
                          <div class="widget-title">
                              <h5>MY ACCOUNT</h5>
                          </div>
                          <div class="widget-description">
                              <div class="custom-menu">
                                  <ul>
                                      <li><a href="#"><i class="zmdi zmdi-chevron-right"></i>My account</a></li>
                                      <li><a href="#"><i class="zmdi zmdi-chevron-right"></i> Personal Information</a></li>
                                      <li><a href="#"><i class="zmdi zmdi-chevron-right"></i> Discount</a></li>
                                      <li><a href="#"><i class="zmdi zmdi-chevron-right"></i> Order history</a></li>
                                      <li><a href="#"><i class="zmdi zmdi-chevron-right"></i>Payment</a></li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="col-md-3 col-sm-6 col-xs-12">
                      <div class="single-footer widget-4">
                          <div class="widget-title">
                              <h5>Instagram</h5>
                          </div>
                          <div class="widget-description instagram">
                              <div class="instagram-list">
                                  <ul>
                                      <li><a href="#"><img src="img/instagram/1.jpg" alt=""/></a></li>
                                      <li><a href="#"><img src="img/instagram/2.jpg" alt=""/></a></li>
                                      <li><a href="#"><img src="img/instagram/3.jpg" alt=""/></a></li>
                                      <li><a href="#"><img src="img/instagram/4.jpg" alt=""/></a></li>
                                      <li><a href="#"><img src="img/instagram/5.jpg" alt=""/></a></li>
                                      <li><a href="#"><img src="img/instagram/6.jpg" alt=""/></a></li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                      <div class="copyight text-center">
                          <p>Copyright <i class="fa fa-copyright"></i> 2017 <a target="_blank" href="https://devitems.com/">Devitems LLC</a>. All rights reserved.</p>
                      </div>
                  </div>
              </div>
          </div>
      </footer>
      {/* <!--Footer area end--> */}
  </div>

  {/* <!-- Login Modal --> */}
  <div class="modal fade" id="loginModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">x</span></button>
              </div>
              <div class="modal-body">
                  <div class="login">
                      <div class="account-modal-tab">
                          <ul class="nav" role="tablist">
                              <li role="presentation"  class="active"><a href="#login" aria-controls="login" data-toggle="tab">Login</a></li>
                              <li role="presentation"><a href="#register" aria-controls="register" data-toggle="tab">Register</a></li>
                          </ul>
                      </div>
                      <div class="tab-content">
                          <div role="tabpanel" class="tab-pane active" id="login">
                              <div class="login-form-container">
                                  <div class="login-text">
                                      <h2>login</h2>
                                      <span>Please login using account detail bellow.</span>
                                  </div>
                                  <div class="login-form">
                                      <form action="#" method="post">
                                          <input type="text" name="user-name" placeholder="Username"/>
                                          <input type="password" name="user-password" placeholder="Password"/>
                                          <div class="button-box">
                                              <div class="login-toggle-btn">
                                                  <input type="checkbox" id="remember"/>
                                                  <label for="remember">Remember me</label>
                                                  <a href="#">Forgot Password?</a>
                                              </div>
                                              <button type="submit" class="default-btn floatright">Login</button>
                                          </div>
                                      </form>
                                  </div>
                              </div>
                          </div>
                          <div role="tabpanel" class="tab-pane" id="register">
                              <div class="login-form-container">
                                      <div class="login-text">
                                          <h2>Creat an Account</h2>
                                      </div>
                                      <div class="login-form">
                                          <form action="#" method="post">
                                              <input type="text" name="user-name" placeholder="Email"/>
                                              <input type="text" name="user-name" placeholder="Username"/>
                                              <input type="password" name="user-password" placeholder="Password"/>
                                              <input type="password" name="user-password" placeholder="Confirm Password"/>
                                              <div class="button-box">
                                                 <button type="submit" class="default-btn floatright">Register</button>
                                              </div>
                                          </form>
                                      </div>
                                  </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  {/* <!-- Modal end -->





  <!-- Placed js at the end of the document so the pages load faster -->


  <!-- All jquery file included here --> */}
  <script src="js/vendor/jquery-1.12.0.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <script src="js/jquery.nivo.slider.pack.js"></script>
  <script src="js/jquery.magnific-popup.js"></script>
  <script src="js/owl.carousel.min.js"></script>
  <script src="js/isotope.pkgd.min.js"></script>
  <script src="js/plugins.js"></script>
  <script src="js/main.js"></script>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    furnitures: state.furnitures
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAndHandleFurnitures: () => {dispatch(fetchAndHandleFurnitures())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
