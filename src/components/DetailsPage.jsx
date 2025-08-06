import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from './Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

const DetailsPage = () => {
  const location = useLocation();
  const { seller } = location.state || {};
  const [products, setProducts] = useState([]);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const allRecords = JSON.parse(localStorage.getItem('sellerRecords')) || [];
    const filtered = allRecords.filter((record) => record.seller === seller);
    setProducts(filtered);
  }, [seller]);

  const calculateWarrantyEnd = (purchaseDate) => {
    const date = new Date(purchaseDate);
    date.setFullYear(date.getFullYear() + 1);
    return date.toISOString().split('T')[0];
  };

  const isWarrantyValid = (endDate) => {
    return new Date(endDate) >= new Date();
  };

  const openClaimModal = (product) => {
    setSelectedProduct(product);
    setIsClaimModalOpen(true);
  };

  const closeClaimModal = () => {
    setIsClaimModalOpen(false);
    setSelectedProduct(null);
    setDescription('');
  };

  const handleSubmitClaim = (e) => {
    e.preventDefault();
    if (description.trim() && selectedProduct) {
      const claims = JSON.parse(localStorage.getItem('sellerClaims') || '{}');
      const sellerClaims = claims[seller] || [];
      sellerClaims.push({
        orderId: selectedProduct.orderId,
        dop: selectedProduct.dop,
        description,
        timestamp: new Date().toISOString(),
      });
      claims[seller] = sellerClaims;
      localStorage.setItem('sellerClaims', JSON.stringify(claims));
      alert(`Claim submitted for ${selectedProduct.orderId} to ${seller}!`);
      closeClaimModal();
    } else {
      alert('Please enter a description for the claim.');
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #5e1e68, #d0473a)',
      minHeight: '100vh',
      padding: '2rem',
      color: 'black',
    }}>
      <div className="container bg-white p-4 rounded shadow-lg" style={{ maxWidth: '500px' }}>
        <h4 className="mb-4 text-center" style={{ color: '#5e1e68' }}>
          Products from {seller || 'Unknown Seller'}
        </h4>

        {products.length === 0 ? (
          <p className="text-center">No products found for this seller.</p>
        ) : (
          products.map((product, idx) => {
            const warrantyEnd = calculateWarrantyEnd(product.dop);
            const eligible = isWarrantyValid(warrantyEnd);

            return (
              <div key={idx} className="mb-4 p-3 border rounded">
                <h5>{product.orderId}</h5>
                <p>Purchased: {product.dop}</p>
                <p>Warranty Ends: {warrantyEnd}</p>
                <p style={{
                  color: eligible ? 'green' : 'red',
                  fontWeight: 'bold',
                }}>
                  {eligible ? 'Eligible for Warranty' : 'Warranty Expired'}
                </p>
                <button
                  className="btn w-100"
                  style={{
                    backgroundColor: '#9b26af',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                  disabled={!eligible}
                  onClick={() => openClaimModal(product)}
                >
                  CLAIM WARRANTY
                </button>
              </div>
            );
          })
        )}
      </div>

      <Modal isOpen={isClaimModalOpen} onClose={closeClaimModal}>
        <h3>Warranty Claim for {selectedProduct?.orderId}</h3>
        <p>
          Please provide a detailed description of the issue with your product. This will be sent to {seller} for processing.
        </p>
        <form onSubmit={handleSubmitClaim}>
          <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="Enter your description here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button
            type="submit"
            style={{
              backgroundColor: '#9b26af',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              padding: '5px 10px',
              cursor: 'pointer',
            }}
          >
            Submit Claim
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default DetailsPage;