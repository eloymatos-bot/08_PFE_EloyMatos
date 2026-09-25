import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Libro } from '../../models/libro.model';

@Component({
  selector: 'app-libro-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './libro-form.component.html',
  styleUrl: './libro-form.component.css'
})
export class LibroFormComponent implements OnChanges {
  // Recibe el libro a editar si el usuario hizo clic en "Editar" (null si es para crear)
  @Input() libroSeleccionado: Libro | null = null;

  // Emite el libro a guardar (sea para POST o para PUT)
  @Output() guardarLibro = new EventEmitter<Libro>();
  
  // Emite la cancelación de la edición
  @Output() cancelarEdicion = new EventEmitter<void>();

  // Estado local del formulario
  modoEdicion: boolean = false;

  // Modelo temporal enlazado con [(ngModel)]
  libroForm: Libro = this.obtenerLibroVacio();

  // Lista de géneros predefinidos para el selector <select>
  generosDisponibles: string[] = [
    'Novela',
    'Ciencia Ficción',
    'Fantasía',
    'Historia',
    'Desarrollo Personal',
    'Tecnología',
    'Poesía',
    'Otro'
  ];

  /**
   * Detecta cuando el componente padre envía un nuevo `libroSeleccionado`
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['libroSeleccionado']) {
      if (this.libroSeleccionado) {
        this.modoEdicion = true;
        // Clonamos el objeto para evitar mutación directa previa a guardar
        this.libroForm = { ...this.libroSeleccionado };
      } else {
        this.resetearFormulario();
      }
    }
  }

  /**
   * Envía la información del formulario al componente padre
   */
  onSubmit(): void {
    // Validaciones básicas de campos obligatorios
    if (!this.libroForm.titulo.trim() || !this.libroForm.autor.trim()) {
      alert('Por favor completa el Título y el Autor del libro.');
      return;
    }

    if (this.libroForm.precio < 0) {
      alert('El precio no puede ser negativo.');
      return;
    }

    // Si no se especifica portada, asignamos una imagen por defecto razonable
    if (!this.libroForm.portadaUrl.trim()) {
      this.libroForm.portadaUrl = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400';
    }

    // Emitimos el objeto hacia app.component
    this.guardarLibro.emit(this.libroForm);
    this.resetearFormulario();
  }

  /**
   * Cancela el proceso de edición y limpia el formulario
   */
  onCancelar(): void {
    this.resetearFormulario();
    this.cancelarEdicion.emit();
  }

  /**
   * Reinicia el formulario al estado inicial para registro
   */
  resetearFormulario(): void {
    this.modoEdicion = false;
    this.libroForm = this.obtenerLibroVacio();
  }

  /**
   * Devuelve un objeto Libro limpio
   */
  private obtenerLibroVacio(): Libro {
    return {
      titulo: '',
      autor: '',
      anioPublicacion: new Date().getFullYear(),
      genero: 'Novela',
      precio: 0,
      portadaUrl: ''
    };
  }
}
