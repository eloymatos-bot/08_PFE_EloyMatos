import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Estudiante } from '../../models/estudiante.model';

@Component({
  selector: 'app-estudiante-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estudiante-formulario.component.html',
  styleUrl: './estudiante-formulario.component.css'
})
export class EstudianteFormularioComponent implements OnChanges {
  @Input() estudianteAEditar: Estudiante | null = null;

  @Output() guardar = new EventEmitter<Estudiante>();
  @Output() cancelar = new EventEmitter<void>();

  model: Omit<Estudiante, 'id'> & { id?: number } = {
    nombre: '',
    grado: '',
    edad: 0,
    email: '',
    promedio: 0
  };

  grados = ['1.º de Secundaria', '2.º de Secundaria', '3.º de Secundaria', '4.º de Secundaria', '5.º de Secundaria'];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['estudianteAEditar'] && this.estudianteAEditar) {
      this.model = { ...this.estudianteAEditar };
    } else if (changes['estudianteAEditar'] && !this.estudianteAEditar) {
      this.resetForm();
    }
  }

  onSubmit(): void {
    if (this.model.nombre && this.model.grado && this.model.email) {
      this.guardar.emit(this.model as Estudiante);
      this.resetForm();
    }
  }

  onCancelar(): void {
    this.cancelar.emit();
    this.resetForm();
  }

  private resetForm(): void {
    this.model = {
      nombre: '',
      grado: '',
      edad: 0,
      email: '',
      promedio: 0
    };
  }
}

