import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto.model';
import { ProductoCardComponent } from '../producto-card/producto-card.component';

@Component({
  selector: 'app-producto-lista',
  standalone: true,
  imports: [CommonModule, ProductoCardComponent],
  templateUrl: './producto-lista.component.html',
  styleUrl: './producto-lista.component.css'
})
export class ProductoListaComponent {
  @Input() productos: Producto[] = [];

  @Output() editar = new EventEmitter<Producto>();
  @Output() eliminar = new EventEmitter<number>();

  onEditar(producto: Producto): void {
    this.editar.emit(producto);
  }

  onEliminar(id: number): void {
    this.eliminar.emit(id);
  }
}
