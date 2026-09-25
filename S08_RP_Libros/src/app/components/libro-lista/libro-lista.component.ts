import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Libro } from '../../models/libro.model';

@Component({
  selector: 'app-libro-lista',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './libro-lista.component.html',
  styleUrl: './libro-lista.component.css'
})
export class LibroListaComponent {
  // Lista de libros enviada desde el componente padre
  @Input() libros: Libro[] = [];
  
  // Estado de carga y error recibido del padre
  @Input() cargando: boolean = false;
  @Input() errorMensaje: string | null = null;

  // Eventos emitidos hacia el componente padre
  @Output() seleccionarParaEditar = new EventEmitter<Libro>();
  @Output() solicitarEliminar = new EventEmitter<string>();

  // Estado del modal de confirmación de eliminación
  libroEnConfirmacion: Libro | null = null;

  /**
   * Captura la acción de editar un libro y notifica al padre asegurando el ID
   */
  onEditar(libro: Libro): void {
    const libroConId: Libro = {
      ...libro,
      id: libro.id || libro._id
    };
    this.seleccionarParaEditar.emit(libroConId);
  }

  /**
   * Abre el modal visual de confirmación antes de eliminar
   */
  abrirModalEliminar(libro: Libro): void {
    this.libroEnConfirmacion = libro;
  }

  /**
   * Cancela la eliminación y cierra el modal
   */
  cancelarEliminar(): void {
    this.libroEnConfirmacion = null;
  }

  /**
   * Confirma la eliminación y emite el ID al servicio
   */
  confirmarEliminar(): void {
    if (!this.libroEnConfirmacion) return;

    const idParaEliminar = this.libroEnConfirmacion.id || this.libroEnConfirmacion._id;

    if (!idParaEliminar) {
      alert('Error: No se pudo obtener el identificador (ID) del libro seleccionado.');
      this.libroEnConfirmacion = null;
      return;
    }

    this.solicitarEliminar.emit(idParaEliminar);
    this.libroEnConfirmacion = null;
  }
}
