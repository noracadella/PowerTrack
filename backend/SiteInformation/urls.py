from django.urls import path
from .views import SiteInformation

urlpatterns = [
    path('', SiteInformation),
]