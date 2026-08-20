import quizData from "../questions.json";
import type { QuizResult } from "./App";

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
  currentQuestionIndex: number;
  result: QuizResult | null;
  onAnswer: (value: Question, selectedOptionId: string) => void;
  onNext: () => void;
}

export default function Quiz({
  currentQuestionIndex,
  result,
  onAnswer,
  onNext,
}: QuizProps) {
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
                  const isAnswered = !!result?.selectedOptionId;
                  const isSelectedOpt = o.id === result?.selectedOptionId;
                  const isResultCorrect = result?.status === "correct";
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
                      onClick={() => {
                        // if (isAnswered) return;

                        onAnswer(q, o.id);
                      }}
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
        disabled={!result?.selectedOptionId}
        className="button button-primary next-button"
      >
        {currentQuestionIndex === lastQuestionIndex
          ? "Lihat Hasil"
          : "Selanjutnya"}
      </button>
    </section>
  );
}
