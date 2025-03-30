// counter.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private countSubject = new BehaviorSubject<number>(0);
  count$ = this.countSubject.asObservable();

  constructor() { }

  increment(): void {
    this.countSubject.next(this.countSubject.value + 1);
  }

  decrement(): void {
    const currentValue = this.countSubject.value;
    if (currentValue > 0) {
      this.countSubject.next(currentValue - 1);
    }
  }

  reset(): void {
    this.countSubject.next(0);
  }

  setValue(value: number): void {
    this.countSubject.next(value);
  }
}