"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function QuizPage({ params }: { params: { id: string } }) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [userAnswers, setUserAnswers] = useState<{
    [questionId: number]: number;
  }>({});

  const router = useRouter();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/api/quiz/${params.id}`);
        const data = await response.json();
        setQuiz(data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    fetchQuiz();
  }, [params.id]);

  const handleOptionChange = (questionId: number, optionId: number) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!quiz) return;

    const correctAnswers = quiz.questions.map((question) => {
      const correctOption = question.options.find((option) => option.isCorrect);
      return correctOption?.id;
    });

    let score = 0;
    Object.entries(userAnswers).forEach(([questionId, optionId]) => {
      if (correctAnswers.includes(optionId)) {
        score++;
      }
    });

    const totalQuestions = quiz.questions.length;
    alert(`You scored ${score} out of ${totalQuestions}`);
    router.back();
  };

  if (!quiz) {
    return (
      <div className="max-w-md mx-auto mt-8 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
      <form onSubmit={handleSubmit}>
        {quiz.questions.map((question) => (
          <div
            key={question.id}
            className="mb-8 border border-gray-800 p-5 rounded-lg"
          >
            <h2 className="text-xl font-bold mb-4">{question.questionText}</h2>
            {question.options.map((option) => (
              <div key={option.id} className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option.id}
                    checked={userAnswers[question.id] === option.id}
                    onChange={() => handleOptionChange(question.id, option.id)}
                    className="form-radio h-5 w-5 text-green-500"
                  />
                  <span className="ml-2">{option.optionText}</span>
                </label>
              </div>
            ))}
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        ))}
      </form>
    </div>
  );
}
