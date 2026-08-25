import { useMemo } from "react";
import toast from "react-hot-toast";
import quizDataset from "../questions.json";
import { initialSession } from "./hook";
import OnBoarding from "./Onboarding";
import Quiz from "./Quiz";
import QuizResult from "./QuizResult";
import { Question, QuizAnswer, QuizSession } from "./types";

const lastQuestionIndex = quizDataset.questions.length - 1;


interface AppProps {
  session: QuizSession
  setSession: (value: QuizSession) => void
}

function App({ session, setSession }: AppProps) {
  const { answers, currentQuestionIdx, status } = session

  const answer = useMemo(() => {
    if (currentQuestionIdx === null) return

    const current = quizDataset.questions[currentQuestionIdx]
    const foundAnswer = answers.find(a => a.questionId === current.id)

    if (!foundAnswer) return undefined

    return {
      correctOptionId: current.correctOptionId,
      questionId: current.id,
      selectedOptionId: foundAnswer.selectedOptionId,
      status: current.correctOptionId === foundAnswer.selectedOptionId ? "correct" : "incorrect"
    } satisfies QuizAnswer

  }, [currentQuestionIdx, answers])

  const handleStartQuiz = () => {
    setSession({ answers: [], currentQuestionIdx: 0, status: "in_progress" })
  };

  const handleAnswer = (value: Question, selectedOptionId: string) => {
    const hasAnswered = answers.some(a => a.questionId === value.id)

    if (hasAnswered) {
      toast("Pertanyaan ini sudah Anda jawab.")
      return
    }

    const isCorrect = value.correctOptionId === selectedOptionId

    if (isCorrect) {
      toast.success("Jawaban Anda Benar!")
    } else {
      toast.error('Jawaban Anda Salah!')
    }

    const updatedAnswers = [...answers, { questionId: value.id, selectedOptionId }]
    setSession({ ...session, answers: updatedAnswers })
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx === null) return

    if (currentQuestionIdx === lastQuestionIndex) {
      setSession({ ...session, status: "complete" })
      return
    }

    setSession({ ...session, currentQuestionIdx: currentQuestionIdx + 1 })
  };

  const handleReplay = () => {
    setSession(initialSession)
  };


  if (status === "intro") {
    return (
      <main className="app-shell">
        <OnBoarding quizDataset={quizDataset} onStart={handleStartQuiz} />
      </main>
    );
  }

  if (status === "complete") {
    return (
      <main className="app-shell">
        <QuizResult answers={session.answers} onReplay={handleReplay} questions={quizDataset.questions} />
      </main>
    );
  }

  return (
    <main className="app-shell">
      <Quiz
        answer={answer}
        currentQuestionIndex={currentQuestionIdx}
        questions={quizDataset.questions}
        onAnswer={handleAnswer}
        onNext={handleNextQuestion}
      />
    </main>
  );
}

export default App;
