import type { QuizResult } from "./App";
import quizData from "../questions.json";

const { questions } = quizData;

export default function QuizResult({ onReplay }: { onReplay: () => void }) {
  const results = window.sessionStorage.getItem("quiz_results");

  if (!results) return null;

  const parsed = JSON.parse(results) as QuizResult[];

  const questionAndResults = questions.map((q) => {
    const baz = parsed.find((p) => p.questionId === q.id);

    return {
      question: q.question,
      options: q.options.map((o) => ({
        ...o,
        isCorrect: baz?.correctOptionId === o.id,
        isSelected: baz?.selectedOptionId === o.id,
      })),
      ...baz,
    };
  });

  const point = parsed.filter((p) => p.status === "correct").length;
  const incorrect = parsed.filter((p) => p.status === "incorrect").length;

  return (
    <section className="quiz-card result-card">
      <span className="eyebrow">KUIS SELESAI</span>
      <h1>Hasil Quiz</h1>
      <p className="lead">Berikut hasil kuis Anda.</p>

      <div className="score-card">
        <span>Poin Anda</span>
        <strong>
          {point}<small>/{parsed.length}</small>
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
        {questionAndResults.map((p) => (
          <li key={p.questionId}>
            <h2>{p.question}</h2>
            <ol type="a">
              {p.options.map((o) => (
                <li
                  key={o.id}
                  className={
                    o.isCorrect
                      ? "review-option is-correct"
                      : o.isSelected
                        ? "review-option is-incorrect"
                        : "review-option"
                  }
                >
                  <span>{o.text}</span>
                  <span aria-hidden="true">
                    {o.isCorrect ? "✓" : o.isSelected ? "×" : ""}
                  </span>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
      <button className="button button-primary" onClick={onReplay}>
        Kerjakan Ulang
      </button>
    </section>
  );
}
