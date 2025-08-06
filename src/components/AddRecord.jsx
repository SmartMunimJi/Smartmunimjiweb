import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddRecord = () => {
  const [seller, setSeller] = useState('');
  const [orderId, setOrderId] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem('sellerRecords')) || [];
    const newRecord = {
      id: Date.now(),
      seller,
      orderId,
      dop: purchaseDate,
    };
    localStorage.setItem('sellerRecords', JSON.stringify([...stored, newRecord]));
    alert('Record Added!');
    setSeller('');
    setOrderId('');
    setPurchaseDate('');
  };

  return (
    <div style={{
      background: 'linear-gradient(to right, #5e1e68, #d0473a)',
      minHeight: '100vh',
      padding: '2rem',
    }}>
      <div className="container bg-white rounded shadow p-4" style={{ maxWidth: '370px' }}>
        <h3 className="text-center mb-4">Add Record</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Seller</label>
            <select
              className="form-select"
              value={seller}
              onChange={(e) => setSeller(e.target.value)}
              required
            >
              <option value="">Select Seller</option>
              <option value="Fashion hub">Fashion hub</option>
              <option value="Book Nook">Book Nook</option>
              <option value="HomeGoods">HomeGoods</option>
              <option value="TechMart">TechMart</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Order ID</label>
            <input
              type="text"
              className="form-control"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Date of Purchase</label>
            <input
              type="date"
              className="form-control"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-success" style={{marginRight:"100px"}}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecord;