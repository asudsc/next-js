import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const quizId = params.id;

    try {
        // Fetch quiz details
        const quizResult = await sql`
        SELECT id, title
        FROM quizzes
        WHERE id = ${quizId};
      `;

        if (quizResult.rows.length === 0) {
            return new NextResponse('Quiz not found', { status: 404 });
        }

        const quiz = quizResult.rows[0];

        // Fetch questions and options
        const questionsResult = await sql`
        SELECT q.id, q.question_text, array_agg(json_build_object('id', o.id, 'optionText', o.option_text, 'isCorrect', o.is_correct)) AS options
        FROM questions q
        LEFT JOIN options o ON o.question_id = q.id
        WHERE q.quiz_id = ${quizId}
        GROUP BY q.id, q.question_text;
      `;

        const questions = questionsResult.rows.map(row => ({
            id: row.id,
            questionText: row.question_text,
            options: row.options,
        }));

        return NextResponse.json({ ...quiz, questions });
    } catch (error) {
        console.error("Error executing query", error);
        return new NextResponse('Internal server error', { status: 500 });
    }
}