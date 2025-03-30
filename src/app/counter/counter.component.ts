// counter.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CounterService } from '../counter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-counter',
  template: `
    <div class="counter-container">
      <h2>Counter: {{ count }}</h2>
      <button (click)="increment()">Increment</button>
      <button (click)="decrement()">Decrement</button>
      <button (click)="reset()">Reset</button>
    </div>
  `,
  styles: [/* ... */]
})
export class CounterComponent implements OnInit, OnDestroy {
  count: number = 0;
  private subscription: Subscription | null = null;

  constructor(private counterService: CounterService) {}

  ngOnInit(): void {
    this.subscription = this.counterService.count$.subscribe(
      value => this.count = value
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  increment(): void {
    this.counterService.increment();
  }

  decrement(): void {
    this.counterService.decrement();
  }

  reset(): void {
    this.counterService.reset();
  }
}