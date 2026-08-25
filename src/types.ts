

export enum SessionStatus {
    INTRO = 'intro',
    IN_PROGRESS = 'in_progress',
    COMPLETE = 'complete'
}

export enum AnswerStatus {
    CORRECT = 'correct',
    INCORRECT = 'incorrect'
}

export interface Answer {
    questionId: string;
    selectedOptionId: string;
}

export interface QuizSession {
    status: SessionStatus
    currentQuestionIdx: number | null;
    answers: Answer[];
}

export interface QuizAnswer {
    questionId: string;
    selectedOptionId: string | null;
    correctOptionId: string;
    status: AnswerStatus
}


export interface QuestionOption {
    id: string;
    text: string;
}

export interface Question {
    id: string;
    question: string;
    options: QuestionOption[];
    correctOptionId: string;
}
