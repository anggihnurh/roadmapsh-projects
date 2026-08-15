import quizData from "../questions.json";

interface OnBoardingProps {
  onStart: () => void;
}

export default function OnBoarding({ onStart }: OnBoardingProps) {
  const { metadata, questions } = quizData;

  return (
    <div>
      <h1>{metadata.title}</h1>
      <p>{metadata.description}</p>
      <p>Total pertanyaan: {questions.length}</p>
      <p>Aturan kuis:</p>
      <ul>
        <li>Terdapat beberapa pilihan jawaban di setiap pertanyaan</li>
        <li>Hanya ada 1 jawaban benar di setiap pertanyaan</li>
        <li>Jawaban benar bernilai 1 poin, dan jawaban salah 0 poin</li>
      </ul>
      <button onClick={onStart}>Mulai</button>
    </div>
  );
}
