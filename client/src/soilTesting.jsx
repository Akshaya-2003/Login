// SoilTestingForm.jsx
import React, { useState, useEffect } from 'react';
import './soilTesting.css';
import { useNavigate } from 'react-router-dom';
import mainLogo from './images/kk.png'

const districts = [
    "Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban",
    "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga",
    "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri",
    "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur",
    "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"
];

const SoilTestingForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        districtName: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        setFormData({
            name: '',
            email: '',
            phoneNumber: '',
            districtName: '',
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
            // Send form data to the server
            const response = await fetch('http://localhost:6969/submitSoilTesting', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phoneNumber: formData.phoneNumber,
                    districtName: formData.district, // Ensure that the property name matches the expected name on the server
                }),
            });
    
            if (response.ok) {
                console.log('Soil Testing data submitted successfully');
    
                // Clear form data from localStorage after successful submission
                localStorage.removeItem('soilTestingFormData');
    
                // Use the useNavigate hook to redirect to the home page
                navigateToExternalPage();
            } else {
                // Log the error details
                const errorData = await response.json();
                console.error('Failed to submit Soil Testing data:', errorData.error);
            }
        } catch (error) {
            console.error('Error submitting Soil Testing data:', error);
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

            <div className="container" style={{ backgroundColor: '#f0f0f0', padding: '20px', border: '1% solid #000' }}>
                <h2>Soil Testing Appointment</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />

                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="number" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />

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
                    <br /><br />

                    <div>
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SoilTestingForm;
