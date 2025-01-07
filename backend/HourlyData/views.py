from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from django.db.models import Sum, F
from decimal import Decimal, ROUND_HALF_UP

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
            "day": day,
            "month": month,
            "hourly_consumption": list(data)
        }
        return Response(response_data)

class HourlyConsumptionView(ListAPIView):
    def get(self, request, month, day):
        # Filtrar los datos para el día, mes y año especificados
        data = (
            HourlyData.objects.filter(day=day, month=month)
            .values('hour')  # Agrupar por hora
            .annotate(
                grid_supply=Sum('site_consumption_grid_supply'),
                solar_supply=Sum('onsite_solar_system_production')
            )
            .order_by('hour')  # Ordenar por hora
        )

        # Construir la respuesta
        response_data = {
            "day": day,
            "month": month,
            "hourly_consumption": list(data)
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
                total_solar=Sum('onsite_solar_system_production')
            )
            .order_by('day')  # Ordenar por día
        )

        # Construir la respuesta
        response_data = {
            "month": month,
            "daily_consumption": list(data)
        }

        return Response(response_data)

class YearlyConsumptionView(ListAPIView):
    def get(self, request):
        # Filtrar los datos para el año especificado
        data = (
            HourlyData.objects.filter()
            .values('month')  # Agrupar por mes
            .annotate(
                total_grid_supply=Sum('site_consumption_grid_supply'),
                total_solar=Sum('onsite_solar_system_production')
            )
            .order_by('month')  # Ordenar por mes
        )

        # Construir la respuesta
        response_data = {
            "monthly_consumption": list(data)
        }

        return Response(response_data)



class MonthlyConsumptionPriceView(ListAPIView):
    def get(self, request, month):
        # Filtrar los datos del mes específico
        data = HourlyData.objects.filter(month=month)

        # Calcular el consumo mensual multiplicando por los precios correspondientes, ajustando la unidad de grid_price
        monthly_consumption = data.annotate(
            grid_cost=F('site_consumption_grid_supply') * (F('grid_price') / 1000),  # Convertir €/MWh a €/kWh
        ).values('day').annotate(
            total_grid_cost=Sum('grid_cost'),
        )

        for entry in monthly_consumption:
            entry['total_grid_cost'] = Decimal(entry['total_grid_cost']).quantize(Decimal('0.01'),
                                                                                  rounding=ROUND_HALF_UP)

        # Formatear los datos de la respuesta
        response_data = {
            "month": month,
            "daily_costs": list(monthly_consumption)
        }

        return Response(response_data)

class YearlyConsumptionPriceView(ListAPIView):
    def get(self, request):
        # Filtrar los datos del año específico
        data = HourlyData.objects.filter()

        # Calcular el consumo anual multiplicando por los precios correspondientes
        yearly_consumption = data.annotate(
            grid_cost=F('site_consumption_grid_supply') * (F('grid_price') / 1000)
        ).values('month').annotate(
            total_grid_cost=Sum('grid_cost')
        ).order_by('month')

        # Formatear los datos de la respuesta
        response_data = {

            "monthly_costs": list(yearly_consumption)
        }

        return Response(response_data)

class HourlyConsumptionPriceView(ListAPIView):
    def get(self, request, month, day):
        # Filtrar los datos del día específico
        data = HourlyData.objects.filter(day=day, month=month)

        # Calcular el consumo por hora multiplicando por los precios correspondientes
        hourly_consumption = data.annotate(
            grid_cost=F('site_consumption_grid_supply') * (F('grid_price') / 1000)
        ).values('hour').annotate(
            total_grid_cost=Sum('grid_cost')
        ).order_by('hour')

        # Formatear los datos de la respuesta
        response_data = {
            "day": day,
            "hourly_costs": list(hourly_consumption)
        }

        return Response(response_data)


class MonthlyConsumptionPercentageView(ListAPIView):
    def get(self, request, month):
        # Sumar los consumos de Grid y Gas para el mes especificado
        data = HourlyData.objects.filter(month=month).aggregate(
            total_grid=Sum('site_consumption_grid_supply'),
            total_solar=Sum('onsite_solar_system_production')
        )

        total_grid = data['total_grid'] or 0
        total_solar = data['total_solar'] or 0
        total_consumption = total_grid + total_solar

        if total_consumption > 0:
            percentage_grid = (total_grid / total_consumption) * 100
            percentage_solar = (total_solar / total_consumption) * 100
        else:
            percentage_grid = percentage_solar = 0

        response_data = {
            "month": month,
            "total_grid_percentage": percentage_grid,
            "total_solar_percentage": percentage_solar
        }

        return Response(response_data)
