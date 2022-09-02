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
        }
      }
      isCorrect = isCorrect && question.answers.length == response.length;
    }

    if (isCorrect) {
      this.quiz.score++;
    }

    this.quiz.currentQuestionNumber++;
    this.quizSubject.next(this.quiz);
  }
}
