import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CheckContentComponent} from './check-content.component';

describe('CheckContentComponent', () => {
  let component: CheckContentComponent;
  let fixture: ComponentFixture<CheckContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
