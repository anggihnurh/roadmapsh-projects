import quizData from "../questions.json";
import { QuizAnswer } from "./App";
import { AnswerStatus } from "./hook";

const { questions } = quizData;
const lastQuestionIndex = questions.length - 1;

interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  question: string;
  options: QuestionOption[];
  correctOptionId: string;
}

interface QuizProps {
  currentQuestionIndex: number | null;
  answer?: QuizAnswer
  onAnswer: (value: Question, selectedOptionId: string) => void;
  onNext: () => void;
}

export default function Quiz({
  currentQuestionIndex,
  answer,
  onAnswer,
  onNext,
}: QuizProps) {

  if (currentQuestionIndex === null) return null

  return (
    <section className="quiz-card question-card">
      {questions.map((q, index) => {
        if (index !== currentQuestionIndex) return null;

        return (
          <div key={q.id} className="question-content">
            <div className="question-progress">
              <span>
                Pertanyaan <strong>{index + 1}</strong> dari {questions.length}
              </span>
              <span>{Math.round(((index + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="progress-track" aria-hidden="true">
              <span
                style={{ width: `${((index + 1) / questions.length) * 100}%` }}
              />
            </div>
            <div className="question-body">
              <h1>{q.question}</h1>
              <div className="option-list">
                {q.options.map((o) => {
                  const isAnswered = !!answer?.selectedOptionId;
                  const isSelectedOpt = o.id === answer?.selectedOptionId;
                  const isResultCorrect = answer?.status === AnswerStatus.CORRECT;
                  const isCorrectOpt = isAnswered && o.id === q.correctOptionId;
                  const optionState = isSelectedOpt
                    ? isResultCorrect
                      ? "is-correct"
                      : "is-incorrect"
                    : isCorrectOpt
                      ? "is-correct"
                      : "";

                  return (
                    <button
                      key={o.id}
                      onClick={() => onAnswer(q, o.id)}
                      className={`quiz-option ${optionState}`}
                    >
                      <span className="option-label">{o.id}</span>
                      <span className="option-text">{o.text}</span>
                      <span className="option-mark" aria-hidden="true">
                        {isSelectedOpt
                          ? isResultCorrect
                            ? "✓"
                            : "×"
                          : isCorrectOpt
                            ? "✓"
                            : ""}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
      <button
        onClick={onNext}
        disabled={!answer?.selectedOptionId}
        className="button button-primary next-button"
      >
        {currentQuestionIndex === lastQuestionIndex
          ? "Lihat Hasil"
          : "Selanjutnya"}
      </button>
    </section>
  );
}
