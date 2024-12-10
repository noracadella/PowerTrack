from django.urls import path
from .views import InstrumentCost

urlpatterns = [
    path('', InstrumentCost),
]