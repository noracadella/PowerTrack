from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Sum, Avg, F
from .models import SiteInformation
from decimal import Decimal

"""def SiteInformation(request):
    return render(request, "SiteInformationView.html")"""

# API para simular la estrategia de consumo energético
@api_view(['POST'])
def simulate_strategy(request):
    data = request.data
    sources = data.get("sources", [])
    print(f"Received sources: {sources}")  # Debug: Imprime las fuentes recibidas

    # Total consumo (consumo de red + gas natural)
    total_consumption = SiteInformation.objects.aggregate(
        total=Sum(F('total_site_consumption_grid_supply') + F('total_site_consumption_natural_gas'))
    )['total'] or 0
    print(f"Total consumption: {total_consumption}")  # Debug: Imprime el consumo total

    # Factores de reducción para el consumo de red
    reduction_factor = 1 - (len(sources) * 0.05)  # Reducción del 5% por cada fuente
    reduction_factor = max(0.85, reduction_factor)
    print(f"Reduction factor: {reduction_factor}")  # Debug: Imprime el factor de reducción

    grid_consumption = SiteInformation.objects.aggregate(
        total_grid=Sum('total_site_consumption_grid_supply')
    )['total_grid'] or 0
    print(f"Grid consumption: {grid_consumption}")  # Debug: Imprime el consumo de la red

    grid_price = SiteInformation.objects.aggregate(
        avg_grid_price=Avg('total_grid_price')
    )['avg_grid_price'] or 0
    print(f"Grid price: {grid_price}")  # Debug: Imprime el precio de la red

    # Ajustar el consumo de la red
    adjusted_grid_consumption = grid_consumption * Decimal(reduction_factor)
    print(f"Adjusted grid consumption: {adjusted_grid_consumption}")  # Debug: Imprime el consumo ajustado de la red

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

    total_cost = 0
    total_emissions = 0

    # Calcular costos y emisiones de las nuevas fuentes seleccionadas
    for source in sources:
        additional_consumption = total_consumption * Decimal(0.05)  # Cada fuente añade un 5% del consumo total
        cost = additional_consumption * Decimal(source_prices.get(source, 0))
        emissions = additional_consumption * Decimal(source_emissions.get(source, 0))

        print(f"Source: {source}, Additional consumption: {additional_consumption}, Cost: {cost}, Emissions: {emissions}")  # Debug: Imprime los valores por fuente

        total_cost += cost
        total_emissions += emissions

    # Recalcular el costo y las emisiones del consumo de red ajustado
    grid_cost = adjusted_grid_consumption * grid_price
    grid_emissions = adjusted_grid_consumption * Decimal(200)  # Suponiendo un factor de emisión para la red

    print(f"Grid cost: {grid_cost}, Grid emissions: {grid_emissions}")  # Debug: Imprime los valores del costo y emisiones de la red

    total_cost += grid_cost
    total_emissions += grid_emissions

    # Respuesta al frontend
    response_data = {
        "totalCost": total_cost,
        "totalEmissions": total_emissions,
        "adjustedGridConsumption": adjusted_grid_consumption,
        "strategy": sources,
    }

    print(f"Total cost: {total_cost}, Total emissions: {total_emissions}")  # Debug: Imprime los resultados finales

    return Response(response_data)
