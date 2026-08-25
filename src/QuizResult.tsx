import { Answer, Question } from "./types";

interface QuizResultProps {
  answers: Answer[]
  onReplay: () => void
  questions: Question[]
}

export default function QuizResult({ answers, onReplay, questions }: QuizResultProps) {

  const results = questions.map((q) => {
    const answer = answers.find((p) => p.questionId === q.id);

    const correctOpt = q.options.find(o => o.id === q.correctOptionId)
    const selectedOpt = q.options.find(o => o.id === answer?.selectedOptionId)

    return {
      id: q.id,
      question: q.question,
      correctOpt,
      selectedOpt,
      status: answer?.selectedOptionId === q.correctOptionId ? "correct" : "incorrect",
      options: q.options.map((o) => ({
        ...o,
        isCorrectAnswer: q.correctOptionId === o.id,
        isSelected: answer?.selectedOptionId === o.id,
      })),
    };
  });

  const point = results.filter((p) => p.status === "correct").length;
  const incorrect = results.filter((p) => p.status === "incorrect").length;

  return (
    <section className="quiz-card result-card">
      <span className="eyebrow">KUIS SELESAI</span>
      <h1>Hasil Quiz</h1>
      <p className="lead">Berikut hasil kuis Anda.</p>

      <div className="score-card">
        <span>Poin Anda</span>
        <strong>
          {point}<small>/{questions.length}</small>
        </strong>
      </div>
      <div className="result-summary">
        <div>
          <span>Jawaban benar</span>
          <strong>{point}</strong>
        </div>
        <div>
          <span>Jawaban salah</span>
          <strong>{incorrect}</strong>
        </div>
      </div>

      <ol className="answer-review">
        {results.map((p) => (
          <li key={p.id}>
            <h2>{p.question}</h2>
            <ol type="a">
              {p.options.map((o) => (
                <li
                  key={o.id}
                  className={
                    o.isCorrectAnswer
                      ? "review-option is-correct"
                      : o.isSelected
                        ? "review-option is-incorrect"
                        : "review-option"
                  }
                >
                  <div className="review-option-main">
                    <span className="review-option-label">{o.id}.</span>
                    <span>{o.text}</span>
                  </div>
                  <span aria-hidden="true">
                    {o.isCorrectAnswer ? "✓" : o.isSelected ? "×" : ""}
                  </span>
                </li>
              ))}
            </ol>
            <div className="review-answer-summary">
              <div
                className={`review-answer-item ${p.status === "correct"
                  ? "is-correct"
                  : "is-incorrect"
                  }`}
              >
                <span className="review-answer-label">Jawaban Anda:</span>
                <span className="review-answer-value">
                  {p.selectedOpt
                    ? `${p.selectedOpt.id}. ${p.selectedOpt.text}`
                    : "-"}
                </span>
              </div>
              <div className="review-answer-item is-correct-answer">
                <span className="review-answer-label">Jawaban Yang Benar:</span>
                <span className="review-answer-value">
                  {p.correctOpt
                    ? `${p.correctOpt.id}. ${p.correctOpt.text}`
                    : "-"}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ol>
      <button className="button button-primary" onClick={onReplay}>
        Ulangi Kuis
      </button>
    </section>
  );
}
