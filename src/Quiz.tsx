import quizData from "../questions.json";
import type { QuizResult } from "./App";

const { questions } = quizData;
const lastQuestionIndex = questions.length - 1;

interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  question: string;
  options: QuestionOption[];
  correctOptionId: string;
}

interface QuizProps {
  currentQuestionIndex: number;
  result: QuizResult | null;
  onAnswer: (value: Question, selectedOptionId: string) => void;
  onNext: () => void;
}

export default function Quiz({
  currentQuestionIndex,
  result,
  onAnswer,
  onNext,
}: QuizProps) {
  return (
    <div className="flex flex-col items-start gap-6">
      {questions.map((q, index) => {
        if (index !== currentQuestionIndex) return null;

        return (
          <div key={q.id} className="flex flex-col gap-6">
            <p>
              Pertanyaan <b>{index + 1}</b> dari {questions.length}
            </p>
            <div className="flex flex-col gap-3">
              <p className="text-lg font-semibold">{q.question}</p>
              <div className="flex flex-col gap-2 ml-2">
                {q.options.map((o) => {
                  const isAnswered = !!result?.selectedOptionId;
                  const isSelectedOpt = o.id === result?.selectedOptionId;
                  const isResultCorrect = result?.status === "correct";
                  const isCorrectOpt = isAnswered && o.id === q.correctOptionId;

                  return (
                    <button
                      onClick={() => {
                        // if (isAnswered) return;

                        onAnswer(q, o.id);
                      }}
                      className="p-0 bg-none border-none w-max cursor-pointer"
                    >
                      <span
                        style={{
                          color: isSelectedOpt
                            ? isResultCorrect
                              ? "green"
                              : "red"
                            : isCorrectOpt
                              ? "green"
                              : "black",
                        }}
                      >
                        <b>{o.id}.</b> {o.text}{" "}
                        {isSelectedOpt
                          ? isResultCorrect
                            ? "✔"
                            : "✗"
                          : isCorrectOpt
                            ? "✔"
                            : ""}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
      <button
        onClick={onNext}
        disabled={!result?.selectedOptionId}
        className="py-2 px-4 bg-blue-500 text-white rounded-lg disabled:bg-gray-400 not-disabled:cursor-pointer"
      >
        {currentQuestionIndex === lastQuestionIndex
          ? "Lihat Hasil"
          : "Selanjutnya"}
      </button>
    </div>
  );
}
