import { Component, OnInit, inject } from '@angular/core';
import { Libro } from './models/libro.model';
import { LibroService } from './services/libro.service';
import { LibroListaComponent } from './components/libro-lista/libro-lista.component';
import { LibroFormComponent } from './components/libro-form/libro-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LibroListaComponent, LibroFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  // Inyección del servicio mediante inject()
  private libroService = inject(LibroService);

  // Datos de la aplicación
  libros: Libro[] = [];
  libroSeleccionado: Libro | null = null;

  // Estados de la interfaz
  cargando: boolean = false;
  errorMensaje: string | null = null;

  /**
   * Ciclo de vida: Carga la lista inicial de libros al arrancar la aplicación
   */
  ngOnInit(): void {
    this.cargarLibros();
  }

  /**
   * GET: Consume el servicio para obtener la lista de libros de la API REST
   */
  cargarLibros(): void {
    this.cargando = true;
    this.errorMensaje = null;

    this.libroService.getLibros().subscribe({
      next: (data) => {
        this.libros = data;
        this.cargando = false;
      },
      error: (err) => {
        this.errorMensaje = 'No se pudo conectar con la API REST de libros. Verifica tu conexión o el endpoint.';
        this.cargando = false;
        console.error('Error al cargar libros:', err);
      }
    });
  }

  /**
   * POST / PUT: Guarda un libro (crea nuevo o actualiza existente)
   */
  onGuardarLibro(libro: Libro): void {
    this.cargando = true;

    if (libro.id) {
      // Operación PUT (Actualización)
      this.libroService.actualizarLibro(libro.id, libro).subscribe({
        next: () => {
          this.libroSeleccionado = null;
          this.cargarLibros(); // Refresca automáticamente la lista tras actualizar
        },
        error: (err) => {
          alert('Error al actualizar el libro: ' + err.message);
          this.cargando = false;
        }
      });
    } else {
      // Operación POST (Creación)
      this.libroService.crearLibro(libro).subscribe({
        next: () => {
          this.cargarLibros(); // Refresca automáticamente la lista tras registrar
        },
        error: (err) => {
          alert('Error al registrar el libro: ' + err.message);
          this.cargando = false;
        }
      });
    }
  }

  /**
   * Selecciona un libro desde el listado y lo transfiere al formulario en modo edición
   */
  onSeleccionarParaEditar(libro: Libro): void {
    this.libroSeleccionado = { ...libro };
    // Scroll suave hacia el formulario para mejor experiencia de usuario
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * DELETE: Elimina un libro por su ID en la API REST y refresca la lista
   */
  onSolicitarEliminar(id: string): void {
    this.cargando = true;

    this.libroService.eliminarLibro(id).subscribe({
      next: () => {
        // Refresca la lista automáticamente para reflejar la eliminación
        this.cargarLibros();
      },
      error: (err) => {
        alert('Error al eliminar el libro: ' + err.message);
        this.cargando = false;
      }
    });
  }

  /**
   * Cancela el estado de edición del formulario
   */
  onCancelarEdicion(): void {
    this.libroSeleccionado = null;
  }
}
