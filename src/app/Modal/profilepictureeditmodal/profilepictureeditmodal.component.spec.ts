import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilepictureeditmodalComponent } from './profilepictureeditmodal.component';

describe('ProfilepictureeditmodalComponent', () => {
  let component: ProfilepictureeditmodalComponent;
  let fixture: ComponentFixture<ProfilepictureeditmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilepictureeditmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilepictureeditmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
