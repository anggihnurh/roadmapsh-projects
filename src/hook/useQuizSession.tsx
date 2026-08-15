import { useEffect, useState } from "react";

interface Answer {
  questionId: string;
  selectedOption: string;
}

interface QuizSession {
  status: "intro" | "in_progress" | "complete";
  currentQuestionIdx: number | null;
  answers: Answer[];
}

const QUIZ_SESSION_KEY = "quiz_session";

export default function useQuizSession() {
  const [quizSession, setQuizSession] = useState<QuizSession | null>();

  useEffect(() => {
    try {
      const session = window.sessionStorage.getItem(QUIZ_SESSION_KEY);

      const initialSession: QuizSession = {
        status: "intro",
        currentQuestionIdx: null,
        answers: [],
      };

      if (!session) {
        setQuizSession(initialSession);
        window.sessionStorage.setItem(
          QUIZ_SESSION_KEY,
          JSON.stringify(initialSession),
        );
        return;
      }

      const parsed: QuizSession = JSON.parse(session);
      setQuizSession(parsed);
    } catch (error) {
      console.log("Cannot fetch user session", error);
      window.sessionStorage.removeItem(QUIZ_SESSION_KEY);
      setQuizSession(null);
    }
  }, []);

  return quizSession;
}
