import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import headphoneImg from '../assets/images/headphone.jpg';
import powerbankImg from '../assets/images/powerbank.jpg';
import earbudsImg from '../assets/images/earbuds.jpg';
import chargerImg from '../assets/images/charger.jpg';
import smartspeakerImg from '../assets/images/smartspeacker.jpg';

const offers = [
  {
    id: 1,
    title: '75% Off | Headphones',
    img: headphoneImg,
    link: '/offers/headphone',
    brand: 'Boat',
    price: '₹1,199',
    description: 'High Bass, Noise Cancelling, Bluetooth 5.0',
  },
  {
    id: 2,
    title: 'Powerbanks — Up to 60%',
    img: powerbankImg,
    link: '/offers/powerbank',
    brand: 'Mi',
    price: '₹899',
    description: 'Fast charging 20,000mAh powerbank',
  },
  {
    id: 3,
    title: 'Top Picks: Earbuds',
    img: earbudsImg,
    link: '/offers/earbuds',
    brand: 'Realme',
    price: '₹1,299',
    description: 'Active Noise Canceling, 24hr Battery',
  },
  {
    id: 4,
    title: 'Charger Combo Deals',
    img: chargerImg,
    link: '/offers/charger',
    brand: 'Samsung',
    price: '₹499',
    description: '25W Fast Charger with USB-C Cable',
  },
  {
    id: 5,
    title: 'Smart Speaker Offers',
    img: smartspeakerImg,
    link: '/offers/smartspeaker',
    brand: 'Echo Dot',
    price: '₹2,499',
    description: 'Alexa built-in, Smart Home Control',
  },
];

export default function OfferSlider() {
  const containerRef = useRef();

  useEffect(() => {
    const cards = containerRef.current.querySelectorAll('.offer-card');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    cards.forEach((card, idx) => {
      card.style.transitionDelay = `${idx * 0.2}s`;
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="overflow-auto"
      style={{
        maxHeight: '100vh',
        scrollSnapType: 'y mandatory',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        scrollBehavior: 'smooth'
      }}
    >
      <div className="d-flex flex-column gap-3">
        {offers.map(offer => (
          <a
            href={offer.link}
            key={offer.id}
            className="offer-card position-relative overflow-hidden text-white text-decoration-none"
            style={{
              scrollSnapAlign: 'start',
              height: '100vh',
              opacity: 0,
              transform: 'translateY(30px)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
            }}
          >
            <img
              src={offer.img}
              alt={offer.title}
              className="w-100 h-100"
              style={{ objectFit: 'cover', filter: 'brightness(0.6)' }}
            />
            <div className="position-absolute top-0 start-0 w-100 h-100 p-4 d-flex flex-column justify-content-center align-items-start">
              <h1 className="fw-bold mb-3">{offer.title}</h1>
              <h4 className="mb-1">Brand: {offer.brand}</h4>
              <h5 className="mb-2">Price: {offer.price}</h5>
              <p className="mb-3">{offer.description}</p>
              <button className="btn btn-warning px-4">View Offer</button>
            </div>
          </a>
        ))}
      </div>

      <style>{`
        .offer-card.is-revealed {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .overflow-auto::-webkit-scrollbar {
          display: none;
        }
        .overflow-auto {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
