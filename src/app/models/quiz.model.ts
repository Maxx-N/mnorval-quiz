import { Question } from './question';

export interface Quiz {
  currentQuestionNumber: number;
  questions: Question[];
}
