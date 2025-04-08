import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramsComponent } from './trams.component';

describe('TramsComponent', () => {
  let component: TramsComponent;
  let fixture: ComponentFixture<TramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TramsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
