import { BrowserRouter, Routes, Route} from "react-router-dom";
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



 

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
        <Route path="/each-project" element={<EachProject1/>} />
        <Route path='/contact-us' element={<ContactUs/>}/>
        <Route path='/gallery' element={<Gallery/>}/>
        
        
    </Routes>
    </BrowserRouter>
    
  
  );
}

export default App;
