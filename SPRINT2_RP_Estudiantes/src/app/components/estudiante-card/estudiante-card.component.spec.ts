import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteCardComponent } from './estudiante-card.component';

describe('EstudianteCardComponent', () => {
  let component: EstudianteCardComponent;
  let fixture: ComponentFixture<EstudianteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudianteCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudianteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
