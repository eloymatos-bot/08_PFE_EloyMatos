import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Libro } from '../models/libro.model';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  // Inyección moderna de HttpClient usando inject() (Angular 14+)
  private http = inject(HttpClient);

  // URL Base del Endpoint de la API REST Pública y Real (CrudCrud / MockAPI)
  private apiUrl = 'https://crudcrud.com/api/9d658dafe30b46f498689175c262fe8c/libros';

  /**
   * GET /libros
   * Obtiene la lista completa de libros desde el servidor remoto.
   * Normaliza la propiedad `_id` a `id` para transparencia en Angular.
   */
  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl).pipe(
      map(libros => libros.map(libro => ({
        ...libro,
        id: libro.id || libro._id
      }))),
      catchError(this.manejarError)
    );
  }

  /**
   * GET /libros/:id
   * Obtiene la información detallada de un libro por su ID.
   */
  getLibroPorId(id: string): Observable<Libro> {
    return this.http.get<Libro>(`${this.apiUrl}/${id}`).pipe(
      map(libro => ({ ...libro, id: libro.id || libro._id })),
      catchError(this.manejarError)
    );
  }

  /**
   * POST /libros
   * Envía un objeto Libro a la API para registrarlo en la base de datos remota.
   */
  crearLibro(libro: Libro): Observable<Libro> {
    // Limpiamos los identificadores si existen antes de enviar el cuerpo
    const { id, _id, ...payload } = libro;
    return this.http.post<Libro>(this.apiUrl, payload).pipe(
      map(nuevoLibro => ({ ...nuevoLibro, id: nuevoLibro.id || nuevoLibro._id })),
      catchError(this.manejarError)
    );
  }

  /**
   * PUT /libros/:id
   * Actualiza los datos de un libro existente en la API por su ID.
   */
  actualizarLibro(id: string, libro: Libro): Observable<Libro> {
    // CrudCrud / MongoDB requiere enviar el payload sin la propiedad `_id` / `id` en el body del PUT
    const { id: _, _id: __, ...payload } = libro;
    return this.http.put<Libro>(`${this.apiUrl}/${id}`, payload).pipe(
      catchError(this.manejarError)
    );
  }

  /**
   * DELETE /libros/:id
   * Elimina un libro de la base de datos de la API mediante su ID.
   */
  eliminarLibro(id: string): Observable<Libro> {
    return this.http.delete<Libro>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.manejarError)
    );
  }

  /**
   * Manejador centralizado de errores de peticiones HTTP
   */
  private manejarError(error: HttpErrorResponse): Observable<never> {
    let mensajeError = 'Ocurrió un error inesperado en la comunicación con la API.';

    if (error.error instanceof ErrorEvent) {
      mensajeError = `Error del cliente: ${error.error.message}`;
    } else {
      mensajeError = `Código de error HTTP ${error.status}: ${error.message}`;
    }

    console.error('LibroService Error:', mensajeError);
    return throwError(() => new Error(mensajeError));
  }
}
