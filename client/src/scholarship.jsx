// ScholarshipForm.jsx (Frontend)
import React, { useState, useEffect } from 'react';
import './scholarship.css';
import { useNavigate } from 'react-router-dom';
import mainLogo from './images/kk.png'

const AadhaarForm = ({ aadhaar, setAadhaar }) => {
  const handleAadhaarChange = (e) => {
    const { value } = e.target;
    setAadhaar(value);
  };

  return (
    <>
      <label htmlFor="aadhaar">Aadhaar Number:</label>
      <input
        type="number"
        id="aadhaar"
        name="aadhaar"
        value={aadhaar}
        onChange={handleAadhaarChange}
        required
      />
      <br />
      <br />
    </>
  );
};

const ScholarshipForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    collegeidno: '',
    phonenumber: '',
    grade: '',
    caste: '',
    income: '',
    aadhaar: '', // New field for Aadhaar number
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: '',
      collegeidno: '',
      phonenumber: '',
      grade: '',
      caste: '',
      income: '',
      aadhaar: '', // New field for Aadhaar number
    });
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
      localStorage.setItem('scholarshipFormData', JSON.stringify(formData));

      // Send form data to the server
      const response = await fetch('http://localhost:6969/submitScholarship', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Scholarship data submitted successfully');

        // Use the useNavigate hook to redirect to the home page
        navigateToExternalPage();
      } else {
        // Log the error details
        const errorData = await response.json();
        console.error('Failed to submit Scholarship data:', errorData.error);
      }
    } catch (error) {
      console.error('Error submitting Scholarship data:', error);
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
      <h2>Student Scholarship Registration</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />

        <label htmlFor="collegeidno">College ID:</label>
        <input
          type="number"
          id="collegeidno"
          name="collegeidno"
          value={formData.collegeidno}
          onChange={handleInputChange}
          required
        />
        <br />
        <br />

        <label htmlFor="phonenumber">Phone Number:</label>
        <input
          type="number"
          id="phonenumber"
          name="phonenumber"
          value={formData.phonenumber}
          onChange={handleInputChange}
          required
        />

        <br />
        <br />

        <label htmlFor="grade">Select Grade:</label>
        <select id="grade" name="grade" value={formData.grade} onChange={handleInputChange} required>
          <option value="">Select Grade</option>
          <option value="Primary">Primary</option>
          <option value="Highschool">Highschool</option>
          <option value="Pre-University">Pre-University</option>
          <option value="Undergraduate">Undergraduate</option>
          <option value="PostGraduate">PostGraduate</option>
          <option value="Research">Research</option>
        </select>
        <br />
        <br />

        <label htmlFor="caste">Select Category:</label>
        <select id="caste" name="caste" value={formData.caste} onChange={handleInputChange} required>
          <option value="">Select Category</option>
          <option value="General">General</option>
          <option value="Other Backward Classes (OBC)">Other Backward Classes (OBC)</option>
          <option value="Scheduled Caste (SC)">Scheduled Caste (SC)</option>
          <option value="Scheduled Tribe (ST)">Scheduled Tribe (ST)</option>
          <option value="Economically Weaker Section (EWS)">Economically Weaker Section (EWS)</option>
        </select>
        <br />
        <br />

        <label htmlFor="income">Select Monthly Family Income Level (Rupees):</label>
        <select id="income" name="income" value={formData.income} onChange={handleInputChange} required>
          <option value="">Select Income Level</option>
          <option value="Below ₹5,000">Below ₹5,000</option>
          <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
          <option value="₹10,000 - ₹20,000">₹10,000 - ₹20,000</option>
          <option value="₹20,000 - ₹30,000">₹20,000 - ₹30,000</option>
          <option value="₹30,000 - ₹50,000">₹30,000 - ₹50,000</option>
          <option value="Above ₹50,000">Above ₹50,000</option>
        </select>

        <br />
        <br />

        {/* AadhaarForm component */}
        <AadhaarForm aadhaar={formData.aadhaar} setAadhaar={(aadhaar) => setFormData((prev) => ({ ...prev, aadhaar }))} />

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

export default ScholarshipForm;
