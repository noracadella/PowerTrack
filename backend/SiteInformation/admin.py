from django.contrib import admin
import data_wizard
from .models import SiteInformation

# Register your models here.
admin.site.register(SiteInformation)
data_wizard.register(SiteInformation)