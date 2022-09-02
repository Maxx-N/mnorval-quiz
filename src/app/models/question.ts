export interface Question {
  questionNumber: number;
  answerType: 'choice' | 'text' | 'multiple-choice';
  answer: string | string[];
  choices?: string[];
  label: string;
}
