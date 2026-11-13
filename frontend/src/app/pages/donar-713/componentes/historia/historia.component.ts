import { Component, OnInit } from '@angular/core';

interface Hito {
  etapa: string;
  titulo: string;
  texto: string;
}

@Component({
  selector: 'app-historia',
  imports: [],
  templateUrl: './historia.component.html',
  styleUrl: './historia.component.css',
})
export class HistoriaComponent implements OnInit {
  // Al entrar a la página siempre se empieza desde arriba.
  ngOnInit(): void {
    window.scrollTo({ top: 0 });
  }

  // TEXTOS A COMPLETAR: están escritos de forma general. Reemplazalos por la
  // historia real del proyecto (se pueden agregar o quitar hitos, y poner el
  // año en "etapa").
  introduccion =
    'Donar 713 es un proyecto escolar dedicado a promover la donación de sangre y a crear conciencia ' +
    'sobre la importancia de ayudar a quienes más lo necesitan. Nació de la iniciativa de estudiantes ' +
    'que quisieron transformar su escuela en un espacio de solidaridad.';

  hitos: Hito[] = [
    {
      etapa: 'El comienzo',
      titulo: 'Una idea entre estudiantes',
      texto: 'Todo empezó con la pregunta de cómo podíamos aportar a nuestra comunidad. La respuesta fue organizar una campaña de donación de sangre desde la escuela.',
    },
    {
      etapa: 'Primeras campañas',
      titulo: 'De la idea a la acción',
      texto: 'Con el apoyo de docentes y compañeros se realizaron las primeras jornadas de concientización y donación.',
    },
    {
      etapa: 'Crecimiento',
      titulo: 'Más gente, más alcance',
      texto: 'Se sumaron voluntarios, familias e instituciones, y el proyecto empezó a convocar a toda la comunidad.',
    },
    {
      etapa: 'Hoy',
      titulo: 'Seguimos donando',
      texto: 'Hoy Donar 713 continúa organizando eventos y compartiendo noticias para que cada vez más personas se animen a donar.',
    },
  ];
}
