import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared.module';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuestionComponent } from 'src/app/components/quiz/question/question.component';
import { QuizComponent } from 'src/app/components/quiz/quiz.component';
import { ResultsComponent } from 'src/app/components/quiz/results/results.component';
import { TopbarComponent } from 'src/app/components/quiz/topbar/topbar.component';

@NgModule({
  declarations: [
    QuizComponent,
    QuestionComponent,
    TopbarComponent,
    ResultsComponent,
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class QuizModule {}
