"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateQuizPage = () => {
  const [quizTitle, setQuizTitle] = useState("New Quiz");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: 0 },
  ]);

  const router = useRouter();

  async function createQuiz(title: string, questions: any) {
    await fetch("/api/quiz", {
      method: "POST",
      body: JSON.stringify({ title: title, questions: questions }),
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createQuiz(quizTitle, questions);
    router.back();
  };

  const handleQuizTitleChange = (title: string) => {
    setQuizTitle(title);
  };

  const handleQuestionChange = (index: number, question: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = question;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    option: string
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = option;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (
    questionIndex: number,
    correctAnswer: number
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswer = correctAnswer;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctAnswer: 0 },
    ]);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Create Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="quizTitle" className="block mb-2 font-medium">
            Quiz Title:
          </label>
          <input
            id="quizTitle"
            type="text"
            value={quizTitle}
            onChange={(e) => handleQuizTitleChange(e.target.value)}
            className="w-full p-2 border border-form-border rounded-md bg-form"
          />
        </div>
        {questions.map((question, index) => (
          <div
            className="mb-8 border border-gray-800 p-5 rounded-lg"
            key={index}
          >
            <h2 className="text-xl font-bold mb-4">Question {index + 1}</h2>
            <div className="mb-4">
              <label
                htmlFor={`question-${index}`}
                className="block mb-2 font-medium"
              >
                Question:
              </label>
              <input
                id={`question-${index}`}
                type="text"
                value={question.question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                className="w-full p-2 border border-form-border rounded-md bg-form"
              />
            </div>
            {question.options.map((option, optionIndex) => (
              <div className="mb-4" key={optionIndex}>
                <label
                  htmlFor={`option-${index}-${optionIndex}`}
                  className="block mb-2 font-medium"
                >
                  Option {optionIndex + 1}:
                </label>
                <input
                  id={`option-${index}-${optionIndex}`}
                  type="text"
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(index, optionIndex, e.target.value)
                  }
                  className="w-full p-2 border border-form-border rounded-md bg-form"
                />
              </div>
            ))}
            <div className="mb-4">
              <label
                htmlFor={`correctAnswer-${index}`}
                className="block mb-2 font-medium"
              >
                Correct Answer:
              </label>
              <select
                id={`correctAnswer-${index}`}
                value={question.correctAnswer}
                onChange={(e) =>
                  handleCorrectAnswerChange(index, Number(e.target.value))
                }
                className="w-full p-2 border border-form-border rounded-md bg-form"
              >
                {question.options.map((_, optionIndex) => (
                  <option key={optionIndex} value={optionIndex}>
                    Option {optionIndex + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="py-2 px-4 rounded mb-4 bg-white text-black hover:bg-gray-200"
          onClick={addQuestion}
        >
          Add Question
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 ml-5 mr-5"
        >
          Create Quiz
        </button>
        <button type="button" onClick={() => router.back()}>
          Go Back
        </button>
      </form>
    </div>
  );
};

export default CreateQuizPage;
