import React, { useEffect, useState } from "react";
import { QuizSession, SessionStatus } from "../types";


const QUIZ_SESSION_KEY = "quiz_session";

export const initialSession: QuizSession = {
  status: SessionStatus.INTRO,
  currentQuestionIdx: null,
  answers: [],
};

export default function useQuizSession() {
  const [session, setSession] = useState<QuizSession | null>();

  useEffect(() => {
    try {
      const session = window.sessionStorage.getItem(QUIZ_SESSION_KEY);

      if (!session) {
        setSession(initialSession);
        window.sessionStorage.setItem(
          QUIZ_SESSION_KEY,
          JSON.stringify(initialSession),
        );
        return;
      }

      const parsed: QuizSession = JSON.parse(session);
      setSession(parsed);
    } catch (error) {
      console.log("Cannot fetch user session", error);
      window.sessionStorage.removeItem(QUIZ_SESSION_KEY);
      setSession(null);
    }
  }, []);

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