import quizData from "../questions.json";
import { Answer, AnswerStatus } from "./hook";

const { questions } = quizData;

interface QuizResultProps {
  answers: Answer[]
  onReplay: () => void
}

export default function QuizResult({ answers, onReplay }: QuizResultProps) {

  const results = questions.map((q) => {
    const baz = answers.find((p) => p.questionId === q.id);

    return {
      question: q.question,
      questionId: q.id,
      status: baz?.selectedOptionId === q.correctOptionId ? AnswerStatus.CORRECT : AnswerStatus.INCORRECT,
      options: q.options.map((o) => ({
        ...o,
        isCorrectAnswer: q.correctOptionId === o.id,
        isSelected: baz?.selectedOptionId === o.id,
      })),
    };
  });


  const point = results.filter((p) => p.status === AnswerStatus.CORRECT).length;
  const incorrect = results.filter((p) => p.status === AnswerStatus.INCORRECT).length;

  return (
    <section className="quiz-card result-card">
      <span className="eyebrow">KUIS SELESAI</span>
      <h1>Hasil Quiz</h1>
      <p className="lead">Berikut hasil kuis Anda.</p>

      <div className="score-card">
        <span>Poin Anda</span>
        <strong>
          {point}<small>/{answers.length}</small>
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
          <li key={p.questionId}>
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
                  <span>{o.text}</span>
                  <span aria-hidden="true">
                    {o.isCorrectAnswer ? "✓" : o.isSelected ? "×" : ""}
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
