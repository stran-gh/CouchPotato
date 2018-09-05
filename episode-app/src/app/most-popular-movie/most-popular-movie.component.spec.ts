import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPopularMovieComponent } from './most-popular-movie.component';

describe('MostPopularMovieComponent', () => {
  let component: MostPopularMovieComponent;
  let fixture: ComponentFixture<MostPopularMovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostPopularMovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostPopularMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
