import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';

import { Question } from '../models/question';
import { Quiz } from '../models/quiz.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private quizUrl = 'https://storage.googleapis.com/netwo-public/quizz.json';
  questions: Question[];
  currentQuiz: Quiz;
  absoluteBestScore: number = 0;
  quizSubject = new Subject<Quiz>();
  questionsSubject = new Subject<Question[]>();

  constructor(private http: HttpClient) {}

  fetchQuestions(): void {
    // A short timeout is set for a demonstration purpose, to be able to see the spinner
    setTimeout(() => {
      this.http.get<Question[]>(this.quizUrl).subscribe((questionsData) => {
        this.questions = questionsData.map((questionData) => {
          return {
            ...questionData,
            questionNumber: questionsData.indexOf(questionData) + 1,
            isCorrect: false,
          };
        });
        this.questionsSubject.next(this.questions);
      });
    }, 500);
  }

  startNewQuiz(): void {
    this.currentQuiz = {
      currentQuestionNumber: 1,
      isOngoing: true,
    };
    this.quizSubject.next(this.currentQuiz);
  }

  finishQuiz(): void {
    this.currentQuiz.isOngoing = false;
    this.quizSubject.next(this.currentQuiz);
  }

  answerQuestion(response: string | string[]): void {
    const question = this.getCurrentQuestion();

    let isCorrect: boolean;
    if (question.answerType !== 'multiple-choice') {
      isCorrect =
        question.answer.toLowerCase() === (response as string).toLowerCase();
    } else {
      isCorrect = true;
      for (const choice of response as string[]) {
        if (!question.answers.includes(choice)) {
          isCorrect = false;
          break;
        }
      }
      isCorrect = isCorrect && question.answers.length === response.length;
    }
    question.isCorrect = isCorrect;

    this.updateBestScore();

    const isLastQuestion: boolean =
      this.currentQuiz.currentQuestionNumber === this.questions.length;
    if (isLastQuestion) {
      this.finishQuiz();
    } else {
      this.currentQuiz.currentQuestionNumber++;
      this.quizSubject.next(this.currentQuiz);
    }
  }

  getCurrentQuestion(): Question {
    return this.questions.find((question) => {
      return question.questionNumber === this.currentQuiz.currentQuestionNumber;
    });
  }

  getScore(): number {
    return this.questions?.filter((question) => {
      return question.isCorrect;
    }).length;
  }

  private updateBestScore(): void {
    const isBestScore: boolean =
      this.getAbsoluteScore() > this.absoluteBestScore;
    if (isBestScore) {
      this.absoluteBestScore = this.getAbsoluteScore();
    }
  }
  private getAbsoluteScore(): number {
    return this.getScore() / this.questions.length;
  }
}
