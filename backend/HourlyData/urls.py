from django.urls import path
from .views import HourlyData

urlpatterns = [
    path('', HourlyData),
]