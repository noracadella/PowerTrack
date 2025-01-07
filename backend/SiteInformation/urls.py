from django.urls import path
from .views import SiteInformation, simulate_strategy  

urlpatterns = [
    path('', SiteInformation),
    path('simulation/', simulate_strategy, name='simulate_strategy'),
]
