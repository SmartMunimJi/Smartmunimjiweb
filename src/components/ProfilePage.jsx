import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfilePage = ({ userType, userEmail, userName, onLogout }) => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfileData = () => {
      try {
        const profilesKey = userType === 'seller' 
          ? 'sellerProfiles' 
          : 'customerProfiles';
        
        const allProfiles = JSON.parse(localStorage.getItem(profilesKey)) || [];
        
        const userProfile = allProfiles.find(
          profile => profile.email?.toLowerCase() === userEmail.toLowerCase()
        );
        
        if (userProfile) {
          setProfileData(userProfile);
        } else {
          setError('Profile not found');
        }
      } catch (err) {
        setError('Failed to load profile data');
        console.error('Profile load error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userType, userEmail]);

  const getProfileImage = () => {
    if (profileData?.profileImage) {
      return (
        <img 
          src={profileData.profileImage} 
          alt="Profile" 
          className="img-thumbnail rounded-circle"
          style={{ 
            width: '150px', 
            height: '150px',
            objectFit: 'cover',
            border: '3px solid white',
            boxShadow: '0 0 10px rgba(0,0,0,0.3)'
          }}
        />
      );
    }
    
    let initial = 'U';
    if (profileData?.name) initial = profileData.name[0].toUpperCase();
    else if (userName) initial = userName[0].toUpperCase();
    
    return (
      <div 
        className="bg-secondary rounded-circle d-flex align-items-center justify-content-center" 
        style={{ 
          width: '150px', 
          height: '150px',
          border: '3px solid white',
          boxShadow: '0 0 10px rgba(0,0,0,0.3)'
        }}
      >
        <span className="display-3 text-light">{initial}</span>
      </div>
    );
  };

  const getDisplayName = () => {
    if (profileData?.name) return profileData.name;
    if (userName) return userName;
    return 'No Name';
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" 
           style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #5e1e68, #d0473a)' }}>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center" 
           style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #5e1e68, #d0473a)' }}>
        <div className="alert alert-danger text-center">
          {error}
          <button className="btn btn-link text-light" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: "linear-gradient(180deg, #5e1e68, #d0473a)",
      minHeight: "100vh",
      padding: "20px"
    }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-white">Your Profile</h1>
          <div>
            <button className="btn btn-light me-2" onClick={() => navigate('/')}>
              Home
            </button>
            <button className="btn btn-light" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className="card shadow-lg">
          <div className="card-header bg-dark text-white">
            <h2 className="mb-0">
              {userType === 'seller' ? 'Seller Profile' : 'Customer Profile'}
            </h2>
          </div>
          
          <div className="card-body">
            {profileData ? (
              <div className="row">
                <div className="col-md-3 text-center">
                  <div className="mb-3">
                    {getProfileImage()}
                  </div>
                  <h3>{getDisplayName()}</h3>
                  <p className="text-muted">{userEmail}</p>
                </div>
                
                <div className="col-md-9">
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h4>Contact Information</h4>
                      <p>
                        <strong>Email:</strong> {profileData.email || userEmail}
                      </p>
                      <p>
                        <strong>Phone:</strong> {profileData.phone || profileData.SellerPhone || 'N/A'}
                      </p>
                      {profileData.address && (
                        <p>
                          <strong>Address:</strong> {profileData.address}
                        </p>
                      )}
                    </div>
                    
                    <div className="col-md-6">
                      {userType === 'seller' ? (
                        <>
                          <h4>Business Details</h4>
                          <p>
                            <strong>Shop Address:</strong> {profileData.shopAddress || 'N/A'}
                          </p>
                          <p>
                            <strong>City:</strong> {profileData.city || 'N/A'}
                          </p>
                          <p>
                            <strong>Pincode:</strong> {profileData.pincode || 'N/A'}
                          </p>
                          <p>
                            <strong>Category:</strong> {profileData.category || 'N/A'}
                          </p>
                        </>
                      ) : (
                        <>
                          <h4>Account Details</h4>
                          <p>
                            <strong>Member Since:</strong> {profileData.registrationDate ? 
                              new Date(profileData.registrationDate).toLocaleDateString() : 'N/A'}
                          </p>
                          <p>
                            <strong>Status:</strong> Active
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <hr />
                  
                  <div className="mt-4">
                    <h4>{userType === 'seller' ? 'Business Information' : 'Preferences'}</h4>
                    {userType === 'seller' ? (
                      <p>
                        <strong>Contract Status:</strong> {profileData.contractStatus || 'N/A'}
                      </p>
                    ) : (
                      <p>No preferences set yet</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="alert alert-warning text-center">
                No profile data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;