import { Question } from './question';

export interface Quiz {
  currentQuestionNumber: number;
  score: number;
  questions: Question[];
}
