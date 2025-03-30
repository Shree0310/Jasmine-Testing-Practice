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
    const nameControl = component.userForm.get('name');
    expect(nameControl?.valid).toBeFalse();
    expect(nameControl?.errors?.['required']).toBeTrue();

    nameControl?.setValue('Jo');
    expect(nameControl?.valid).toBeFalse();
    expect(nameControl?.errors?.['required']).toBeFalsy();
    expect(nameControl?.errors?.['minlength']).toBeTrue();

    nameControl?.setValue('John');
    expect(nameControl?.errors?.['required']).toBeFalsy();
    expect(nameControl?.errors).toBeNull();
  })
})
