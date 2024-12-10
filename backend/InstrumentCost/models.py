from django.db import models

# Create your models here.
class InstrumentCost(models.Model):
    instrument = models.CharField(max_length=30)
    discount_rate = models.IntegerField()
    capex = models.IntegerField()
    capacity_factor = models.IntegerField()
    economic_life_year = models.IntegerField()
    fixed_om_cost = models.DecimalField(max_digits=4, decimal_places=2)
    fuel_price = models.DecimalField(max_digits=4, decimal_places=2)
    variable_om_cost = models.DecimalField(max_digits=4, decimal_places=2)
    LCOE_instrument_cost = models.DecimalField(max_digits=8, decimal_places=2)