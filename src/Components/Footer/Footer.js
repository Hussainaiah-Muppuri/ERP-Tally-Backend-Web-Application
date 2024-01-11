import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <footer>
        <p style={{ margin: 0, lineHeight: '8vh' }}>
          &copy; {new Date().getFullYear()} ERP | All rights reserved | <a href="#">Terms of Service</a> | <a href="#">Privacy</a>
        </p>
      </footer>
    </div>
  );
}

export default Footer;
