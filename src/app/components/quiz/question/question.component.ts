import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Question } from 'src/app/models/question';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit, OnDestroy {
  question: Question;
  questionForm: FormGroup;
  private quizSubscription: Subscription;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.updateQuestion(this.quizService.getCurrentQuestion());
    this.quizSubscription = this.quizService.quizSubject.subscribe(() => {
      this.updateQuestion(this.quizService.getCurrentQuestion());
    });
  }

  ngOnDestroy(): void {
    this.quizSubscription.unsubscribe();
  }

  private updateQuestion(question: Question): void {
    this.question = question;
    this.initForm();
  }

  private initForm(): void {
    if (this.question?.answerType === 'multiple-choice') {
      this.initMultipleForm();
    } else {
      this.initSimpleForm();
    }
  }

  private initSimpleForm(): void {
    this.questionForm = new FormGroup({
      answer: new FormControl('', [Validators.required]),
    });
  }

  private initMultipleForm(): void {
    this.questionForm = new FormGroup({
      answers: new FormControl([], [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.questionForm.valid) {
      if (this.question.answerType !== 'multiple-choice') {
        this.quizService.answerQuestion(this.questionForm.value.answer);
      } else {
        this.quizService.answerQuestion(this.questionForm.value.answers);
      }
    }
  }

  onToggleChoice(choice: string): void {
    const previousAnswers = !!this.questionForm.value.answers
      ? this.questionForm.value.answers
      : [];
    let newAnswers: string[] = [...previousAnswers];

    if (previousAnswers.includes(choice)) {
      newAnswers = previousAnswers.filter((answer: string) => {
        return answer !== choice;
      });
    } else {
      newAnswers.push(choice);
    }

    this.questionForm.setValue({ answers: newAnswers });
  }
}
