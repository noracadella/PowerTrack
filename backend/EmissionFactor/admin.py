from django.contrib import admin
import data_wizard
from .models import EmissionFactor

# Register your models here.
admin.site.register(EmissionFactor)
data_wizard.register(EmissionFactor)