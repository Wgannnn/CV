import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAboutMe } from './read-about-me';

describe('ReadAboutMe', () => {
  let component: ReadAboutMe;
  let fixture: ComponentFixture<ReadAboutMe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadAboutMe]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReadAboutMe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
