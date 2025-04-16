import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectToSession: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      navigate('/quiz');
    } else {
      navigate('/');
    }
  }, [navigate]);

  return null;
};

export default RedirectToSession; 
