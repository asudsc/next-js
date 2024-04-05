"use client";

import { useEffect, useState } from "react";
import { sql } from "@vercel/postgres";
import { Quiz } from "./types/quiz";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const router = useRouter();

  const fetchQuizzes = async () => {
    try {
      const response = await sql`SELECT * FROM quizzes`;
      console.log(response);
      //   setQuizzes(response.rows);
    } catch (error) {
      console.error("Error fetching quizzes", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Available Quizzes</h1>
      {quizzes.map((quiz) => (
        <div key={quiz.id} className="mb-4">
          <h2 className="text-lg font-medium mb-2">{quiz.question}</h2>
          <ul>
            {quiz.options.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
          <p>Correct Answer: {quiz.correctAnswer}</p>
        </div>
      ))}
      <button
        type="button"
        className="bg-white text-black py-2 px-4 rounded hover:bg-gray-200"
        onClick={() => router.push("/create")}
      >
        Create new
      </button>
    </div>
  );
};

export default Page;
