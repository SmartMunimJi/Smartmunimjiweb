import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewRecords = () => {
  const [sellers, setSellers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('sellerRecords')) || [];
    const uniqueSellers = [...new Set(stored.map((rec) => rec.seller))].map((seller) => {
      const sellerRecords = stored.filter((rec) => rec.seller === seller);
      return {
        seller,
        latestRecord: sellerRecords.reduce((latest, rec) =>
          new Date(rec.dop) > new Date(latest.dop) ? rec : latest
        ),
      };
    });
    setSellers(uniqueSellers);
  }, []);

  return (
    <div style={{
      background: 'linear-gradient(to right, #5e1e68, #d0473a)',
      minHeight: '100vh',
      padding: '2rem',
    }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <h3 className="text-white mb-4 text-center">View Records</h3>
        {sellers.length === 0 ? (
          <div className="text-center text-white">No Records</div>
        ) : (
          <div className="row justify-content-center">
            {sellers.map((sellerData) => (
              <div key={sellerData.seller} className="col-md-4 mb-4">
                <div className="card text-center shadow-lg" style={{ width: '250px' }}>
                  <div className="card-body">
                    <h5 className="card-title">{sellerData.seller}</h5>
                    <p className="card-text mb-1">
                      Latest Order ID: {sellerData.latestRecord.orderId}
                    </p>
                    <p className="card-text mb-3">
                      Latest Date: {sellerData.latestRecord.dop}
                    </p>
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                          navigate('/details', { state: { seller: sellerData.seller } })
                        }
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewRecords;