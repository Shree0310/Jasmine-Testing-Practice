import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterService } from './counter.service';
import { count, take } from 'rxjs';

describe('CounterService', () => {
  let service: CounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start count with 0', () => {
    let currentCount: number | undefined;

    service.count$.subscribe(count => {
      currentCount = count;
    });

    expect(currentCount).toBe(0);
  });

  it('should show the initial count as 0', () =>{
    let currentCount: number | undefined;

    service.count$.subscribe(count =>{
      currentCount = count;
    });

    expect(currentCount).toBe(0);
  });

  it('The increment method increases the count', () =>{
    let currentCount: number | undefined;
    service.count$.subscribe(count =>{
      currentCount = count;
    });

    service.increment();
    expect(currentCount).toBe(1);
  });

  it('The decrement method decraeses the count', () =>{
    service.setValue(2);

    service.decrement();

    let currentCount: number | undefined;

    service.count$.pipe(
      take(1)
    ).subscribe(count =>{
      currentCount =count;
    });
    expect(currentCount).toBe(1);
  });

  it('The decrement method doesnt change the count if its 0', () =>{
    service.reset();
    service.decrement();

    let currentCount: number | undefined;
    service.count$.pipe(
      take(1)
    ).subscribe(count =>{
      currentCount = count;
    });

    expect(currentCount).toBe(0);
  });

  it('The reset method sets the count to 0', () =>{
    //first set the value to 5
    service.setValue(5);

    //Now reset the count
    service.reset();

    //Checking the value after reset
    let currentCount: number | undefined;

    service.count$.subscribe(count =>{
      currentCount = count;
    });

    expect(currentCount).toBe(0);
  });
  
  it('The setValue method changes the count to the provided value', () =>{
    //set the value
    service.setValue(5);

    //get the current value
    let currentCount: number | undefined;

    //subscribe
    service.count$.pipe(
      take(1) // Add this to automatically unsubscribe
    ).subscribe(count =>{currentCount = count});

    //verify the count to be 5
    expect(currentCount).toBe(5);
  });
});
