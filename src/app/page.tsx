"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const [quizzes, setQuizzes] = useState<Array<any> | null>(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const router = useRouter();

  const fetchQuizzes = async () => {
    // Disable cache to always get the latest data
    const response = await fetch("/api/fetch-quizzes", { cache: "no-store" });
    const json = await response.json();
    setQuizzes(json["rows"]);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Available Quizzes</h1>
      {quizzes === null ? (
        <p className="mb-5 mt-5">Loading...</p>
      ) : quizzes.length === 0 ? (
        <p className="mb-5 mt-5">No quizzes available.</p>
      ) : (
        quizzes.map((quiz) => (
          <div
            key={quiz["id"]}
            className="mb-4 border rounded p-4 flex items-center justify-between"
          >
            <h2 className="text-lg font-medium">{quiz["title"]}</h2>
            <button
              type="button"
              className="bg-white text-black py-2 px-4 rounded hover:bg-gray-200 flex items-center"
              onClick={() => router.push("/quiz/" + quiz["id"])}
            >
              Start <span className="ml-2">&#8594;</span>
            </button>
          </div>
        ))
      )}
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

export default HomePage;
