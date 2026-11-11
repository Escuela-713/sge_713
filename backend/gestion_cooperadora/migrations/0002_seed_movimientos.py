from django.db import migrations


def cargar_movimientos_iniciales(apps, schema_editor):
    Movimiento = apps.get_model('gestion_cooperadora', 'Movimiento')
    if Movimiento.objects.exists():
        return

    Movimiento.objects.bulk_create([
        Movimiento(fecha='2025-09-03', tipo='Ingreso', monto='2.00', origen='Cuota familiar', destino='Sanguchitos de miga', descripcion='Pagado por familia Pérez '),
        Movimiento(fecha='2025-09-04', tipo='Egreso', monto='3200.00', origen='Venta de números', destino='Compra útiles escolares', descripcion='Se compraron cuadernos y lápices'),
        Movimiento(fecha='2025-09-05', tipo='Ingreso', monto='1500.00', origen='Donación', destino='Sanguchitos de miga', descripcion='Donación anónima'),
        Movimiento(fecha='2025-09-06', tipo='Egreso', monto='2000.00', origen='Venta de números', destino='Pago a proveedores', descripcion='Pago a Proveedor X'),
    ])


class Migration(migrations.Migration):

    dependencies = [
        ('gestion_cooperadora', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(cargar_movimientos_iniciales, migrations.RunPython.noop),
    ]