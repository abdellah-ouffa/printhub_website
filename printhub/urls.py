from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("core.urls")),  # Link core app's urls
    path("services", include("services.urls")),
    path(
        "static/core/images/site.webmanifest",
        TemplateView.as_view(
            template_name="core/images/site.webmanifest",
            content_type="application/manifest+json",
        ),
    ),
]


# This only in development
# In production ,Django does not serve media files directly because it is inefficient and not secure
# Instead in production environments ,media files are usually served by a web server like Nginx and Apache,
# which is better suited for handling static and media files

# So when DEBUG = False ,we will need to configure our web server to serve files from the MEDIA_ROOT directory

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
