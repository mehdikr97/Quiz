import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizComponent from '../components/QuizComponent'; // ✅ ici c'est corrigé

const Quiz: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('username');
    if (!storedName) {
      navigate('/');
    } else {
      setUsername(storedName);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {username && (
        <h1 className="text-xl font-bold mb-4">
          Bienvenue, {username} !
        </h1>
      )}
      <QuizComponent /> {/* ✅ Affiche le quiz */}
    </div>
  );
};

export default Quiz;
