import React from 'react';
import { useNavigate } from 'react-router-dom';
import hotelBg from '../assets/luxury_hotel_pool.png';

const Landing = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div className="landing-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Montserrat:wght@200;300;400;500&display=swap');

        :root {
          --primary-gold: #D4AF37;
          --glass-bg: rgba(20, 20, 20, 0.65);
          --glass-border: rgba(255, 255, 255, 0.1);
          --text-light: #F5F5F5;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          margin: 0;
          overflow: hidden; 
          background: #000;
        }

        .landing-container {
          position: relative;
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-light);
          font-family: 'Montserrat', sans-serif;
          padding: 20px;
        }

        /* Background Animation */
        .bg-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
        }

        .bg-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: slowZoom 30s infinite alternate ease-in-out;
          filter: brightness(0.6) contrast(1.1);
        }

        @keyframes slowZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%);
          z-index: 1;
        }

        /* Glass Card */
        .glass-card {
          position: relative;
          z-index: 10;
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 24px;
          padding: 60px;
          width: 450px;
          max-width: 100%;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          animation: fadeInUp 1s cubic-bezier(0.2, 0.8, 0.2, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Typography */
        .brand-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .logo-icon {
          font-size: 3rem;
          color: var(--primary-gold);
          margin-bottom: 15px;
          display: block;
          filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.3));
        }

        .brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3.5rem;
          font-weight: 300;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 5px;
          line-height: 1;
        }

        .brand-subtitle {
          font-size: 0.75rem;
          letter-spacing: 6px;
          text-transform: uppercase;
          color: var(--primary-gold);
          font-weight: 500;
        }

        /* Form Elements */
        .login-form {
          width: 100%;
        }

        .input-group {
          position: relative;
          margin-bottom: 30px;
        }

        .input-field {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
          padding: 10px 0;
          color: #fff;
          font-size: 1rem;
          font-family: 'Montserrat', sans-serif;
          transition: border-color 0.3s;
        }

        .input-field::placeholder {
          color: rgba(255, 255, 255, 0.4);
          font-weight: 300;
        }

        .input-field:focus {
          outline: none;
          border-bottom-color: var(--primary-gold);
        }

        .submit-btn {
          width: 100%;
          padding: 18px;
          background: linear-gradient(45deg, var(--primary-gold), #F4E285);
          border: none;
          color: #1a1a1a;
          font-size: 0.9rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
          position: relative;
          overflow: hidden;
          border-radius: 4px;
        }

        .submit-btn:hover {
          transform: scale(1.02);
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
        }

        .submit-btn:active {
          transform: scale(0.98);
        }
        
        /* Floating particles effect */
        .particle {
          position: absolute;
          background: var(--primary-gold);
          border-radius: 50%;
          opacity: 0.3;
          animation: float 10s infinite linear;
          pointer-events: none;
        }
        
        @keyframes float {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }

        .secure-text {
          margin-top: 30px;
          font-size: 0.7rem;
          opacity: 0.6;
          letter-spacing: 1px;
        }

        /* ===== RESPONSIVE DESIGN ===== */
        
        /* Tablet (Portrait) */
        @media (max-width: 768px) {
          .glass-card {
            padding: 45px 35px;
            width: 400px;
            border-radius: 20px;
          }

          .logo-icon {
            font-size: 2.5rem;
            margin-bottom: 12px;
          }

          .brand-name {
            font-size: 2.8rem;
            letter-spacing: 3px;
          }

          .brand-subtitle {
            font-size: 0.7rem;
            letter-spacing: 5px;
          }

          .brand-header {
            margin-bottom: 35px;
          }

          .input-field {
            font-size: 0.95rem;
            padding: 9px 0;
          }

          .submit-btn {
            padding: 16px;
            font-size: 0.85rem;
          }

          .secure-text {
            font-size: 0.65rem;
            margin-top: 25px;
          }
        }

        /* Mobile (Landscape) */
        @media (max-width: 640px) and (orientation: landscape) {
          .landing-container {
            padding: 15px;
          }

          .glass-card {
            padding: 30px 25px;
            max-height: 90vh;
            overflow-y: auto;
          }

          .logo-icon {
            font-size: 2rem;
            margin-bottom: 8px;
          }

          .brand-name {
            font-size: 2.2rem;
            letter-spacing: 2px;
          }

          .brand-subtitle {
            font-size: 0.6rem;
            letter-spacing: 4px;
          }

          .brand-header {
            margin-bottom: 25px;
          }

          .input-group {
            margin-bottom: 20px;
          }

          .submit-btn {
            padding: 14px;
            margin-top: 5px;
          }

          .secure-text {
            margin-top: 20px;
            font-size: 0.6rem;
          }
        }

        /* Mobile (Portrait) */
        @media (max-width: 480px) {
          .landing-container {
            padding: 15px;
          }

          .glass-card {
            padding: 40px 30px;
            width: 100%;
            border-radius: 18px;
          }

          .logo-icon {
            font-size: 2.2rem;
            margin-bottom: 10px;
          }

          .brand-name {
            font-size: 2.5rem;
            letter-spacing: 2px;
          }

          .brand-subtitle {
            font-size: 0.65rem;
            letter-spacing: 4px;
          }

          .brand-header {
            margin-bottom: 30px;
          }

          .input-group {
            margin-bottom: 25px;
          }

          .input-field {
            font-size: 0.9rem;
            padding: 8px 0;
          }

          .submit-btn {
            padding: 15px;
            font-size: 0.8rem;
            letter-spacing: 1.5px;
          }

          .secure-text {
            margin-top: 25px;
            font-size: 0.6rem;
          }
        }

        /* Small Mobile */
        @media (max-width: 360px) {
          .glass-card {
            padding: 35px 25px;
          }

          .logo-icon {
            font-size: 2rem;
          }

          .brand-name {
            font-size: 2.2rem;
            letter-spacing: 1.5px;
          }

          .brand-subtitle {
            font-size: 0.6rem;
            letter-spacing: 3px;
          }

          .brand-header {
            margin-bottom: 25px;
          }

          .input-group {
            margin-bottom: 20px;
          }

          .submit-btn {
            padding: 14px;
            font-size: 0.75rem;
          }

          .secure-text {
            font-size: 0.55rem;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .submit-btn {
            padding: 20px;
            font-size: 0.9rem;
          }

          .input-field {
            padding: 12px 0;
            font-size: 16px; /* Prevents zoom on iOS */
          }
        }

      `}</style>

      {/* Background with slow zoom */}
      <div className="bg-wrapper">
        <img src={hotelBg} alt="Background" className="bg-image" />
        <div className="overlay"></div>
      </div>

      {/* Decorative Particles */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="particle" style={{
          width: Math.random() * 5 + 2 + 'px',
          height: Math.random() * 5 + 2 + 'px',
          left: Math.random() * 100 + '%',
          animationDelay: Math.random() * 5 + 's',
          animationDuration: Math.random() * 10 + 10 + 's'
        }} />
      ))}

      <div className="glass-card">
        <div className="brand-header">
          <span className="logo-icon">♛</span>
          <h1 className="brand-name">Hotel++</h1>
          <p className="brand-subtitle">Exquisite Living</p>
        </div>

        <form className="login-form" onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}>
          <div className="input-group">
            <input type="text" className="input-field" placeholder="Username" />
          </div>
          <div className="input-group">
            <input type="password" className="input-field" placeholder="Password" />
          </div>

          <button type="submit" className="submit-btn">
            Enter Portal
          </button>
        </form>

        <div className="secure-text">
          SECURE MANAGEMENT ACCESS
        </div>
      </div>
    </div>
  );
};

export default Landing;