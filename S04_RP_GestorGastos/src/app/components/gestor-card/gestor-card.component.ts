import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Gasto } from '../../models/gasto.model';

@Component({
  selector: 'app-gestor-card',
  imports: [],
  templateUrl: './gestor-card.component.html',
  styleUrl: './gestor-card.component.css'
})
export class GestorCardComponent {
  @Input() gasto!: Gasto;
  @Output() gastoEliminado = new EventEmitter<number>();

  // Lógica condicional para clase dinámica
  get esGastoElevado(): boolean {
    return this.gasto.monto > 100;
  }

  onEliminar(): void {
    this.gastoEliminado.emit(this.gasto.id);
  }
}
