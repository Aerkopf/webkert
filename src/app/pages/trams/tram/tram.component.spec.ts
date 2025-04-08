import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramComponent } from './tram.component';

describe('TramComponent', () => {
  let component: TramComponent;
  let fixture: ComponentFixture<TramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TramComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
