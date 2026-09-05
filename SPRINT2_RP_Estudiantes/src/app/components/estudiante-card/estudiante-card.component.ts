import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Estudiante } from '../../models/estudiante.model';

@Component({
  selector: 'app-estudiante-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estudiante-card.component.html',
  styleUrl: './estudiante-card.component.css'
})
export class EstudianteCardComponent {
  @Input() estudiante!: Estudiante;

  @Output() editar = new EventEmitter<Estudiante>();
  @Output() eliminar = new EventEmitter<number>();

  get iniciales(): string {
    return this.estudiante.nombre
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(nombre => nombre[0])
      .join('')
      .toUpperCase();
  }

  get estadoAcademico(): string {
    return this.estudiante.promedio >= 90 ? 'Destacado' : this.estudiante.promedio >= 70 ? 'Regular' : 'En riesgo';
  }

  onEditar(): void {
    this.editar.emit(this.estudiante);
  }

  onEliminar(): void {
    this.eliminar.emit(this.estudiante.id);
  }
}

