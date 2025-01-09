import { combineReducers } from "redux";
import ProductReducer from "../features/product/ProductSlice";
import BrandReducer from "../features/brand/BrandSlice";
import ColorReducer from "../features/color/ColorSlice";
import ProductCategoryReducer from "../features/productCategory/ProductCategorySlice";
import UploadReducer from "../features/upload/UploadSlice";
import AuthReducer from "../features/auth/AuthSlice";
import CouponReducer from "../features/coupon/CouponSlice";
import EnquiryReducer from "../features/enquiry/EnquirySlice";
import CustomerReducer from "../features/customers/CustomerSlice";
import BlogCategoryReducer from "../features/blogCategory/BlogCategorySlice";
import BlogReducer from "../features/blog/BlogSlice";

// Front
import Layout from "./layout/reducer";

// Authentication Module
import Account from "./auth/register/reducer";
import Login from "./auth/login/reducer";
import Forget from "./auth/forgetpwd/reducer";

//Calendar
import Calendar from "./calendar/reducer";

//chat
import chat from "./chat/reducer";

//ecommerce

const rootReducer = combineReducers({
  product: ProductReducer,
  brand: BrandReducer,
  color: ColorReducer,
  productCategory: ProductCategoryReducer,
  upload: UploadReducer,
  auth: AuthReducer,
  customer: CustomerReducer,
  blogCategory: BlogCategoryReducer,
  blog: BlogReducer,
  enquiry: EnquiryReducer,
  coupon: CouponReducer,

  // public
  Layout,

  // Authentication
  Account,
  Login,
  Forget,
  Calendar,
  chat,
});

export default rootReducer;
