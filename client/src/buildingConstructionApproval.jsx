import React, { useState } from 'react';
import './buildingConstructionApproval1.css';
import { useNavigate } from 'react-router-dom';
import mainLogo from './images/kk.png'
import bgimage from './images/pattern-2.jpg'



const BuildingConstructionApproval = () => {
  const [formData, setFormData] = useState({
    name: '',
    district: '',
    area: '',
    siteno: '',
    buildingType: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const navigateToExternalPage = () => {
    window.location.href = 'http://10.60.205.84:8080/services.html'; // Use window.location.href for external URLs
    alert('Your form has been submitted successfully!');

    // Wait for 3000 milliseconds (3 seconds) and then close the alert
    setTimeout(function() {
      const alerts = document.querySelectorAll('.alert');
      alerts.forEach((alert) => {
        alert.style.display = 'none';
      });
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Save form data to localStorage
      localStorage.setItem('buildingFormData', JSON.stringify(formData));
  
      // Send form data to the server
      const response = await fetch('http://localhost:6969/building-construction-approval', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Building data submitted successfully');

        // Use the useNavigate hook to redirect to the home page
        navigateToExternalPage();
      } else {
        console.error('Failed to submit Building data');
      }
  
    } catch (error) {
      console.error('Error submitting Building Construction Approval data:', error);
    }
  };

  const districts = [
    "Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban",
    "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga",
    "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri",
    "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur",
    "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"
  ];

  // Building type options
  const buildingTypes = ["Residential", "Commercial"];

  return (
    <div>
      {/* First code block */}
        <div className="header" style={{ backgroundColor: '#f0f0f0', padding: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
          <div className="header-left-panel">
            <div className="logo-wrap">
              <div className="logo">
                <img src= {mainLogo} style={{ height: '100px' }} className="center" alt="Karnataka Seal" />
                <h2>ಕರ್ನಾಟಕ ಸರ್ಕಾರ</h2>
                <h1>GOVERNMENT OF KARNATAKA</h1>
              </div>
            </div>
          </div>
          <div className="header-right-panel">
            <div className="header-right-panel-top">
              <p>Call Us : 080 44554455</p>
              <p><a href="#">Mail Us : pd.webportal@karnataka.gov.in</a></p>
            </div>
          </div>
        </div>

      {/* Second code block */}
      <div className="container" style={{ backgroundColor: '#f0f0f0', padding: '20px', border: '1% solid #000' }}>
      <h2 className="title">BUILDING CONSTUCTION APPROVAL</h2>
      <form onSubmit={handleSubmit} className="form">
        {/* Owner Name Input Field */}
        <div className="form-group">
          <label htmlFor="name">Owner Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* District Dropdown */}
        <div className="form-group">
          <label htmlFor="district">Select Karnataka District:</label>
          <select
            id="district"
            name="district"
            value={formData.district}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>Select a district</option>
            {districts.map((district, index) => (
              <option key={index} value={district.toLowerCase()}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* Area Input Field */}
        <div className="form-group">
          <label htmlFor="area">Area:</label>
          <input
            type="text"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Site No Input Field */}
        <div className="form-group">
          <label htmlFor="siteno">Site No:</label>
          <input
            type="text"
            id="siteno"
            name="siteno"
            value={formData.siteno}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Building Type Dropdown */}
        <div className="form-group">
          <label htmlFor="buildingType">Building Type:</label>
          <select
            id="buildingType"
            name="buildingType"
            value={formData.buildingType}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>Select a building type</option>
            {buildingTypes.map((type, index) => (
              <option key={index} value={type.toLowerCase()}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <input type="submit" value="Submit" className="submit-btn" />
      </form>
    </div>
  
    </div>
  );
};


export default BuildingConstructionApproval;
