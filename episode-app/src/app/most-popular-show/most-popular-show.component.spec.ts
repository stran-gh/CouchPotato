import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPopularShowComponent } from './most-popular-show.component';

describe('MostPopularShowComponent', () => {
  let component: MostPopularShowComponent;
  let fixture: ComponentFixture<MostPopularShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostPopularShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostPopularShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
