from datetime import date, timedelta

from rest_framework import status
from rest_framework.test import APITestCase

from .models import Movimiento


class MovimientoListApiTests(APITestCase):
	def setUp(self):
		self.url = '/api/v1/cooperadora/movimientos/'
		self.movimientos = [
			Movimiento.objects.create(
				fecha=date(2025, 9, 1) + timedelta(days=index % 3),
				tipo=Movimiento.INGRESO if index % 2 == 0 else Movimiento.EGRESO,
				monto=100 + index,
				origen=f'Origen {index}',
				destino=f'Destino {index}',
				descripcion=f'Movimiento {index}',
			)
			for index in range(12)
		]

	def test_returns_the_ten_most_recently_entered_movements(self):
		response = self.client.get(self.url)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(
			[item['id'] for item in response.data],
			[movement.id for movement in reversed(self.movimientos[-10:])],
		)

	def test_filters_by_type_and_date_before_applying_limit(self):
		expected = [
			movement.id
			for movement in reversed(self.movimientos)
			if movement.tipo == Movimiento.INGRESO and movement.fecha == date(2025, 9, 1)
		]

		response = self.client.get(
			self.url,
			{'tipo': Movimiento.INGRESO, 'fecha': '2025-09-01'},
		)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual([item['id'] for item in response.data], expected)

	def test_rejects_invalid_filters(self):
		invalid_type = self.client.get(self.url, {'tipo': 'Otro'})
		invalid_date = self.client.get(self.url, {'fecha': 'ayer'})

		self.assertEqual(invalid_type.status_code, status.HTTP_400_BAD_REQUEST)
		self.assertEqual(invalid_date.status_code, status.HTTP_400_BAD_REQUEST)
