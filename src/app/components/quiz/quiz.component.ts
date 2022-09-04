import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { Quiz } from 'src/app/models/quiz.model';
import { QuizService } from 'src/app/services/quiz.service';
import { Question } from 'src/app/models/question';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit, OnDestroy {
  numberOfQuestions: number;
  currentQuestionNumber: number;
  isQuizOngoing: boolean;
  private quizSubscription: Subscription;
  private timerSubscription: Subscription;

  constructor(
    private quizService: QuizService,
    private timeService: TimeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.quizService.questions
      ? (this.numberOfQuestions = this.quizService.questions.length)
      : this.router.navigate(['home']);

    this.quizSubscription = this.quizService.quizSubject.subscribe((quiz) => {
      this.currentQuestionNumber = quiz.currentQuestionNumber;
      this.isQuizOngoing = quiz.isOngoing;
      if (!quiz.isOngoing) {
        this.timeService.stopTimer();
      }
    });

    if (!!this.quizService.questions) {
      this.quizService.startNewQuiz();

      this.timerSubscription = this.timeService.timerSubject.subscribe(
        (timeLeft) => {
          if (timeLeft <= 0) {
            this.quizService.finishQuiz();
            this.timeService.stopTimer();
          }
        }
      );

      this.timeService.startTimer();
    } else {
      this.router.navigate(['home']);
    }
  }

  ngOnDestroy(): void {
    [this.quizSubscription, this.timerSubscription].forEach((subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }
}
