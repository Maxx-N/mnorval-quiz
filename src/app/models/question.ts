export interface Question {
  questionNumber: number;
  answerType: 'choice' | 'text' | 'multiple-choice';
  answer?: string
  answers?: string[];
  choices?: string[];
  label: string;
}
