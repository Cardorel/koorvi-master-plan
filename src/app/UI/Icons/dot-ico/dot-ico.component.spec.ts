import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotIcoComponent } from './dot-ico.component';

describe('DotIcoComponent', () => {
  let component: DotIcoComponent;
  let fixture: ComponentFixture<DotIcoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DotIcoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DotIcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
