from django.db import models

class Categories(models.Model):
	id = models.IntegerField(primary_key=True)
	title = models.TextField(blank=False,  null = False, max_length=50)
	class Meta:
		managed = True
		db_table = 'gestion_home_categories'

class Publication(models.Model):
	id = models.IntegerField(primary_key=True)
	title = models.TextField(blank=False,  null = False, max_length=50)
	content = models.TextField(blank=False, null=False, max_length=150)
	image = models.ImageField(blank=False, null=False)
	categoria = models.ForeignKey(           
        Categories,
        on_delete=models.CASCADE,
        related_name='publications'
    )

	is_published = models.BooleanField(default=True)
	upload_date = models.DateField(auto_now_add=True)
	update_date = models.DateField(auto_now_add=True)
	class Meta:
		managed = True
		db_table = 'gestion_home_publication'
		

class Carrousel(models.Model):
	id = models.IntegerField(primary_key=True)
	image = models.ImageField(blank=False, null=False)
	title = models.TextField(blank=False,  null = False, max_length=50)
	subtitle = models.TextField(blank=False, null=False, max_length=50)
	class Meta:
		managed = True
		db_table = 'gestion_home_carrousel'


