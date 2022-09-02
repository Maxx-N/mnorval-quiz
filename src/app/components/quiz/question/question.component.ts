import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input() question: Question;
  @Output() answerQuestion = new EventEmitter<string | string[]>();
  questionForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.questionForm = new FormGroup({
      answer: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.questionForm.valid) {
      this.answerQuestion.next(this.questionForm.value.answer);
      this.questionForm.reset();
    }
  }
}
