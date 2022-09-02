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
  private quizSubscription: Subscription;
  quiz: Quiz;
  currentQuestion: Question;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizSubscription = this.quizService.quizSubject.subscribe((quiz) => {
      this.updateQuestion(quiz);
    });

    this.quizService.fetchQuestions();
  }

  ngOnDestroy(): void {
    this.quizSubscription.unsubscribe();
  }

  updateQuestion(quiz: Quiz): void {
    this.quiz = quiz;
    this.currentQuestion = this.quizService.getCurrentQuestion();
  }

  onAnswerQuestion(answer: string | string[]): void {
    this.quizService.answerQuestion(answer);
  }
}
