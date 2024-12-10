from django.db import models

# Create your models here.
class SiteInformation(models.Model):
    total_site_consumption_grid_supply = models.DecimalField(max_digits=10, decimal_places=2)
    total_site_consumption_natural_gas = models.DecimalField(max_digits=10, decimal_places=2)
    total_onsite_solar_system_production = models.DecimalField(max_digits=10, decimal_places=2)
    total_grid_price = models.DecimalField(max_digits=6, decimal_places=2)
    total_ng_price = models.DecimalField(max_digits=6, decimal_places=2)