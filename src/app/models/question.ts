export interface Question {
  questionNumber: number;
  answerType: 'choice' | 'text' | 'multiple-choice';
  choices?: [];
  label: string;
}
