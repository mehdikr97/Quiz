import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProgressBar from './ProgressBar'; 

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers: string[]; 
}

const QuizComponent: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [showValidation, setShowValidation] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get('https://opentdb.com/api.php', {
          params: {
            amount: 6,
            category: 21,
            difficulty: 'hard',
            type: 'multiple',
          },
        });

        const loadedQuestions = res.data.results.map((q: Question) => {
          const answers = [...q.incorrect_answers, q.correct_answer];
          return {
            ...q,
            answers: shuffleArray(answers),
          };
        });

        setQuestions(loadedQuestions);
      } catch (error) {
        console.error("Erreur lors du chargement des questions :", error);
      }
    };

    fetchQuestions();
  }, []);

  // Mélange aléatoire des réponses
  const shuffleArray = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const validateAnswer = () => {
    if (selectedAnswer) {
      const currentQuestion = questions[currentIndex];
      const isCorrect = selectedAnswer === currentQuestion.correct_answer;
      setIsAnswerCorrect(isCorrect);
      setShowValidation(true);
    }
  };

  const goToNextQuestion = () => {
    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setShowValidation(false);
  };

  if (questions.length === 0) return <p>Chargement des questions...</p>;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="max-w-2xl mx-auto bg-white p-4 shadow rounded-xl">
      <ProgressBar current={currentIndex + 1} total={questions.length} /> {/* Assurez-vous de passer les bonnes props */}

      <h2 className="text-xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />

      <div className="space-y-2">
        {currentQuestion.answers.map((answer, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswerSelect(answer)}
            className={`w-full p-2 rounded border ${
              selectedAnswer === answer ? 'bg-blue-200' : 'bg-gray-100'
            }`}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>

      <div className="mt-4">
        {!showValidation ? (
          <button
            onClick={validateAnswer}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={!selectedAnswer}
          >
            Valider
          </button>
        ) : (
          <>
            <p className={`mt-2 font-semibold ${isAnswerCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {isAnswerCorrect ? 'Bonne réponse ! 🎉' : `Mauvaise réponse 😞. Réponse correcte : ${currentQuestion.correct_answer}`}
            </p>
            {currentIndex < questions.length - 1 ? (
              <button
                onClick={goToNextQuestion}
                className="mt-3 bg-green-500 text-white px-4 py-2 rounded"
              >
                Question suivante
              </button>
            ) : (
              <p className="mt-4 font-bold text-purple-700">Fin du quiz 🎯</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QuizComponent;
