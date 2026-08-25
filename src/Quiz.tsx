import { Question, QuizAnswer } from "./types";

interface QuizProps {
  currentQuestionIndex: number | null;
  answer?: QuizAnswer
  onAnswer: (value: Question, selectedOptionId: string) => void;
  onNext: () => void;
  questions: Question[]
}

export default function Quiz({
  currentQuestionIndex,
  answer,
  onAnswer,
  onNext,
  questions
}: QuizProps) {

  const lastQuestionIndex = questions.length - 1;

  if (currentQuestionIndex === null) return null

  const question = questions[currentQuestionIndex]

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <section className="quiz-card question-card">

      <div className="question-content">
        <div className="question-progress">
          <span>
            Pertanyaan <strong>{currentQuestionIndex + 1}</strong> dari {questions.length}
          </span>
          <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="progress-track" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <span
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="question-body">
          <h1>{question.question}</h1>
          <div className="option-list">
            {question.options.map((o) => {
              const isAnswered = !!answer?.selectedOptionId;
              const isSelectedOpt = o.id === answer?.selectedOptionId;
              const isResultCorrect = answer?.status === "correct";
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
                  disabled={isAnswered}
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
