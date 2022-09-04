import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit, OnDestroy {
  @Input() currentQuestionNumber: number;
  @Input() totalQuestionsNumber: number;
  private timerSubscription: Subscription;
  timeLeft: number;

  constructor(private timeService: TimeService) {}

  ngOnInit(): void {
    this.timeLeft = this.timeService.timeLeft;
    this.timerSubscription = this.timeService.timerSubject.subscribe(
      (timeLeft) => {
        this.timeLeft = timeLeft;
      }
    );
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }
}
