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