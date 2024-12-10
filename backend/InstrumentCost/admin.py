from django.contrib import admin
import data_wizard
from .models import InstrumentCost

# Register your models here.
admin.site.register(InstrumentCost)
data_wizard.register(InstrumentCost)