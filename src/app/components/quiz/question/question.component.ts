import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input() question: Question;
  questionForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    console.log(this.question);
    this.questionForm = new FormGroup({
      answer: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    console.log(this.questionForm.value);
  }
}
