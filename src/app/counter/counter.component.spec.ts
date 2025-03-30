import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with count at 0', () =>{
expect(component.count).toBe(0);
  });

  it('should increament count when increament function is called', () =>{
    //first lets set the count to be greater than 5
    const initialCount = component.count;
    component.increment();
    expect(component.count).toBe(initialCount+ 1);
  });

  it('should decreament the count when decreament is called', () =>{
    component.count = 5;
    component.decrement();
    expect(component.count).toBe(4);
  });

  it('should not allow the count to go below 0', () =>{
    component.count = 0;
    component.decrement();
    expect(component.count).toBe(0);
  });

  it('should reset the count to 0 when reset() is called', () =>{
    component.count = 5;
    component.reset();
    expect(component.count).toBe(0);
  });

  it("should display the count on the page", () =>{
    component.count = 42;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Counter: 42');
  });

  it('should display the count on the page', () => {
    component.count = 42;
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Counter: 42');
  });

  it('should increament the displayed count when the increament button is called', () =>{
    const compiled  = fixture.nativeElement as HTMLElement;
    const increamentButton = compiled.querySelector('button:nth-child(2)') as HTMLButtonElement;

    expect(component.count).toBe(0);

    increamentButton.click();
    fixture.detectChanges();

    expect(component.count).toBe(1);
    expect(compiled.querySelector('h2')?.textContent).toContain('Counter:1');
  });

  it('should decereament the count when the decrement button is clicked', () =>{
    const compiled = fixture.nativeElement as HTMLElement;
    const decrementButton = compiled.querySelector('button:nth-child(3)') as HTMLButtonElement;

    component.count = 2;
    decrementButton.click();
    fixture.detectChanges();
    
    expect(component.count).toBe(1);
    expect(compiled.querySelector('h2')?.textContent).toContain('Counter: 1');
  })
});
