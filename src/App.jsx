import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Hero from "./components/Hero/Hero.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Services from "./components/Services/Services.jsx";
import Banner from "./components/Banner/Banner.jsx";
import AppStore from "./components/AppStore/AppStore.jsx";
import Testimonials from "./components/Testimonials/Testimonials.jsx";
import Footer from "./components/Footer/Footer.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import Espresso from "./components/CoffeeScreen/Espresso.jsx";
import Americano from "./components/CoffeeScreen/Americano.jsx";
import Cappuccino from "./components/CoffeeScreen/Cappuccino.jsx";
import AddToCart from "./components/AddToCart/AddToCart.jsx";
import Wishlist from "./components/Wishlist/Wishlist.jsx";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import ForgotPassword from './components/Auth/ForgotPassword.jsx'
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import ResetPassword from './components/Auth/ResetPassword.jsx'
import PrivateRoute from "./components/Auth/PrivateRoute.jsx";
import { FavoritesProvider } from './components/ContextFiles/FavouritesContext.jsx';
import { AuthProvider} from './components/ContextFiles/AuthContext.jsx';
import {CartProvider} from './components/ContextFiles/CartContext.jsx'
const AppContent = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 700,
      easing: "ease-in",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  const location = useLocation();
  const hideNavbarRoutes = [
    "/login",
    "/register",
    "/forgot/password",
    "/admin",
  ];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-x-hidden">
      {!shouldHideNavbar && <Navbar />}
      <AuthProvider>
        <CartProvider>
      <FavoritesProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* Protected routes */}
        <Route path="/home" element={<PrivateRoute element={<Hero />} />} />
        <Route
          path="/services"
          element={<PrivateRoute element={<Services />} />}
        />
        <Route
          path="/espresso"
          element={<PrivateRoute element={<Espresso />} />}
        />
       
        <Route
          path="/americano"
          element={<PrivateRoute element={<Americano />} />}
        />
        <Route
          path="/cappuccino"
          element={<PrivateRoute element={<Cappuccino />} />}
        />
        <Route path="/banner" element={<PrivateRoute element={<Banner />} />} />
        <Route
          path="/appstore"
          element={<PrivateRoute element={<AppStore />} />}
        />
        <Route
          path="/testimonials"
          element={<PrivateRoute element={<Testimonials />} />}
        />
        <Route
          path="/addtocart"
          element={<PrivateRoute element={<AddToCart />} />}
        />
        <Route
          path="/favourite"
          element={<PrivateRoute element={<Wishlist />} />}
        />
        <Route
          path="/admin"
          element={<PrivateRoute element={<AdminDashboard />} />}
        />
        {/* Redirect to login if route not found */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      </FavoritesProvider>
      </CartProvider>
      </AuthProvider>
      {!shouldHideNavbar && <Footer />}
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
