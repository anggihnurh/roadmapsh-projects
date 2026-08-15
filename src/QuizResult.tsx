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
    <div>
      <h1>Hasil Quiz</h1>
      <p>Berikut hasil kuis anda</p>
      <p>
        Poin Anda: {point}/{parsed.length}
      </p>
      <p>Jawaban Benar:{point}</p>
      <p>Jawaban Salah: {incorrect}</p>

      <ol>
        {questionAndResults.map((p) => (
          <li key={p.questionId}>
            <p>{p.question}</p>
            <ol type="a" style={{ marginLeft: -24 }}>
              {p.options.map((o) => (
                <li
                  key={o.id}
                  style={{
                    marginBottom: 8,
                    color: o.isCorrect
                      ? "green"
                      : o.isSelected
                        ? "red"
                        : "black",
                  }}
                >
                  {o.text} {o.isCorrect ? "✔" : o.isSelected ? "✗" : ""}
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
      <button onClick={onReplay}>Kerjakan Ulang</button>
    </div>
  );
}
