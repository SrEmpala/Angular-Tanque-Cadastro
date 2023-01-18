import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankRegisterComponent } from './tank-register.component';

describe('TankRegisterComponent', () => {
  let component: TankRegisterComponent;
  let fixture: ComponentFixture<TankRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TankRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TankRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
