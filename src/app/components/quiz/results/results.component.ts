import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Question } from 'src/app/models/question';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  questions: Question[];
  score: number;
  relativeBestScore: number;

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.questions = this.quizService.questions;
    this.score = this.quizService.getScore();
    this.relativeBestScore = Math.round(
      this.quizService.absoluteBestScore * this.questions?.length
    );
  }

  onGoHome(): void {
    this.router.navigate(['home']);
  }
}
