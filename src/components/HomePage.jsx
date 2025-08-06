import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const HomePage = ({ auth, onLogout }) => {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #5e1e68, #d0473a)' }}>
      <Navbar 
        userEmail={auth.userEmail} 
        userName={auth.userName} 
        profileImage={auth.profileImage}
        onLogout={onLogout} 
      />
      <div className="container py-4">
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;