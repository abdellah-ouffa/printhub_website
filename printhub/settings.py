from pathlib import Path
import os
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent

# Security settings
SECRET_KEY = config("SECRET_KEY")  # ✅ Now loaded from .env
DEBUG = config("DEBUG", default=True, cast=bool)

ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
]

# Installed apps
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "core",
    "services",
    "csp",  # Add CSP app here
]

INSTALLED_APPS += [
    "debug_toolbar",
]

# Middleware
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "csp.middleware.CSPMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "core.middleware.NoCacheMiddleware",
]

# Append Debug Toolbar middleware for development
if DEBUG:
    MIDDLEWARE += [
        "debug_toolbar.middleware.DebugToolbarMiddleware",
    ]

# URL configuration
ROOT_URLCONF = "printhub.urls"

# Templates
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],  # Modify this if you have a custom template directory
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "core.context_processors.static_version",  # Custom context processor
            ],
        },
    },
]

# WSGI application
WSGI_APPLICATION = "printhub.wsgi.application"

# Database configuration
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": config("DB_NAME"),
        "USER": config("DB_USER"),
        "PASSWORD": config("DB_PASSWORD"),
        "HOST": config("DB_HOST", default="localhost"),
        "PORT": config("DB_PORT", default="5432"),
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# Localization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = "static/"
STATICFILES_DIRS = [
    BASE_DIR / "core" / "static",
]
STATIC_ROOT = BASE_DIR / "staticfiles"

# Media files
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# Default primary key field type
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# Cache Buster: Generate version number based on file modification time
def get_static_version(file_name):
    file_path = os.path.join(BASE_DIR, "core", "static", file_name)
    try:
        return str(int(os.path.getmtime(file_path)))
    except OSError:
        return "1.0"  # Default version if file not found or there's an error


STATIC_VERSION = get_static_version("css/custom.css")  # Example file

# Email Configuration
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = config("EMAIL_HOST", default="smtp.gmail.com")
EMAIL_PORT = config("EMAIL_PORT", default=587, cast=int)
EMAIL_USE_TLS = config("EMAIL_USE_TLS", default=True, cast=bool)
EMAIL_HOST_USER = config("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = config("EMAIL_HOST_PASSWORD")

# Content Security Policy (CSP) settings
CSP_DEFAULT_SRC = [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    "*.ngrok-free.app",
    "*.ngrok.io",
    "translate.googleapis.com",
    "translate.google.com",
    "www.google.com",
    "www.gstatic.com",
    "cdn.ngrok.com",
]

CSP_SCRIPT_SRC = [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    "*.googleapis.com",
    "cdnjs.cloudflare.com",
    "unpkg.com",
    "*.ngrok-free.app",
    "*.ngrok.io",
    "translate.googleapis.com",
    "translate.google.com",
    "www.google.com",
    "www.gstatic.com",
    "cdn.jsdelivr.net",
]

CSP_STYLE_SRC = [
    "'self'",
    "'unsafe-inline'",
    "fonts.googleapis.com",
    "cdnjs.cloudflare.com",
    "unpkg.com",
    "*.ngrok-free.app",
    "*.ngrok.io",
]

CSP_STYLE_SRC_ELEM = [
    "'self'",
    "'unsafe-inline'",
    "fonts.googleapis.com",
    "cdnjs.cloudflare.com",
    "unpkg.com",
    "*.ngrok-free.app",
    "*.ngrok.io",
]

CSP_FONT_SRC = [
    "'self'",
    "fonts.gstatic.com",
    "fonts.googleapis.com",
    "cdnjs.cloudflare.com",
    "data:",  # Allows embedded fonts (base64-encoded)
]

CSP_IMG_SRC = [
    "'self'",
    "data:",  # Allows embedded images (base64-encoded)
    "*.googleapis.com",
    "*.google.com",
    "*.gstatic.com",
    "*.ngrok-free.app",
    "*.ngrok.io",
]

CSP_CONNECT_SRC = [
    "'self'",
    "*.ngrok-free.app",
    "*.ngrok.io",
]

CSRF_TRUSTED_ORIGINS = [
    "https://*.ngrok-free.app",  # Allow all Ngrok subdomains
]
