from django.db.models import Sum, F
from rest_framework.decorators import api_view
from rest_framework.response import Response
from decimal import Decimal
from .models import SiteInformation
from HourlyData.models import HourlyData
from EmissionFactor.models import EmissionFactor

@api_view(['POST'])
def simulate_strategy(request):
    data = request.data
    sources = data.get("sources", [])
    print(f"Received sources: {sources}")  # Debug: Imprime las fuentes recibidas

    # Filtrar los datos del año específico (por defecto, el año actual)
    data = HourlyData.objects.filter()

    # Factores de reducción para el consumo de red
    reduction_factor = 1 - (len(sources) * 0.05)  # Reducción del 5% por cada fuente
    reduction_factor = max(0.85, reduction_factor)
    reduction_factor2 = 1 - reduction_factor
    print(f"Reduction factor: {reduction_factor}")  # Debug: Imprime el factor de reducción

    # Calcular el costo total anual de la red (aplicando el factor de reducción directamente)
    yearly_consumption = data.annotate(
        # Multiplicamos el costo de la red por el factor de reducción
        grid_cost=F('site_consumption_grid_supply') * (F('grid_price') / 1000) * float(reduction_factor)
    ).values('month').annotate(
        total_grid_cost=Sum('grid_cost')
    )

    total_consumption = sum([float(item['total_grid_cost']) for item in yearly_consumption])
    print(f"Total yearly consumption cost after reduction: {total_consumption}")  # Debug: Imprime el costo total de consumo anual con reducción

    consumption_data = HourlyData.objects.filter()

    emission_factor = EmissionFactor.objects.filter(instrument="Spain Grid 2024").first()

    if emission_factor:
        carbon_intensity = emission_factor.carbon_intensity

        # Multiplicar el consumo por el carbon_intensity y agrupar por mes
        monthly_emissions = consumption_data.annotate(
            carbon_emission=F('site_consumption_grid_supply') * carbon_intensity * float(reduction_factor)
        ).values('month').annotate(
            total_carbon_emission=Sum('carbon_emission')
        )
        
        total_consumption2 = sum([float(item.get('total_carbon_emission', 0)) for item in monthly_emissions])

        print(f"Total yearly emissions after reduction: {total_consumption2}")  # Debug: Imprime el costo total de consumo anual con reducción

    # Carga de precios y emisiones por fuente
    source_prices = {
        "PV": 121.8,
        "Wind": 96.7,
        "Hydro": 99.3,
        "Coal": 78.6,
        "NaturalGas": 46.8,
        "Biomass": 146.3,
        "Geothermal": 91.6,
        "Nuclear": 116.5,
    }
    source_emissions = {
        "PV": 36,
        "Wind": 13,
        "Hydro": 11,
        "Coal": 1170,
        "NaturalGas": 520,
        "Biomass": 230,
        "Geothermal": 38,
        "Nuclear": 5,
    }

    total_cost = float(total_consumption)  # El costo total ajustado
    total_emissions = float(total_consumption2)

    # Calcular costos y emisiones de las nuevas fuentes seleccionadas
    for source in sources:
        additional_consumption = total_consumption * float(reduction_factor2)  # El 15% restante para las fuentes seleccionadas
        cost = additional_consumption * float(source_prices.get(source, 0))
        emissions = additional_consumption * float(source_emissions.get(source, 0))

        print(f"Source: {source}, Additional consumption: {additional_consumption}, Cost: {cost}, Emissions: {emissions}")  # Debug: Imprime los valores por fuente

        total_cost += cost
        total_emissions += emissions

    # Respuesta final con el costo total y emisiones
    response_data = {
        "total_cost": total_cost,
        "total_emissions": total_emissions,
        "total_consumption": total_consumption,
    }

    return Response(response_data)
