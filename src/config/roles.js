import Home from "../containers/page/Home/Home";
import Login from "../containers/page/Login/Login";
import Register from "../containers/page/Register/Register";
import ProductCart from "../containers/page/ProductCart/ProductCart";
import ProductDetail from "../containers/page/ProductDetail/ProductDetail";
import Profile from "../containers/page/Profile/Profile";

const components = {
    login: {
      path: "/login",
      page: Login
    },
    register: {
      path: "/register",
      page: Register
    },
    home: {
      path: "/",
      page: Home
    },
    profile: {
      path: "/profile",
      page: Profile
    },
    productcart: {
      path: "/productcart",
      page: ProductCart
    },
    productdetail: {
      path: "/productdetail",
      page: ProductDetail
    }
  };
  
  const roles = {
    GUEST: [
      components.home,
      components.login,
      components.register
    ],
    USER: [
      components.home,
      components.productdetail,
      components.productcart,
      components.profile
    ]
  };
  
  export default roles;