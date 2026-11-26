from django.core.management.base import BaseCommand

from gestion_donar_713.models import Informacion, TipoInformacion

TIPO_REQUISITOS = "Requisitos para donar"
TIPO_PREGUNTAS = "Preguntas frecuentes"

REQUISITOS = [
	("Edad", "Entre 18 y 65 años"),
	("Peso", "Mínimo 50 kg"),
	("Salud", "Buen estado de salud general"),
	("Identificación", "Documento de identidad vigente"),
	("Descanso", "Haber dormido al menos 6 horas"),
	("Alimentación", "Haber comido en las últimas 4 horas"),
]

PREGUNTAS = [
	(
		"¿Quién puede donar sangre?",
		"Puede donar toda persona de entre 18 y 65 años, que pese al menos 50 kg, tenga buen estado de salud general y cuente con su documento de identidad.",
	),
	(
		"¿Cada cuánto tiempo puedo donar?",
		"Entre una donación y la siguiente debe pasar un tiempo mínimo para que tu cuerpo se recupere. El equipo médico te indica cuándo podés volver a donar.",
	),
	(
		"¿Duele donar sangre?",
		"Solo sentís un pinchazo breve al colocar la aguja. Durante la extracción no deberías sentir dolor.",
	),
	(
		"¿Cuánto tiempo toma la donación?",
		"La extracción dura alrededor de 10 minutos. Con la entrevista médica y el descanso posterior, la visita completa suele llevar cerca de una hora.",
	),
	(
		"¿Qué debo hacer antes de donar?",
		"Dormí al menos 6 horas, comé algo liviano en las 4 horas previas, tomá agua y llevá tu documento de identidad.",
	),
]


class Command(BaseCommand):
	help = "Carga los requisitos y las preguntas frecuentes iniciales si todavía no hay información cargada."

	def handle(self, *args, **options):
		if Informacion.objects.exists():
			self.stdout.write("Ya hay información cargada. No se agregó nada.")
			return

		TipoInformacion.objects.get_or_create(nombre=TIPO_REQUISITOS, defaults={"orden": 0})
		TipoInformacion.objects.get_or_create(nombre=TIPO_PREGUNTAS, defaults={"orden": 1})

		for orden, (titulo, descripcion) in enumerate(REQUISITOS, start=1):
			Informacion.objects.create(
				tipo=TIPO_REQUISITOS,
				titulo=titulo,
				descripcion=descripcion,
				orden=orden,
			)

		for orden, (titulo, descripcion) in enumerate(PREGUNTAS, start=1):
			Informacion.objects.create(
				tipo=TIPO_PREGUNTAS,
				titulo=titulo,
				descripcion=descripcion,
				orden=orden,
			)

		self.stdout.write(self.style.SUCCESS("Información inicial cargada."))
