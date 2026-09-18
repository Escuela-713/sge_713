export type Fecha = `${number}/${number}`;

export interface Carrera {
  id_carrera: number;
  nombre: string;
}

export interface Materia {
  id_materia: number;
  nombre: string;
}

type Id = number;

type Ano = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface Mesa {
  id: Id;
  fecha: Fecha;
  hora: string;
  ano: Ano;
  modalidad: Carrera;
  materia: Materia;
  profesorTitular: string;
  profesorPrimerVocal: string;
  profesorSegundoVocal: string;
}
