import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private quizUrl = 'https://storage.googleapis.com/netwo-public/quizz.json';

  constructor(private http: HttpClient) {}

  fetchQuiz(): void {
    this.http.get(this.quizUrl).subscribe((quiz) => {
      console.log(quiz);
    });
  }
}
