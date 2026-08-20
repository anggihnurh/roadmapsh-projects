import quizData from "../questions.json";

interface OnBoardingProps {
  onStart: () => void;
}

export default function OnBoarding({ onStart }: OnBoardingProps) {
  const { metadata, questions } = quizData;

  return (
    <section className="quiz-card onboarding-card">
      <span className="eyebrow">KUIS INTERAKTIF</span>
      <h1>{metadata.title}</h1>
      <p className="lead">{metadata.description}</p>

      <div className="question-total">
        <span>Total pertanyaan</span>
        <strong>{questions.length}</strong>
      </div>

      <div className="rules-card">
        <h2>Aturan kuis</h2>
        <ul>
          <li>Terdapat beberapa pilihan jawaban di setiap pertanyaan</li>
          <li>Hanya ada 1 jawaban benar di setiap pertanyaan</li>
          <li>Jawaban benar bernilai 1 poin, dan jawaban salah 0 poin</li>
        </ul>
      </div>

      <button className="button button-primary" onClick={onStart}>
        Mulai Kuis
      </button>
    </section>
  );
}
