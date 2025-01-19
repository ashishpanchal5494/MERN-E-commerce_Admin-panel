import React from "react";
import { Navigate } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import AuthLockScreen from "../pages/Authentication/AuthLockScreen";

// Dashboard
import Dashboard from "../pages/Dashboard/index";

//Ecommerce Pages
import EcommerceProducts from "../pages/Ecommerce/EcommerceProducts/index";
import EcommerceProductDetail from "../pages/Ecommerce/EcommerceProducts/EcommerceProductDetail";
import EcommerceOrders from "../pages/Ecommerce/EcommerceOrders/index";
import EcommerceCustomers from "../pages/Ecommerce/EcommerceCustomers/index";
import EcommerceAddProduct from "../pages/Ecommerce/EcommerceAddProduct";

// Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login";
import Register1 from "../pages/AuthenticationInner/Register";
import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword";
import EcommerceProductList from "../pages/Ecommerce/EcommerceProductList";
import EcommerceAddBrand from "../pages/Ecommerce/EcommerceAddBrand";
import EcommerceBrandList from "../pages/Ecommerce/EcommerceBrandList";
import EcommerceAddCategory from "../pages/Ecommerce/EcommerceAddCategory";
import EcommerceCategoryList from "../pages/Ecommerce/EcommerceCategoryList";
import EcommerceAddColor from "../pages/Ecommerce/EcommerceAddColor";
import EcommerceColorList from "../pages/Ecommerce/EcommerceColorList";
import EcommerceAddBlog from "../pages/Ecommerce/EcommerceAddBlogs";
import EcommerceBlogList from "../pages/Ecommerce/EcommerceBlogList";
import EcommerceAddBlogCategory from "../pages/Ecommerce/EcommerceAddBlogCategory";
import EcommerceBlogCategoryList from "../pages/Ecommerce/EcommerceBlogCategoryList";
import EcommerceAddCoupon from "../pages/Ecommerce/EcommerceAddCoupon";
import EcommerceCouponList from "../pages/Ecommerce/EcommerceCouponList";
import EcommerceEnquiry from "../pages/Ecommerce/EcommerceEnquiry";

const authProtectedRoutes = [
  //Ecommerce

  { path: "/ecommerce-products", component: <EcommerceProducts /> },
  {
    path: "/ecommerce-products/:id",
    component: <EcommerceProductDetail />,
  },
  { path: "/ecommerce-orders", component: <EcommerceOrders /> },
  { path: "/ecommerce-customers", component: <EcommerceCustomers /> },
  { path: "/ecommerce-add-product", component: <EcommerceAddProduct /> },
  { path: "/ecommerce-add-product/:id", component: <EcommerceAddProduct /> },
  { path: "/ecommerce-product-List", component: <EcommerceProductList /> },
  { path: "/ecommerce-add-brand", component: <EcommerceAddBrand /> },
  { path: "/ecommerce-add-brand/:id", component: <EcommerceAddBrand /> },
  { path: "/ecommerce-brand-list", component: <EcommerceBrandList /> },
  { path: "/ecommerce-add-category", component: <EcommerceAddCategory /> },
  { path: "/ecommerce-add-category/:id", component: <EcommerceAddCategory /> },
  { path: "/ecommerce-category-list", component: <EcommerceCategoryList /> },
  { path: "/ecommerce-add-color", component: <EcommerceAddColor /> },
  { path: "/ecommerce-add-color/:id", component: <EcommerceAddColor /> },
  { path: "/ecommerce-color-list", component: <EcommerceColorList /> },
  { path: "/ecommerce-add-blog", component: <EcommerceAddBlog /> },
  { path: "/ecommerce-add-blog/:id", component: <EcommerceAddBlog /> },
  { path: "/ecommerce-blog-list", component: <EcommerceBlogList /> },
  { path: "/ecommerce-add-coupon", component: <EcommerceAddCoupon /> },
  { path: "/ecommerce-add-coupon/:id", component: <EcommerceAddCoupon /> },
  { path: "/ecommerce-coupon-list", component: <EcommerceCouponList /> },
  { path: "/ecommerce-enquiry", component: <EcommerceEnquiry /> },
  {
    path: "/ecommerce-add-blog-category",
    component: <EcommerceAddBlogCategory />,
  },
  {
    path: "/ecommerce-add-blog-category/:id",
    component: <EcommerceAddBlogCategory />,
  },
  {
    path: "/ecommerce-blog-category-list",
    component: <EcommerceBlogCategoryList />,
  },

  { path: "/dashboard", component: <Dashboard /> },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
  { path: "/lock-screen", component: <AuthLockScreen /> },

  // Authentication Inner
  { path: "/auth-login", component: <Login1 /> },
  { path: "/auth-register", component: <Register1 /> },
  { path: "/auth-recoverpw", component: <ForgetPwd1 /> },
];

export { authProtectedRoutes, publicRoutes };
