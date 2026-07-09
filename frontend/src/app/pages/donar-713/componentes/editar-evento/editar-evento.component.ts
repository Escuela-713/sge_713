import { Component } from '@angular/core';

@Component({
  selector: 'app-editar-evento',
  standalone: true,
  imports: [], 
  templateUrl: './editar-evento.component.html',
  styleUrl: './editar-evento.component.css',
})
export class EditarEventoComponent {
  
  formularioVisible = false;


  misNoticias = [
    { titulo: 'Exitosa Jornada de Donación', fecha: '2024-03-15' },
    { titulo: 'Alianza con Hospital Regional', fecha: '2024-03-10' },
    { titulo: 'Reconocimiento a Voluntarios', fecha: '2024-03-05' }
  ];

  abrirFormulario() {
    this.formularioVisible = true;
  }

  cerrarFormulario() {
    this.formularioVisible = false;
  }
}