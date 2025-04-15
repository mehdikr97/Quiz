import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold mb-6">Bienvenue au Quiz !</h1>
      <Link
        to="/quiz"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Commencer le Quiz
      </Link>
    </div>
  );
};

export default Home;
