import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import quizData from "../questions.json";
import { initialSession } from "./hook";
import OnBoarding from "./Onboarding";
import Quiz from "./Quiz";
import QuizResult from "./QuizResult";
import { AnswerStatus, Question, QuizAnswer, QuizSession, SessionStatus } from "./types";

const lastQuestionIndex = quizData.questions.length - 1;


interface AppProps {
  session: QuizSession
  setSession: (value: QuizSession) => void
}

function App({ session, setSession }: AppProps) {
  const { answers, currentQuestionIdx, status } = session

  const answer = useMemo(() => {
    if (currentQuestionIdx === null) return

    const current = quizData.questions[currentQuestionIdx]
    const foundAnswer = answers.find(a => a.questionId === current.id)

    if (!foundAnswer) return undefined

    return {
      correctOptionId: current.correctOptionId,
      questionId: current.id,
      selectedOptionId: foundAnswer.selectedOptionId,
      status: current.correctOptionId === foundAnswer.selectedOptionId ? AnswerStatus.CORRECT : AnswerStatus.INCORRECT
    } satisfies QuizAnswer

  }, [currentQuestionIdx, answers])

  const handleStartQuiz = () => {
    setSession({ answers: [], currentQuestionIdx: 0, status: SessionStatus.IN_PROGRESS })
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
      setSession({ ...session, status: SessionStatus.COMPLETE })
      return
    }

    setSession({ ...session, currentQuestionIdx: currentQuestionIdx + 1 })
  };

  const handleReplay = () => {
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
