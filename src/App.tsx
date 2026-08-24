import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import quizData from "../questions.json";
import OnBoarding from "./Onboarding";
import Quiz, { type Question } from "./Quiz";
import QuizResult from "./QuizResult";
import { AnswerStatus, initialSession, QuizSession, SessionStatus } from "./hook/useQuizSession";

const lastQuestionIndex = quizData.questions.length - 1;

export interface QuizAnswer {
  questionId: string;
  selectedOptionId: string | null;
  correctOptionId: string;
  status: AnswerStatus
}

interface AppProps {
  session: QuizSession
  setSession: (value: QuizSession) => void
}

function App({ session, setSession }: AppProps) {
  const { answers, currentQuestionIdx, status } = session
  const [answer, setAnswer] = useState<QuizAnswer>()

  useEffect(() => {
    if (currentQuestionIdx === null) return

    const current = quizData.questions[currentQuestionIdx]
    const answer = answers.find(a => a.questionId === current.id)

    if (!answer) return

    setAnswer({
      correctOptionId: current.correctOptionId,
      questionId: current.id,
      selectedOptionId: answer.selectedOptionId,
      status: current.correctOptionId === answer.selectedOptionId ? AnswerStatus.CORRECT : AnswerStatus.INCORRECT
    })

  }, [session])

  if (!session) return null


  const handleStartQuiz = () => {
    setSession({ answers: [], currentQuestionIdx: 0, status: SessionStatus.IN_PROGRESS })
  };

  const handleAnswer = (value: Question, selectedOptionId: string) => {
    const currentAnswers = answers.length ? answers : []
    const hasAnswered = currentAnswers.some(a => a.questionId === value.id)

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

    setAnswer({
      selectedOptionId,
      questionId: value.id,
      correctOptionId: value.correctOptionId,
      status: isCorrect ? AnswerStatus.CORRECT : AnswerStatus.INCORRECT
    })

    currentAnswers.push({ questionId: value.id, selectedOptionId })
    setSession({ ...session, answers: currentAnswers })
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx === null) return

    if (currentQuestionIdx === lastQuestionIndex) {
      setSession({ ...session, status: SessionStatus.COMPLETE })
      return
    }

    setAnswer(undefined)
    setSession({ ...session, currentQuestionIdx: currentQuestionIdx + 1 })
  };

  const handleReplay = () => {
    setAnswer(undefined)
    setSession(initialSession)
  };


  if (status === SessionStatus.INTRO) {
    return (
      <main className="app-shell">
        <OnBoarding onStart={handleStartQuiz} />
      </main>
    );
  }

  if (status === SessionStatus.COMPLETE) {
    return (
      <main className="app-shell">
        <QuizResult answers={session.answers} onReplay={handleReplay} />
      </main>
    );
  }

  return (
    <main className="app-shell">
      <Quiz
        onAnswer={handleAnswer}
        answer={answer}
        currentQuestionIndex={currentQuestionIdx}
        onNext={handleNextQuestion}
      />
    </main>
  );
}

export default App;
