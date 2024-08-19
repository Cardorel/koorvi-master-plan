import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerIcoComponent } from './spinner-ico.component';

describe('SpinnerIcoComponent', () => {
  let component: SpinnerIcoComponent;
  let fixture: ComponentFixture<SpinnerIcoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerIcoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerIcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
