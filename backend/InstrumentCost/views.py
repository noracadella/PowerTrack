from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.response import Response

from .models import InstrumentCost
# Create your views here.
"""def InstrumentCost(request):
    return render(request, "InstrumentCostView.html")"""

class InstrumentLCOEView(ListAPIView):
    def get(self, request):
        # Obtener los datos del modelo InstrumentCost
        data = (
            InstrumentCost.objects.values('instrument', 'LCOE_instrument_cost')  # Solo incluir instrument y LCOE
            .order_by('instrument')  # Ordenar por nombre de instrumento
        )

        # Construir la respuesta
        response_data = {
            "instruments": list(data)
        }

        return Response(response_data)