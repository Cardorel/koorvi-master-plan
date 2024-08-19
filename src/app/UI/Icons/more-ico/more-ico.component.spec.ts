import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreIcoComponent } from './more-ico.component';

describe('MoreIcoComponent', () => {
  let component: MoreIcoComponent;
  let fixture: ComponentFixture<MoreIcoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreIcoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreIcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
