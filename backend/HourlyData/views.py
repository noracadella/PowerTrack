from django.shortcuts import render

# Create your views here.
def HourlyData(request):
    return render(request, "HourlyDataView.html")