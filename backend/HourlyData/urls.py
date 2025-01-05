from django.urls import path
from .views import HourlyData, HourlyDataListView, MonthlySolarProductionView, YearlySolarProductionView, \
    DailySolarProductionView, MonthlyConsumptionView, MonthlyConsumptionPercentageView, \
    MonthlyConsumptionPriceView, YearlyConsumptionView, HourlyConsumptionView, HourlyConsumptionPriceView, \
    YearlyConsumptionPriceView

urlpatterns = [
    path('', HourlyData),
    path('list', HourlyDataListView.as_view(), name='hourly-data-list'),
    path("solarProduction/month/<int:month>/", MonthlySolarProductionView.as_view(), name='monthly-solar-production'),
    path('solarProduction/yearly/', YearlySolarProductionView.as_view(), name='yearly-solar-production'),
    path('solarProduction/day/<int:month>/<int:day>/', DailySolarProductionView.as_view(), name='daily-solar-production'),
    path('consumption/month/<int:month>/', MonthlyConsumptionView.as_view(), name='monthly-consumption'),
    path('consumption/yearly/', YearlyConsumptionView.as_view(), name='yearly-consumption'),
    path('consumption/day/<int:month>/<int:day>/', HourlyConsumptionView.as_view(), name='daily-consumption'),
    path('consumption/percentatge/month/<int:month>/', MonthlyConsumptionPercentageView.as_view(), name='monthly-consumption-percentage'),
    path('consumption/price/month/<int:month>/', MonthlyConsumptionPriceView.as_view(), name='monthly-consumption-price'),
    path('consumption/price/day/<int:month>/<int:day>/', HourlyConsumptionPriceView.as_view(), name='hourly-consumption-price'),
    path('consumption/price/yearly/', YearlyConsumptionPriceView.as_view(), name='yearly-consumption-price'),


]