from django.shortcuts import render
from django.db.models import F, Sum
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from .models import  EmissionFactor
from HourlyData.models import HourlyData
from decimal import Decimal, ROUND_HALF_UP

# Create your views here.
"""def EmissionFactor(request):
    return render(request, "EmissionFactorView.html")"""

class MonthlyEmissionView(ListAPIView):
    def get(self, request,  month):
        # Filtrar los datos del mes específico
        consumption_data = HourlyData.objects.filter( month=month)

        # Obtener el factor de emisión para "Spain Grid 2024"
        emission_factor = EmissionFactor.objects.filter(instrument="Spain Grid 2024").first()

        if emission_factor:
            carbon_intensity = emission_factor.carbon_intensity

            # Multiplicar el consumo por el carbon_intensity y sumar por día
            daily_emissions = consumption_data.annotate(
                carbon_emission=F('site_consumption_grid_supply') * carbon_intensity
            ).values('day').annotate(
                total_carbon_emission=Sum('carbon_emission')
            ).order_by('day')

            for entry in daily_emissions:
                entry['total_carbon_emission'] = Decimal(entry['total_carbon_emission']).quantize(Decimal('0.01'),
                                                                                                    rounding=ROUND_HALF_UP)

            # Preparar los datos para la respuesta
            response_data = {

                "month": month,
                "daily_emissions": list(daily_emissions)
            }
        else:
            response_data = {
                "error": "Emission factor for Spain Grid 2024 not found."
            }

        return Response(response_data)

class HourlyEmissionView(ListAPIView):
    def get(self, request, month, day):
        # Filtrar los datos por día y mes específicos
        consumption_data = HourlyData.objects.filter(day=day, month=month)

        # Obtener el factor de emisión para "Spain Grid 2024"
        emission_factor = EmissionFactor.objects.filter(instrument="Spain Grid 2024").first()

        if emission_factor:
            carbon_intensity = emission_factor.carbon_intensity

            # Multiplicar el consumo por el carbon_intensity y agrupar por hora
            hourly_emissions = consumption_data.annotate(
                carbon_emission=F('site_consumption_grid_supply') * carbon_intensity
            ).values('hour').annotate(
                total_carbon_emission=Sum('carbon_emission')
            ).order_by('hour')

            for entry in hourly_emissions:
                entry['total_carbon_emission'] = Decimal(entry['total_carbon_emission']).quantize(Decimal('0.01'),
                                                                                                    rounding=ROUND_HALF_UP)

            # Preparar los datos para la respuesta
            response_data = {
                "day": day,
                "month": month,
                "hourly_emissions": list(hourly_emissions)
            }
        else:
            response_data = {
                "error": "Emission factor for Spain Grid 2024 not found."
            }

        return Response(response_data)

class YearlyEmissionView(ListAPIView):
    def get(self, request):
        # Filtrar los datos por año
        consumption_data = HourlyData.objects.filter()

        # Obtener el factor de emisión para "Spain Grid 2024"
        emission_factor = EmissionFactor.objects.filter(instrument="Spain Grid 2024").first()

        if emission_factor:
            carbon_intensity = emission_factor.carbon_intensity

            # Multiplicar el consumo por el carbon_intensity y agrupar por mes
            monthly_emissions = consumption_data.annotate(
                carbon_emission=F('site_consumption_grid_supply') * carbon_intensity
            ).values('month').annotate(
                total_carbon_emission=Sum('carbon_emission')
            ).order_by('month')

            for entry in monthly_emissions:
                entry['total_carbon_emission'] = Decimal(entry['total_carbon_emission']).quantize(Decimal('0.01'),
                                                                                                    rounding=ROUND_HALF_UP)

            # Preparar los datos para la respuesta
            response_data = {

                "monthly_emissions": list(monthly_emissions)
            }
        else:
            response_data = {
                "error": "Emission factor for Spain Grid 2024 not found."
            }

        return Response(response_data)

class EmissionsList(ListAPIView):
    def get(self, request):
        # Obtener los datos del modelo InstrumentCost
        data = (
            EmissionFactor.objects.values('instrument', 'carbon_intensity')  # Solo incluir instrument y LCOE
            .order_by('instrument')  # Ordenar por nombre de instrumento
        )

        # Construir la respuesta
        response_data = {
            "instruments": list(data)
        }

        return Response(response_data)