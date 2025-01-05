from django.urls import path
from .views import InstrumentCost, InstrumentLCOEView

urlpatterns = [
    path('', InstrumentCost),
    path('list/', InstrumentLCOEView.as_view(), name='instrument-cost'),
]