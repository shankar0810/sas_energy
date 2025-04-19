import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/utils/authContext";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import LandingPage from "./components/LandingPage";
import AboutUs from "./components/AboutUs";
import PowerPlantService from "./components/PowerPlantsService";
import SolarGridTiedService from "./components/SolarGridTiedService";
import SolarOffGridService from "./components/SolarOffGridService";
import SolarWaterPumpingService from "./components/SolarWaterPumpingService";
import SolarWaterHeatingService from "./components/SolarWaterHeatingService";
import SolarLedStreetLightingService from "./components/SolarLedStreetLightingService";
import SolarAndUpsService from "./components/SolarAndUpsService";
import SolarFencingService from "./components/SolarFencingService";
import Projects from "./components/Projects";
import EachProject1 from "./components/EachProject1";
import ContactUs from "./components/ContactUs";
import Gallery from "./components/Gallery";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import UserManagement from "./components/admin/UserManagement";
import ForgotPasswordConfirmation from "./components/Login/ForgotPasswordConfirmation";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/service-power-plant" element={<PowerPlantService />} />
          <Route path="/service-solar-grid" element={<SolarGridTiedService />} />
          <Route path="/service-solar-offgrid" element={<SolarOffGridService />} />
          <Route path="/service-solar-water-pumping" element={<SolarWaterPumpingService />} />
          <Route path="/service-solar-water-heating" element={<SolarWaterHeatingService />} />
          <Route path="/service-solar-led-street-lighting" element={<SolarLedStreetLightingService />} />
          <Route path="/service-solar-ups" element={<SolarAndUpsService />} />
          <Route path="/service-solar-fencing" element={<SolarFencingService />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/each-project" element={<EachProject1 />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password-confirmation" element={<ForgotPasswordConfirmation />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Admin Protected Routes */}
          <Route element={<ProtectedRoute adminOnly={true} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;