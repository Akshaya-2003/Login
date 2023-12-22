//propertyRegistration.jsx

import React, { useState, useEffect } from 'react';
import './PropertyRegistration.css';
import { useNavigate } from 'react-router-dom';
import mainLogo from './images/kk.png'

const PropertyRegistration = () => {
  const [formData, setFormData] = useState({
    propertyName: '',
    propertyID: '',
    phoneNumber: '',
    kathaType: 'A-KATHA',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Load form data from localStorage on component mount
    const savedFormData = localStorage.getItem('propertyRegistrationFormData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const navigateToExternalPage = () => {
    window.location.href = 'http://10.60.205.84:8080/services.html'; // Use window.location.href for external URLs
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save form data to localStorage
      localStorage.setItem('propertyRegistrationFormData', JSON.stringify(formData));

      // Send form data to the server
      const response = await fetch('http://localhost:6969/submitProperty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Property data submitted successfully');

        // Clear form data from localStorage after successful submission
        localStorage.removeItem('propertyRegistrationFormData');

        // Use the useNavigate hook to redirect to the home page
        navigateToExternalPage();
      } else {
        console.error('Failed to submit Property data');
      }
    } catch (error) {
      console.error('Error submitting Property data:', error);
    }
  };

  return (
    <div>
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
      <div className="container" style={{ backgroundColor: '#f0f0f0', padding: '20px', border: '1% solid #000' }}>
        <h2>PROPERTY REGISTRATION FORM</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="propertyName">Property Owner Name:</label>
          <input
            type="text"
            id="propertyName"
            name="propertyName"
            value={formData.propertyName}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="propertyID">Property ID:</label>
          <input
            type="text"
            id="propertyID"
            name="propertyID"
            value={formData.propertyID}
            onChange={handleInputChange}
            required
          />

          <br />
          <br />

          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="number"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />

          <br />
          <br />

          <label htmlFor="kathaType">Katha Type:</label>
          <select
            id="kathaType"
            name="kathaType"
            value={formData.kathaType}
            onChange={handleInputChange}
          >
            <option value="A-KATHA">A-KATHA</option>
            <option value="B-KATHA">B-KATHA</option>
          </select>

          <br />
          <br />

          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>

  );
};

export default PropertyRegistration;
