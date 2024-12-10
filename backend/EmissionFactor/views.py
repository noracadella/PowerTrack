from django.shortcuts import render

# Create your views here.
def EmissionFactor(request):
    return render(request, "EmissionFactorView.html")