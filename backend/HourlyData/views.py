from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from django.db.models import Sum

from HourlyData.serializers import HourlyDataSerializer

from HourlyData.models import HourlyData
# Create your views here.
"""def HourlyData(request):
    return render(request, "HourlyDataView.html")"""

class HourlyDataListView(ListAPIView):
    queryset = HourlyData.objects.all()
    serializer_class=HourlyDataSerializer

class MonthlySolarProductionView(ListAPIView):
    def get(self,request,month):
        data=(
            HourlyData.objects.filter(month=month)
            .values('day')
            .annotate(total_solar_production=Sum('onsite_solar_system_production'))
        )

        response_data = {
            "month": month,
            "daily_totals": list(data)
        }

        return Response(response_data)

class YearlySolarProductionView(ListAPIView):
    def get(self,request):
        data=(
            HourlyData.objects.values('month')
            .annotate(total_solar_production=Sum('onsite_solar_system_production'))
            .order_by('month')
        )

        response_data = {

            "yearly_totals": list(data)
        }

        return Response(response_data)

class DailySolarProductionView(ListAPIView):
    def get(self,request,month,day):
        data = (
            HourlyData.objects.filter(month=month, day=day)
            .values('hour')  # Agrupar por la hora
            .annotate(
                total_solar_production=Sum('onsite_solar_system_production'))  # Sumar la producción solar por hora
            .order_by('hour')  # Ordenar por hora
        )

        # Construir la respuesta
        response_data = {
            "date": f"{month:02d}-{day:02d}",
            "hourly_totals": list(data)
        }
        return Response(response_data)

class MonthlyConsumptionView(ListAPIView):
    def get(self, request, month):
        # Filtrar los datos para el mes especificado
        data = (
            HourlyData.objects.filter(month=month)
            .values('day')  # Agrupar por día
            .annotate(
                total_grid_supply=Sum('site_consumption_grid_supply'),
                total_natural_gas=Sum('site_consumption_natural_gas')
            )
            .order_by('day')  # Ordenar por día
        )

        # Construir la respuesta
        response_data = {
            "month": month,
            "daily_consumption": list(data)
        }

        return Response(response_data)

from django.db.models import Sum, F
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import HourlyData

class MonthlyConsumptionPriceView(ListAPIView):
    def get(self, request, month):
        # Filtrar los datos del mes específico
        data = HourlyData.objects.filter(month=month)

        # Calcular el consumo mensual multiplicando por los precios correspondientes
        monthly_consumption = data.annotate(
            grid_cost=F('site_consumption_grid_supply') * F('grid_price'),
            gas_cost=F('site_consumption_natural_gas') * F('ng_price')
        ).values('day').annotate(
            total_grid_cost=Sum('grid_cost'),
            total_gas_cost=Sum('gas_cost')
        )

        # Formatear los datos de la respuesta
        response_data = {
            "month": month,
            "daily_costs": list(monthly_consumption)
        }

        return Response(response_data)


class MonthlyConsumptionPercentageView(ListAPIView):
    def get(self, request, month):
        # Sumar los consumos de Grid y Gas para el mes especificado
        data = HourlyData.objects.filter(month=month).aggregate(
            total_grid=Sum('site_consumption_grid_supply'),
            total_gas=Sum('site_consumption_natural_gas')
        )

        total_grid = data['total_grid'] or 0
        total_gas = data['total_gas'] or 0
        total_consumption = total_grid + total_gas

        if total_consumption > 0:
            percentage_grid = (total_grid / total_consumption) * 100
            percentage_gas = (total_gas / total_consumption) * 100
        else:
            percentage_grid = percentage_gas = 0

        response_data = {
            "month": month,
            "total_grid_percentage": percentage_grid,
            "total_gas_percentage": percentage_gas
        }

        return Response(response_data)

class MonthlyConsumptionAndProduction(ListAPIView):
    def get(self, request, month):
        # Obtener la suma de grid y gas por día, con la producción solar
        data = (
            HourlyData.objects.filter(month=month)
            .values('day')
            .annotate(
                consumption=Sum('site_consumption_grid_supply') + Sum('site_consumption_natural_gas'),  # Suma de consumo
                solar_production=Sum('onsite_solar_system_production')
            )
            .order_by('day')  # Ordenar por día
        )

        response_data = {
            "month": month,
            "daily_data": list(data)
        }

        return Response(response_data)