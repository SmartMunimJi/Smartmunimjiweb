import { Routes, Route, Navigate } from 'react-router-dom';
import HeroPage from './components/HeroPage';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import Navbar from './components/Navbar';
import UserRegistration from './components/UserRegistration';
import SellerRegistration from './components/SellerRegistration';
import ProfilePage from './components/ProfilePage';
import TechUpdate from './components/TechUpdate';
import OfferSlider from './components/OfferSlider';
import AddRecord from './components/AddRecord';
import ViewRecords from './components/ViewRecords';
import MyClaims from './components/MyClaims';
import DetailsPage from './components/DetailsPage';
import UpdateProfile from './components/UpdateProfile';
import { useState, useEffect } from 'react';

function App() {
  const [auth, setAuth] = useState(() => {
    const savedAuth = localStorage.getItem('auth');
    return savedAuth ? JSON.parse(savedAuth) : {
      isLoggedIn: false,
      userType: null,
      userEmail: null,
      userName: null,
      profileImage: null,
      rememberMe: false
    };
  });

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  const handleLogin = (userEmail, userType, rememberMe = false, profileImage = null) => {
    const profilesKey = userType === 'seller' ? 'sellerProfiles' : 'customerProfiles';
    const allProfiles = JSON.parse(localStorage.getItem(profilesKey)) || [];
    const userProfile = allProfiles.find(p => p.email?.toLowerCase() === userEmail.toLowerCase());
    
    setAuth({
      isLoggedIn: true,
      userType,
      userEmail,
      userName: userProfile?.name || formatEmailToName(userEmail),
      profileImage: userProfile?.profileImage || profileImage,
      rememberMe
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setAuth({
      isLoggedIn: false,
      userType: null,
      userEmail: null,
      userName: null,
      profileImage: null,
      rememberMe: false
    });
  };

  const handleProfileUpdate = (updatedData) => {
    const newAuth = { ...auth, ...updatedData };
    setAuth(newAuth);
    
    const profilesKey = auth.userType === 'seller' ? 'sellerProfiles' : 'customerProfiles';
    const allProfiles = JSON.parse(localStorage.getItem(profilesKey)) || [];
    const updatedProfiles = allProfiles.map(profile => 
      profile.email?.toLowerCase() === auth.userEmail.toLowerCase() 
        ? { ...profile, ...updatedData } 
        : profile
    );
    localStorage.setItem(profilesKey, JSON.stringify(updatedProfiles));
  };

  return (
    <Routes>
      <Route path="/" element={<HeroPage />} />
      <Route path="/login" element={
        auth.isLoggedIn ? (
          auth.userType === 'seller' ? 
            <Navigate to="/dashboard" /> : 
            <Navigate to="/navbar" />
        ) : (
          <LoginPage onLogin={handleLogin} />
        )
      } />
      <Route path="/dashboard" element={
        auth.isLoggedIn && auth.userType === 'seller' ? 
          <DashboardPage 
            userEmail={auth.userEmail} 
            userName={auth.userName} 
            profileImage={auth.profileImage}
            onLogout={handleLogout} 
            onProfileUpdate={handleProfileUpdate}
          /> : 
          <Navigate to="/login" />
      } />
      <Route path="/navbar" element={
        auth.isLoggedIn && auth.userType === 'customer' ? 
          <Navbar 
            userEmail={auth.userEmail} 
            userName={auth.userName} 
            profileImage={auth.profileImage}
            onLogout={handleLogout} 
            onProfileUpdate={handleProfileUpdate}
          /> : 
          <Navigate to="/login" />
      } />
      <Route path="/add-record" element={
        auth.isLoggedIn ? <AddRecord /> : <Navigate to="/login" />
      } />
      <Route path="/view-records" element={
        auth.isLoggedIn ? <ViewRecords /> : <Navigate to="/login" />
      } />
      <Route path="/my-claims" element={
        auth.isLoggedIn ? <MyClaims /> : <Navigate to="/login" />
      } />
      <Route path="/details" element={
        auth.isLoggedIn ? <DetailsPage /> : <Navigate to="/login" />
      } />
      <Route path="/techupdate" element={
        auth.isLoggedIn ? <TechUpdate /> : <Navigate to="/login" />
      } />
      <Route path="/offerslider" element={
        auth.isLoggedIn ? <OfferSlider /> : <Navigate to="/login" />
      } />
      <Route path="/register-user" element={<UserRegistration onLogin={handleLogin} />} />
      <Route path="/register-seller" element={<SellerRegistration onLogin={handleLogin} />} />
      <Route path="/profile" element={
        auth.isLoggedIn ? (
          <ProfilePage 
            userType={auth.userType}
            userEmail={auth.userEmail}
            userName={auth.userName}
            profileImage={auth.profileImage}
            onLogout={handleLogout}
          />
        ) : (
          <Navigate to="/login" />
        )
      } />
      <Route path="/update-profile" element={
        auth.isLoggedIn ? (
          <UpdateProfile 
            userEmail={auth.userEmail}
            userName={auth.userName}
            onProfileUpdate={handleProfileUpdate}
            onLogout={handleLogout}
          />
        ) : (
          <Navigate to="/login" />
        )
      } />
    </Routes>
  );
}

const formatEmailToName = (email) => {
  if (!email) return 'User';
  let namePart = email.split('@')[0];
  return namePart
    .replace(/[._-]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
};

export default App;