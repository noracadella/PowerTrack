from django.urls import path
from . import views

urlpatterns = [
    # Aquí puedes añadir rutas
    path('', views.api_home, name='api_home'),

]
