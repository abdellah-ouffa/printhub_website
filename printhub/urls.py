from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("core.urls")),
    path("services", include("services.urls")),
    path(
        "static/core/images/site.webmanifest",
        TemplateView.as_view(
            template_name="core/images/site.webmanifest",
            content_type="application/manifest+json",
        ),
    ),
]

if settings.DEBUG:
    urlpatterns += [
        path("__debug__/", include("debug_toolbar.urls")),
    ]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
