export interface Libro {
  id?: string;               // ID unificado para el cliente Angular
  _id?: string;              // ID asignado por servidores MongoDB / CrudCrud / MockAPI
  titulo: string;            // Título del libro
  autor: string;             // Autor del libro
  anioPublicacion: number;   // Año de publicación
  genero: string;            // Género o categoría
  precio: number;            // Precio en moneda local
  portadaUrl: string;        // Enlace a la imagen de portada
}
