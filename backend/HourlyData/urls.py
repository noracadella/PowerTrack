from django.urls import path
from .views import HourlyData, HourlyDataListView, MonthlySolarProductionView, YearlySolarProductionView, \
    DailySolarProductionView, MonthlyConsumptionView, MonthlyConsumptionPercentageView,MonthlyConsumptionAndProduction, \
    MonthlyConsumptionPriceView

urlpatterns = [
    path('', HourlyData),
    path('list', HourlyDataListView.as_view(), name='hourly-data-list'),
    path("solarProduction/month/<int:month>/", MonthlySolarProductionView.as_view(), name='monthly-solar-production'),
    path('solarProduction/year/', YearlySolarProductionView.as_view(), name='yearly-solar-production'),
    path('solarProduction/day/<int:month>/<int:day>/', DailySolarProductionView.as_view(), name='daily-solar-production'),
    path('consumption/month/<int:month>/', MonthlyConsumptionView.as_view(), name='daily-consumption'),
    path('consumption/percentatge/month/<int:month>/', MonthlyConsumptionPercentageView.as_view(), name='daily-pie-consumption'),
    path('consVsProd/month/<int:month>/', MonthlyConsumptionAndProduction.as_view(), name='daily-pie-consumption'),
    path('consumption/price/month/<int:month>/', MonthlyConsumptionPriceView.as_view(), name='daily-price-consumption'),


]