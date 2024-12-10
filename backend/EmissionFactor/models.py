from django.db import models

# Create your models here.
class EmissionFactor(models.Model):
    instrument = models.CharField(max_length=30)
    carbon_intensity = models.IntegerField()
    unit = models.CharField(max_length=30)
    country = models.CharField(max_length=30)