import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const req = await request.json();
  const { title, questions } = req;

  try {
    // Next.js automatically sanitizes SQL queries
    const quizResult = await sql`
          INSERT INTO quizzes (title) VALUES (${title}) RETURNING id;
        `;

    const quizId = quizResult.rows[0].id;

    // Get questions for the quiz
    for (const question of questions) {
      const questionResult = await sql`
            INSERT INTO questions (quiz_id, question_text) VALUES (${quizId}, ${question.question}) RETURNING id;
          `;

      const questionId = questionResult.rows[0].id;

      // Get options for the question
      for (let i = 0; i < question.options.length; i++) {
        const option = question.options[i];
        const isCorrect = i === question.correctAnswer;

        await sql`
              INSERT INTO options (question_id, option_text, is_correct) VALUES (${questionId}, ${option}, ${isCorrect});
            `;
      }
    }
  } catch (error) {
    console.error("Error executing query", error);
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({}, { status: 200 });
}
