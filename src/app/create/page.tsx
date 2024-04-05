"use client";

import { useState } from "react";
import { sql } from "@vercel/postgres";
import { useRouter } from "next/navigation";

async function createQuiz(question: any, options: any, correctAnswer: any) {
  try {
    await sql`INSERT INTO quizzes (question, options, correct_answer) VALUES (${question}, ${options}, ${correctAnswer}) RETURNING *`;
  } catch (error) {
    console.error("Error executing query", error);
  }
}

const Page = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createQuiz(question, options, correctAnswer);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Create Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="question" className="block mb-2 font-medium">
            Question:
          </label>
          <input
            id="question"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 border border-form-border rounded-md bg-form"
          />
        </div>
        {options.map((option, index) => (
          <div className="mb-4" key={index}>
            <label
              htmlFor={`option-${index + 1}`}
              className="block mb-2 font-medium"
            >
              Option {index + 1}:
            </label>
            <input
              id={`option-${index + 1}`}
              type="text"
              value={option}
              onChange={(e) => {
                const updatedOptions = [...options];
                updatedOptions[index] = e.target.value;
                setOptions(updatedOptions);
              }}
              className="w-full p-2 border border-form-border rounded-md bg-form"
            />
          </div>
        ))}
        <div className="mb-4">
          <label htmlFor="correctAnswer" className="block mb-2 font-medium">
            Correct Answer:
          </label>
          <select
            id="correctAnswer"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(Number(e.target.value))}
            className="w-full p-2 border border-form-border rounded-md bg-form"
          >
            {options.map((_, index) => (
              <option key={index} value={index}>
                Option {index + 1}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Create Quiz
        </button>
        <button type="button" className="m-5" onClick={() => router.back()}>
          Go Back
        </button>
      </form>
    </div>
  );
};

export default Page;
