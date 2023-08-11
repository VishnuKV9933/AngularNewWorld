import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileeditmodalComponent } from './profileeditmodal.component';

describe('ProfileeditmodalComponent', () => {
  let component: ProfileeditmodalComponent;
  let fixture: ComponentFixture<ProfileeditmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileeditmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileeditmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
