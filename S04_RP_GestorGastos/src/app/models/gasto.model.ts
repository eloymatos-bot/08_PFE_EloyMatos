export interface Gasto {
  id: number;
  descripcion: string;
  monto: number;
  categoria: 'Alimentación' | 'Transporte' | 'Entretenimiento' | 'Otros';
  fecha: string;
}
