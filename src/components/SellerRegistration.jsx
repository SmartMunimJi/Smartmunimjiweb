import React, { useRef, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api/authService';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const SellerRegistration = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  const inputRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [formValues, setFormValues] = useState({
    SellerName: '',
    SellerContact: '',
    SellerPhone: '',
    SellerEmail: '',
    ShopAddress: '',
    city: '',
    pincode: '',
    category: '',
    contract_status: '',
    password: ''
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState(''); // Added for error handling

  const fields = [
    'SellerName', 'SellerContact', 'SellerPhone', 'SellerEmail',
    'ShopAddress', 'city', 'pincode', 'category', 'contract_status', 'password'
  ];

  useEffect(() => {
    if (completed) {
      const timer = setTimeout(() => navigate('/login'), 3000);
      return () => clearTimeout(timer);
    }
  }, [completed, navigate]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: '' });
    }
  };

  const validateCurrentStep = () => {
    const currentField = fields[activeIndex];
    if (!formValues[currentField]?.trim()) {
      setFieldErrors({ ...fieldErrors, [currentField]: 'This field is required' });
      return false;
    }

    if (currentField === 'SellerEmail') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formValues.SellerEmail)) {
        setFieldErrors({ ...fieldErrors, SellerEmail: 'Invalid email format' });
        return false;
      }
    }

    if (currentField === 'SellerPhone') {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(formValues.SellerPhone)) {
        setFieldErrors({ ...fieldErrors, SellerPhone: 'Phone must be 10 digits' });
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;

    if (activeIndex < fields.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      if (!agreed) {
        setShowModal(true); // Show terms modal if not agreed
      } else {
        handleSubmit(); // Proceed with registration
      }
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  const handleSubmit = async () => {
    setRegistrationError(''); // Clear previous errors
    
    try {
      await authService.registerSeller({
        name: formValues.SellerName,
        email: formValues.SellerEmail,
        password: formValues.password,
        phone: formValues.SellerPhone,
        contactPerson: formValues.SellerContact,
        shopAddress: formValues.ShopAddress,
        city: formValues.city,
        pincode: formValues.pincode,
        category: formValues.category,
        contractStatus: formValues.contract_status,
        profileImage
      });

      setSuccess(true);
      setCompleted(true);
    } catch (err) {
      setRegistrationError('Registration failed: ' + (err.message || 'Please try again later'));
      console.error('Registration error:', err);
    }
  };

  const getFieldLabel = (field) => {
    const labels = {
      SellerName: 'Business Name',
      SellerContact: 'Contact Person',
      SellerPhone: 'Phone Number',
      SellerEmail: 'Email Address',
      ShopAddress: 'Shop Address',
      city: 'City',
      pincode: 'Pincode',
      category: 'Business Category',
      contract_status: 'Contract Status',
      password: 'Password'
    };
    return labels[field] || field;
  };

  return (
    <div className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: "100vh", background: "linear-gradient(180deg, #5e1e68, #d0473a)" }}>
      <div className="card rounded-4 shadow-lg" style={{ width: '430px', background: 'transparent', border: 'none', borderRadius: '20px' }}>
        <div className="card-body" style={{ padding: '2rem', background: 'transparent' }}>
          <h2 className="text-center mb-4 text-white">Seller Registration</h2>

          {success ? (
            <div className="alert alert-success text-center fw-bold fs-5">
              ✅ Your registration has been successfully completed!
              <p className="mt-2 mb-0">Redirecting to login in 5 seconds...</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
              {/* Display registration error if any */}
              {registrationError && (
                <div className="alert alert-danger text-center fw-bold mb-3">
                  {registrationError}
                </div>
              )}
              
              <div className="mb-3 text-center">
                <div
                  className="mx-auto mb-2 rounded-circle overflow-hidden"
                  style={{ width: '100px', height: '100px', cursor: 'pointer', background: profileImage ? 'none' : 'rgba(255,255,255,0.2)', border: '2px dashed rgba(255,255,255,0.5)' }}
                  onClick={() => document.getElementById('profile-upload').click()}
                >
                  {profileImage ? (
                    <img src={profileImage} alt="Profile Preview" className="w-100 h-100" style={{ objectFit: 'cover' }} />
                  ) : (
                    <div className="d-flex flex-column justify-content-center align-items-center h-100">
                      <i className="bi bi-camera fs-1 text-white"></i>
                      <small className="text-white">Add Photo</small>
                    </div>
                  )}
                </div>
                <input type="file" id="profile-upload" accept="image/*" onChange={handleImageChange} className="d-none" />
              </div>

              <div className="mb-3">
                <label className="form-label text-white">{getFieldLabel(fields[activeIndex])}</label>
                {['category', 'contract_status'].includes(fields[activeIndex]) ? (
                  <select
                    name={fields[activeIndex]}
                    className="form-select form-select-lg"
                    value={formValues[fields[activeIndex]]}
                    onChange={handleChange}
                    style={{border: '1px solid rgba(255,255,255,0.5)' }}
                  >
                    <option value="">Select</option>
                    {fields[activeIndex] === 'category' ? (
                      <>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Furniture">Furniture</option>
                      </>
                    ) : (
                      <>
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Expired">Expired</option>
                      </>
                    )}
                  </select>
                ) : (
                  <input
                    ref={el => inputRefs.current[activeIndex] = el}
                    type={fields[activeIndex] === 'password' ? 'password' : 'text'}
                    name={fields[activeIndex]}
                    className="form-control form-control-lg"
                    placeholder={`Enter ${getFieldLabel(fields[activeIndex])}`}
                    value={formValues[fields[activeIndex]]}
                    onChange={handleChange}
                    style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "#fff", border: '1px solid rgba(255,255,255,0.5)' }}
                  />
                )}
                {fieldErrors[fields[activeIndex]] && (
                  <div className="text-danger mt-1">{fieldErrors[fields[activeIndex]]}</div>
                )}
              </div>

              {activeIndex === fields.length - 1 && (
                <div className="form-check mb-3 text-white">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="termsCheck"
                    checked={agreed}
                    onChange={(e) => {
                      if (!agreed) {
                        setShowModal(true); // Show terms on first check
                      } else {
                        setAgreed(e.target.checked); // Allow unchecking directly
                      }
                    }}
                  />
                  <label className="form-check-label" htmlFor="termsCheck">
                    I agree to the Terms and Conditions
                  </label>
                </div>
              )}

              <div className="d-flex justify-content-between mb-3">
                <button type="button" className="btn btn-light" onClick={handlePrev} disabled={activeIndex === 0}>
                  ← Previous
                </button>
                <button type="button" className="btn btn-light" onClick={handleNext}>
                  {activeIndex === fields.length - 1 ? 'Register' : 'Next →'}
                </button>
              </div>

              <div className="progress mb-3">
                <div
                  className="progress-bar bg-warning"
                  role="progressbar"
                  style={{ width: `${(activeIndex + 1) / fields.length * 100}%` }}
                  aria-valuenow={activeIndex + 1}
                  aria-valuemin="0"
                  aria-valuemax={fields.length}
                >
                  Step {activeIndex + 1} of {fields.length}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Terms and Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            By registering, you agree to the following terms:
            <br /> - Respect our community guidelines.
            <br /> - Ensure data accuracy.
            <br /> - No spamming or illegal activity.
            <br /> - Your data will be handled securely.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => { 
            setAgreed(true); 
            setShowModal(false);
            // Automatically proceed to registration after agreeing
            if (activeIndex === fields.length - 1) {
              handleSubmit();
            }
          }}>
            Agree
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SellerRegistration;