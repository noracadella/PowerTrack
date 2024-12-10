from django.db import models

# Create your models here.
class HourlyData(models.Model):
    site_consumption_grid_supply = models.DecimalField(max_digits=10, decimal_places=2)
    site_consumption_natural_gas = models.DecimalField(max_digits=10, decimal_places=2)
    onsite_solar_system_production = models.DecimalField(max_digits=10, decimal_places=2)
    grid_price = models.DecimalField(max_digits=6, decimal_places=2)
    ng_price = models.DecimalField(max_digits=6, decimal_places=2)