from django.shortcuts import render
from django.db.models import F, Sum
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from .models import  EmissionFactor
from HourlyData.models import HourlyData

# Create your views here.
def EmissionFactor(request):
    return render(request, "EmissionFactorView.html")

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