import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Ventas / Tienda';
  searchTerm = '';

  productos = [
    {
      nombre: 'Camiseta',
      precio: 19.99,
      stock: 10,
      estado: 'Disponible'
    },
    {
      nombre: 'Mochila',
      precio: 49.5,
      stock: 5,
      estado: 'Disponible'
    },
    {
      nombre: 'Zapatos',
      precio: 79.99,
      stock: 0,
      estado: 'Agotado'
    }
  ];

  card = {
    title: 'Ventas / Tienda',
    description: 'Gestión de productos, carrito de compras y stock.',
    // SVG string can be used in the template with [innerHTML]
    iconSvg: `
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M7 4h-2l-1 2h2l1-2zm0 0" fill="currentColor" />
        <path d="M7 6h13l-1.2 6.3a2 2 0 0 1-1.98 1.7H9.5" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="10" cy="20" r="1.5" fill="currentColor"/>
        <circle cx="18" cy="20" r="1.5" fill="currentColor"/>
      </svg>
    `
  };
}
