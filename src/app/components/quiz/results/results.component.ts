import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/models/quiz.model';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  quiz: Quiz;
  score: number;
  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quiz = this.quizService.getQuiz();
    this.score = this.quizService.getScore();
  }
}
