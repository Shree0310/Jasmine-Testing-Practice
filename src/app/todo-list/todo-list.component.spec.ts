import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { DataService, Todo } from '../data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';


describe( 'toDoListComponent', () =>{
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let dataService: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(async ()=>{
    TestBed.configureTestingModule({
      imports: [],
      declarations: [TodoListComponent],
      providers: [DataService]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpTestingController.verify();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Use httpTsetingController when you want to test the http request details
  it('should load todos on initialization', () =>{
    const mockToDos: Todo[] = [
      { id: 1, title: 'Test Todo 1', completed: false },
      { id: 2, title: 'Test Todo 2', completed: true  }
    ];
    //Initialize the Component and trigger the lifecycle hooks
    //This will trigger the ngOnInit()
    //Which will in turn trigger the loadToDos()
    //This is ACT
    fixture.detectChanges();

    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/todos');

    //ASSERT: check the request to be GET request
    expect(req.request.method).toBe('GET');

    //resolve the request with mock data
    req.flush(mockToDos);

    expect(component.todos).toEqual(mockToDos);
    expect(component.loading).toBeFalse;
    expect(component.error).toBeNull;
  });

  //Use Spies when you want to mock the service behaviour
  it('should load toDos on initialization (with spy)', () =>{
    const mockToDos = [
      {id: 1, title:'first todo', completed: true},
      {id:2, title: 'second todo', completed: false}
    ]
    //Spy on the servive method
    spyOn(dataService, 'getTodos').and.returnValue(of(mockToDos));

    //ACT
    //Init compoenent
    fixture.detectChanges();

    //verify service is called
    expect(dataService.getTodos).toHaveBeenCalled();

    //verify the component was state
    expect(component.todos).toEqual(mockToDos);
    expect(component.loading).toBeFalse;
    expect(component.error).toBeNull;
  });

  it('should load todos on initialisation', () =>{
    const mockToDos = [
      {id: 1, title: 'todo first', completed: false},
      {id: 2, title: 'second todo', completed: true}
    ]

    fixture.detectChanges();

    const req = httpTestingController.expectOne('');

    //assert
    expect(req.request.method).toBe('GET');

    //resolve
    req.flush(mockToDos);

    expect(component.todos).toEqual(mockToDos);
    expect(component.error).toBeNull;
    expect(component.loading).toBeFalse;
  });

  it('should load the todos on initialisation, using spies', () =>{
    const mockToDOs = [
      {id: 1, title: 'todo first', completed: false},
      {id: 2, title: 'second todo', completed: true}
    ]

    spyOn(dataService, 'getTodos').and.returnValue(of(mockToDOs));

    fixture.detectChanges();

    expect(dataService.getTodos).toHaveBeenCalled();

    expect(component.todos).toBe(mockToDOs);
    expect(component.loading).toBeFalse();
    expect(component.error).toBeNull;
  });

  it('show the loading indicator while fetching the data', () =>{
    const mockToDOs = [
      {id: 1, title: 'todo first', completed: false},
      {id: 2, title: 'second todo', completed: true}
    ]
    //Init component
    fixture.detectChanges();

    //The loading should be soon just afetr the component is rendered
    expect(component.loading).toBeTrue();

    //Chcek the DOM for the loading indicator
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Loading..');

    //Get the http req
    const req = httpTestingController.expectOne('');
    expect(req.request.method).toBe('GET');

    //resolve the http request
    req.flush(mockToDOs);

    //verify the loading is false after request completes
    expect(component.todos).toEqual(mockToDOs);
    expect(component.loading).toBeFalse();

    //verify loading is gone from the DOM
    expect(compiled.textContent).not.toContain('Loading');

  });

  it('should handle the HTTP errors correctly', () =>{
    const mockToDOs = [
      {id: 1, title: 'todo first', completed: false},
      {id: 2, title: 'second todo', completed: true}
    ]

    fixture.detectChanges();

    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/todos');

    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Network Error'),{
      status: 404,
      statusText: 'Not found'
    });

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(component.loading).toBeFalse();
    expect(component.error).toBeTruthy();

    expect(compiled.textContent).toContain('Error fetching todos');
  });

  it('should load new data on click of refresh button', () => {
    //Define the initial mocks
    const initialMockToDos = [
      {id: 1, title: 'todo first', completed: false},
      {id: 2, title: 'second todo', completed: true}
    ]

    //define new data to load after refresh
    const refreshedMockToDos = [
      {id: 1, title: 'todo first', completed: false},
      {id: 2, title: 'second todo', completed: true},
      { id: 2, title: 'second todo', completed: true}
    ]

    //init component
    fixture.detectChanges();

    //hnadle initial http request
    const initialReq = httpTestingController.expectOne('');

    initialReq.flush(initialMockToDos);

    //Verify initial data load
    expect(component.todos).toEqual(initialMockToDos);

    //get the refresh button and click it
    const compiled = fixture.nativeElement as HTMLElement;

    const refreshButton = compiled.querySelector('button') as HTMLButtonElement;

    refreshButton.click();

    //Trigger the change detection to handle the refresh
    fixture.detectChanges();

    const refreshReq = httpTestingController.expectOne('');

    //resolve with new data
    refreshReq.flush(refreshedMockToDos);

    //expect the new data to be loaded
    expect(component.todos).toEqual(refreshedMockToDos);
    expect(component.loading).toBeFalse();
  })



});
