from django.shortcuts import render

# Create your views here.
def SiteInformation(request):
    return render(request, "SiteInformationView.html")