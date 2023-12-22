import React, { useState, useEffect } from 'react';
import './buildingConstructionApproval1.css'; // You can create this CSS file for styling
import { useNavigate } from 'react-router-dom';
import mainLogo from './images/kk.png'


const CropLoan = () => {
  const [formData, setFormData] = useState({
    name: '',
    AccountNo: '',
    Phonenumber: '',
    AcresofLand: '',
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
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save form data to localStorage
      localStorage.setItem('cropLoanFormData', JSON.stringify(formData));

      // Send form data to the server
      const response = await fetch('http://localhost:6969/submitCropLoan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('CropLoan data submitted successfully');
        navigateToExternalPage();
      } else {
        console.error('Failed to submit CropLoan data');
      }
    } catch (error) {
      console.error('Error submitting CropLoan data:', error);
    }
  };
  return (
    <div>
      <div className="header" style={{ backgroundColor: '#f0f0f0', padding: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
        <div className="header-left-panel">
          <div className="logo-wrap">
            <div className="logo">
              <img src={mainLogo} style={{ height: '100px' }} className="center" alt="Karnataka Seal" />
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
      <div className="container" style={{ backgroundColor: '#f0f0f0', padding: '20px' }}>
        <h2>Crop Loan Application</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="AccountNo">Account No:</label>
          <input
            type="number"
            id="AccountNo"
            name="AccountNo"
            value={formData.AccountNo}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="Phonenumber">Phone Number:</label>
          <input
            type="text"
            id="Phonenumber"
            name="Phonenumber"
            value={formData.Phonenumber}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="AcresofLand">Acres of Land:</label>
          <input
            type="number"
            id="AcresofLand"
            name="AcresofLand"
            value={formData.AcresofLand}
            onChange={handleInputChange}
            required
          />

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

export default CropLoan;
