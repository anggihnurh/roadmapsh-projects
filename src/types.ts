import { type } from "arktype";

export const SessionStatusSchema = type("'intro' | 'in_progress' | 'complete' ")
export type SessionStatus = typeof SessionStatusSchema.infer

export const AnswerStatusSchema = type("'correct'| 'incorrect'")
export type AnswerStatus = typeof AnswerStatusSchema.infer

export const AnswerSchema = type({
    questionId: "string",
    selectedOptionId: "string"
})
export type Answer = typeof AnswerSchema.infer

export const QuizSessionSchema = type({
    status: SessionStatusSchema,
    currentQuestionIdx: "number | null",
    answers: [AnswerSchema, "[]"]
})
export type QuizSession = typeof QuizSessionSchema.infer

export const QuizAnswerSchema = type({
    questionId: "string",
    selectedOptionId: "string | null",
    correctOptionId: "string",
    status: AnswerStatusSchema
})
export type QuizAnswer = typeof QuizAnswerSchema.infer

export const QuestionOptionSchema = type({
    id: "string",
    text: "string"
})
export type QuestionOption = typeof QuestionOptionSchema.infer

export const QuestionSchema = type({
    id: "string",
    question: "string",
    options: [QuestionOptionSchema, "[]"],
    correctOptionId: "string"
})
export type Question = typeof QuestionSchema.infer

export const QuizMetadataSchema = type({
    schemaVersion: "number",
    id: "string",
    title: "string",
    description: "string",
    category: "string",
    locale: "string",
    version: "number"
})
export type QuizMetadata = typeof QuizMetadataSchema.infer

export const QuizDatasetSchema = type({
    metadata: QuizMetadataSchema,
    questions: [QuestionSchema, "[]"]
})
export type QuizDataset = typeof QuizDatasetSchema.infer

