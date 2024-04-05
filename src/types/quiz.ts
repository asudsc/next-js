type Option = {
    id: number;
    optionText: string;
    isCorrect: boolean;
};

type Question = {
    id: number;
    questionText: string;
    options: Option[];
};

type Quiz = {
    id: number;
    title: string;
    questions: Question[];
};