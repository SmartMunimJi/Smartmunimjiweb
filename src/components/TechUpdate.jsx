import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/TechUpdate.css';

const techData = [
  {
    title: 'iPhone 15 Pro',
    category: 'Smartphone',
    status: 'Launched',
    img: 'https://source.unsplash.com/featured/?iphone,smartphone',
  },
  {
    title: 'Samsung QLED TV',
    category: 'Television',
    status: 'New Model',
    img: 'https://source.unsplash.com/featured/?samsung,tv',
  },
  {
    title: 'MacBook Air M3',
    category: 'Laptop',
    status: 'Coming Soon',
    img: 'https://source.unsplash.com/featured/?macbook,laptop',
  },
  {
    title: 'Canon EOS R7',
    category: 'Camera',
    status: 'Launched',
    img: 'https://source.unsplash.com/featured/?camera,canon',
  },
  {
    title: 'iPad Pro 2025',
    category: 'Tablet',
    status: 'Rumored',
    img: 'https://source.unsplash.com/featured/?ipad,tablet',
  },
];

const TechUpdate = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div
      className="py-5"
      style={{
        background: 'linear-gradient(#5e1e68, #d0473a)',
        minHeight: '100vh',
        color: '#fff',
        width: '100%',
      }}
    >
      <div className="container">
        <h2 className="text-center mb-5 fw-bold">🔴 Live Tech Updates</h2>
        <div className="row g-4">
          {techData.map((item, index) => (
            <div
              className="col-md-4 col-sm-6"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 200}
            >
              <div className="card tech-card shadow-lg h-100">
                <img
                  src={item.img}
                  className="card-img-top tech-img"
                  alt={item.title}
                />
                <div className="card-body bg-light text-dark">
                  <h5 className="card-title fw-bold">{item.title}</h5>
                  <p className="card-text">Category: {item.category}</p>
                  <span className="badge bg-primary">{item.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechUpdate;