"""
ASGI config for study_vhu project.
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'study_vhu.settings')

application = get_asgi_application()