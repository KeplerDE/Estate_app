from django.contrib import admin
from .forms import ListingForm
from listings.models import Listing

class ListingAdmin(admin.ModelAdmin):
    form = ListingForm


admin.site.register(Listing, ListingAdmin)
