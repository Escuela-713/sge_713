export type Fecha = `${string}/${string}`;

type Modalidad = 'Humanidades' | 'ETP' | 'ESB' | 'Comunicaciones';

type Materia = 'Matemática' | 'Desarrollo I' | 'Lengua';

type Tribunal = {
  profesorTitular: string;
  profesorPrimerVocal: string;
  profesorSegundoVocal: string;
};

type Turno = 'Mañana' | 'Tarde' | 'Noche'; // TODO: Normalizar en todos lados "Noche" por "Vespertino"

type Id = number;

type Ano = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface Mesa {
  id: Id;
  fechaInicio: Fecha;
  fechaFin: Fecha;
  hora: string;
  ano: Ano;
  modalidad: Modalidad;
  materia: Materia;
  turno: Turno;
  tribunal: Tribunal;
}
