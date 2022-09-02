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
  private quiz: Quiz;
  quizSubject = new Subject<Quiz>();

  constructor(private http: HttpClient) {}

  fetchQuestions(): void {
    this.http
      .get<Question[]>(this.quizUrl)
      .pipe(
        map((questionsData: Question[]) => {
          console.log(questionsData);
          return {
            currentQuestionNumber: 1,
            score: 0,
            questions: questionsData.map((questionData) => {
              return {
                ...questionData,
                questionNumber: questionsData.indexOf(questionData) + 1,
              };
            }),
          };
        })
      )
      .subscribe((quiz: Quiz) => {
        this.quiz = quiz;
        this.quizSubject.next(quiz);
      });
  }

  getCurrentQuestion(): Question {
    return this.quiz.questions.find((question) => {
      return question.questionNumber === this.quiz.currentQuestionNumber;
    });
  }

  answerQuestion(answer: string | string[]): void {
    const question = this.getCurrentQuestion();
    let isCorrect: boolean = false;

    if (question.answerType === 'choice' || question.answerType === 'text') {
      isCorrect =
        (question.answer as string).toLowerCase() ===
        (answer as string).toLowerCase();
    }

    if (isCorrect) {
      this.quiz.score++;
    }

    this.quiz.currentQuestionNumber++;
    this.quizSubject.next(this.quiz);
  }
}
