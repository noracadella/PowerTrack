from django.urls import path
from .views import EmissionFactor, MonthlyEmissionView

urlpatterns = [
    path('', EmissionFactor),
    path('consumption/grid/month/<int:month>/', MonthlyEmissionView.as_view(), name='monthly-emission'),
]