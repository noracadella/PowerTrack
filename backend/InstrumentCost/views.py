from django.shortcuts import render

# Create your views here.
def InstrumentCost(request):
    return render(request, "InstrumentCostView.html")