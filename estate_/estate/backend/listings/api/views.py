from listings.models import Listing
from rest_framework import generics

# Import the ListingSerializer class
from .serializers import ListingSerializer

class ListingList(generics.ListAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer

class ListingCreate(generics.CreateAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer