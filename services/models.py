from django.db import models


class Service(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    details = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to="services_images", blank=True, null=True)
    is_available = models.BooleanField(default=True)

    class Meta:
        ordering = ("title",)

    def __str__(self):
        return self.title
