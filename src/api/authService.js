export const authService = {
  registerUser: async (userData) => {
    const existing = JSON.parse(localStorage.getItem('customerProfiles')) || [];
    if (existing.some(u => u.email === userData.email)) {
      throw new Error('Email already registered');
    }
    localStorage.setItem('customerProfiles', JSON.stringify([...existing, userData]));
    return userData;
  },
  
  registerSeller: async (sellerData) => {
    const existing = JSON.parse(localStorage.getItem('sellerProfiles')) || [];
    if (existing.some(u => u.email === sellerData.email)) {
      throw new Error('Email already registered');
    }
    localStorage.setItem('sellerProfiles', JSON.stringify([...existing, sellerData]));
    return sellerData;
  },
  
  login: (email, password, userType) => {
    const profilesKey = userType === 'seller' ? 'sellerProfiles' : 'customerProfiles';
    const profiles = JSON.parse(localStorage.getItem(profilesKey)) || [];
    const user = profiles.find(p => p.email === email && p.password === password);
    if (!user) throw new Error('Invalid credentials');
    return user;
  }
};