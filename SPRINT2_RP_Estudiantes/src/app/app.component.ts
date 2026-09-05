import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudianteListaComponent } from './components/estudiante-lista/estudiante-lista.component';
import { EstudianteFormularioComponent } from './components/estudiante-formulario/estudiante-formulario.component';
import { Estudiante } from './models/estudiante.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, EstudianteListaComponent, EstudianteFormularioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CRUD de Estudiantes';
  formularioAbierto = false;

  estudiantes: Estudiante[] = [
    {
      id: 1,
      nombre: 'Ana García',
      grado: '5.º de Secundaria',
      edad: 16,
      email: 'ana.garcia@colegio.edu',
      promedio: 18
    },
    {
      id: 2,
      nombre: 'Luis Pérez',
      grado: '4.º de Secundaria',
      edad: 15,
      email: 'luis.perez@colegio.edu',
      promedio: 16
    },
    {
      id: 3,
      nombre: 'Sofía López',
      grado: '5.º de Secundaria',
      edad: 16,
      email: 'sofia.lopez@colegio.edu',
      promedio: 19
    }
  ];

  estudianteSeleccionado: Estudiante | null = null;

  get promedioGeneral(): number {
    if (!this.estudiantes.length) {
      return 0;
    }

    return Math.round(this.estudiantes.reduce((total, estudiante) => total + estudiante.promedio, 0) / this.estudiantes.length);
  }

  get gradosRegistrados(): number {
    return new Set(this.estudiantes.map(estudiante => estudiante.grado)).size;
  }

  get estudiantesDestacados(): number {
    return this.estudiantes.filter(estudiante => estudiante.promedio >= 18).length;
  }

  abrirFormulario(): void {
    this.estudianteSeleccionado = null;
    this.formularioAbierto = true;
  }

  onEditar(estudiante: Estudiante): void {
    this.estudianteSeleccionado = { ...estudiante };
    this.formularioAbierto = true;
  }

  onEliminar(id: number): void {
    const estudiante = this.estudiantes.find(item => item.id === id);
    if (estudiante && !window.confirm(`¿Deseas eliminar a ${estudiante.nombre}?`)) {
      return;
    }

    this.estudiantes = this.estudiantes.filter(e => e.id !== id);
    if (this.estudianteSeleccionado?.id === id) {
      this.estudianteSeleccionado = null;
    }
  }

  onGuardar(estudiante: Estudiante): void {
    if (estudiante.id) {
      this.estudiantes = this.estudiantes.map(e => e.id === estudiante.id ? estudiante : e);
    } else {
      const nuevoId = this.estudiantes.length > 0 ? Math.max(...this.estudiantes.map(e => e.id)) + 1 : 1;
      this.estudiantes = [...this.estudiantes, { ...estudiante, id: nuevoId }];
    }
    this.estudianteSeleccionado = null;
    this.formularioAbierto = false;
  }

  onCancelarFormulario(): void {
    this.estudianteSeleccionado = null;
    this.formularioAbierto = false;
  }
}
