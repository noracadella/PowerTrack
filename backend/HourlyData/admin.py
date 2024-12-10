from django.contrib import admin
import data_wizard
from .models import HourlyData

# Register your models here.
admin.site.register(HourlyData)
data_wizard.register(HourlyData)