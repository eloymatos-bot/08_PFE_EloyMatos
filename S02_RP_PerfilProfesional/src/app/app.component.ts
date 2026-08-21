import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  nombre = 'Eloy Matos';
  profesion = 'Analista de Sistemas';
  descripcion = 'Soy estudiante de Análisis de Sistemas interesado en el desarrollo de aplicaciones web y en la creación de soluciones tecnológicas.';
  correo = 'eloy.matos@vallegrande.edu.pe';
  ubicacion = 'Lima, Perú';
  habilidades = ['Angular', 'Java', 'SQL', 'HTML', 'CSS', 'git'];

  proyectos = [
    {
      nombre: 'Sistema de ventas',
      descripcion: 'Sistema de ventas desarrollado con Angular y Java para la gestión de productos y clientes.'
    },
    {
      nombre: 'Aplicación de tareas',
      descripcion: 'Aplicación de tareas desarrollada con Angular y Java para la gestión de tareas y recordatorios.'
    },
    {
      nombre: 'Sitio web personal',
      descripcion: 'Sitio web personal desarrollado con Angular y HTML/CSS para mostrar mi portafolio y proyectos.'
    }
  ];
}
