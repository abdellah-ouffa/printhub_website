from django.contrib import admin

from .models import Service

# admin.site.register(Service)


# class ServiceAdmin(Service):
#     list_display = ("title", "is_available")
#     list_filter = ("is_available",)
#     search_fields = ("title", "descripion")
@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "is_available")
    list_filter = ("is_available",)
    search_fields = ("title", "description")
