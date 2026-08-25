import { type } from "arktype";

export const SessionStatus = type("'intro' | 'in_progress' | 'complete' ")
export type SessionStatus = typeof SessionStatus.infer

export const AnswerStatus = type("'correct'| 'incorrect'")
export type AnswerStatus = typeof AnswerStatus.infer

export const Answer = type({
    questionId: "string",
    selectedOptionId: "string"
})
export type Answer = typeof Answer.infer

export const QuizSession = type({
    status: SessionStatus,
    currentQuestionIdx: "number | null",
    answers: [Answer, "[]"]
})
export type QuizSession = typeof QuizSession.infer

export const QuizAnswer = type({
    questionId: "string",
    selectedOptionId: "string | null",
    correctOptionId: "string",
    status: AnswerStatus
})
export type QuizAnswer = typeof QuizAnswer.infer

export const QuestionOption = type({
    id: "string",
    text: "string"
})
export type QuestionOption = typeof QuestionOption.infer

export const Question = type({
    id: "string",
    question: "string",
    options: [QuestionOption, "[]"],
    correctOptionId: "string"
})
export type Question = typeof Question.infer

export const QuizMetadata = type({
    schemaVersion: "number",
    id: "string",
    title: "string",
    description: "string",
    category: "string",
    locale: "string",
    version: "number"
})
export type QuizMetadata = typeof QuizMetadata.infer

export const QuizDataset = type({
    metadata: QuizMetadata,
    questions: [Question, "[]"]
})
export type QuizDataset = typeof QuizDataset.infer

