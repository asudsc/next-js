CREATE TABLE quizzes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255)
);

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,a
    quiz_id INTEGER REFERENCES quizzes(id),
    question_text VARCHAR(255)
);

CREATE TABLE options (
    id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES questions(id),
    option_text VARCHAR(255),
    is_correct BOOLEAN
);