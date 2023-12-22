import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup.jsx';
import Signup2 from './Signup2.jsx';
import Signup3 from './Signup3.jsx';
import Signup4 from './Signup4.jsx';
import Signup5 from './Signup5.jsx';
import Login from './Login';
import Home from './home'; // Assuming it's Home, not home
import BuildingConstructionApproval from './buildingConstructionApproval.jsx';
import CropLoan from './cropLoan';
import PropertyRegistration from './propertyRegistration.jsx';
import ScholarshipForm from './scholarship.jsx';
import SoilTesting from './soilTesting.jsx';
import Login2 from './Login2.jsx';
import Login3 from './Login3.jsx';
import Login4 from './Login4.jsx';
import Login5 from './Login5.jsx';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route path="/register2" element={<Signup2 />} />
          <Route path="/register3" element={<Signup3 />} />
          <Route path="/register4" element={<Signup4 />} />
          <Route path="/register5" element={<Signup5 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/buildingConstructionApproval" element={<BuildingConstructionApproval />} />
          <Route path="/cropLoan" element={<CropLoan />} />
          <Route path="/propertyRegistration" element={<PropertyRegistration />} />
          <Route path="/scholarship" element={<ScholarshipForm />} />
          <Route path="/soilTesting" element={<SoilTesting />} />
          <Route path="/login2" element={<Login2 />} />
          <Route path="/login3" element={<Login3 />} />
          <Route path="/login4" element={<Login4 />} />
          <Route path="/login5" element={<Login5 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
