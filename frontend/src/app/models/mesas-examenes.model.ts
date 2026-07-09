export type Fecha = `${string}/${string}`;

export type Carrera = 'Humanidades' | 'ETP' | 'ESB' | 'Comunicaciones';

export type Materia = 'Matemática' | 'Desarrollo I' | 'Lengua';

type Tribunal = {
  profesorTitular: string;
  profesorPrimerVocal: string;
  profesorSegundoVocal: string;
};

type Id = number;

type Ano = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface Mesa {
  id: Id;
  fecha: Fecha;
  hora: string;
  ano: Ano;
  modalidad: Carrera;
  materia: Materia;
  tribunal: Tribunal;
}
