import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPropertiesPage } from './all-properties.page';

describe('AllPropertiesPage', () => {
  let component: AllPropertiesPage;
  let fixture: ComponentFixture<AllPropertiesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllPropertiesPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPropertiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
