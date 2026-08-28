import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GestorFormularioComponent } from './components/gestor-formulario/gestor-formulario.component';
import { GestorCardComponent } from './components/gestor-card/gestor-card.component';
import { Gasto } from './models/gasto.model';

@Component({
  selector: 'app-root',
  imports: [FormsModule, NavbarComponent, GestorFormularioComponent, GestorCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Gestor de Gastos';

  // Almacenamiento en memoria
  gastos: Gasto[] = [];
  private contadorId: number = 1;

  agregarGasto(gastoSinId: Omit<Gasto, 'id'>): void {
    const nuevoGasto: Gasto = {
      id: this.contadorId++,
      ...gastoSinId
    };
    this.gastos.push(nuevoGasto);
  }

  eliminarGasto(id: number): void {
    this.gastos = this.gastos.filter(g => g.id !== id);
  }
}
