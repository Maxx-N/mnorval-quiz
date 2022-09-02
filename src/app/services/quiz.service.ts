import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Question } from '../models/question';

import { Quiz } from '../models/quiz.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private quizUrl = 'https://storage.googleapis.com/netwo-public/quizz.json';
  private quiz: Quiz;

  constructor(private http: HttpClient) {}

  fetchQuiz(): void {
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
        console.log(quiz);
      });
  }

  getQuiz(): Quiz {
    return { ...this.quiz, questions: [...this.quiz.questions] };
  }
}
