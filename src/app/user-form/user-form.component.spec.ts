import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () =>{
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async() =>{
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [UserFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () =>{
    expect(component).toBeTruthy();
  });

  it('should be invalid when the form is empty', () =>{
    expect(component.userForm.valid).toBeFalse();

    expect(component.name?.valid).toBeFalse;
    expect(component.email?.valid).toBeFalse;
    expect(component.password?.valid).toBeFalse;
  });

  it('Verify the name field validation (required and minimum length)', () =>{
    //get the name form control
    const nameControl = component.userForm.get('name');

    //Test required validation
    //initially the control should be invalid (empty)
    expect(nameControl?.valid).toBeFalse();
    expect(nameControl?.errors?.['required']).toBeTrue();

    //Test minlength validation
    nameControl?.setValue('Jo');
    expect(nameControl?.valid).toBeFalse();
    expect(nameControl?.errors?.['required']).toBeFalsy(); //required error should be false
    expect(nameControl?.errors?.['minlength']).toBeTrue();//but now we should hv minlength error

    //set a valid value
    nameControl?.setValue('John');
    expect(nameControl?.errors?.['required']).toBeFalsy();
    expect(nameControl?.errors).toBeNull();
  });

  it('Verify the email field validation (required and email format)', () =>{
    //get the email control
    let emailControl = component.userForm.get('email');

    expect(emailControl?.valid).toBeFalse();
    expect(emailControl?.errors?.['required']).toBeTrue();

    emailControl?.setValue('me@gmail');
    expect(emailControl?.errors?.['required']).toBeFalsy();
    expect(emailControl?.errors?.['email']).toBeTrue();

    emailControl?.setValue('me@gmail.com');
    expect(emailControl?.errors?.['required']).toBeFalsy();
    expect(emailControl?.errors).toBeNull();

  });


})
