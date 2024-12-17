from django.db import models


# Create your models here.
class HourlyData(models.Model):
    month = models.IntegerField()
    day = models.IntegerField()
    hour = models.IntegerField()
    site_consumption_grid_supply = models.FloatField()
    site_consumption_natural_gas = models.FloatField()
    onsite_solar_system_production = models.FloatField()
    grid_price = models.FloatField()
    ng_price = models.FloatField()




