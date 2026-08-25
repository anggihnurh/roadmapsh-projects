import quizData from "../questions.json";
import { AnswerStatus, Question, QuizAnswer } from "./types";

const { questions } = quizData;
const lastQuestionIndex = questions.length - 1;

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

  const question = questions[currentQuestionIndex]

  return (
    <section className="quiz-card question-card">

      <div className="question-content">
        <div className="question-progress">
          <span>
            Pertanyaan <strong>{currentQuestionIndex + 1}</strong> dari {questions.length}
          </span>
          <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="progress-track" aria-hidden="true">
          <span
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
        <div className="question-body">
          <h1>{question.question}</h1>
          <div className="option-list">
            {question.options.map((o) => {
              const isAnswered = !!answer?.selectedOptionId;
              const isSelectedOpt = o.id === answer?.selectedOptionId;
              const isResultCorrect = answer?.status === AnswerStatus.CORRECT;
              const isCorrectOpt = isAnswered && o.id === question.correctOptionId;
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
                  aria-live="assertive"
                  disabled={isAnswered}
                  aria-disabled
                  onClick={() => onAnswer(question, o.id)}
                  className={`quiz-option ${optionState}`}
                >
                  <span className="option-label">{o.id}</span>
                  <span className="option-text">{o.text}</span>
                  <span className="option-mark" aria-hidden="true">
                    {isSelectedOpt
                      ? isResultCorrect
                        ? "Benar ✓"
                        : "Salah ×"
                      : isCorrectOpt
                        ? "Benar ✓"
                        : ""}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <button
        onClick={onNext}
        disabled={!answer?.selectedOptionId}
        className="button button-primary next-button"
      >
        {currentQuestionIndex === lastQuestionIndex
          ? "Lihat Hasil"
          : "Pertanyaan Berikutnya"}
      </button>
    </section>
  );
}
