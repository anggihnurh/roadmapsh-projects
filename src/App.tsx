import { useState } from "react";
import quizData from "../questions.json";
import OnBoarding from "./Onboarding";
import Quiz, { type Question } from "./Quiz";
import QuizResult from "./QuizResult";

const lastQuestionIndex = quizData.questions.length - 1;

export interface QuizResult {
  questionId: string;
  selectedOptionId: string | null;
  correctOptionId: string;
  status: "correct" | "incorrect";
}

function App() {
  const [quizStatus, setQuizStatus] = useState(() => {
    const sessionStatus = window.sessionStorage.getItem("quiz_status");
    return sessionStatus ?? "intro";
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const idxQuestionSession = window.sessionStorage.getItem("idx_question");

    if (!idxQuestionSession) return 0;

    const parsedIdx = Number(idxQuestionSession);

    if (Number.isNaN(parsedIdx) || parsedIdx > lastQuestionIndex) return 0;

    return parsedIdx;
  });

  const [result, setResult] = useState<QuizResult | null>(() => {
    const results = window.sessionStorage.getItem("quiz_results");
    if (!results) return null;

    const parsed: QuizResult[] = JSON.parse(results);

    if (parsed?.length === 0) return null;

    return JSON.parse(results)[currentQuestionIndex];
  });

  const handleStartQuiz = () => {
    setQuizStatus("in_progress");
    window.sessionStorage.setItem("quiz_status", "in_progress");
  };

  const handleQuizSession = (res: QuizResult) => {
    console.log("res =>", res);

    const existing = window.sessionStorage.getItem("quiz_results");
    console.log("existing =>", existing);

    const parsed: QuizResult[] = existing ? JSON.parse(existing) : [];

    const hasAnswered = parsed.some((p) => p.questionId === res.questionId);
    console.log("hasAnswered ->", hasAnswered);

    if (hasAnswered) {
      alert("Anda sudah menjawab pertanyaan ini!");
      return;
    }

    const results: QuizResult[] = [...parsed, res];

    window.sessionStorage.setItem("quiz_results", JSON.stringify(results));
    window.sessionStorage.setItem("quiz_status", quizStatus);
    window.sessionStorage.setItem("idx_question", String(currentQuestionIndex));
  };

  const handleSelectOpt = (value: Question, selectedOptionId: string) => {
    const res = {
      selectedOptionId,
      correctOptionId: value.correctOptionId,
      questionId: value.id,
      status:
        selectedOptionId === value.correctOptionId ? "correct" : "incorrect",
    } satisfies QuizResult;

    setResult(res);
    handleQuizSession(res);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex === lastQuestionIndex) {
      setQuizStatus("complete");
      window.sessionStorage.setItem("quiz_status", "complete");
    }

    setResult(null);
    setCurrentQuestionIndex((prev) => prev + 1);
    window.sessionStorage.setItem(
      "idx_question",
      String(currentQuestionIndex + 1),
    );
  };

  const handleReplay = () => {
    window.sessionStorage.clear();
    setQuizStatus("intro");
    setResult(null);
    setCurrentQuestionIndex(0);
  };

  if (quizStatus === "intro") {
    return (
      <main className="app-shell">
        <OnBoarding onStart={handleStartQuiz} />
      </main>
    );
  }

  if (quizStatus === "complete") {
    return (
      <main className="app-shell">
        <QuizResult onReplay={handleReplay} />
      </main>
    );
  }

  return (
    <main className="app-shell">
      <Quiz
        onAnswer={handleSelectOpt}
        result={result}
        currentQuestionIndex={currentQuestionIndex}
        onNext={handleNextQuestion}
      />
    </main>
  );
}

export default App;
