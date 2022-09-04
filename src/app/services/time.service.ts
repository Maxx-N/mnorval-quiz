import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TimeService {
  readonly totalTime = 10;
  timeLeft: number = this.totalTime;
  timerSubject = new Subject<number>();
  private interval: any;

  constructor() {}

  startTimer(): void {
    this.interval = setInterval(() => {
      this.timeLeft -= 1;
      this.timerSubject.next(this.timeLeft);
    }, 1000);
  }

  stopTimer(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.timeLeft = this.totalTime;
    }
  }
}
