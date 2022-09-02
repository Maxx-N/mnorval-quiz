import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  @Input() currentQuestionNumber: number;
  @Input() totalQuestionsNumber: number;

  constructor() {}

  ngOnInit(): void {}
}
