import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyClaims = () => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
  const allClaims = JSON.parse(localStorage.getItem('sellerClaims')) || {};
  const authData = JSON.parse(localStorage.getItem('auth'));
  
  if (!authData) return;
  
  const userEmail = authData.userEmail;
  
  // For sellers, we need to find claims made to them
  // First get the seller's profile to know their name
  const sellerProfiles = JSON.parse(localStorage.getItem('sellerProfiles')) || [];
  const sellerProfile = sellerProfiles.find(profile => profile.email === userEmail);
  
  if (!sellerProfile) return;
  
  // Now filter claims where the seller name matches the logged-in seller's name
  const sellerClaims = Object.entries(allClaims)
    .flatMap(([sellerName, claims]) => 
      claims.map(claim => ({ ...claim, sellerName }))
    )
    .filter(claim => claim.sellerName === sellerProfile.name);
  
  setClaims(sellerClaims);
}, []);

  return (
    <div style={{
      background: 'linear-gradient(135deg, #5e1e68, #d0473a)',
      minHeight: '100vh',
      padding: '2rem',
    }}>
      <div className="container bg-white p-4 rounded shadow-lg" style={{ maxWidth: '800px' }}>
        <h3 className="mb-4 text-center">My Claims</h3>
        {claims.length === 0 ? (
          <p className="text-center">No claims found.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim, idx) => (
                <tr key={idx}>
                  <td>{claim.orderId}</td>
                  <td>{new Date(claim.timestamp).toLocaleDateString()}</td>
                  <td>{claim.description}</td>
                  <td>Pending</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyClaims;