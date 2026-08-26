import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductoListaComponent } from './components/producto-lista/producto-lista.component';
import { ProductoFormularioComponent } from './components/producto-formulario/producto-formulario.component';
import { Producto } from './models/producto.model';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, ProductoListaComponent, ProductoFormularioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sistema de Productos';

  productos: Producto[] = [
    {
      id: 1,
      nombre: 'Laptop Gamer',
      categoria: 'Tecnología',
      precio: 3499.99,
      stock: 5,
      descripcion: 'Laptop potente con tarjeta gráfica de última generación y procesador de alta gama.'
    },
    {
      id: 2,
      nombre: 'Teclado Mecánico',
      categoria: 'Accesorios',
      precio: 180.00,
      stock: 12,
      descripcion: 'Teclado mecánico retroiluminado RGB con interruptores silenciosos.'
    },
    {
      id: 3,
      nombre: 'Monitor 4K UHD',
      categoria: 'Tecnología',
      precio: 1200.00,
      stock: 0,
      descripcion: 'Monitor de 27 pulgadas con resolución 4K y panel IPS para colores vivos.'
    }
  ];

  productoSeleccionado: Producto | null = null;

  onEditar(producto: Producto): void {
    this.productoSeleccionado = { ...producto };
  }

  onEliminar(id: number): void {
    this.productos = this.productos.filter(p => p.id !== id);
    if (this.productoSeleccionado?.id === id) {
      this.productoSeleccionado = null;
    }
  }

  onGuardar(producto: Producto): void {
    if (producto.id) {
      // Editar
      this.productos = this.productos.map(p => p.id === producto.id ? producto : p);
    } else {
      // Crear nuevo
      const nuevoId = this.productos.length > 0 ? Math.max(...this.productos.map(p => p.id)) + 1 : 1;
      this.productos = [...this.productos, { ...producto, id: nuevoId }];
    }
    this.productoSeleccionado = null;
  }

  onCancelarForm(): void {
    this.productoSeleccionado = null;
  }
}
