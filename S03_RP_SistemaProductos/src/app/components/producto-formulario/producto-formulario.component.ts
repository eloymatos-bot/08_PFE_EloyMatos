import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-producto-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './producto-formulario.component.html',
  styleUrl: './producto-formulario.component.css'
})
export class ProductoFormularioComponent implements OnChanges {
  @Input() productoAEditar: Producto | null = null;

  @Output() guardar = new EventEmitter<Producto>();
  @Output() cancelar = new EventEmitter<void>();

  model: Omit<Producto, 'id'> & { id?: number } = {
    nombre: '',
    categoria: '',
    precio: 0,
    stock: 0,
    descripcion: ''
  };

  categorias = ['Tecnología', 'Accesorios', 'Hogar', 'Moda', 'Otros'];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productoAEditar'] && this.productoAEditar) {
      this.model = { ...this.productoAEditar };
    } else if (changes['productoAEditar'] && !this.productoAEditar) {
      this.resetForm();
    }
  }

  onSubmit(): void {
    if (this.model.nombre && this.model.categoria) {
      this.guardar.emit(this.model as Producto);
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
      categoria: '',
      precio: 0,
      stock: 0,
      descripcion: ''
    };
  }
}
