from django.urls import path
from .views import HourlyData, HourlyDataListView, MonthlySolarProductionView, YearlySolarProductionView, \
    DailySolarProductionView

urlpatterns = [
    path('', HourlyData),
    path('list', HourlyDataListView.as_view(), name='hourly-data-list'),
    path("solarProduction/month/<int:month>/", MonthlySolarProductionView.as_view(), name='monthly-solar-production'),
    path('solarProduction/year/', YearlySolarProductionView.as_view(), name='yearly-solar-production'),
    path('solarProduction/day/<int:month>/<int:day>/', DailySolarProductionView.as_view(), name='daily-solar-production'),
]