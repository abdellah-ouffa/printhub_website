from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),  # Home page
    path("contact/", views.contact_view, name="contact"),  # Page for the contact form
    path(
        "contact/submit/", views.contact_submit, name="contact_submit"
    ),  # Form submission endpoint
]
