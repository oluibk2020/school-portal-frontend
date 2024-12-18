import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Hero from "./pages/Hero";
import Navbar from "./layout/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { storeContext } from "../src/context/storeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signout from "./pages/Signout";
import LoginVerification from "./components/LoginVerification";
import Courses from "./components/Courses";
import Course from "./components/Course";
import EnrolledCourses from "./components/EnrolledCourses";
import EnrolledCourse from "./components/EnrolledCourse";
import Wallet from "./components/Wallet";
import TransactionItem from "./components/TransactionItem";
import PaymentInvoice from "./components/PaymentInvoice";
import Services from "./components/Services";
import ResetVerification from "./components/ResetVerification";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import Footer from "./layout/Footer";
import Profile from "./pages/Profile";
import UpdateProfile from "./components/UpdateProfile";

function App() {
  const { isAuth } = useContext(storeContext);

  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={isAuth ? <Dashboard /> : <Hero />} />
        <Route path="/login" element={isAuth ? <Dashboard /> : <Login />} />
        <Route
          path="/resetpasswordverification"
          element={isAuth ? <Dashboard /> : <ResetVerification />}
        />
        <Route
          path="/resetpassword"
          element={isAuth ? <Dashboard /> : <ResetPassword />}
        />
        <Route
          path="/loginverification"
          element={isAuth ? <Dashboard /> : <LoginVerification />}
        />

        <Route path="/signout" element={isAuth ? <Signout /> : <Login />} />

        <Route
          path="/register"
          element={isAuth ? <Dashboard /> : <Register />}
        />
        <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Login />} />
        <Route path="/updateprofile" element={isAuth ? <UpdateProfile /> : <Login />} />
        <Route path="/profile" element={isAuth ? <Profile /> : <Login />} />
        <Route path="/courses" element={isAuth ? <Courses /> : <Login />} />
        <Route
          path="/walletdeposit"
          element={isAuth ? <PaymentInvoice /> : <Login />}
        />
        <Route path="/services" element={isAuth ? <Services /> : <Login />} />
        <Route path="/wallet" element={isAuth ? <Wallet /> : <Login />} />
        <Route
          path="/enrolledcourses"
          element={isAuth ? <EnrolledCourses /> : <Login />}
        />
        <Route path="/course/:id" element={isAuth ? <Course /> : <Login />} />
        <Route
          path="//transaction/:id"
          element={isAuth ? <TransactionItem /> : <Login />}
        />
        <Route
          path="/enrolledcourse/:id"
          element={isAuth ? <EnrolledCourse /> : <Login />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
