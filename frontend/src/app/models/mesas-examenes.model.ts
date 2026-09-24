export type Dia = `${number}:${number}`

export interface Carrera {
  id_carrera: number
  nombre: string
}

export interface Materia {
  id_materia: number
  nombre: string
}

type Id = number

type Ano = 1 | 2 | 3 | 4 | 5 | 6 | 7

export interface Mesa {
  id: Id
  dia: Dia
  hora: string
  ano: Ano
  carrera: Pick<Carrera, 'nombre'>
  materia: Pick<Materia, 'nombre'>
  profesor_titular: string
  profesor_primer_vocal: string
  profesor_segundo_vocal: string
}
