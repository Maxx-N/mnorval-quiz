import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Quiz } from 'src/app/models/quiz.model';
import { QuizService } from 'src/app/services/quiz.service';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit, OnDestroy {
  quiz: Quiz;
  currentQuestion: Question;
  isQuizOver: boolean = false;
  private quizSubscription: Subscription;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizSubscription = this.quizService.quizSubject.subscribe((quiz) => {
      this.updateQuiz(quiz);
    });

    this.quizService.fetchQuestions();
  }

  ngOnDestroy(): void {
    this.quizSubscription.unsubscribe();
  }

  updateQuiz(quiz: Quiz): void {
    this.quiz = quiz;
    this.currentQuestion = this.quizService.getCurrentQuestion();
    this.isQuizOver = this.quizService.isQuizOver();
  }
}
