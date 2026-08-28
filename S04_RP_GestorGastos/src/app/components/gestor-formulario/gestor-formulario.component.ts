import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Gasto } from '../../models/gasto.model';

@Component({
  selector: 'app-gestor-formulario',
  imports: [FormsModule],
  templateUrl: './gestor-formulario.component.html',
  styleUrl: './gestor-formulario.component.css'
})
export class GestorFormularioComponent {
  @Output() gastoAgregado = new EventEmitter<Omit<Gasto, 'id'>>();

  // Variables enlazadas con [(ngModel)]
  descripcion: string = '';
  monto: number | null = null;
  categoria: string = '';
  fecha: string = '';

  // Categorías disponibles
  categorias: string[] = ['Alimentación', 'Transporte', 'Entretenimiento', 'Otros'];

  // Property binding: validación para [disabled]
  get formularioValido(): boolean {
    return (
      this.descripcion.trim() !== '' &&
      this.monto !== null &&
      this.monto > 0 &&
      this.categoria !== '' &&
      this.fecha !== ''
    );
  }

  // Event binding: (click)
  registrarGasto(): void {
    if (!this.formularioValido) return;

    this.gastoAgregado.emit({
      descripcion: this.descripcion.trim(),
      monto: this.monto!,
      categoria: this.categoria as Gasto['categoria'],
      fecha: this.fecha
    });

    // Limpiar formulario
    this.descripcion = '';
    this.monto = null;
    this.categoria = '';
    this.fecha = '';
  }
}
