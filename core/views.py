from django.http import JsonResponse
from django.views.decorators.csrf import (
    csrf_exempt,
)  # This is the default behavior, no need to use csrf_exempt

from django.shortcuts import render
from services.models import Service
from django.core.mail import send_mail
from django.http import HttpResponsePermanentRedirect
from django.core.mail import EmailMessage  # Add this import
from django.http import HttpResponseRedirect
from django.urls import reverse


def home(request):
    services = Service.objects.filter(is_available=True)[
        :6
    ]  # Get the first 6 services for the home page
    return render(request, "core/home.html", {"services": services})


def contact_view(request):
    return render(request, "core/contact.html")  # Adjust the path if needed


# def contact_submit(request):
#     if request.method == "POST":
#         name = request.POST.get("name")
#         email = request.POST.get("email")
#         phone = request.POST.get("phone")
#         message = request.POST.get("message")

#         print("Form Data:", name, email, phone, message)  # Debugging print
#         # Compose the email
#         subject = f"New Contact Form Submission from {name}"
#         message_body = f"""
#         You have received a new message from your contact form:

#         Name: {name}
#         Email: {email}
#         Phone: {phone}

#         Message:
#         {message}
#         """
#         recipient_email = "ouffaabdellah@gmail.com"  # Replace with your email address
#         sender_email = (
#             email  # Set the sender's email to the one provided in the contact form
#         )

#         # Send email using EmailMessage
#         email_message = EmailMessage(
#             subject,
#             message_body,
#             sender_email,
#             [recipient_email],
#         )
#         email_message.send(fail_silently=False)

#         print("Email sent!")  # Debugging print

#         # Redirect to a thank-you page or the same form
#         return HttpResponseRedirect(
#             reverse("contact")
#         )  # Redirect back to the contact page

#     return HttpResponseRedirect(reverse("contact"))  # Redirect if method is not POST


def contact_submit(request):
    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("email")
        phone = request.POST.get("phone")
        message = request.POST.get("message")

        # Debugging print statements
        print("Form Data:", name, email, phone, message)

        # Compose the email
        subject = f"New Contact Form Submission from {name}"
        message_body = f"""
        You have received a new message from your contact form:
        
        Name: {name}
        Email: {email}
        Phone: {phone}
        
        Message:
        {message}
        """
        recipient_email = "ouffaabdellah@gmail.com"  # Replace with your email address
        sender_email = (
            email  # Set the sender's email to the one provided in the contact form
        )

        # Send email using EmailMessage
        email_message = EmailMessage(
            subject, message_body, sender_email, [recipient_email]
        )
        email_message.send(fail_silently=False)

        print("Email sent!")  # Debugging print

        # Respond with a JSON response indicating success
        return JsonResponse(
            {"message": "Form submitted successfully!", "name": name, "email": email}
        )

    return JsonResponse({"error": "Invalid request method"}, status=400)
