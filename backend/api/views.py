# Create your views here.
from django.http import JsonResponse
from rest_framework.generics import ListAPIView



def api_home(request):
    return JsonResponse({"message": "Hola desde la API"})

