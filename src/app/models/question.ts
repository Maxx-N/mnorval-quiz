export interface Question {
  questionNumber: number;
  answerType: 'choice' | 'text' | 'multiple-choice';
  choices?: string[];
  label: string;
}
