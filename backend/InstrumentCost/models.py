from django.db import models

# Create your models here.
class InstrumentCost(models.Model):
    instrument = models.CharField(max_length=30)
    LCOE_instrument_cost = models.DecimalField(max_digits=8, decimal_places=2)