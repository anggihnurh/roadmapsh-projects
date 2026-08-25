import { type } from "arktype";
import React, { useEffect, useState } from "react";
import { QuizSession, QuizSessionSchema } from "../types";


const QUIZ_SESSION_KEY = "quiz_session";

export const initialSession: QuizSession = {
  status: "intro",
  currentQuestionIdx: null,
  answers: [],
};

export default function useQuizSession() {
  const [session, setSession] = useState<QuizSession | null>(() => {
    try {
      const session = window.sessionStorage.getItem(QUIZ_SESSION_KEY);

      if (!session) {
        window.sessionStorage.setItem(
          QUIZ_SESSION_KEY,
          JSON.stringify(initialSession),
        );
        return initialSession
      }

      const parsed = JSON.parse(session);
      const result = QuizSessionSchema(parsed)

      if (result instanceof type.errors) {
        console.log('User session broken or invalid: ', result.summary);
        return null
      }

      return result
    } catch (error) {
      console.log("Cannot fetch user session", error);
      window.sessionStorage.removeItem(QUIZ_SESSION_KEY);
      return null
    }
  });

  useEffect(() => {
    if (!session) return

    window.sessionStorage.setItem(QUIZ_SESSION_KEY, JSON.stringify(session))
  }, [session])

  return { session, setSession }
}

interface SessionGuardProps {
  children: (session: QuizSession, setSession: (value: QuizSession) => void) => React.ReactNode
  fallback: React.ReactNode
}


export function SessionGuard({ children, fallback }: SessionGuardProps) {
  const { session, setSession } = useQuizSession()

  if (!session) return fallback

  return children(session, setSession)
}