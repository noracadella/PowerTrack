from django.urls import path
from .views import EmissionFactor, MonthlyEmissionView, HourlyEmissionView, YearlyEmissionView, \
    EmissionsList

urlpatterns = [
    path('', EmissionFactor),
    path('list/', EmissionsList.as_view(), name='emissionsList'),
    path('consumption/grid/month/<int:month>/', MonthlyEmissionView.as_view(), name='monthly-emission'),
    path('consumption/grid/day/<int:month>/<int:day>/', HourlyEmissionView.as_view(), name='hourly-emission'),
    path('consumption/grid/yearly/', YearlyEmissionView.as_view(), name='monthly-emission'),
]