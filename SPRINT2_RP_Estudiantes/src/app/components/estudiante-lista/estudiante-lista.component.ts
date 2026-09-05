import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Estudiante } from '../../models/estudiante.model';
import { EstudianteCardComponent } from '../estudiante-card/estudiante-card.component';

@Component({
  selector: 'app-estudiante-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, EstudianteCardComponent],
  templateUrl: './estudiante-lista.component.html',
  styleUrl: './estudiante-lista.component.css'
})
export class EstudianteListaComponent {
  @Input() estudiantes: Estudiante[] = [];

  @Output() editar = new EventEmitter<Estudiante>();
  @Output() eliminar = new EventEmitter<number>();
  @Output() nuevo = new EventEmitter<void>();

  busqueda = '';
  gradoSeleccionado = '';

  get grados(): string[] {
    return [...new Set(this.estudiantes.map(estudiante => estudiante.grado))].sort();
  }

  get estudiantesFiltrados(): Estudiante[] {
    const termino = this.busqueda.trim().toLowerCase();

    return this.estudiantes.filter(estudiante => {
      const coincideBusqueda = !termino
        || estudiante.nombre.toLowerCase().includes(termino)
        || estudiante.email.toLowerCase().includes(termino)
        || estudiante.grado.toLowerCase().includes(termino);
      const coincideGrado = !this.gradoSeleccionado || estudiante.grado === this.gradoSeleccionado;

      return coincideBusqueda && coincideGrado;
    });
  }

  onEditar(estudiante: Estudiante): void {
    this.editar.emit(estudiante);
  }

  onEliminar(id: number): void {
    this.eliminar.emit(id);
  }

  onNuevo(): void {
    this.nuevo.emit();
  }
}

